import React, { useState } from 'react';

interface SendFormProps {
  onSend: (amount: number, address: string) => boolean;
  balance: number;
}

export function SendForm({ onSend, balance }: SendFormProps) {
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !address) return;
    const success = onSend(Number(amount), address);
    if (!success) setError('INSUFFICIENT_FUNDS');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-[8px] uppercase tracking-widest opacity-40">Recipient Address</label>
        <input 
          type="text" 
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="0x..." 
          className="w-full bg-white/5 border border-white/10 p-4 text-xs outline-none focus:border-white/30 transition-colors"
        />
      </div>
      <div className="space-y-2">
        <label className="text-[8px] uppercase tracking-widest opacity-40">Amount (USD)</label>
        <input 
          type="number" 
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00" 
          className="w-full bg-white/5 border border-white/10 p-4 text-xs outline-none focus:border-white/30 transition-colors"
        />
        <div className="text-[8px] opacity-20 text-right">MAX: ${balance.toFixed(2)}</div>
      </div>
      {error && <div className="text-[8px] text-red-400 tracking-widest">{error}</div>}
      <button 
        type="submit"
        className="w-full bg-white text-[#1A1A1A] py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all"
      >
        Execute Transfer
      </button>
    </form>
  );
}
