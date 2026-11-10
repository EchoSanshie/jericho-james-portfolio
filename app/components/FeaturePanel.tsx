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
      className="feature-panel w-full my-8 md:my-12 relative rounded-3xl p-[1px] overflow-hidden group/panel cursor-pointer bg-[var(--border-color)] transition-shadow duration-500"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 opacity-0 group-hover/panel:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              250px circle at ${mouseX}px ${mouseY}px, 
              color-mix(in srgb, var(--accent) 45%, transparent), 
              transparent 80%
            )
          `,
        }}
      />

      <div className="w-full h-full glass-panel border-none py-6 md:py-8 rounded-[23px] relative z-20 overflow-hidden">
        
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 opacity-0 group-hover/panel:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                450px circle at ${mouseX}px ${mouseY}px, 
                color-mix(in srgb, var(--accent) 10%, transparent), 
                transparent 80%
              )
            `,
          }}
        />

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6 px-6 md:px-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 group cursor-default">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full glass-panel flex items-center justify-center border border-[var(--border-color)] group-hover:border-[var(--accent)] transition-colors duration-300 shrink-0">
              <img src="/ic_lightning.svg" alt="" aria-hidden="true" className="icon-adaptive w-4 h-4 md:w-5 md:h-5" />
            </div>
            <p className="text-xs md:text-base font-medium text-[var(--muted)] break-words">Modern <br className="hidden sm:block" /><span className="text-gold-gradient font-semibold">UI/UX Layouts</span></p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 group cursor-default">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full glass-panel flex items-center justify-center border border-[var(--border-color)] group-hover:border-[var(--accent)] transition-colors duration-300 shrink-0">
              <img src="/ic_briefcase.svg" alt="" aria-hidden="true" className="icon-adaptive w-4 h-4 md:w-5 md:h-5" />
            </div>
            <p className="text-xs md:text-base font-medium text-[var(--muted)] break-words">Responsive <br className="hidden sm:block" /><span className="text-gold-gradient font-semibold">Architecture</span></p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 group cursor-default">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full glass-panel flex items-center justify-center border border-[var(--border-color)] group-hover:border-[var(--accent)] transition-colors duration-300 shrink-0">
              <img src="/ic_computer.svg" alt="" aria-hidden="true" className="icon-adaptive w-4 h-4 md:w-5 md:h-5" />
            </div>
            <p className="text-xs md:text-base font-medium text-[var(--muted)] break-words">Creative <br className="hidden sm:block" /><span className="text-gold-gradient font-semibold">Digital Art</span></p>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="absolute inset-0 rounded-3xl border border-transparent group-hover/panel:border-[var(--accent)] transition-colors duration-500 pointer-events-none z-30" />
      
    </motion.div>
  );
}
