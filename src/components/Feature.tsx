import React from 'react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export function Feature({ icon, title, desc }: FeatureProps) {
  return (
    <div className="space-y-2">
      <div className="opacity-40">{icon}</div>
      <div className="text-[10px] font-bold uppercase tracking-widest">{title}</div>
      <div className="text-[8px] opacity-30 leading-tight">{desc}</div>
    </div>
  );
}
