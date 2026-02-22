/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LandingView } from './views/Landing';
import { WalletView } from './views/Wallet';
import { ViewType, SubViewType, Transaction } from './types';
import { generateFinancialInsights as getAIInsights } from './services/gemini';

export default function App() {
  const [view, setView] = useState<ViewType>('landing');
  const [activeSubView, setActiveSubView] = useState<SubViewType>('none');
  const [time, setTime] = useState(new Date());
  const [balance, setBalance] = useState(12450.85);
  const [insights, setInsights] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const generateFinancialInsights = async () => {
    setIsGenerating(true);
    const text = await getAIInsights();
    setInsights(text);
    setIsGenerating(false);
  };

  const handleSend = (amount: number, address: string) => {
    if (amount > balance) return false;
    setBalance(prev => prev - amount);
    setTransactions(prev => [{
      id: Math.random().toString(36).substr(2, 9),
      type: 'SEND',
      amount,
      address,
      date: new Date()
    }, ...prev]);
    setActiveSubView('none');
    return true;
  };

  const handleSwap = (fromAmount: number, toAmount: number, fromAsset: string, toAsset: string) => {
    if (fromAmount > balance) return false;
    setBalance(prev => prev - fromAmount + toAmount);
    setTransactions(prev => [{
      id: Math.random().toString(36).substr(2, 9),
      type: 'SWAP',
      fromAmount,
      toAmount,
      fromAsset,
      toAsset,
      date: new Date()
    }, ...prev]);
    setActiveSubView('none');
    return true;
  };

  if (view === 'landing') {
    return (
      <LandingView 
        setView={setView} 
        setActiveSubView={setActiveSubView} 
      />
    );
  }

  return (
    <WalletView 
      time={time}
      balance={balance}
      insights={insights}
      isGenerating={isGenerating}
      transactions={transactions}
      activeSubView={activeSubView}
      setActiveSubView={setActiveSubView}
      setView={setView}
      handleSend={handleSend}
      handleSwap={handleSwap}
      generateFinancialInsights={generateFinancialInsights}
    />
  );
}
