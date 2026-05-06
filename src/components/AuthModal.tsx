import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, LogIn, UserPlus, Mail, Lock, LogIn as GoogleIcon, Loader2 } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useApp } from "../context/AppContext";
import { signInWithPopup, auth, googleProvider } from "../lib/firebase";

export default function AuthModal() {
  const { showAuthModal, setShowAuthModal } = useApp();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {showAuthModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 sm:p-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAuthModal(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl glass rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl border-white/10"
          >
            {/* Visual Side */}
            <div className="hidden md:flex md:w-1/3 bg-coffee-dark/40 p-8 flex-col justify-end relative">
               <div className="absolute inset-0 opacity-20">
                  <img 
                    src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    alt="Cafe Interior"
                  />
               </div>
               <div className="relative z-10">
                  <h2 className="font-display text-3xl leading-tight mb-2">JOIN THE <br /> COLLECTIVE</h2>
                  <p className="text-[10px] uppercase tracking-widest text-coffee-soft/40">Exclusive access to workspaces & rewards</p>
               </div>
            </div>

            {/* Form Side */}
            <div className="flex-1 p-8 sm:p-12 bg-matte-black/40">
              <div className="flex justify-between items-center mb-10">
                <div className="flex gap-4">
                   <button 
                    onClick={() => setMode("login")}
                    className={cn(
                      "text-[10px] uppercase tracking-widest transition-all pb-1 border-b",
                      mode === "login" ? "text-coffee-soft border-coffee-beige" : "text-coffee-soft/30 border-transparent hover:text-coffee-soft"
                    )}
                   >
                     Login
                   </button>
                   <button 
                    onClick={() => setMode("signup")}
                    className={cn(
                      "text-[10px] uppercase tracking-widest transition-all pb-1 border-b",
                      mode === "signup" ? "text-coffee-soft border-coffee-beige" : "text-coffee-soft/30 border-transparent hover:text-coffee-soft"
                    )}
                   >
                     Sign Up
                   </button>
                </div>
                <button 
                  onClick={() => setShowAuthModal(false)}
                  className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-medium mb-6">
                  {mode === "login" ? "Welcome Back" : "Create Account"}
                </h3>

                <div className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-coffee-soft/40" />
                    <input 
                      type="email" 
                      placeholder="Email Address"
                      className="w-full bg-white/5 border border-white/5 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-coffee-beige transition-colors text-sm"
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-coffee-soft/40" />
                    <input 
                      type="password" 
                      placeholder="Password"
                      className="w-full bg-white/5 border border-white/5 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-coffee-beige transition-colors text-sm"
                    />
                  </div>
                </div>

                <button className="w-full py-4 bg-coffee-beige text-coffee-dark rounded-2xl uppercase tracking-widest font-medium text-[10px] hover:scale-[1.02] active:scale-[0.98] transition-all">
                  {mode === "login" ? "Sign In" : "Get Started"}
                </button>

                <div className="relative py-4 flex items-center gap-4">
                   <div className="flex-1 h-[1px] bg-white/5" />
                   <span className="text-[8px] uppercase tracking-widest text-coffee-soft/20">or continue with</span>
                   <div className="flex-1 h-[1px] bg-white/5" />
                </div>

                <button 
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full py-4 glass rounded-2xl flex items-center justify-center gap-3 hover:bg-white/10 transition-all group"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <GoogleIcon className="w-4 h-4 text-coffee-beige group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] uppercase tracking-widest font-medium">Google Account</span>
                    </>
                  )}
                </button>
              </div>

              <p className="mt-8 text-[8px] text-center text-coffee-soft/20 uppercase tracking-[0.2em] leading-relaxed">
                By entering Aether, you agree to our <br />
                <span className="text-coffee-soft/40 underline">House Rules</span> & <span className="text-coffee-soft/40 underline">Privacy Protocols</span>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
