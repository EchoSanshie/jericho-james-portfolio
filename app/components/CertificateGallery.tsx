"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface Certificate {
  id: string | number;
  title: string;
  institution: string;
  date: string;
  image: string;
}

interface CertificateGalleryProps {
  certificates: Certificate[];
}

export const CertificateGallery: React.FC<CertificateGalleryProps> = ({ certificates }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (window.innerWidth < 768) return; 

    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    setRotateX(-(mouseY / height) * 15);
    setRotateY((mouseX / width) * 15);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const nextCert = () => {
    setActiveIndex((prev) => (prev + 1) % certificates.length);
  };

  const prevCert = () => {
    setActiveIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === 'Escape') setIsModalOpen(false);
      if (e.key === 'ArrowRight') nextCert();
      if (e.key === 'ArrowLeft') prevCert();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, certificates.length]);

  if (!certificates || certificates.length === 0) return null;

  const currentCert = certificates[activeIndex];

  return (
    <>
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 md:mt-12 flex flex-col items-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[auto] md:min-h-[400px]">
          
          <div className="w-full md:col-span-6 lg:col-span-7 flex justify-center items-center perspective-[1000px] py-4 md:py-8 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, rotateY: -35, scale: 0.9, z: -100 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1, z: 0 }}
                exit={{ opacity: 0, rotateY: 35, scale: 0.9, z: -100 }}
                transition={{ type: "spring", stiffness: 260, damping: 25 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => setIsModalOpen(true)}
                style={{
                  transformStyle: "preserve-3d",
                  rotateX: rotateX,
                  rotateY: rotateY,
                }}
                className="w-full max-w-[320px] sm:max-w-[400px] md:max-w-full aspect-[4/3] glass-panel rounded-2xl p-2 sm:p-3 border border-[var(--border-color)] shadow-[var(--shadow-card)] cursor-zoom-in group relative"
              >
                <div className="w-full h-full overflow-hidden rounded-xl relative bg-[var(--glass-background)] flex items-center justify-center">
                  <img
                    src={currentCert.image}
                    alt={currentCert.title}
                    className="w-full h-full object-contain p-2"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out pointer-events-none" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="w-full md:col-span-6 lg:col-span-5 flex flex-col items-center md:items-start text-center md:text-left justify-center space-y-5 md:space-y-6 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-3 md:space-y-4 w-full flex flex-col items-center md:items-start"
              >
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-gold-gradient">
                  Verified Certification
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--foreground)] tracking-tight leading-snug break-words">
                  {currentCert.title}
                </h3>
                
                <div className="w-16 md:w-32 h-1 bg-gradient-to-r from-[var(--accent)] to-transparent my-4 rounded-full" />

                <div className="space-y-2 text-sm sm:text-base lg:text-lg">
                  <p className="text-[var(--muted)]">
                    Issued by: <span className="text-[var(--foreground)] font-medium">{currentCert.institution}</span>
                  </p>
                  <p className="text-[var(--muted)]">
                    Date Awarded: <span className="text-[var(--foreground)] font-medium">{currentCert.date}</span>
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center md:justify-start gap-4 pt-4 md:pt-6 w-full">
              <button
                onClick={prevCert}
                className="p-3 sm:p-4 rounded-full glass-panel text-[var(--foreground)] hover:text-[var(--accent-text)] border border-[var(--border-color)] hover:border-[var(--accent)] transition-all cursor-pointer shadow-[var(--shadow-card)] bg-[var(--panel)] hover:bg-[var(--hover)]"
                aria-label="Previous Certificate"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
              </button>
              
              <span className="text-sm sm:text-base font-mono text-[var(--muted)] tracking-wider min-w-[5rem] whitespace-nowrap text-center select-none">
                {String(activeIndex + 1).padStart(2, '0')} / {String(certificates.length).padStart(2, '0')}
              </span>

              <button
                onClick={nextCert}
                className="p-3 sm:p-4 rounded-full glass-panel text-[var(--foreground)] hover:text-[var(--accent-text)] border border-[var(--border-color)] hover:border-[var(--accent)] transition-all cursor-pointer shadow-[var(--shadow-card)] bg-[var(--panel)] hover:bg-[var(--hover)]"
                aria-label="Next Certificate"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--background)]/95 backdrop-blur-md p-2 sm:p-4 md:p-10 cursor-zoom-out select-none"
          >
            <div className="relative max-w-7xl w-full h-full flex items-center justify-center">
              
              <button 
                className="absolute top-4 right-4 md:top-6 md:right-6 text-[var(--muted)] hover:text-[var(--foreground)] text-4xl sm:text-5xl w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center z-[10000] transition-colors cursor-pointer bg-[var(--panel)]/75 md:bg-transparent rounded-full"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>

              {certificates.length > 1 && (
                <button
                  className="absolute left-2 sm:left-4 md:left-8 text-[var(--foreground)]/75 hover:text-[var(--foreground)] p-2 sm:p-4 z-[10000] transition-colors cursor-pointer group bg-[var(--panel)]/75 hover:bg-[var(--border-color)] rounded-full md:bg-transparent md:hover:bg-transparent"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevCert();
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 group-hover:-translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
              )}

              <div className="relative w-full max-h-full flex flex-col items-center justify-center px-12 sm:px-16 md:px-24 min-w-0" onClick={(e) => e.stopPropagation()}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex} 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.05, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center justify-center w-full"
                  >
                    <img
                      src={currentCert.image}
                      alt={currentCert.title}
                      className="max-w-full max-h-[70dvh] md:max-h-[80dvh] object-contain rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.18)] md:shadow-[0_0_50px_rgba(0,0,0,0.22)] cursor-default bg-[var(--panel)]"
                    />
                  </motion.div>
                </AnimatePresence>

                {certificates.length > 1 && (
                  <p className="text-[var(--muted)] font-mono text-xs sm:text-sm mt-4 sm:mt-6 tracking-widest bg-[var(--panel)]/75 px-3 py-1 rounded-full">
                    {activeIndex + 1} / {certificates.length}
                  </p>
                )}
              </div>

              {certificates.length > 1 && (
                <button
                  className="absolute right-2 sm:right-4 md:right-8 text-[var(--foreground)]/70 hover:text-[var(--foreground)] p-2 sm:p-4 z-[10000] transition-colors cursor-pointer group bg-[var(--panel)]/75 hover:bg-[var(--border-color)] rounded-full md:bg-transparent md:hover:bg-transparent"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextCert();
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 group-hover:translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};