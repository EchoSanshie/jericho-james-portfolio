"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof document === "undefined") return "dark";
    return document.documentElement.classList.contains("light") ? "light" : "dark";
  });
  const isClickScrolling = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const homeSection = document.getElementById("home");
      const homeThreshold = homeSection ? homeSection.offsetHeight * 0.80 : window.innerHeight * 0.80;

      setIsVisible(currentScrollY >= homeThreshold);

      if (currentScrollY < homeThreshold) {
        setIsOpen(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleSectionTracking = () => {
      if (isClickScrolling.current) return;

      const sections = document.querySelectorAll("section[id]");
      const triggerPoint = window.scrollY + window.innerHeight * 0.35;

      for (const section of sections) {
        const el = section as HTMLElement;
        const sectionTop = el.offsetTop;
        const sectionHeight = el.offsetHeight;
        const sectionId = el.getAttribute("id");

        if (triggerPoint >= sectionTop && triggerPoint < sectionTop + sectionHeight) {
          if (sectionId) {
            setActiveSection(sectionId);
          }
          break;
        }
      }
    };

    window.addEventListener("scroll", handleSectionTracking, { passive: true });
    handleSectionTracking();

    return () => {
      window.removeEventListener("scroll", handleSectionTracking);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const navLinks = ["home", "about", "projects", "skills", "contact"];

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement> | null, link: string) => {
    if (e) e.preventDefault(); 

    setActiveSection(link);
    isClickScrolling.current = true;
    
    setIsOpen(false);

    setTimeout(() => {
      const targetElement = document.getElementById(link);
      
      if (targetElement) {
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY;
        
        const finalScrollPosition = offsetPosition - 120;

        window.scrollTo({
          top: finalScrollPosition,
          behavior: "smooth"
        });
      }
    }, 50); 

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 1200);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.style.colorScheme = theme;
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(nextTheme);
    root.style.colorScheme = nextTheme;
    window.localStorage.setItem("theme", nextTheme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", nextTheme === "dark" ? "#09090B" : "#ECE7DD");
  };

  useEffect(() => {
    const handleExternalClick = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        handleNavLinkClick(null, customEvent.detail);
      }
    };

    window.addEventListener("nav-click", handleExternalClick);
    return () => window.removeEventListener("nav-click", handleExternalClick);
  }, []); 

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -100, x: "-50%", opacity: 0 }}
          animate={{ 
            y: 0, 
            x: "-50%", 
            opacity: 1,
            borderRadius: isOpen ? "24px" : "9999px" 
          }}
          exit={{ y: -100, x: "-50%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-5 left-1/2 w-[calc(100%-2rem)] max-w-3xl z-50 py-3 px-4 md:px-6 
            bg-[var(--glass)] backdrop-blur-xl border border-[var(--border-color)] accent-hairline
            shadow-[var(--shadow-float)]"
        >
          <nav className="flex justify-between items-center px-2">
            <a href="#home" onClick={(e) => handleNavLinkClick(e, "home")} aria-label="Home">
              <img src="/Logo.svg" alt="Logo" className="icon-adaptive w-8 md:w-10 h-auto cursor-pointer hover:opacity-80 transition-opacity" />
            </a>

            <ul className="hidden md:flex gap-6 lg:gap-8 items-center text-sm md:text-base">
              {navLinks.map((link) => (
                <li key={link} className="relative group">
                  <a
                    href={`#${link}`}
                    onClick={(e) => handleNavLinkClick(e, link)}
                    className={`capitalize transition-colors duration-300 font-medium tracking-wide ${
                      activeSection === link ? "text-[var(--accent-text)]" : "text-[var(--muted)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    {link}
                  </a>
                  
                  {activeSection === link && (
                    <motion.span 
                      layoutId="activeIndicator"
                      className="absolute -bottom-2 left-0 w-full h-[2px] bg-[var(--accent)] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--glass-background)] text-[var(--foreground)] transition-colors hover:bg-[var(--hover)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
              >
                {theme === "dark" ? (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                )}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex md:hidden p-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors focus:outline-none"
                aria-label="Toggle Navigation Menu"
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
              >
                {isOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </nav>

          <AnimatePresence>
            {isOpen && (
              <motion.ul
                id="mobile-navigation"
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-4 items-center text-sm font-medium md:hidden overflow-hidden pb-2"
              >
                {navLinks.map((link) => (
                  <li key={link} className="w-full text-center py-1">
                    <a
                      href={`#${link}`}
                      onClick={(e) => handleNavLinkClick(e, link)}
                      className={`block w-full capitalize transition-colors duration-300 py-1 ${
                        activeSection === link ? "text-[var(--accent-text)]" : "text-[var(--muted)] hover:text-[var(--foreground)]"
                      }`}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}