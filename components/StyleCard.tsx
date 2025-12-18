
import React from 'react';
import { StyleOption } from '../types';

interface StyleCardProps {
  option: StyleOption;
  isActive: boolean;
  onClick: () => void;
}

const StyleCard: React.FC<StyleCardProps> = ({ option, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`relative group flex flex-col items-center p-4 rounded-2xl transition-all duration-300 transform 
        ${isActive 
          ? 'bg-blue-600/30 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)] scale-105' 
          : 'bg-slate-800/50 border-slate-700 hover:bg-slate-700/50 hover:scale-105 hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] hover:border-blue-400'
        } border-2 overflow-hidden`}
    >
      <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
        {option.icon}
      </div>
      <span className="font-bold text-sm mb-1">{option.label}</span>
      <span className="text-[10px] text-slate-400 leading-tight text-center">
        {option.description}
      </span>
      
      {/* Decorative inner glow for active state */}
      {isActive && (
        <div className="absolute inset-0 bg-blue-500/10 pointer-events-none animate-pulse" />
      )}
    </button>
  );
};

export default StyleCard;
