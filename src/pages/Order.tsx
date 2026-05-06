import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Minus, 
  Coffee, 
  Droplets, 
  Wind, 
  Thermometer, 
  Zap, 
  ArrowRight, 
  ShoppingBag, 
  Trash2, 
  Check,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { cn } from '../lib/utils';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const MENU_ITEMS = [
  { id: "1", name: "Aether Black", category: "Coffee", price: 6.50, desc: "Single origin Ethiopian, triple filtered", calories: 5, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800" },
  { id: "2", name: "Nebula Latte", category: "Signature", price: 7.50, desc: "Charcoal bean with edible silver", calories: 180, image: "https://i.pinimg.com/736x/21/74/32/2174329b8ef1603c1cbc68bd9ef5865a.jpg" },
  { id: "3", name: "Stardust Matcha", category: "Signature", price: 8.00, desc: "Ceremonial grade with oat cloud", calories: 120, image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&q=80&w=800" },
  { id: "4", name: "Aether Cold Brew", category: "Cold Brew", price: 7.00, desc: "24-hour slow drip", calories: 10, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=800" },
  { id: "6", name: "Cortado", category: "Espresso", price: 5.50, desc: "Equal parts espresso and warm milk", calories: 60, image: "https://i.pinimg.com/1200x/66/b3/09/66b3097c6d2845f8dbd7b8e92c301447.jpg" },
];

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  customization?: any;
}

export default function OrderPage() {
  const [selectedItem, setSelectedItem] = useState(MENU_ITEMS[0]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isBrewing, setIsBrewing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  
  // Customization state
  const [temp, setTemp] = useState(88);
  const [grind, setGrind] = useState(4);
  const [sweetness, setSweetness] = useState(25);

  const addToCart = () => {
    const existing = cart.find(i => i.id === selectedItem.id);
    if (existing) {
      setCart(cart.map(i => i.id === selectedItem.id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setCart([...cart, { 
        id: selectedItem.id, 
        name: selectedItem.name, 
        price: selectedItem.price, 
        quantity: 1,
        customization: { temp, grind, sweetness }
      }]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(i => i.id !== id));
  };

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;
    setIsBrewing(true);
    
    // Simulate brewing progress
    setTimeout(async () => {
      const path = 'orders';
      try {
        if (!auth.currentUser) throw new Error("Please sign in to order.");
        
        await addDoc(collection(db, path), {
          userId: auth.currentUser.uid,
          items: cart.map(i => ({ id: i.id, name: i.name, qty: i.quantity, price: i.price })),
          total: total,
          status: 'preparing',
          createdAt: serverTimestamp(),
          metadata: { atmospheric_profile: 'optimized' }
        });

        setIsBrewing(false);
        setOrderComplete(true);
        setCart([]);
      } catch (err) {
        setIsBrewing(false);
        if (err instanceof Error) handleFirestoreError(err, OperationType.WRITE, path);
      }
    }, 3000);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass max-w-xl w-full rounded-[4rem] p-12 text-center"
        >
          <div className="w-20 h-20 bg-coffee-beige text-coffee-dark rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(203,178,141,0.3)]">
            <Check className="w-10 h-10" />
          </div>
          <h1 className="font-display text-6xl mb-6">DISPATCHED</h1>
          <p className="text-coffee-soft/60 text-lg mb-12 italic">
            Your selection is currently in molecular transformation. 
            Estimated synchronization in 4 minutes.
          </p>
          <button 
            onClick={() => setOrderComplete(false)}
            className="px-12 py-5 bg-coffee-beige text-coffee-dark rounded-full font-display text-sm tracking-widest"
          >
            New Sequence
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 container mx-auto px-6">
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Left: Product Selector & Brewing Lab */}
        <div className="flex-1 space-y-12">
          <header>
            <span className="text-coffee-beige uppercase tracking-[0.3em] text-[10px] font-mono mb-4 block">Interactive Lab v4.0</span>
            <h1 className="font-display text-5xl md:text-8xl mb-8 leading-tight">BREWING <br /> LABORATORY</h1>
          </header>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {MENU_ITEMS.map(item => (
              <button 
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={cn(
                  "glass p-4 rounded-3xl transition-all group flex flex-col items-center text-center",
                  selectedItem.id === item.id ? "border-coffee-beige bg-white/5" : "border-white/5 opacity-40 grayscale hover:grayscale-0 hover:opacity-100"
                )}
              >
                <div className="w-full aspect-square rounded-2xl overflow-hidden mb-4">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-medium">{item.name}</span>
              </button>
            ))}
          </div>

          {/* Technical Customizer */}
          <div className="glass rounded-[3rem] p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-coffee-beige/5 blur-[80px] -translate-y-1/2 translate-x-1/2" />
            
            <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
              <div className="w-72 aspect-[4/5] glass rounded-[2.5rem] p-2 rotate-2">
                <img 
                  src={(selectedItem as any).image} 
                  alt={selectedItem.name} 
                  className="w-full h-full object-cover rounded-[2rem] opacity-70"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex-1 w-full space-y-10">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] uppercase tracking-widest text-coffee-soft/40 flex items-center gap-2">
                      <Thermometer className="w-3 h-3" /> Temperature
                    </label>
                    <span className="font-mono text-xs text-coffee-beige">{temp}°C</span>
                  </div>
                  <input 
                    type="range" min="80" max="98" step="1" 
                    value={temp} onChange={(e) => setTemp(parseInt(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-coffee-beige"
                  />
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] uppercase tracking-widest text-coffee-soft/40 flex items-center gap-2">
                      <Zap className="w-3 h-3" /> Extraction Intensity
                    </label>
                    <span className="font-mono text-xs text-coffee-beige">Level {grind}</span>
                  </div>
                  <div className="flex gap-2">
                    {[1,2,3,4,5,6].map(l => (
                      <button 
                        key={l}
                        onClick={() => setGrind(l)}
                        className={cn(
                          "flex-1 h-2 rounded-full transition-all",
                          l <= grind ? "bg-coffee-beige shadow-[0_0_10px_rgba(203,178,141,0.5)]" : "bg-white/5"
                        )}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] uppercase tracking-widest text-coffee-soft/40 flex items-center gap-2">
                      <Droplets className="w-3 h-3" /> Sweetness %
                    </label>
                    <span className="font-mono text-xs text-coffee-beige">{sweetness}%</span>
                  </div>
                  <div className="flex gap-4">
                    {[0, 25, 50, 100].map(s => (
                      <button 
                        key={s}
                        onClick={() => setSweetness(s)}
                        className={cn(
                          "px-4 py-2 rounded-xl text-[10px] flex-1 transition-all uppercase tracking-widest",
                          sweetness === s ? "glass text-coffee-beige" : "text-coffee-soft/40 hover:text-coffee-soft"
                        )}
                      >
                        {s}%
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={addToCart}
                  className="w-full py-5 bg-white text-black rounded-full font-display text-sm tracking-widest uppercase hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add to Batch
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Cart & Summary */}
        <div className="w-full lg:w-96 shrink-0 space-y-8">
           <div className="glass p-8 rounded-[3rem] border-white/5 flex flex-col h-[600px]">
              <header className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-coffee-beige" />
                  <h3 className="font-medium text-sm uppercase tracking-widest">Active Batch</h3>
                </div>
                <span className="text-[10px] font-mono text-coffee-soft/40">[{cart.length}] Items</span>
              </header>

              <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                <AnimatePresence mode="popLayout">
                  {cart.map(item => (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="glass px-4 py-4 rounded-2xl flex justify-between items-center group relative overflow-hidden"
                    >
                      <div className="absolute left-0 top-0 h-full w-[2px] bg-coffee-beige" />
                      <div>
                        <h4 className="text-xs font-medium uppercase tracking-tight">{item.name}</h4>
                        <div className="flex gap-2 mt-1">
                          <span className="text-[8px] uppercase tracking-widest text-coffee-soft/40">Qty: {item.quantity}</span>
                          <span className="text-[8px] uppercase tracking-widest text-coffee-beige">${item.price.toFixed(2)}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  ))}
                  {cart.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-20">
                      <Wind className="w-10 h-10" />
                      <p className="text-[10px] uppercase tracking-widest">Batch Empty</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-8 pt-8 border-t border-white/5 space-y-6">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] uppercase tracking-widest text-coffee-soft/40">Atmospheric Commitment</span>
                  <span className="font-display text-4xl">${total.toFixed(2)}</span>
                </div>
                
                <button 
                  onClick={handlePlaceOrder}
                  disabled={cart.length === 0 || isBrewing}
                  className="w-full h-16 glass rounded-full flex items-center justify-center gap-3 group relative overflow-hidden disabled:opacity-30"
                >
                  <AnimatePresence mode="wait">
                    {isBrewing ? (
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="flex items-center gap-3"
                      >
                        <div className="w-4 h-4 border-2 border-coffee-beige border-t-transparent rounded-full animate-spin" />
                        <span className="text-[10px] uppercase tracking-widest text-coffee-beige">Initiating Brew...</span>
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-3"
                      >
                        <span className="text-[10px] uppercase tracking-widest font-bold">Process Batch</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
           </div>

           {/* Dynamic Tip Card */}
           <div className="glass p-8 rounded-[2.5rem] border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-coffee-beige/10 blur-3xl group-hover:bg-coffee-beige/20 transition-all" />
              <div className="relative z-10 flex gap-6">
                <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-coffee-beige" />
                </div>
                <div>
                  <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-coffee-beige mb-1">Brew Tip</h4>
                  <p className="text-[10px] text-coffee-soft/40 leading-relaxed italic">
                    Lower extraction levels (Grind 1-2) preserve the clarity of high-altitude Ethiopian beans.
                  </p>
                </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
