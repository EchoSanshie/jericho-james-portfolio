"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useAnimationFrame, wrap } from 'framer-motion';

export interface Skill {
  name: string;
  image: string;
}

interface SkillCarouselProps {
  skills: Skill[];
  direction?: 'left' | 'right';
  speed?: number; 
}

export const SkillCarousel: React.FC<SkillCarouselProps> = ({ 
  skills, 
  direction = 'left', 
  speed = 30 
}) => {
  const setRef = useRef<HTMLDivElement>(null);
  const setWidth = useRef(0);
  const isDragging = useRef(false);
  
  const baseX = useMotionValue(0);
  const baseVelocity = (direction === 'left' ? -50 : 50) * (30 / speed);

  useEffect(() => {
    const updateWidth = () => {
      if (setRef.current) {
        setWidth.current = setRef.current.offsetWidth;
        baseX.set(-setWidth.current); 
      }
    };

    updateWidth();
    
    if (setRef.current) {
      const observer = new ResizeObserver(() => updateWidth());
      observer.observe(setRef.current);
      return () => observer.disconnect();
    }
  }, [baseX]);

  useAnimationFrame((t, delta) => {
    if (setWidth.current === 0) return;

    let currentX = baseX.get();
    if (!isDragging.current) {
      currentX += baseVelocity * (delta / 1000);
    }

    const w = setWidth.current;
    
    const wrappedX = wrap(-w * 2, -w, currentX);
    
    baseX.set(wrappedX);
  });

  const sets = [0, 1, 2, 3];

  return (
    <div className="relative flex w-full border-y border-[#D4AF37]/20 bg-[var(--panel)]/90 overflow-hidden py-3 md:py-4 cursor-grab active:cursor-grabbing group">
      <motion.div
        className="flex w-max"
        style={{ x: baseX }}
        drag="x"
        onDragStart={() => { isDragging.current = true; }}
        onDragEnd={() => { isDragging.current = false; }}
      >
        {sets.map((setIndex) => (
          <div 
            key={setIndex} 
            ref={setIndex === 0 ? setRef : null} 
            className="flex gap-3 pr-3 md:gap-4 md:pr-4 lg:gap-5 lg:pr-5 w-max"
          >
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 md:space-x-3 rounded-lg border border-[var(--border-color)] bg-[var(--surface)] px-3 py-2 md:px-5 md:py-2.5 transition-colors hover:bg-[var(--panel)] hover:border-[#D4AF37]/40 min-w-max select-none"
              >
                <img 
                  src={skill.image} 
                  alt={skill.name} 
                  className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 object-contain pointer-events-none"
                />
                <span className="text-xs md:text-sm font-medium text-[var(--foreground)] font-mono tracking-wide pointer-events-none">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        ))}
      </motion.div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 md:w-16 bg-gradient-to-r from-[var(--panel)] to-transparent z-10"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 md:w-16 bg-gradient-to-l from-[var(--panel)] to-transparent z-10"></div>
    </div>
  );
};