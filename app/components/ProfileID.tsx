import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import type { MouseEvent } from 'react';

export default function ProfileCard() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXInside = useMotionValue(0);
  const mouseYInside = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const spotlightXSpring = useSpring(mouseXInside, { stiffness: 150, damping: 20 });
  const spotlightYSpring = useSpring(mouseYInside, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]);
  const backgroundLight = useTransform(
    [spotlightXSpring, spotlightYSpring],
    ([cx, cy]) => `radial-gradient(350px circle at ${cx}px ${cy}px, rgba(255,215,0,0.15), transparent 80%)`
  );

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    const absoluteX = e.clientX - rect.left;
    const absoluteY = e.clientY - rect.top;
    const mouseX = absoluteX - width / 2;
    const mouseY = absoluteY - height / 2;
    
    x.set(mouseX / width);
    y.set(mouseY / height);

    mouseXInside.set(absoluteX);
    mouseYInside.set(absoluteY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    mouseXInside.set(-500);
    mouseYInside.set(-500);
  };

  return (
    <div style={{ perspective: '1000px' }}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="group relative flex flex-col items-center m-auto w-full max-w-[15rem] min-h-[21rem] bg-[var(--panel)] border border-[var(--color-gold)] rounded-2xl py-4 mb-4 shadow-[var(--shadow-card)] overflow-hidden"
      >
        <motion.div 
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{ background: backgroundLight }}
        />
        <p style={{ transform: 'translateZ(30px)' }} className="text-base text-gold font-bold z-20 text-center px-3 break-words">
          Jericho (Echo)
        </p>
        
        <img
          src="My Photo.svg"
          alt="Portrait of Jericho James Panganiban"
          loading="lazy"
          decoding="async"
          style={{ transform: 'translateZ(20px)' }}
          className="w-full h-auto max-w-[180px] mt-2 z-20 rounded-xl bg-[var(--glass-background)] border border-[var(--border-color)]"
        />
        
        <p style={{ transform: 'translateZ(25px)' }} className="bg-[var(--color-gold)] py-1 px-2 rounded-xl text-xs text-center text-[var(--gold-contrast)] font-semibold mt-3 z-20 break-words leading-snug">
          Front-end Web & Mobile Developer
        </p>
        
        <p className="text-xs m-3 text-center text-[var(--muted)] z-20 break-words">
          Driven by passion, crafted; Building web and mobile experiences
          that turn ideas into reality
        </p>
      </motion.div>
    </div>
  );
}