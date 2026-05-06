import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, onAuthStateChanged, syncUserProfile } from "../lib/firebase";
import { User } from "firebase/auth";

interface AppContextType {
  isProductivityMode: boolean;
  toggleProductivityMode: () => void;
  timeTheme: "morning" | "night";
  user: User | null;
  loading: boolean;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isProductivityMode, setIsProductivityMode] = useState(false);
  const [timeTheme, setTimeTheme] = useState<"morning" | "night">("morning");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const toggleProductivityMode = () => setIsProductivityMode(!isProductivityMode);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
      if (firebaseUser) {
        await syncUserProfile(firebaseUser);
        setShowAuthModal(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const updateTheme = () => {
      const hour = new Date().getHours();
      setTimeTheme(hour >= 6 && hour < 18 ? "morning" : "night");
    };

    updateTheme();
    const interval = setInterval(updateTheme, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AppContext.Provider 
      value={{ 
        isProductivityMode, 
        toggleProductivityMode, 
        timeTheme, 
        user, 
        loading, 
        showAuthModal, 
        setShowAuthModal 
      }}
    >
      <div className={isProductivityMode ? "productivity-filter" : ""}>
        {children}
      </div>
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
