import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[var(--surface)] w-full py-6 md:py-8 px-4 md:px-12 flex flex-col items-center mt-auto border-t border-[var(--border-color)]">
      <div className="w-full max-w-6xl flex flex-col-reverse md:flex-row justify-between items-center gap-6 text-[var(--muted)] text-xs md:text-sm tracking-wider">
        
        <div className="flex flex-col text-center md:text-left space-y-1 opacity-80">
          <span>&copy; Jericho James Panganiban.</span>
          <span>All rights reserved 2026.</span>
        </div>

        <div className="flex justify-center md:justify-end gap-6 md:gap-8">
          <a
            href="https://github.com/EchoSanshie?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300"
            aria-label="GitHub Profile"
          >
            <img src="/ic_GitHub.svg" alt="GitHub" className="w-5 h-5 md:w-6 md:h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/jericho-james-panganiban-370425390/"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300"
            aria-label="LinkedIn Profile"
          >
            <img src="/ic_LinkedIn.svg" alt="LinkedIn" className="w-5 h-5 md:w-6 md:h-6" />
          </a>
          <a
            href="https://www.facebook.com/echo.panganiban.24"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300"
            aria-label="Facebook Profile"
          >
            <img src="/ic_Messenger.svg" alt="Messenger" className="w-5 h-5 md:w-6 md:h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;