import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, Users, ArrowRight, Check, MapPin, Coffee, Info } from 'lucide-react';
import { cn } from '../lib/utils';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "19:00", "20:00", "21:00"
];

const ZONES = [
  { id: 'zen', name: 'Zen Garden', desc: 'Minimalist, plants, soft ambient light', occupancy: 'Low' },
  { id: 'pulse', name: 'The Pulse', desc: 'Active energy, near brewing station', occupancy: 'High' },
  { id: 'observatory', name: 'The Observatory', desc: 'Floor-to-ceiling views, high altitude', occupancy: 'Med' },
  { id: 'vault', name: 'The Vault', desc: 'Soundproof, deep work, warm walnut', occupancy: 'Low' }
];

export default function ReservationPage() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '2',
    zone: 'zen',
    name: '',
    email: '',
    requests: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const path = 'reservations';
    try {
      if (!auth.currentUser) {
        throw new Error("You must be signed in to reserve a table.");
      }

      await addDoc(collection(db, path), {
        userId: auth.currentUser.uid,
        type: 'table',
        guests: parseInt(formData.guests),
        date: formData.date,
        time: formData.time,
        zone: formData.zone,
        customerName: formData.name,
        customerEmail: formData.email,
        requirements: formData.requests,
        status: 'confirmed',
        createdAt: serverTimestamp()
      });

      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (err) {
      setIsSubmitting(false);
      if (err instanceof Error) {
        setError(err.message);
        try {
          // If it's a JSON error from handleFirestoreError, don't re-handle
          JSON.parse(err.message);
        } catch {
          handleFirestoreError(err, OperationType.WRITE, path);
        }
      }
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass max-w-2xl w-full rounded-[4rem] p-12 md:p-20 text-center"
        >
          <div className="w-20 h-20 bg-coffee-beige text-coffee-dark rounded-full flex items-center justify-center mx-auto mb-10">
            <Check className="w-10 h-10" />
          </div>
          <h1 className="font-display text-5xl md:text-6xl mb-6">RESERVED</h1>
          <p className="text-coffee-soft/60 text-lg mb-12">
            Your space in the atmosphere is secured. A digital pass has been sent to {formData.email}.
          </p>
          <div className="grid grid-cols-2 gap-4 text-left border-t border-white/5 pt-10">
             <div>
                <span className="text-[10px] uppercase tracking-widest text-coffee-soft/40 block mb-1">Time</span>
                <p className="text-xl">{formData.date} at {formData.time}</p>
             </div>
             <div>
                <span className="text-[10px] uppercase tracking-widest text-coffee-soft/40 block mb-1">Location</span>
                <p className="text-xl uppercase tracking-tight">{formData.zone} Zone</p>
             </div>
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            className="mt-12 px-12 py-5 glass rounded-full text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all font-medium"
          >
            Return Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-20 container mx-auto px-6">
      <header className="mb-12 md:mb-20">
        <span className="text-coffee-beige uppercase tracking-[0.3em] text-[10px] font-mono mb-4 block">Reservations</span>
        <h1 className="font-display text-5xl md:text-9xl mb-8 leading-tight">SECURE YOUR <br /> ATMOSPHERE</h1>
        <p className="max-w-2xl text-coffee-soft/40 text-lg italic">
          Select a zone and time to experience coffee in its most elevated state. 
          Limited spaces available for deep work and high-level meetings.
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-12 items-start">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Step 1: Basics */}
            <section className="glass rounded-[3rem] p-8 md:p-12">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-[10px] text-coffee-beige border border-coffee-beige/20 shrink-0">1</div>
                <h2 className="text-2xl font-medium">Core Details</h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-coffee-soft/40 flex items-center gap-2">
                    <Calendar className="w-3 h-3" /> Date
                  </label>
                  <input 
                    type="date" 
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-coffee-beige transition-colors appearance-none"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-coffee-soft/40 flex items-center gap-2">
                    <Clock className="w-3 h-3" /> Time (60m block)
                  </label>
                  <div className="relative">
                    <select 
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-coffee-beige transition-colors appearance-none"
                    >
                      <option value="" className="bg-coffee-dark">Select Time</option>
                      {TIME_SLOTS.map(t => <option key={t} value={t} className="bg-coffee-dark">{t}</option>)}
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-coffee-soft/40 flex items-center gap-2">
                    <Users className="w-3 h-3" /> Party Size
                  </label>
                  <select 
                    value={formData.guests}
                    onChange={(e) => setFormData({...formData, guests: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-coffee-beige transition-colors appearance-none"
                  >
                    {[1,2,3,4,6,8].map(n => <option key={n} value={n} className="bg-coffee-dark">{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                  </select>
                </div>
              </div>
            </section>

            {/* Step 2: Zone Selection */}
            <section className="glass rounded-[3rem] p-8 md:p-12">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-[10px] text-coffee-beige border border-coffee-beige/20 shrink-0">2</div>
                <h2 className="text-2xl font-medium">Select Zone</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {ZONES.map(zone => (
                  <button
                    key={zone.id}
                    type="button"
                    onClick={() => setFormData({...formData, zone: zone.id})}
                    className={cn(
                      "p-6 rounded-3xl border transition-all text-left group",
                      formData.zone === zone.id 
                        ? "bg-coffee-beige/10 border-coffee-beige ring-1 ring-coffee-beige/50" 
                        : "bg-white/5 border-white/5 hover:bg-white/10"
                    )}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className={cn(
                        "text-[10px] uppercase tracking-widest",
                        formData.zone === zone.id ? "text-coffee-beige" : "text-coffee-soft/40"
                      )}>{zone.id}</span>
                      {formData.zone === zone.id && <div className="w-4 h-4 bg-coffee-beige rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-coffee-dark" /></div>}
                    </div>
                    <h4 className="text-xl font-medium mb-1">{zone.name}</h4>
                    <p className="text-[10px] text-coffee-soft/40 mb-4">{zone.desc}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] uppercase tracking-tighter text-coffee-soft/60">Occupancy:</span>
                      <span className={cn(
                        "text-[8px] uppercase font-bold",
                        zone.occupancy === 'Low' ? "text-[#4ADE80]" : zone.occupancy === 'High' ? "text-orange-400" : "text-coffee-beige"
                      )}>{zone.occupancy}</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Step 3: Identity */}
            <section className="glass rounded-[3rem] p-8 md:p-12">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-[10px] text-coffee-beige border border-coffee-beige/20 shrink-0">3</div>
                <h2 className="text-2xl font-medium">Identity</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-coffee-soft/40">Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-coffee-beige transition-colors"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-coffee-soft/40">Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="name@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-coffee-beige transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-widest text-coffee-soft/40">Special Requirements</label>
                <textarea 
                  rows={3}
                  placeholder="Quiet corner, specific table, dietary notes..."
                  value={formData.requests}
                  onChange={(e) => setFormData({...formData, requests: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-coffee-beige transition-colors resize-none"
                />
              </div>
            </section>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full py-8 bg-coffee-beige text-coffee-dark rounded-full font-display text-xl uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-coffee-dark border-t-transparent rounded-full animate-spin" />
              ) : (
                <>Confirm Reservation <ArrowRight className="w-6 h-6" /></>
              )}
            </button>

            {error && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-center text-xs mt-4 uppercase tracking-widest"
              >
                {error.includes('{') ? "Firestore error. Please check your connection." : error}
              </motion.p>
            )}
          </form>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-6">
           <div className="glass p-8 rounded-[2.5rem] border-white/5">
              <div className="flex items-center gap-3 text-coffee-beige mb-6">
                <Info className="w-5 h-5" />
                <h3 className="font-medium text-xs uppercase tracking-widest">Policy</h3>
              </div>
              <ul className="space-y-4 text-xs text-coffee-soft/60">
                <li className="leading-relaxed">Reservations are held for 15 minutes past the scheduled time.</li>
                <li className="leading-relaxed">All bookings are for a 90-minute duration unless otherwise requested.</li>
                <li className="leading-relaxed">Cancellations must be made 2 hours prior via the digital pass.</li>
              </ul>
           </div>

           <div className="glass p-8 rounded-[2.5rem] border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-coffee-beige/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <h3 className="font-display text-2xl mb-4">MEMBER<br />ACCESS</h3>
                <p className="text-[10px] text-coffee-soft/40 mb-6 leading-relaxed">
                  Aether Black members get unlimited access to all zones and priority booking.
                </p>
                <button className="text-[10px] uppercase font-bold tracking-widest text-coffee-beige border-b border-coffee-beige/20 pb-1">
                  Learn More
                </button>
              </div>
           </div>

           <div className="glass p-2 rounded-[2.5rem] overflow-hidden aspect-square border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600" 
                alt="Workspace" 
                className="w-full h-full object-cover rounded-[2rem] opacity-40"
                referrerPolicy="no-referrer"
              />
           </div>
        </div>
      </div>
    </div>
  );
}
