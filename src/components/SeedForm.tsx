import React, { useState } from 'react';

interface SeedFormProps {
  onComplete: () => void;
}

export function SeedForm({ onComplete }: SeedFormProps) {
  const [phrase, setPhrase] = useState('');

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <label className="text-[8px] uppercase tracking-widest opacity-40 leading-relaxed">
          Enter your 12 or 24 word mnemonic seed phrase in the correct order to recover your vault.
        </label>
        <textarea 
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
          placeholder="word1 word2 word3..." 
          className="w-full h-32 bg-white/5 border border-white/10 p-4 text-xs outline-none focus:border-white/30 transition-colors font-mono leading-loose resize-none"
        />
      </div>
      <button 
        onClick={onComplete}
        className="w-full bg-white text-[#1A1A1A] py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all"
      >
        Decrypt Vault
      </button>
      <div className="text-[8px] opacity-20 text-center uppercase tracking-widest">
        Private keys never leave this terminal.
      </div>
    </div>
  );
}
