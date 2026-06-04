import { motion, useMotionValue, useMotionTemplate } from "framer-motion";

export default function FeaturePanel() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      whileHover={{ 
        scale: 1.015, 
        y: -4,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
      onMouseMove={handleMouseMove}
      className="w-full my-8 md:my-12 relative rounded-3xl p-[1px] overflow-hidden group/panel cursor-pointer bg-[var(--border-color)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3),0_0_30px_rgba(212,175,55,0.2)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6),0_0_40px_rgba(212,175,55,0.15)] transition-shadow duration-500"
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover/panel:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              250px circle at ${mouseX}px ${mouseY}px, 
              #FDE047, 
              transparent 80%
            )
          `,
        }}
      />

      <div className="w-full h-full glass-panel border-none py-6 md:py-8 rounded-[23px] relative z-20 overflow-hidden bg-zinc-950/90 dark:bg-zinc-900/90 backdrop-blur-xl">
        
        <motion.div
          className="absolute inset-0 opacity-0 group-hover/panel:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                450px circle at ${mouseX}px ${mouseY}px, 
                rgba(212, 175, 55, 0.09), 
                transparent 80%
              )
            `,
          }}
        />

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6 px-6 md:px-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 group cursor-default">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full glass-panel flex items-center justify-center border border-[var(--border-color)] group-hover:border-amber-500/40 dark:group-hover:border-[#D4AF37]/40 transition-colors duration-300 shrink-0">
              <img src="/ic_lightning.svg" alt="Lightning Icon" className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <h3 className="text-xs md:text-base font-medium text-[var(--muted)]">Modern <br className="hidden sm:block" /><span className="text-gold-gradient font-semibold">UI/UX Layouts</span></h3>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 group cursor-default">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full glass-panel flex items-center justify-center border border-[var(--border-color)] group-hover:border-amber-500/40 dark:group-hover:border-[#D4AF37]/40 transition-colors duration-300 shrink-0">
              <img src="/ic_briefcase.svg" alt="Briefcase Icon" className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <h3 className="text-xs md:text-base font-medium text-[var(--muted)]">Responsive <br className="hidden sm:block" /><span className="text-gold-gradient font-semibold">Architecture</span></h3>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 group cursor-default">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full glass-panel flex items-center justify-center border border-[var(--border-color)] group-hover:border-amber-500/40 dark:group-hover:border-[#D4AF37]/40 transition-colors duration-300 shrink-0">
              <img src="/ic_computer.svg" alt="Computer Icon" className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <h3 className="text-xs md:text-base font-medium text-[var(--muted)]">Creative <br className="hidden sm:block" /><span className="text-gold-gradient font-semibold">Digital Art</span></h3>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 rounded-3xl border border-transparent group-hover/panel:border-[#D4AF37]/60 transition-colors duration-500 pointer-events-none z-30" />
      
    </motion.div>
  );
}