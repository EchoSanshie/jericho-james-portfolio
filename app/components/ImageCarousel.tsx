"use client";

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/effect-coverflow';

export interface CarouselItem {
  id: string | number;
  image: string;
  name: string;
  description: string;
  exploreMedia?: {
    type: "image" | "video" | "url";
    src: string;
  };
}

interface ImageCarouselProps {
  items: CarouselItem[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ items }) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isUrlItem = (item: CarouselItem) => item.exploreMedia?.type === "url";

  const formatSrc = (src: string) => {
    if (!src) return "";
    if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/")) {
      return src;
    }
    return `/${src}`;
  };

  const getNextMediaIndex = (currentIndex: number, dir: number): number => {
    let nextIdx = currentIndex;
    for (let i = 0; i < items.length; i++) {
      nextIdx = (nextIdx + dir + items.length) % items.length;
      if (!isUrlItem(items[nextIdx])) {
        return nextIdx;
      }
    }
    return currentIndex;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') setSelectedIndex((prev) => getNextMediaIndex(prev!, 1));
      if (e.key === 'ArrowLeft') setSelectedIndex((prev) => getNextMediaIndex(prev!, -1));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, items]);

  if (!items || items.length === 0) {
    return <div className="text-white text-center p-10">No projects to display.</div>;
  }

  const totalModalMedia = items.filter(item => !isUrlItem(item)).length;
  const currentModalIndex = selectedIndex !== null 
    ? items.slice(0, selectedIndex).filter(item => !isUrlItem(item)).length + 1 
    : 0;

  const modalItem = selectedIndex !== null ? items[selectedIndex] : null;
  const modalSrc = modalItem ? (modalItem.exploreMedia?.src || modalItem.image) : "";
  const mediaType = modalItem ? (modalItem.exploreMedia?.type || "image") : "image";

  return (
    <>
      <div className="w-full glass-panel border border-white/10 rounded-2xl p-2 sm:p-3 shadow-[0_30px_60px_rgba(0,0,0,0.8)] font-sans relative overflow-hidden">
        <Swiper
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          slideToClickedSlide={true}
          spaceBetween={10} 
          coverflowEffect={{
            rotate: 20,     
            stretch: 0,     
            depth: 100,     
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[EffectCoverflow, Autoplay]}
          className="w-full pt-[30px] pb-[35px] md:pt-[40px] md:pb-[45px]"
        >
          {items.map((item, index) => (
            <SwiperSlide 
              key={item.id} 
              onClick={() => {
                if (swiperInstance?.activeIndex === index) {
                  if (isUrlItem(item)) {
                    window.open(formatSrc(item.exploreMedia!.src), "_blank", "noopener,noreferrer");
                  } else {
                    setSelectedIndex(index); 
                  }
                } else {
                  swiperInstance?.slideTo(index);
                }
              }}
              className="!w-[260px] !h-[320px] md:!w-[300px] md:!h-[400px] lg:!w-[320px] lg:!h-[420px] px-2 overflow-visible group/slide cursor-pointer"
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-xl bg-[var(--glass-background)] border border-[var(--border-color)]">
                <img 
                  src={formatSrc(item.image)} 
                  alt={item.name} 
                  className="absolute inset-0 block w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover/slide:scale-110 p-1 rounded-xl" 
                />
                
                <div
                  className="absolute inset-0 opacity-95 md:opacity-80 group-hover/slide:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ backgroundImage: 'linear-gradient(180deg, var(--carousel-overlay) 0%, var(--carousel-overlay-strong) 40%, transparent 100%)' }}
                />
                <div
                  className="absolute inset-0 transform translate-x-[-100%] group-hover/slide:translate-x-[100%] transition-transform duration-1000 ease-out pointer-events-none"
                  style={{ backgroundImage: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)' }}
                />

                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 pb-10 md:pb-12 translate-y-2 md:translate-y-4 group-hover/slide:translate-y-0 transition-transform duration-500 ease-out pointer-events-none">
                  <span className="text-[9px] md:text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase bg-[#D4AF37]/10 px-2 py-0.5 rounded-full inline-block mb-1.5">
                    {item.exploreMedia?.type === "url" ? "Live Site" : "Project"}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-white drop-shadow-lg leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-[11px] md:text-xs text-[var(--muted)] mt-1.5 md:mt-2 opacity-100 md:opacity-0 group-hover/slide:opacity-100 transition-opacity duration-500 delay-75 line-clamp-3 md:line-clamp-4">
                    {item.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center w-full z-20 pointer-events-auto">
          <div className="bg-[var(--panel)]/90 backdrop-blur-md px-3 py-2 rounded-full border border-[var(--border-color)] flex items-center shadow-lg shadow-[rgba(0,0,0,0.15)]">
            <div className="relative flex items-center" style={{ gap: '8px' }}>
              
              {items.map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={() => swiperInstance?.slideTo(i)}
                  initial={false}
                  animate={{ 
                    width: i === activeIndex ? 24 : 8,
                    backgroundColor: i === activeIndex ? 'var(--carousel-dot-active)' : 'var(--carousel-dot-inactive)'
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="h-2 rounded-full cursor-pointer focus:outline-none"
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}

              <motion.div
                className="absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r from-[#F3E5AB] to-[#D4AF37] pointer-events-none shadow-[0_0_12px_rgba(212,175,55,0.5)]"
                initial={false}
                animate={{ 
                  x: activeIndex * 16,
                  width: 24
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />

            </div>
          </div>
        </div>
      </div>

      {selectedIndex !== null && modalItem && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[rgba(15,23,42,0.95)] backdrop-blur-md p-4 md:p-10 cursor-zoom-out select-none"
          onClick={() => setSelectedIndex(null)}
        >
          <div className="relative max-w-7xl w-full h-full flex items-center justify-center">
            
            <button 
              className="absolute top-2 right-2 md:top-6 md:right-6 text-[var(--muted)] hover:text-[#D4AF37] text-5xl w-12 h-12 flex items-center justify-center z-[10000] transition-colors cursor-pointer"
              onClick={() => setSelectedIndex(null)}
            >
              &times;
            </button>

            {totalModalMedia > 1 && (
              <button
                className="absolute left-0 md:left-4 text-[var(--foreground)]/70 hover:text-[#D4AF37] p-4 z-[10000] transition-colors cursor-pointer group"
                onClick={(e) => {
                  e.stopPropagation(); 
                  setSelectedIndex((prev) => getNextMediaIndex(prev!, -1));
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 md:w-14 md:h-14 group-hover:-translate-x-1 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
            )}

            <div className="relative w-full max-h-full flex flex-col items-center justify-center">
              {mediaType === "video" ? (
                <video
                  src={formatSrc(modalSrc)}
                  controls
                  autoPlay
                  className="max-w-full max-h-[85vh] rounded-lg shadow-2xl cursor-default"
                  onClick={(e) => e.stopPropagation()} 
                />
              ) : (
                <img
                  src={formatSrc(modalSrc)}
                  alt={modalItem.name}
                  className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl cursor-default"
                  onClick={(e) => e.stopPropagation()} 
                />
              )}

              {totalModalMedia > 0 && (
                <p className="text-[var(--muted)] font-mono text-xs mt-4 tracking-widest">
                  {currentModalIndex} / {totalModalMedia}
                </p>
              )}
            </div>

            {totalModalMedia > 1 && (
              <button
                className="absolute right-0 md:right-4 text-[var(--foreground)]/70 hover:text-[#D4AF37] p-4 z-[10000] transition-colors cursor-pointer group"
                onClick={(e) => {
                  e.stopPropagation(); 
                  setSelectedIndex((prev) => getNextMediaIndex(prev!, 1));
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

export default ImageCarousel;