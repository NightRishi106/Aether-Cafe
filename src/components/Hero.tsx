import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Coffee, ArrowRight, TrendingUp, Users, Play } from "lucide-react";
import { cn } from "@/src/lib/utils";
import gsap from "gsap";

export default function Hero() {
  const h1Ref = useRef(null);

  useEffect(() => {
    if (h1Ref.current) {
      gsap.fromTo(h1Ref.current, 
        { opacity: 0, y: 100, skewY: 10 },
        { opacity: 1, y: 0, skewY: 0, duration: 1.5, ease: "power4.out", delay: 0.5 }
      );
    }
  }, []);
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center py-20">
      {/* Background Image / Placeholder Video */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1511218114045-8fe75eb43236?auto=format&fit=crop&q=80&w=2560"
          alt="Cinematic Cafe"
          className="w-full h-full object-cover brightness-[0.4] scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-matte-black/50 to-matte-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-matte-black/60 via-transparent to-matte-black/60" />
      </div>

      {/* Floating Animated Particles (Simplified) */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-coffee-beige rounded-full"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: Math.random()
            }}
            animate={{ 
              y: [null, "-=100", "+=0"],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 5 + Math.random() * 5, 
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <div className="mb-6 flex items-center gap-3 glass px-4 py-2 rounded-full">
            <span className="w-2 h-2 rounded-full bg-coffee-beige animate-pulse" />
            <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-coffee-beige">Atmospheric Creative Space</span>
          </div>
          
          <h1 ref={h1Ref} className="font-display text-4xl md:text-9xl mb-8 leading-[0.9] tracking-tighter uppercase">
            A SPACE FOR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-coffee-soft via-coffee-beige to-coffee-soft">
              THINKERS & CREATORS
            </span>
          </h1>
          
          <p className="max-w-xl text-coffee-soft/60 text-base md:text-xl font-light leading-relaxed mb-12">
            Crafted for deep work, meaningful conversations, and 
            unforgettable coffee experiences in a futuristic luxury atmosphere.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-16 w-full sm:w-auto">
            <button 
              onClick={() => window.location.href = '/order'}
              className="group relative px-10 py-5 bg-coffee-beige text-coffee-dark rounded-full font-medium tracking-widest uppercase text-[10px] md:text-xs overflow-hidden transition-all hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Order Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button 
              onClick={() => window.location.href = '/reserve'}
              className="group px-10 py-5 glass rounded-full font-medium tracking-widest uppercase text-[10px] md:text-xs flex items-center justify-center gap-2 hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
            >
              Reserve Table
            </button>
          </div>

          {/* Floating UI Cards - Now positioned below buttons */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 w-full max-w-6xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="glass p-6 rounded-3xl w-full sm:w-72 backdrop-blur-3xl border-white/5 cinematic-shadow text-left"
            >
              <div className="flex justify-between mb-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-coffee-beige">Today's Special</span>
                <Coffee className="w-4 h-4 text-coffee-beige" />
              </div>
              <h3 className="font-medium text-lg">Aether Cloud Cold Brew</h3>
              <p className="text-xs text-coffee-soft/40 mb-4">Nitrogen infused with lavender foam</p>
              <div className="flex items-center gap-2">
                <span className="font-display text-2xl md:text-2xl">$8.50</span>
                <span className="text-[10px] bg-coffee-beige/10 text-coffee-beige px-2 py-1 rounded">Top Choice</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="glass p-6 rounded-3xl w-full sm:w-72 backdrop-blur-3xl border-white/5 cinematic-shadow text-left"
            >
              <div className="flex justify-between mb-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#4ADE80]">Live Status</span>
                <Users className="w-4 h-4 text-[#4ADE80]" />
              </div>
              <div className="flex items-end gap-2 mb-2">
                <span className="font-display text-4xl">65%</span>
                <span className="text-[10px] text-coffee-soft/40 mb-1">Occupancy</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: "65%" }}
                   transition={{ duration: 1.5, delay: 2 }}
                   className="bg-[#4ADE80] h-full" 
                />
              </div>
              <p className="text-[10px] text-coffee-soft/40 mt-4 uppercase tracking-widest">Recommended: Level 2 North</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="glass p-6 rounded-3xl w-full sm:w-72 backdrop-blur-3xl border-white/5 cinematic-shadow text-left"
            >
              <div className="flex justify-between mb-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-coffee-beige">Environment</span>
                <TrendingUp className="w-4 h-4 text-coffee-beige" />
              </div>
              <h3 className="font-medium text-lg">Focus Score: 92/100</h3>
              <p className="text-xs text-coffee-soft/40 mb-4">Optimized lighting & acoustics</p>
              <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-[10px] uppercase tracking-widest font-medium">
                Enter Focus Mode
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
      >
        <span className="text-[8px] uppercase tracking-[0.5em]">Explore</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-coffee-beige to-transparent" />
      </motion.div>
    </section>
  );
}
