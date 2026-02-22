/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  Shield, 
  Settings, 
  LayoutGrid, 
  Layers, 
  Circle, 
  Triangle,
  CheckCircle2,
  History,
  Wallet,
  Zap,
  ArrowRight,
  Globe,
  Cpu,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.VITE_GEMINI_API_KEY });

const ICON_SIZE = 24;

export default function App() {
  const [view, setView] = useState<'landing' | 'wallet'>('landing');
  const [time, setTime] = useState(new Date());
  const [balance, setBalance] = useState(12450.85);
  const [insights, setInsights] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const generateFinancialInsights = async () => {
    setIsGenerating(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Give a very brief, 1-sentence cryptic financial advice or market insight in a technical, minimalist tone suitable for a high-end crypto wallet. Use monospace style language.",
      });
      setInsights(response.text || "MARKET_STABLE // NO_ACTION_REQUIRED");
    } catch (error) {
      console.error(error);
      setInsights("CONNECTION_ERROR // RETRY_LATER");
    } finally {
      setIsGenerating(false);
    }
  };

  const formatTime = (date: Date) => {
    const h = date.getHours().toString().padStart(2, '0');
    const m = date.getMinutes().toString().padStart(2, '0');
    return `${h} // ${m}`;
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: '2-digit', month: 'short' };
    return date.toLocaleDateString('en-US', options).toUpperCase();
  };

  if (view === 'landing') {
    return (
      <div className="min-h-screen bg-[#1A1A1A] text-white font-mono overflow-hidden">
        {/* Navigation */}
        <nav className="p-8 flex justify-between items-center border-b border-white/5">
          <div className="text-xl tracking-[0.3em] font-bold">ALTYNZ</div>
          <div className="hidden md:flex gap-12 text-[10px] tracking-widest opacity-40 uppercase">
            <a href="#" className="hover:opacity-100 transition-opacity">Protocol</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Security</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Governance</a>
          </div>
          <button 
            onClick={() => setView('wallet')}
            className="px-6 py-2 border border-white/20 rounded-full text-[10px] tracking-widest uppercase hover:bg-white hover:text-[#1A1A1A] transition-all duration-300"
          >
            Launch App
          </button>
        </nav>

        <main className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-100px)]">
          {/* Left Content */}
          <div className="p-8 md:p-24 flex flex-col justify-center space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter mb-8">
                PROFIT OUR <br />
                <span className="opacity-50">PASSION</span>
              </h1>
              <p className="max-w-md text-sm opacity-40 leading-relaxed tracking-wide">
                Chronos is a minimalist, time-centric financial protocol designed for the next era of decentralized assets. Precision meets performance.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex gap-4"
            >
              <button 
                onClick={() => setView('wallet')}
                className="group flex items-center gap-4 bg-white text-[#1A1A1A] px-8 py-4 rounded-full font-bold text-xs tracking-widest uppercase hover:bg-opacity-90 transition-colors"
              >
                Enter Terminal <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/5">
              <Feature icon={<Lock size={16} />} title="Vault" desc="Zero-knowledge security" />
              <Feature icon={<Globe size={16} />} title="Global" desc="Borderless settlement" />
              <Feature icon={<Cpu size={16} />} title="Core" desc="High-frequency engine" />
            </div>
          </div>

          {/* Right Visual */}
          <div className="hidden lg:flex items-center justify-center bg-[#141414] relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
            </div>
            
            {/* Animated Dial Preview */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
              className="relative w-[500px] h-[500px] border border-white/5 rounded-full flex items-center justify-center"
            >
              <div className="absolute w-[400px] h-[400px] border border-white/10 rounded-full" />
              <div className="absolute w-[300px] h-[300px] border border-white/20 rounded-full" />
              <div className="text-[10px] tracking-[1em] opacity-20 uppercase">Chronos Protocol</div>
            </motion.div>
            
            {/* Floating Stats */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 right-1/4 glass-panel p-6 border-white/10"
            >
              <div className="text-[8px] opacity-40 mb-1 uppercase tracking-widest">Network Load</div>
              <div className="text-xl font-bold">0.042 MS</div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-1/4 left-1/4 glass-panel p-6 border-white/10"
            >
              <div className="text-[8px] opacity-40 mb-1 uppercase tracking-widest">Active Nodes</div>
              <div className="text-xl font-bold">12,842</div>
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-8 text-[8px] opacity-20 tracking-[0.5em] uppercase flex justify-between items-center">
          <div>© 2015- 2026 We are AltynGroup</div>
          <div className="flex gap-8">
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">Docs</a>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#1A1A1A] selection:bg-white/20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md flex flex-col items-center space-y-12"
      >
        
        {/* Top Section: The Dial */}
        <div className="relative flex items-center justify-center w-64 h-64">
          <div className="absolute inset-0 border border-white/10 rounded-full" />
          <div className="absolute inset-4 border-2 border-dashed border-white/5 rounded-full" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 flex flex-col items-center justify-center"
          >
            <div className="text-3xl font-mono tracking-widest mb-2">
              {formatTime(time)}
            </div>
            <div className="w-48 h-[1px] bg-white/20" />
            <div className="mt-4 text-xs tracking-[0.3em] opacity-50">
              TIME : MATTERS
            </div>
          </motion.div>

          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
              strokeDasharray="1 4"
              className="opacity-20"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="white"
              strokeWidth="1"
              strokeDasharray="60 300"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="opacity-40"
            />
          </svg>
        </div>

        {/* Balance Display */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-sm opacity-40 mb-1 tracking-widest uppercase">Available Assets</div>
          <div className="text-4xl font-mono tracking-tighter">
            ${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        </motion.div>

        {/* Icon Grid (3x3) */}
        <div className="grid grid-cols-3 gap-8 w-full max-w-[280px]">
          <GridIcon icon={<Triangle size={ICON_SIZE} />} label="Send" onClick={() => {}} />
          <GridIcon icon={<Clock size={ICON_SIZE} />} label="History" onClick={() => {}} />
          <GridIcon icon={<CheckCircle2 size={ICON_SIZE} />} label="Verify" onClick={() => {}} />
          
          <GridIcon icon={<Zap size={ICON_SIZE} />} label="Swap" onClick={generateFinancialInsights} active={isGenerating} />
          <GridIcon icon={<Layers size={ICON_SIZE} />} label="Assets" onClick={() => {}} />
          <GridIcon icon={<ArrowUpRight size={ICON_SIZE} />} label="Staking" onClick={() => {}} />
          
          <GridIcon icon={<LayoutGrid size={ICON_SIZE} />} label="Apps" onClick={() => {}} />
          <GridIcon icon={<Circle size={ICON_SIZE} />} label="Node" onClick={() => {}} />
          <GridIcon icon={<Shield size={ICON_SIZE} />} label="Security" onClick={() => {}} />
        </div>

        {/* AI Insights Panel */}
        <AnimatePresence>
          {insights && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="w-full glass-panel p-4 text-xs text-center border-white/5"
            >
              <div className="opacity-40 mb-2 uppercase tracking-widest flex items-center justify-center gap-2">
                <Shield size={12} /> System Insight
              </div>
              <div className="text-white/80 leading-relaxed">
                {insights}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Date */}
        <div className="pt-8 opacity-30 text-[10px] tracking-[0.5em] flex items-center gap-4">
          <div className="w-8 h-[1px] bg-white/50" />
          {formatDate(time)}
          <div className="w-8 h-[1px] bg-white/50" />
        </div>

      </motion.div>

      {/* Navigation Bar (Subtle) */}
      <div className="fixed bottom-8 flex gap-12 opacity-20 hover:opacity-100 transition-opacity duration-500">
        <Wallet size={20} className="cursor-pointer hover:text-white" onClick={() => setView('landing')} />
        <History size={20} className="cursor-pointer hover:text-white" />
        <Settings size={20} className="cursor-pointer hover:text-white" />
      </div>
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="space-y-2">
      <div className="opacity-40">{icon}</div>
      <div className="text-[10px] font-bold uppercase tracking-widest">{title}</div>
      <div className="text-[8px] opacity-30 leading-tight">{desc}</div>
    </div>
  );
}

function GridIcon({ icon, label, onClick, active }: { icon: React.ReactNode, label: string, onClick: () => void, active?: boolean }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1, color: '#ffffff' }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex flex-col items-center justify-center space-y-2 group ${active ? 'text-white animate-pulse' : 'text-white/60'}`}
    >
      <div className="p-2 transition-colors duration-300">
        {icon}
      </div>
      <span className="text-[8px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {label}
      </span>
    </motion.button>
  );
}
