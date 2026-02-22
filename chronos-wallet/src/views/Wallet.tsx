import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Triangle, Clock, CheckCircle2, Zap, Layers, ArrowUpRight, 
  LayoutGrid, Circle, Shield, Wallet, History, Settings, ArrowRight, Cpu
} from 'lucide-react';
import { GridIcon } from '../components/GridIcon';
import { SendForm } from '../components/SendForm';
import { SwapForm } from '../components/SwapForm';
import { SeedForm } from '../components/SeedForm';
import { ViewType, SubViewType, Transaction } from '../types';
import { formatTime, formatDate } from '../utils/formatters';

interface WalletViewProps {
  time: Date;
  balance: number;
  insights: string | null;
  isGenerating: boolean;
  transactions: Transaction[];
  activeSubView: SubViewType;
  setActiveSubView: (sub: SubViewType) => void;
  setView: (view: ViewType) => void;
  handleSend: (amount: number, address: string) => boolean;
  handleSwap: (fromAmount: number, toAmount: number, fromAsset: string, toAsset: string) => boolean;
  generateFinancialInsights: () => void;
}

const ICON_SIZE = 24;

export function WalletView({
  time, balance, insights, isGenerating, transactions, activeSubView,
  setActiveSubView, setView, handleSend, handleSwap, generateFinancialInsights
}: WalletViewProps) {
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
            <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="1 4" className="opacity-20" />
            <motion.circle
              cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="1" strokeDasharray="60 300"
              animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="opacity-40"
            />
          </svg>
        </div>

        {/* Balance Display */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="text-sm opacity-40 mb-1 tracking-widest uppercase">Available Assets</div>
          <div className="text-4xl font-mono tracking-tighter">
            ${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        </motion.div>

        {/* Icon Grid */}
        <div className="grid grid-cols-3 gap-8 w-full max-w-[280px]">
          <GridIcon icon={<Triangle size={ICON_SIZE} />} label="Send" onClick={() => setActiveSubView('send')} />
          <GridIcon icon={<Clock size={ICON_SIZE} />} label="History" onClick={() => setActiveSubView('history')} />
          <GridIcon icon={<CheckCircle2 size={ICON_SIZE} />} label="Verify" onClick={() => {}} />
          <GridIcon icon={<Zap size={ICON_SIZE} />} label="Swap" onClick={() => setActiveSubView('swap')} />
          <GridIcon icon={<Layers size={ICON_SIZE} />} label="Assets" onClick={() => {}} />
          <GridIcon icon={<ArrowUpRight size={ICON_SIZE} />} label="Staking" onClick={() => {}} />
          <GridIcon icon={<LayoutGrid size={ICON_SIZE} />} label="Apps" onClick={() => {}} />
          <GridIcon icon={<Circle size={ICON_SIZE} />} label="Node" onClick={() => {}} />
          <GridIcon icon={<Shield size={ICON_SIZE} />} label="Security" onClick={() => {}} />
        </div>

        {/* AI Insights Panel */}
        <AnimatePresence>
          {insights && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="w-full glass-panel p-4 text-xs text-center border-white/5">
              <div className="opacity-40 mb-2 uppercase tracking-widest flex items-center justify-center gap-2">
                <Shield size={12} /> System Insight
              </div>
              <div className="text-white/80 leading-relaxed">{insights}</div>
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

      {/* Navigation Bar */}
      <div className="fixed bottom-8 flex gap-12 opacity-20 hover:opacity-100 transition-opacity duration-500">
        <Wallet size={20} className="cursor-pointer hover:text-white" onClick={() => setView('landing')} />
        <History size={20} className="cursor-pointer hover:text-white" onClick={() => setActiveSubView('history')} />
        <Settings size={20} className="cursor-pointer hover:text-white" />
      </div>

      {/* Sub-views */}
      <AnimatePresence>
        {activeSubView !== 'none' && (
          <motion.div 
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 flex flex-col bg-[#1A1A1A]"
          >
            <div className="p-8 flex justify-between items-center border-b border-white/5">
              <div className="flex items-center gap-4">
                <button onClick={() => setActiveSubView('none')} className="opacity-40 hover:opacity-100">
                  <ArrowRight size={20} className="rotate-180" />
                </button>
                <div className="text-xs tracking-[0.3em] uppercase font-bold">{activeSubView} terminal</div>
              </div>
              <div className="text-[10px] opacity-20 tracking-widest">SECURE_SESSION_ACTIVE</div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center">
              <div className="w-full max-w-sm space-y-12 py-12">
                {activeSubView === 'send' && <SendForm onSend={handleSend} balance={balance} />}
                {activeSubView === 'swap' && <SwapForm onSwap={handleSwap} balance={balance} />}
                {activeSubView === 'seed' && <SeedForm onComplete={() => { setView('wallet'); setActiveSubView('none'); }} />}
                {activeSubView === 'history' && (
                  <div className="space-y-6">
                    {transactions.length === 0 ? (
                      <div className="text-center opacity-20 text-xs py-24 tracking-widest">NO_TRANSACTIONS_FOUND</div>
                    ) : (
                      transactions.map(tx => (
                        <div key={tx.id} className="flex justify-between items-center glass-panel p-4 border-white/5 text-[10px]">
                          <div className="flex items-center gap-3">
                            {tx.type === 'SEND' ? <ArrowUpRight size={14} className="text-red-400" /> : <Zap size={14} className="text-white" />}
                            <div>
                              <div className="font-bold tracking-widest">{tx.type}</div>
                              <div className="opacity-40">{tx.type === 'SEND' ? `TO: ${tx.address?.slice(0, 6)}...` : `${tx.fromAsset} → ${tx.toAsset}`}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{tx.type === 'SEND' ? `-$${tx.amount}` : `+$${tx.toAmount?.toFixed(2)}`}</div>
                            <div className="opacity-40">{tx.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
                <div className="pt-12 opacity-10 text-[8px] leading-relaxed font-mono">
                  {`> INITIALIZING_${activeSubView.toUpperCase()}_PROTOCOL...`}<br />
                  {`> ENCRYPTING_TRANSACTION_DATA...`}<br />
                  {`> WAITING_FOR_NETWORK_CONFIRMATION...`}<br />
                  {`> STATUS: READY`}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
