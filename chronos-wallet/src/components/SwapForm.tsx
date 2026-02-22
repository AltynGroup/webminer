import React, { useState } from 'react';
import { Zap } from 'lucide-react';

interface SwapFormProps {
  onSwap: (from: number, to: number, fromA: string, toA: string) => boolean;
  balance: number;
}

export function SwapForm({ onSwap, balance }: SwapFormProps) {
  const [amount, setAmount] = useState('');
  const [fromAsset] = useState('USD');
  const [toAsset] = useState('CHRN');
  const rate = 0.85; // 1 USD = 0.85 CHRN

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    onSwap(Number(amount), Number(amount) * rate, fromAsset, toAsset);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between glass-panel p-4 border-white/5">
        <div>
          <div className="text-[8px] opacity-40 uppercase mb-1">From</div>
          <div className="text-xs font-bold">{fromAsset}</div>
        </div>
        <input 
          type="number" 
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00" 
          className="bg-transparent text-right text-xs outline-none w-24"
        />
      </div>
      <div className="flex justify-center">
        <Zap size={14} className="opacity-20" />
      </div>
      <div className="flex items-center justify-between glass-panel p-4 border-white/5">
        <div>
          <div className="text-[8px] opacity-40 uppercase mb-1">To</div>
          <div className="text-xs font-bold">{toAsset}</div>
        </div>
        <div className="text-xs font-bold">{(Number(amount) * rate).toFixed(2)}</div>
      </div>
      <div className="text-[8px] opacity-20 text-center tracking-widest">RATE: 1 USD = {rate} CHRN</div>
      <button 
        type="submit"
        className="w-full bg-white text-[#1A1A1A] py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all"
      >
        Confirm Swap
      </button>
    </form>
  );
}
