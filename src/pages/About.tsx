import { motion } from "motion/react";
import { Coffee, Target, Users, MapPin, ArrowUpRight } from "lucide-react";
import { cn } from "@/src/lib/utils";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32">
      {/* Cinematic Intro */}
      <section className="container mx-auto px-6 mb-32">
        <div className="max-w-4xl">
           <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-coffee-beige uppercase tracking-[0.3em] text-[10px] font-mono mb-6 block"
           >
            Our Origin
           </motion.span>
           <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-9xl mb-8 md:mb-12 leading-none"
           >
            WE BUILD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-coffee-soft via-coffee-beige to-coffee-soft">ATMOSPHERES</span>
           </motion.h1>
           <motion.p 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-coffee-soft/60 text-lg md:text-2xl font-light leading-relaxed mb-12"
           >
            Aether was founded on a simple principle: the environment determines the output. 
            We've combined the hospitality of a boutique luxury hotel with the technical rigor 
            of a modern creative laboratory.
           </motion.p>
        </div>
      </section>

      {/* Immersive Grid */}
      <section className="grid lg:grid-cols-2">
         <div className="h-[400px] md:h-[600px] lg:h-screen relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1200"
              alt="Manual Brewing"
              className="w-full h-full object-cover grayscale focus:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-matte-black/40" />
            <div className="absolute bottom-10 left-10 md:bottom-20 md:left-20">
               <h3 className="font-display text-4xl md:text-6xl mb-2 md:mb-4">PURITY</h3>
               <p className="text-[8px] md:text-[10px] uppercase tracking-[0.5em] text-coffee-beige">Third Wave Excellence</p>
            </div>
         </div>
         <div className="flex flex-col justify-center p-8 md:p-32 space-y-8 md:space-y-12 bg-white/[0.01]">
            {[
              { icon: Coffee, title: "Curated Sourcing", desc: "We partner with single-estate farms that prioritize volcanic richness and ethical harvesting." },
              { icon: Target, title: "Precision Brewing", desc: "Every cup is measured down to the milligram of mineral content in our custom-filtered water." },
              { icon: MapPin, title: "Global Context", desc: "From Tokyo minimalism to Berlin industrialism, Aether is a fusion of global creative cultures." }
            ].map((item, idx) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="flex gap-6 md:gap-8 group"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl glass flex items-center justify-center shrink-0 group-hover:bg-coffee-beige group-hover:text-coffee-dark transition-all duration-500">
                  <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h4 className="text-xl md:text-2xl font-medium mb-2 md:mb-3">{item.title}</h4>
                  <p className="text-coffee-soft/40 text-xs md:text-sm leading-relaxed max-w-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
         </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 md:py-32 container mx-auto px-6 text-center">
         <div className="max-w-2xl mx-auto">
            <span className="text-coffee-beige uppercase tracking-[0.3em] text-[10px] font-mono mb-6 md:mb-8 block">The Manifesto</span>
            <blockquote className="text-3xl md:text-5xl font-display leading-tight mb-8 md:mb-12">
              "WE DON'T JUST SERVE COFFEE; WE SERVE THE SILENCE NECESSARY FOR BRILLIANCE."
            </blockquote>
            <div className="w-12 h-[1px] bg-coffee-beige mx-auto mb-8" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-coffee-soft/40">Founded in 2024</p>
         </div>
      </section>

      {/* Team CTA */}
      <section className="py-20 md:py-32 bg-coffee-beige mt-20 md:mt-32">
         <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="text-center md:text-left">
               <h2 className="font-display text-4xl md:text-6xl text-coffee-dark leading-none mb-4">JOIN THE <br className="hidden md:block" /> ATMOSPHERE</h2>
               <p className="text-coffee-dark/60 text-base md:text-lg">We're always looking for stewards of hospitality and coffee experts.</p>
            </div>
            <button className="group px-10 md:px-12 py-5 md:py-6 bg-coffee-dark text-coffee-soft rounded-full font-medium tracking-widest uppercase text-[10px] md:text-xs flex items-center justify-center gap-3 hover:scale-105 transition-all w-full sm:w-auto">
               View Open Roles <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
         </div>
      </section>
    </div>
  );
}
