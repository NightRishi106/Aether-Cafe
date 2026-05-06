import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Coffee, Plus, Info, Check, Filter, ArrowRight } from "lucide-react";
import { cn } from "@/src/lib/utils";

const MENU_CATEGORIES = ["All", "Coffee", "Espresso", "Cold Brew", "Bakery", "Signature"];

const MENU_ITEMS = [
  { id: "1", name: "Aether Black", category: "Coffee", price: 6.50, desc: "Single origin Ethiopian, triple filtered", calories: 5, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800" },
  { id: "2", name: "Nebula Latte", category: "Signature", price: 7.50, desc: "Charcoal bean with edible silver", calories: 180, image: "https://i.pinimg.com/736x/21/74/32/2174329b8ef1603c1cbc68bd9ef5865a.jpg" },
  { id: "3", name: "Stardust Matcha", category: "Signature", price: 8.00, desc: "Ceremonial grade with oat cloud", calories: 120, image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&q=80&w=800" },
  { id: "4", name: "Aether Cold Brew", category: "Cold Brew", price: 7.00, desc: "24-hour slow drip", calories: 10, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=800" },
  { id: "5", name: "Moonlight Tart", category: "Bakery", price: 9.50, desc: "Lemon curd with star anise", calories: 320, image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=800" },
  { id: "6", name: "Cortado", category: "Espresso", price: 5.50, desc: "Equal parts espresso and warm milk", calories: 60, image: "https://i.pinimg.com/1200x/66/b3/09/66b3097c6d2845f8dbd7b8e92c301447.jpg" },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isCustomizing, setIsCustomizing] = useState(false);

  const filteredItems = activeCategory === "All" 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-20">
      <div className="container mx-auto px-6">
        <header className="mb-12 md:mb-20">
          <span className="text-coffee-beige uppercase tracking-[0.3em] text-[10px] font-mono mb-4 block">The Experience</span>
          <h1 className="font-display text-5xl md:text-9xl mb-8 leading-tight">CURATED <br /> SELECTIONS</h1>
          
          <div className="flex flex-wrap gap-2 md:gap-4">
            {MENU_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 md:px-8 py-2 md:py-3 rounded-full text-[8px] md:text-[10px] uppercase tracking-widest transition-all",
                  activeCategory === cat ? "bg-coffee-beige text-coffee-dark" : "glass hover:bg-white/10"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-6 rounded-[2.5rem] group hover:bg-white/5 transition-all flex flex-col"
            >
              <div className="w-full aspect-square mb-6 rounded-3xl overflow-hidden glass">
                <img 
                  src={(item as any).image} 
                  alt={item.name} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[8px] uppercase tracking-widest text-coffee-soft/40 mb-1 block">{item.category}</span>
                  <h3 className="text-xl font-medium mb-1">{item.name}</h3>
                  <p className="text-[10px] text-coffee-soft/40 italic line-clamp-1">{item.desc}</p>
                </div>
                <span className="font-display text-xl text-coffee-beige">${item.price.toFixed(2)}</span>
              </div>
              
              <div className="flex items-center gap-4 mt-8">
                <button 
                  onClick={() => { setSelectedItem(item); setIsCustomizing(true); }}
                  className="flex-1 py-4 glass rounded-2xl text-[10px] uppercase tracking-widest font-medium hover:bg-coffee-beige hover:text-coffee-dark transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-3 h-3" /> Customize
                </button>
                <button className="w-14 h-14 glass rounded-2xl flex items-center justify-center group-hover:bg-white/10 transition-all">
                  <Info className="w-4 h-4 text-coffee-soft/40" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Builder CTA */}
        <section className="mt-20 md:mt-32 glass rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-coffee-beige/10 to-transparent pointer-events-none" />
          <div className="relative z-10 flex-1 text-center lg:text-left">
             <span className="text-coffee-beige uppercase tracking-[0.3em] text-[10px] font-mono mb-4 block">Interactive</span>
             <h2 className="font-display text-4xl md:text-8xl mb-6 md:mb-8 leading-none">BUILD YOUR <br className="hidden md:block" /> OWN DREAM</h2>
             <p className="text-coffee-soft/60 text-base md:text-lg mb-8 md:text-12 max-w-xl mx-auto lg:mx-0">
               Our master brewers are ready to craft your unique vision. Experiment with origin, texture, and notes.
             </p>
             <button 
              onClick={() => setIsCustomizing(true)}
              className="px-10 md:px-12 py-5 md:py-6 bg-coffee-soft text-coffee-dark rounded-full font-medium tracking-widest uppercase text-[10px] md:text-xs flex items-center justify-center gap-3 hover:scale-105 transition-all w-full sm:w-auto"
             >
               Start Crafting <ArrowRight className="w-4 h-4" />
             </button>
          </div>
          <div className="relative z-10 w-96 aspect-square hidden lg:flex items-center justify-center">
            <div className="w-full h-full glass rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite]">
               <div className="w-4/5 h-4/5 border border-dashed border-white/20 rounded-full flex items-center justify-center">
                  <Coffee className="w-20 h-20 text-coffee-beige/20" />
               </div>
            </div>
          </div>
        </section>
      </div>

      {/* Builder Modal */}
      <AnimatePresence>
        {isCustomizing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-3xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="glass max-w-4xl w-full h-[90vh] md:h-[80vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden flex flex-col md:flex-row"
            >
              <div className="h-64 md:h-auto md:w-1/2 bg-coffee-dark/40 flex items-center justify-center relative p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/5">
                <div className="absolute top-6 md:top-10 left-6 md:left-10 text-[8px] md:text-[10px] uppercase font-mono tracking-widest text-coffee-beige/40">Visual Preview</div>
                <div className="w-40 md:w-64 h-52 md:h-80 glass rounded-t-[2.5rem] md:rounded-t-[4rem] rounded-b-[0.5rem] md:rounded-b-[1rem] relative overflow-hidden flex items-center justify-center">
                   {selectedItem?.image ? (
                     <img 
                        src={selectedItem.image} 
                        alt={selectedItem.name} 
                        className="w-full h-full object-cover opacity-60"
                        referrerPolicy="no-referrer"
                     />
                   ) : (
                     <Coffee className="w-20 md:w-32 h-20 md:h-32 text-coffee-beige/20" />
                   )}
                </div>
              </div>

              <div className="flex-1 md:w-1/2 p-8 md:p-12 overflow-y-auto">
                <header className="flex justify-between items-start mb-8 md:mb-10">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-medium mb-1 md:mb-2">Drink Lab</h2>
                    <p className="text-[10px] text-coffee-soft/40 uppercase tracking-widest">v 2.1 - Interactive Brewing</p>
                  </div>
                  <button onClick={() => setIsCustomizing(false)} className="w-8 h-8 md:w-10 md:h-10 glass rounded-full flex items-center justify-center hover:bg-white/10">
                    <Check className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </header>

                <div className="space-y-8 md:space-y-10">
                  <CustomizerGroup title="Base" options={["Espresso", "Cold Brew", "Ristretto"]} />
                  <CustomizerGroup title="Milk" options={["Oat", "Almond", "Whole", "Pistachio"]} />
                  <CustomizerGroup title="Sweetness" options={["None", "25%", "50%", "75%", "100%"]} />
                  <CustomizerGroup title="Toppings" options={["Sea Salt", "Silver Flakes", "Lavender", "Cacao"]} />
                </div>

                <div className="mt-10 md:mt-12 flex items-center justify-between pt-8 md:pt-10 border-t border-white/5">
                   <div>
                      <span className="text-[10px] text-coffee-soft/40 uppercase tracking-widest mb-1 block">Total Estimate</span>
                      <span className="font-display text-3xl md:text-4xl text-coffee-beige">$9.25</span>
                   </div>
                   <button className="px-8 md:px-10 py-4 md:py-5 bg-coffee-beige text-coffee-dark rounded-full font-medium tracking-widest uppercase text-[10px] md:text-xs">
                      Add to Cart
                   </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CustomizerGroup({ title, options }: { title: string, options: string[] }) {
  const [selected, setSelected] = useState(options[0]);
  return (
    <div>
      <span className="text-[10px] uppercase font-mono tracking-widest text-coffee-beige mb-4 block">{title}</span>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => (
          <button 
            key={opt}
            onClick={() => setSelected(opt)}
            className={cn(
              "px-5 py-2 rounded-xl text-[10px] uppercase tracking-widest transition-all",
              selected === opt ? "bg-white/10 text-white" : "text-coffee-soft/40 hover:text-white"
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
