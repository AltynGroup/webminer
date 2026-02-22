import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Globe, Zap, Lock, Cpu } from 'lucide-react';
import { Feature } from '../components/Feature';
import { ViewType, SubViewType } from '../types';

interface LandingViewProps {
  setView: (view: ViewType) => void;
  setActiveSubView: (sub: SubViewType) => void;
}

export function LandingView({ setView, setActiveSubView }: LandingViewProps) {
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white font-mono overflow-hidden">
      {/* Navigation */}
      <nav className="p-8 flex justify-between items-center border-b border-white/5">
        <div className="text-xl tracking-[0.3em] font-bold">CHRONOS</div>
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
              TIME IS <br />
              <span className="opacity-50">THE ASSET</span>
            </h1>
            <p className="max-w-md text-sm opacity-40 leading-relaxed tracking-wide">
              Chronos is a minimalist, time-centric financial protocol designed for the next era of decentralized assets. Precision meets performance.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            <div className="text-[10px] opacity-30 uppercase tracking-[0.3em] mb-4">Authentication Portal</div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setView('wallet')}
                className="flex-1 group flex items-center justify-center gap-3 bg-white text-[#1A1A1A] px-6 py-4 rounded-full font-bold text-[10px] tracking-widest uppercase hover:bg-opacity-90 transition-all"
              >
                <Globe size={14} /> Google
              </button>
              <button 
                onClick={() => setView('wallet')}
                className="flex-1 group flex items-center justify-center gap-3 border border-white/20 px-6 py-4 rounded-full font-bold text-[10px] tracking-widest uppercase hover:bg-white hover:text-[#1A1A1A] transition-all"
              >
                <Zap size={14} /> Telegram
              </button>
            </div>

            <button 
              onClick={() => setActiveSubView('seed')}
              className="w-full group flex items-center justify-center gap-3 border border-dashed border-white/10 px-6 py-4 rounded-full font-bold text-[10px] tracking-widest uppercase hover:border-white/40 transition-all opacity-40 hover:opacity-100"
            >
              <Lock size={14} /> Access via Seed Phrase
            </button>

            <div className="pt-4 flex items-center gap-4 opacity-20">
              <div className="h-[1px] flex-1 bg-white" />
              <span className="text-[8px] tracking-[0.5em]">OR</span>
              <div className="h-[1px] flex-1 bg-white" />
            </div>

            <button 
              onClick={() => setView('wallet')}
              className="w-full group flex items-center justify-center gap-4 text-white/40 hover:text-white transition-colors text-[10px] tracking-widest uppercase"
            >
              Enter as Guest <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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
        <div>© 2026 Chronos Systems</div>
        <div className="flex gap-8">
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Docs</a>
        </div>
      </footer>
    </div>
  );
}
