import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { LogIn, Key, ShieldAlert, Loader2, Sparkles, CheckCircle2 } from "lucide-react";

interface LoginScreenProps {
  onGoogleLogin: () => Promise<any>;
  onGuestLogin: () => void;
}

export function LoginScreen({ onGoogleLogin, onGuestLogin }: LoginScreenProps) {
  const [lastEmail, setLastEmail] = useState<string | null>(null);
  const [loadingType, setLoadingType] = useState<"google" | "guest" | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve the previously used Google account email if stored
    const savedEmail = localStorage.getItem("ts_last_google_email");
    if (savedEmail) {
      setLastEmail(savedEmail);
    }
  }, []);

  const handleGoogleLoginClick = async () => {
    setLoadingType("google");
    setError(null);
    try {
      await onGoogleLogin();
    } catch (err: any) {
      console.error("Google Auth failed:", err);
      setError(err?.message || "Google Authentication failed. Please try again.");
      setLoadingType(null);
    }
  };

  const handleGuestLoginClick = () => {
    setLoadingType("guest");
    setError(null);
    // Simulate minor visual loading for professional enterprise feedback
    setTimeout(() => {
      onGuestLogin();
      setLoadingType(null);
    }, 800);
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 animate-login-gradient p-4 sm:p-6 md:p-8 select-none">
      
      {/* 1. Slowly moving / morphing background colorful glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{
            scale: [1, 1.3, 0.9, 1.1, 1],
            x: [0, 80, -40, 50, 0],
            y: [0, -40, 60, -20, 0],
            opacity: [0.15, 0.3, 0.2, 0.25, 0.15],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-amber-500/25 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1.2, 0.9, 1.3, 1, 1.2],
            x: [0, -60, 50, -30, 0],
            y: [0, 60, -40, 50, 0],
            opacity: [0.2, 0.1, 0.3, 0.15, 0.2],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] bg-indigo-500/20 blur-[150px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [0.8, 1.2, 1, 0.9, 0.8],
            x: [0, 30, -50, 20, 0],
            y: [0, 50, -30, -60, 0],
            opacity: [0.1, 0.2, 0.15, 0.25, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[30%] left-[25%] w-[45%] h-[45%] bg-teal-500/15 blur-[110px] rounded-full"
        />
      </div>

      {/* 2. Top Bar - Show logo of app with name professionally */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-950/40 border-b border-white/5 backdrop-blur-xl px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <div className="relative overflow-hidden h-9 w-9 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center p-1 border border-white/10 shadow-lg">
              <img src="/logo(TSPb).png" alt="TS" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tighter text-white leading-none">
                TS <span className="text-[10px] font-bold opacity-60 ml-1 tracking-[0.2em] uppercase">Price Manager</span>
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-[9px] uppercase tracking-[0.15em] text-emerald-400 font-black">
              SECURE GATEWAY
            </p>
          </div>
        </div>
      </header>

      {/* 3. Central Login Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md bg-slate-900/40 border border-white/10 backdrop-blur-md rounded-[3rem] p-8 sm:p-10 shadow-2xl relative z-10 overflow-hidden"
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-500 via-indigo-500 to-teal-500" />
        
        {/* Card Header (Logo & Heading) */}
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 to-indigo-600 blur-2xl opacity-40 group-hover:opacity-60 transition-opacity rounded-3xl" />
            <div className="relative h-20 w-20 rounded-[2rem] bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-white/10 flex items-center justify-center p-2.5 shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
              <img src="/logo(TSPb).png" alt="TS Price Logo" className="w-full h-full object-contain" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-center gap-1.5 text-amber-400">
              <Sparkles size={14} className="animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-[0.25em]">ENTRANCE SYSTEM</span>
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tight text-white">
              Database Entrance
            </h2>
            <p className="text-xs text-slate-400/80 max-w-sm font-medium leading-relaxed">
              Select your authorization vector to access system pricing sheets, cloud inventory controls, and metrics.
            </p>
          </div>
        </div>

        {/* Error Alert if Authentication Fails */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-3 text-left"
          >
            <ShieldAlert size={16} className="text-red-400 shrink-0 mt-0.5" />
            <p className="text-xs text-red-300 font-semibold leading-relaxed">
              {error}
            </p>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 space-y-4">
          
          {/* Google Login Button */}
          <button
            onClick={handleGoogleLoginClick}
            disabled={loadingType !== null}
            className="w-full group relative flex flex-col items-center justify-center gap-1 px-6 py-4 bg-gradient-to-b from-white to-slate-100 hover:from-white hover:to-white text-slate-900 rounded-2xl font-black uppercase tracking-wider text-xs transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
          >
            <div className="flex items-center justify-center gap-3">
              {loadingType === "google" ? (
                <Loader2 size={16} className="animate-spin text-slate-600" />
              ) : (
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.61c-.29 1.5-1.14 2.78-2.4 3.63v3.02h3.88c2.27-2.09 3.65-5.17 3.65-8.8h.005z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.02c-1.08.72-2.45 1.16-4.05 1.16-3.11 0-5.74-2.11-6.68-4.96H1.21v3.11C3.18 21.88 7.39 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.32 14.27c-.24-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.62H1.21C.4 8.24 0 10.07 0 12s.4 3.76 1.21 5.38l4.11-3.11z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0 7.39 0 3.18 2.12 1.21 5.38l4.11 3.11c.94-2.85 3.57-4.96 6.68-4.96z"
                  />
                </svg>
              )}
              
              <span>
                {lastEmail ? "Continue as Google User" : "Sign In with Google"}
              </span>
            </div>

            {/* Automatically display the email ID of Google that was used previously */}
            {lastEmail && (
              <span className="text-[10px] font-bold text-indigo-600 lowercase tracking-normal">
                {lastEmail}
              </span>
            )}
          </button>

          {/* Divider */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-white/5"></div>
            <span className="flex-shrink mx-4 text-[9px] font-black uppercase text-slate-500 tracking-[0.2em]">OR</span>
            <div className="flex-grow border-t border-white/5"></div>
          </div>

          {/* Guest Login Button */}
          <button
            onClick={handleGuestLoginClick}
            disabled={loadingType !== null}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-slate-800/60 hover:bg-slate-700/80 border border-white/10 text-white rounded-2xl font-black uppercase tracking-wider text-xs transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99] group"
          >
            {loadingType === "guest" ? (
              <Loader2 size={16} className="animate-spin text-white/60" />
            ) : (
              <Key size={16} className="text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
            )}
            <span>Enter as Guest</span>
          </button>
        </div>

        {/* Feature Highlights/Invariants info */}
        <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-2 gap-4 text-left">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-indigo-400">
              <CheckCircle2 size={12} />
              <span className="text-[9px] font-bold uppercase tracking-wider">Cloud Sync</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-normal font-medium">
              Real-time synchronization across devices when authenticated via Google.
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-amber-400">
              <CheckCircle2 size={12} />
              <span className="text-[9px] font-bold uppercase tracking-wider">Local Hub</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-normal font-medium">
              Guest access works instantly offline with browser-cached data backup.
            </p>
          </div>
        </div>

      </motion.div>

      {/* Footer System Branding */}
      <footer className="absolute bottom-6 left-0 right-0 z-10 text-center pointer-events-none">
        <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-white/20">
          TS Price Manager • Powered by Firebase Enterprise
        </p>
      </footer>

    </div>
  );
}
