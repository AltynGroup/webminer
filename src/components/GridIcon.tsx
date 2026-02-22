import React from 'react';
import { motion } from 'motion/react';

interface GridIconProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}

export function GridIcon({ icon, label, onClick, active }: GridIconProps) {
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
