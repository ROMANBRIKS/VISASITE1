import React from 'react';
import { Info } from 'lucide-react';

interface AdSpaceProps {
  type?: 'banner' | 'sidebar' | 'inline';
  className?: string;
}

export const AdSpace: React.FC<AdSpaceProps> = ({ type = 'banner', className = '' }) => {
  const styles = {
    banner: "w-full h-32 md:h-40",
    sidebar: "w-full h-64 md:h-80",
    inline: "w-full h-24"
  };

  return (
    <div className={`relative overflow-hidden rounded-3xl border border-dashed border-slate-200 bg-slate-50/50 flex flex-col items-center justify-center p-6 group transition-all hover:bg-slate-50 ${styles[type]} ${className}`}>
      <div className="absolute top-2 right-4 text-[10px] font-bold text-slate-300 uppercase tracking-widest">Advertisement</div>
      <div className="flex flex-col items-center text-center space-y-2">
        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform">
          <Info className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-400">Promoted Content</p>
          <p className="text-xs text-slate-400/80">Space available for relevant services</p>
        </div>
      </div>
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="ad-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#ad-pattern)" />
        </svg>
      </div>
    </div>
  );
};
