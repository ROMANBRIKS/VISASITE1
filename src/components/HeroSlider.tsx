
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  flag: string;
}

const globalSlides: Slide[] = [
  {
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2000&auto=format&fit=crop",
    title: "Eiffel Tower, France",
    subtitle: "The romance of a new beginning.",
    flag: "🇫🇷"
  },
  {
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2000&auto=format&fit=crop",
    title: "Big Ben, United Kingdom",
    subtitle: "Timeless opportunities await.",
    flag: "🇬🇧"
  },
  {
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=2000&auto=format&fit=crop",
    title: "Golden Gate, United States",
    subtitle: "Bridge the gap to your future.",
    flag: "🇺🇸"
  }
];

const ghanaSlides: Slide[] = [
  {
    image: "https://images.unsplash.com/photo-1591129841117-3adfd313e34f?q=80&w=2000&auto=format&fit=crop",
    title: "Cape Coast Castle",
    subtitle: "A testament to resilience and the spirit of a nation.",
    flag: "🇬🇭"
  },
  {
    image: "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?q=80&w=2000&auto=format&fit=crop",
    title: "Kakum National Park",
    subtitle: "Breathe in the ancient whispers of the rainforest canopy.",
    flag: "🇬🇭"
  },
  {
    image: "https://images.unsplash.com/photo-1591129841061-049887756187?q=80&w=2000&auto=format&fit=crop",
    title: "Mole National Park",
    subtitle: "Where the wild heart of Africa beats in harmony.",
    flag: "🇬🇭"
  },
  {
    image: "https://images.unsplash.com/photo-1623945359620-64733513076a?q=80&w=2000&auto=format&fit=crop",
    title: "Independence Square",
    subtitle: "The flame of freedom that lights the path for all.",
    flag: "🇬🇭"
  }
];

interface HeroSliderProps {
  countryId?: string;
  opacity?: number;
  textColor?: string;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ 
  countryId, 
  opacity = 0.3,
  textColor = "text-slate-900"
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = countryId === 'ghana' ? ghanaSlides : globalSlides;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src={slides[currentIndex].image} 
            alt={slides[currentIndex].title}
            className="w-full h-full object-cover"
            style={{ opacity }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
          
          {/* Captivating Text Overlay (Subtle) */}
          <div className="absolute bottom-12 right-12 text-right hidden md:block">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <div className="flex items-center justify-end gap-3 mb-2">
                <span className="text-2xl">{slides[currentIndex].flag}</span>
                <h3 className={cn("font-bold text-xl tracking-tight", textColor)}>{slides[currentIndex].title}</h3>
              </div>
              <p className="text-slate-500 italic font-serif text-lg">{slides[currentIndex].subtitle}</p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
