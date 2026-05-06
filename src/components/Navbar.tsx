import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Coffee, User, Moon, Sun, Monitor, Globe, LogOut } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useApp } from "@/src/context/AppContext";
import { auth, signOut } from "@/src/lib/firebase";

interface NavItem {
  name: string;
  path: string;
}

const navItems: NavItem[] = [
  { name: "Home", path: "/" },
  { name: "Menu", path: "/menu" },
  { name: "Order", path: "/order" },
  { name: "Reserve", path: "/reserve" },
  { name: "About", path: "/about" },
];

export default function Navbar() {
  const { isProductivityMode, toggleProductivityMode, user, setShowAuthModal } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleProfileClick = () => {
    if (!user) {
      setShowAuthModal(true);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-[60] transition-all duration-500 flex justify-center p-4",
        isScrolled ? "pt-2" : "pt-6"
      )}
    >
      <div
        className={cn(
          "w-full max-w-7xl flex items-center justify-between px-6 transition-all duration-500 rounded-full",
          isScrolled 
            ? "py-3 glass-dark shadow-2xl backdrop-blur-2xl px-10" 
            : "py-5 bg-transparent"
        )}
      >
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-coffee-beige flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            <Coffee className="text-coffee-dark w-6 h-6" />
          </div>
          <span className="font-display text-2xl tracking-widest text-coffee-soft">AETHER</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "text-xs uppercase tracking-[0.2em] font-medium transition-colors hover:text-coffee-beige relative group",
                location.pathname === item.path ? "text-coffee-beige" : "text-coffee-soft/70"
              )}
            >
              {item.name}
              <motion.span
                className="absolute -bottom-1 left-0 w-0 h-[1px] bg-coffee-beige group-hover:w-full transition-all duration-300"
                initial={false}
                animate={{ width: location.pathname === item.path ? "100%" : "0%" }}
              />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleProductivityMode}
            className={cn(
              "hidden sm:flex items-center gap-2 px-5 py-2 rounded-full transition-all text-[10px] uppercase tracking-widest",
              isProductivityMode ? "bg-coffee-beige text-coffee-dark" : "glass hover:bg-white/10"
            )}
          >
            <Monitor className="w-3 h-3" />
            <span>{isProductivityMode ? "Exit Focus" : "Productivity"}</span>
          </button>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={handleProfileClick}
              className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all overflow-hidden"
            >
              {user ? (
                <img src={user.photoURL || ""} alt={user.displayName || ""} className="w-full h-full object-cover" />
              ) : (
                <User className="w-5 h-5" />
              )}
            </button>
            {user && (
              <button 
                onClick={handleLogout}
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all text-coffee-soft/40 hover:text-red-400"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>

          <button 
            className="md:hidden w-10 h-10 rounded-full glass flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center glass-dark backdrop-blur-3xl"
          >
            <div className="flex flex-col items-center gap-8">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className="text-3xl font-display tracking-widest hover:text-coffee-beige transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
