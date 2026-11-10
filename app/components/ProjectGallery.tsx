"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

export interface Project {
  id: string | number;
  name: string;
  description: string;
  image: string;
  exploreMedia?: {
    type: "image" | "video" | "url";
    src: string;
  };
}

interface ProjectGalleryProps {
  projects: Project[];
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ projects }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
      filter: "blur(8px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
        filter: { duration: 0.3 }
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
      filter: "blur(8px)",
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    }),
  };

  const isUrlProject = (p: Project) => p.exploreMedia?.type === "url";

  const getNextMediaIndex = (currentIndex: number, dir: number): number => {
    let nextIdx = currentIndex;
    for (let i = 0; i < projects.length; i++) {
      nextIdx = (nextIdx + dir + projects.length) % projects.length;
      if (!isUrlProject(projects[nextIdx])) {
        return nextIdx;
      }
    }
    return currentIndex; 
  };

  const nextSlide = () => {
    setDirection(1);
    setIndex((prev) => (isModalOpen ? getNextMediaIndex(prev, 1) : (prev + 1) % projects.length));
  };

  const prevSlide = () => {
    setDirection(-1);
    setIndex((prev) => (isModalOpen ? getNextMediaIndex(prev, -1) : (prev - 1 + projects.length) % projects.length));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === 'Escape') setIsModalOpen(false);
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, projects.length]);

  if (!projects || projects.length === 0) return null;

  const currentProject = projects[index];

  const formatSrc = (src: string) => {
    if (!src) return "";
    if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/")) {
      return src;
    }
    return `/${src}`;
  };

  const modalSrc = currentProject.exploreMedia?.src || currentProject.image;
  const mediaType = currentProject.exploreMedia?.type || "image";

  const handleExploreClick = () => {
    if (mediaType === "url") {
      window.open(formatSrc(modalSrc), "_blank", "noopener,noreferrer");
    } else {
      setIsModalOpen(true);
    }
  };

  const totalModalMedia = projects.filter(p => !isUrlProject(p)).length;
  const currentModalIndex = projects.slice(0, index).filter(p => !isUrlProject(p)).length + 1;

  let buttonText = "Explore Work";
  if (mediaType === "image") {
    buttonText = "View Image";
  } else if (mediaType === "video") {
    buttonText = "Watch Video";
  } else if (mediaType === "url") {
    buttonText = "Visit Live Site";
  }

  return (
    <>
      <div className="w-full max-w-5xl mx-auto px-4 mt-6 md:mt-8 relative">
        <div 
          className="relative w-full overflow-hidden rounded-2xl glass-panel p-2 md:p-3"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.article
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full flex flex-col md:flex-row p-4 sm:p-6 md:p-8 gap-6 md:gap-8 items-center md:items-stretch"
            >
              <div 
                className="w-full md:w-[45%] shrink-0 flex items-center justify-center overflow-hidden rounded-xl bg-[var(--glass-background)] border border-[var(--border-color)] shadow-[var(--shadow-card)]"
              >
                <motion.img
                  src={formatSrc(currentProject.image)}
                  alt={currentProject.name}
                  loading="lazy"
                  decoding="async"
                  className="block w-full h-auto max-h-[300px] sm:max-h-[360px] md:max-h-[400px] object-contain p-1 rounded-xl"
                  animate={{ scale: isHovered ? 1.04 : 1 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
              </div>

              <div className="flex flex-col flex-grow min-w-0 w-full py-2">
                <div className="min-w-0">
                  <motion.span 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10px] md:text-xs font-mono tracking-widest text-[var(--accent-text)] uppercase bg-[var(--accent-soft-bg)] px-3 py-1 rounded-full inline-block"
                  >
                    Project Showcase {index + 1}/{projects.length}
                  </motion.span>
                  <motion.h3 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--foreground)] mt-3 md:mt-4 tracking-tight drop-shadow-md break-words text-balance"
                  >
                    {currentProject.name}
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-[var(--muted)] text-sm md:text-base leading-relaxed mt-3 md:mt-4 text-left break-words"
                  >
                    {currentProject.description}
                  </motion.p>
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-auto pt-6 md:pt-8"
                >
                  <button
                    onClick={handleExploreClick}
                    className="btn-gold inline-flex w-full sm:w-auto items-center justify-center gap-2 md:gap-3 font-semibold text-xs md:text-sm px-6 py-2.5 md:px-8 md:py-3 rounded-full transition-all duration-300 hover:scale-[1.03] cursor-pointer"
                  >
                    {buttonText} <span>&rarr;</span>
                  </button>
                </motion.div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        <div className="flex flex-wrap justify-between items-center gap-3 mt-5 md:mt-6 px-2 md:px-4">
          <div className="flex flex-wrap gap-1 md:gap-1.5">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                aria-label={`Go to project ${i + 1}`}
                aria-current={i === index}
                className="relative flex h-6 w-6 items-center justify-center cursor-pointer"
              >
                <span
                  className="block h-2 rounded-full transition-all duration-500"
                  style={{
                    width: i === index ? "24px" : "8px",
                    backgroundColor: i === index ? "var(--accent)" : "var(--carousel-dot-inactive)",
                  }}
                />
              </button>
            ))}
          </div>

          <div className="flex gap-3 md:gap-4 ml-auto">
            <button
              onClick={prevSlide}
              className="p-2 md:p-3 rounded-full glass-panel text-[var(--foreground)] hover:text-[var(--accent-text)] border border-[var(--border-color)] hover:border-[var(--accent)] transition-all cursor-pointer group shadow-[var(--shadow-card)] bg-[var(--panel)]"
              aria-label="Previous Project"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5 transform group-hover:-translate-x-0.5 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            </button>
            <button
              onClick={nextSlide}
              className="p-2 md:p-3 rounded-full glass-panel text-[var(--foreground)] hover:text-[var(--accent-text)] border border-[var(--border-color)] hover:border-[var(--accent)] transition-all cursor-pointer group shadow-[var(--shadow-card)] bg-[var(--panel)]"
              aria-label="Next Project"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-x-0.5 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--background)]/95 backdrop-blur-md p-4 md:p-10 cursor-zoom-out select-none"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative max-w-7xl w-full h-full flex items-center justify-center">
            
            <button 
              className="absolute top-2 right-2 md:top-6 md:right-6 text-[var(--muted)] hover:text-[var(--foreground)] text-5xl w-12 h-12 flex items-center justify-center z-[10000] transition-colors cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>

            {totalModalMedia > 1 && (
              <button
                className="absolute left-0 md:left-4 text-[var(--foreground)]/70 hover:text-[var(--foreground)] p-4 z-[10000] transition-colors cursor-pointer group"
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 md:w-14 md:h-14 group-hover:-translate-x-1 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
            )}

            <div className="relative w-full max-h-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={index} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center justify-center w-full"
                >
                  {mediaType === "video" && (
                    <video
                      src={formatSrc(modalSrc)}
                      controls
                      autoPlay
                      className="max-w-full max-h-[72dvh] md:max-h-[82dvh] rounded-lg shadow-2xl cursor-default"
                    />
                  )}

                  {mediaType === "image" && (
                    <img
                      src={formatSrc(modalSrc)}
                      alt={currentProject.name}
                      className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl cursor-default bg-[var(--panel)]"
                    />
                  )}
                </motion.div>
              </AnimatePresence>
              
              {totalModalMedia > 0 && (
                <p className="text-[var(--muted)] font-mono text-xs mt-4 tracking-widest bg-[var(--panel)] px-3 py-1 rounded-full">
                  {currentModalIndex} / {totalModalMedia}
                </p>
              )}
            </div>

            {totalModalMedia > 1 && (
              <button
                className="absolute right-0 md:right-4 text-[var(--foreground)]/70 hover:text-[var(--foreground)] p-4 z-[10000] transition-colors cursor-pointer group"
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 md:w-14 md:h-14 group-hover:translate-x-1 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            )}

          </div>
        </div>
      )}
    </>
  );
};