
import React from 'react';
import { motion } from 'motion/react';

const cinematicItems = [
  {
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop",
    flag: "🇫🇷",
    label: "France",
    landmark: "Eiffel Tower"
  },
  {
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop",
    flag: "🇬🇧",
    label: "United Kingdom",
    landmark: "Big Ben"
  },
  {
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=800&auto=format&fit=crop",
    flag: "🇺🇸",
    label: "United States",
    landmark: "Golden Gate"
  },
  {
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=800&auto=format&fit=crop",
    flag: "🇩🇪",
    label: "Germany",
    landmark: "Berlin"
  },
  {
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=800&auto=format&fit=crop",
    flag: "🇦🇺",
    label: "Australia",
    landmark: "Sydney"
  },
  {
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop",
    flag: "🇦🇪",
    label: "UAE",
    landmark: "Dubai"
  },
  {
    image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=800&auto=format&fit=crop",
    flag: "🤝",
    label: "Global Community",
    landmark: "International Talent"
  },
  {
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
    flag: "🎓",
    label: "Students",
    landmark: "Future Leaders"
  },
  {
    image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=800&auto=format&fit=crop",
    flag: "💻",
    label: "Digital Nomads",
    landmark: "Remote Work"
  }
];

export const CinematicBanner: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden bg-[#0a0a0a] py-16 md:py-24">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-scroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .marquee-container {
          display: flex;
          width: max-content;
          animation: marquee-scroll 80s linear infinite;
        }
        .marquee-container:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full" />
      </div>
      
      <div className="relative z-10 mb-12 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.6em] mb-4">Global Network</h2>
          <p className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Your Gateway to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Iconic Destinations</span>
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-6 rounded-full opacity-50" />
        </motion.div>
      </div>

      <div className="relative flex items-center">
        {/* Edge Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent z-20 pointer-events-none" />

        <div className="marquee-container">
          {/* Set 1 */}
          <div className="flex gap-8 md:gap-12 pr-8 md:pr-12">
            {cinematicItems.map((item, index) => (
              <div 
                key={`set1-${index}`} 
                className="relative w-[280px] md:w-[500px] aspect-[16/10] rounded-[2rem] md:rounded-[3rem] overflow-hidden group flex-shrink-0 border border-white/5 shadow-2xl shadow-black/40 transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]"
              >
                <img 
                  src={item.image} 
                  alt={item.label}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl md:text-3xl drop-shadow-lg">{item.flag}</span>
                    <h3 className="text-white font-bold text-xl md:text-2xl tracking-tight">{item.label}</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-white/50 text-[10px] md:text-xs font-medium tracking-widest uppercase">{item.landmark}</p>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="w-1 h-1 rounded-full bg-blue-400" />
                      <span className="text-[8px] font-bold text-white uppercase tracking-widest">Explore</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Set 2 */}
          <div className="flex gap-8 md:gap-12 pr-8 md:pr-12">
            {cinematicItems.map((item, index) => (
              <div 
                key={`set2-${index}`} 
                className="relative w-[280px] md:w-[500px] aspect-[16/10] rounded-[2rem] md:rounded-[3rem] overflow-hidden group flex-shrink-0 border border-white/5 shadow-2xl shadow-black/40 transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]"
              >
                <img 
                  src={item.image} 
                  alt={item.label}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl md:text-3xl drop-shadow-lg">{item.flag}</span>
                    <h3 className="text-white font-bold text-xl md:text-2xl tracking-tight">{item.label}</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-white/50 text-[10px] md:text-xs font-medium tracking-widest uppercase">{item.landmark}</p>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="w-1 h-1 rounded-full bg-blue-400" />
                      <span className="text-[8px] font-bold text-white uppercase tracking-widest">Explore</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 text-center opacity-40">
        <p className="text-slate-500 text-[10px] font-medium tracking-[0.4em] uppercase">Trusted by 70,000+ applicants worldwide</p>
      </div>
    </div>
  );
};
