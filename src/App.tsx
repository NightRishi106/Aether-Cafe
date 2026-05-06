/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MenuPage from "./pages/Menu";
import OrderPage from "./pages/Order";
import ReservationPage from "./pages/Reservation";
import AboutPage from "./pages/About";
import AuthModal from "./components/AuthModal";

// Placeholder components for yet-to-be-created pages
const GalleryPage = () => (
  <div className="pt-32 min-h-screen container mx-auto px-6">
    <h1 className="font-display text-8xl mb-20 text-center">GALLERY</h1>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="aspect-square glass rounded-2xl md:rounded-3xl overflow-hidden hover:scale-105 transition-transform">
          <img src={`https://picsum.photos/seed/${i + 10}/800/800`} alt="Gallery" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
        </div>
      ))}
    </div>
  </div>
);

const ContactPage = () => (
  <div className="pt-24 md:pt-32 min-h-screen container mx-auto px-6 flex items-center justify-center">
    <div className="glass max-w-5xl w-full rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-20 grid md:grid-cols-2 gap-12 md:gap-20">
      <div>
        <span className="text-coffee-beige uppercase tracking-[0.3em] text-[10px] font-mono mb-4 block">Reach Out</span>
        <h1 className="font-display text-5xl md:text-8xl mb-8">CONTACT US</h1>
        <div className="space-y-8 md:space-y-12">
          <div>
            <h4 className="text-[10px] uppercase tracking-widest text-coffee-soft/40 mb-2">Location</h4>
            <p className="text-lg md:text-xl">Aether Tower, 12th Floor, Tokyo, JP</p>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-widest text-coffee-soft/40 mb-2">Email</h4>
            <p className="text-lg md:text-xl">atmosphere@aether.cafe</p>
          </div>
        </div>
      </div>
      <div className="space-y-4 md:space-y-6">
        <input type="text" placeholder="Name" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 md:px-8 py-4 md:py-6 outline-none focus:border-coffee-beige transition-colors text-sm md:text-base" />
        <input type="email" placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 md:px-8 py-4 md:py-6 outline-none focus:border-coffee-beige transition-colors text-sm md:text-base" />
        <textarea placeholder="Message" rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 md:px-8 py-4 md:py-6 outline-none focus:border-coffee-beige transition-colors resize-none text-sm md:text-base"></textarea>
        <button className="w-full py-4 md:py-6 bg-coffee-beige text-coffee-dark rounded-full uppercase tracking-widest font-medium text-[10px] md:text-xs">Send Message</button>
      </div>
    </div>
  </div>
);

const AdminDashboard = () => (
  <div className="pt-24 md:pt-32 min-h-screen container mx-auto px-6">
     <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 md:gap-0">
        <div>
          <h1 className="font-display text-4xl md:text-6xl">ADMIN PULSE</h1>
          <p className="text-coffee-soft/40 text-[10px] uppercase tracking-widest mt-2">Executive Overview v4.0</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
           <button className="glass flex-1 md:flex-none px-6 py-3 rounded-xl text-[10px] uppercase tracking-widest font-medium">Export Data</button>
           <button className="bg-white text-black flex-1 md:flex-none px-6 py-3 rounded-xl text-[10px] uppercase tracking-widest font-medium">Add MenuItem</button>
        </div>
     </div>

     <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          { label: "Revenue", val: "$12,402", color: "#4ADE80" },
          { label: "Orders", val: "348", color: "#D8C3A5" },
          { label: "New Users", val: "82", color: "#D8C3A5" },
          { label: "Avg Focus Time", val: "2.4h", color: "#D8C3A5" }
        ].map(stat => (
          <div key={stat.label} className="glass p-8 rounded-3xl">
             <span className="text-[10px] uppercase tracking-widest text-coffee-soft/40 block mb-4">{stat.label}</span>
             <h3 className="text-4xl font-display">{stat.val}</h3>
             <div className="mt-4 flex items-center gap-2 text-[10px]">
                <span style={{ color: stat.color }}>+12%</span>
                <span className="text-coffee-soft/20">vs last month</span>
             </div>
          </div>
        ))}
     </div>

     <div className="glass rounded-3xl overflow-hidden border-white/5 overflow-x-auto">
        <table className="w-full text-left min-w-[600px]">
           <thead className="bg-white/5 border-b border-white/5">
              <tr>
                 <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-coffee-soft/40">Customer</th>
                 <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-coffee-soft/40">Status</th>
                 <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-coffee-soft/40">Amount</th>
                 <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-coffee-soft/40">Time</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-white/5">
              {[1,2,3,4,5].map(i => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                   <td className="px-8 py-6">User_{i}@example.com</td>
                   <td className="px-8 py-6 text-xs"><span className="px-3 py-1 rounded-full bg-[#4ADE80]/10 text-[#4ADE80]">Completed</span></td>
                   <td className="px-8 py-6 font-mono text-sm">$42.50</td>
                   <td className="px-8 py-6 text-xs text-coffee-soft/40">2 mins ago</td>
                </tr>
              ))}
           </tbody>
        </table>
     </div>
  </div>
);

// Simple sections for now
const Home = () => (
  <main>
    <Hero />
    <BrandStory />
    <SignatureShowcase />
    <StatusSection />
  </main>
);

const BrandStory = () => (
  <section className="py-20 md:py-32 container mx-auto px-6 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <span className="text-coffee-beige uppercase tracking-[0.3em] text-[10px] font-mono mb-4 block">Our Philosophy</span>
      <h2 className="font-display text-4xl md:text-7xl mb-8 leading-tight">THE ART OF <br /> ATMOSPHERIC COFFEE</h2>
      <p className="text-coffee-soft/60 text-base md:text-lg leading-relaxed mb-8">
        At Aether, we believe coffee is more than just a beverage—it's a catalyst for creativity. 
        Our spaces are designed to bridge the gap between high-end hospitality and the ultimate 
        modern workspace.
      </p>
      <div className="grid grid-cols-2 gap-8 py-8 border-t border-white/5">
        <div>
          <h4 className="font-display text-2xl md:text-3xl mb-2">128</h4>
          <p className="text-[10px] uppercase tracking-widest text-coffee-soft/40">Unique Beans</p>
        </div>
        <div>
          <h4 className="font-display text-2xl md:text-3xl">24/7</h4>
          <p className="text-[10px] uppercase tracking-widest text-coffee-soft/40">Creator Access</p>
        </div>
      </div>
    </motion.div>
    <div className="relative mt-12 md:mt-0 px-4 md:px-0">
      <div className="aspect-[4/5] rounded-[2rem] md:rounded-[3rem] overflow-hidden rotate-0 md:rotate-2 hover:rotate-0 transition-transform duration-700 glass p-1 md:p-2">
        <img 
          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200" 
          alt="Creative Workspace"
          className="w-full h-full object-cover rounded-[1.8rem] md:rounded-[2.5rem]"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="absolute -bottom-10 -left-10 w-64 aspect-square rounded-[2rem] overflow-hidden -rotate-6 hidden lg:block glass p-2 cinematic-shadow">
        <img 
          src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=600" 
          alt="Coffee detail"
          className="w-full h-full object-cover rounded-[1.5rem]"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  </section>
);

const SignatureShowcase = () => (
  <section className="py-20 md:py-32 bg-white/[0.02]">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6 md:gap-0">
        <div>
          <span className="text-coffee-beige uppercase tracking-[0.3em] text-[10px] font-mono mb-4 block">Collection</span>
          <h2 className="font-display text-4xl md:text-7xl uppercase tracking-tight">SIGNATURE BREWS</h2>
        </div>
        <button className="text-[10px] uppercase tracking-[0.3em] text-coffee-beige hover:text-coffee-soft transition-colors border-b border-coffee-beige/20 pb-2">
          View Full Menu
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {[
          { name: "Nebula Latte", price: "$7.00", desc: "Charcoal infused bean with edible silver flakes", image: "https://i.pinimg.com/736x/21/74/32/2174329b8ef1603c1cbc68bd9ef5865a.jpg" },
          { name: "Aether Black", price: "$6.50", desc: "Single origin Ethiopian Yirgacheffe, triple filtered", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800" },
          { name: "Stardust Matcha", price: "$7.50", desc: "Ceremonial grade matcha with oat cloud foam", image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&q=80&w=800" }
        ].map((item, idx) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group glass p-8 rounded-[2.5rem] hover:bg-white/[0.08] transition-all cursor-pointer"
          >
            <div className="w-full aspect-square mb-8 rounded-3xl overflow-hidden glass translate-z-10 group-hover:scale-105 transition-transform duration-500">
               <div className="w-full h-full bg-gradient-to-br from-coffee-dark to-matte-black">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
               </div>
            </div>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-medium">{item.name}</h3>
              <span className="font-display text-2xl text-coffee-beige">{item.price}</span>
            </div>
            <p className="text-coffee-soft/40 text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const StatusSection = () => {
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    fetch("/api/cafe/status")
      .then(res => res.json())
      .then(data => setStatus(data))
      .catch(console.error);
  }, []);

  return (
    <section className="py-20 md:py-32 container mx-auto px-6">
      <div className="glass rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-coffee-beige/10 blur-[80px] md:blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 md:gap-20">
          <div>
             <span className="text-coffee-beige uppercase tracking-[0.3em] text-[10px] font-mono mb-4 block">Connectivity</span>
             <h2 className="font-display text-4xl md:text-7xl mb-8 leading-tight">LOCAL <br /> PULSE</h2>
             <p className="text-coffee-soft/60 text-base md:text-lg mb-8 md:text-12">
               Check availability and atmosphere in real-time. Join our dynamic environment optimized for both focus and collaboration.
             </p>
             {status?.activeEvent && (
               <div className="glass px-6 py-4 rounded-2xl border-coffee-beige/20 inline-block mb-8 lg:mb-0">
                  <span className="text-[10px] uppercase tracking-widest text-coffee-beige mb-1 block">Active Event</span>
                  <p className="font-medium text-sm md:text-base">{status.activeEvent}</p>
               </div>
             )}
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-6">
             <div className="glass h-full p-6 md:p-8 rounded-2xl md:rounded-3xl flex flex-col justify-between">
                <span className="text-[8px] md:text-[10px] uppercase tracking-widest text-coffee-soft/40">Occupancy</span>
                <div>
                  <h3 className="font-display text-3xl md:text-5xl">{status?.occupancy ?? "--"}%</h3>
                  <p className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-[#4ADE80] mt-2">Optimal</p>
                </div>
             </div>
             <div className="glass h-full p-6 md:p-8 rounded-2xl md:rounded-3xl flex flex-col justify-between">
                <span className="text-[8px] md:text-[10px] uppercase tracking-widest text-coffee-soft/40">Wait Time</span>
                <div>
                  <h3 className="font-display text-3xl md:text-5xl">{status?.liveWaitTime ?? "--"}m</h3>
                  <p className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-coffee-soft/40 mt-2">To Fresh Cup</p>
                </div>
             </div>
             <div className="glass h-full p-6 md:p-8 rounded-2xl md:rounded-3xl flex flex-col justify-between">
                <span className="text-[8px] md:text-[10px] uppercase tracking-widest text-coffee-soft/40">Noise</span>
                <div>
                  <h3 className="font-display text-3xl md:text-5xl">42db</h3>
                  <p className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-coffee-soft/40 mt-2">Library Calm</p>
                </div>
             </div>
             <div className="glass h-full p-6 md:p-8 rounded-2xl md:rounded-3xl flex flex-col justify-between">
                <span className="text-[8px] md:text-[10px] uppercase tracking-widest text-coffee-soft/40">Members</span>
                <div>
                  <h3 className="font-display text-3xl md:text-5xl">12</h3>
                  <p className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-coffee-soft/40 mt-2">In Workspace</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default function App() {
  return (
    <Router>
      <div className="min-h-screen relative overflow-x-hidden">
        <Navbar />
        <ScrollToTop />
        <AuthModal />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/reserve" element={<ReservationPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const Footer = () => (
   <footer className="py-20 border-t border-white/5 bg-matte-black">
      <div className="container mx-auto px-6 grid md:grid-cols-5 gap-12">
         <div className="md:col-span-2">
            <h2 className="font-display text-4xl tracking-widest mb-6">AETHER</h2>
            <p className="text-coffee-soft/40 max-w-sm text-sm leading-relaxed">
               A premium creative hospitality experience combining third-wave coffee with future-forward workspaces. Designed for the thinkers and the builders.
            </p>
         </div>
         <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-coffee-beige mb-6">Navigation</h4>
            <ul className="space-y-3 text-sm text-coffee-soft/60">
               <li><Link to="/" className="hover:text-coffee-soft transition-colors">Home</Link></li>
               <li><Link to="/menu" className="hover:text-coffee-soft transition-colors">Menu</Link></li>
               <li><Link to="/order" className="hover:text-coffee-soft transition-colors text-coffee-beige">Order Now</Link></li>
               <li><Link to="/reserve" className="hover:text-coffee-soft transition-colors">Reserve Table</Link></li>
               <li><Link to="/about" className="hover:text-coffee-soft transition-colors">About</Link></li>
               <li><Link to="/gallery" className="hover:text-coffee-soft transition-colors">Gallery</Link></li>
            </ul>
         </div>
         <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-coffee-beige mb-6">Collective</h4>
            <ul className="space-y-3 text-sm text-coffee-soft/60">
               <li><Link to="/blog" className="hover:text-coffee-soft transition-colors">Blog</Link></li>
               <li><Link to="/careers" className="hover:text-coffee-soft transition-colors">Careers</Link></li>
               <li><Link to="/contact" className="hover:text-coffee-soft transition-colors">Contact</Link></li>
               <li><Link to="/admin" className="hover:text-coffee-soft transition-colors">Admin Dashboard</Link></li>
            </ul>
         </div>
         <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-coffee-beige mb-6">Social</h4>
            <ul className="space-y-3 text-sm text-coffee-soft/60">
               <li><a href="#" className="hover:text-coffee-soft transition-colors">Instagram</a></li>
               <li><a href="#" className="hover:text-coffee-soft transition-colors">Twitter</a></li>
               <li><a href="#" className="hover:text-coffee-soft transition-colors">LinkedIn</a></li>
            </ul>
         </div>
      </div>
      <div className="container mx-auto px-6 pt-20 flex flex-col md:flex-row justify-between text-[10px] uppercase tracking-[0.3em] text-coffee-soft/20">
         <span>© 2026 AETHER CAFE. ALL RIGHTS RESERVED.</span>
         <div className="flex gap-8 mt-4 md:mt-0">
            <span>Privacy</span>
            <span>Terms</span>
         </div>
      </div>
   </footer>
);

