import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const logoUrl = "/images/ARTEVENT2_2.png";

// dimensioni pulsante CTA (mobile + desktop)
const defaultCtaMobileClass = "text-xs"; // testo più leggibile su mobile
const defaultCtaDesktopClass = "md:text-sm"; // testo più grande su desktop

type NavbarProps = {
  /** Override classes for the CTA button on mobile */
  ctaMobileClass?: string;
  /** Override classes for the CTA button on desktop */
  ctaDesktopClass?: string;
};

const Navbar = ({ ctaMobileClass, ctaDesktopClass }: NavbarProps = {}) => {
  const [scrolled, setScrolled] = useState(false);
  const mobileCtaClass = ctaMobileClass ?? defaultCtaMobileClass;
  const desktopCtaClass = ctaDesktopClass ?? defaultCtaDesktopClass;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-12 flex items-center justify-between h-24">
        {/* Logo - center */}
        <a href="#home" className="absolute left-1/2 -translate-x-1/2 text-center">
          <img
            src={logoUrl}
            alt="Artevent Studio"
            className="h-30 md:h-40 object-contain"
          />
        </a>

        {/* Right side - CTA */}
        <a
          href="#contact"
          className={`ml-auto inline-flex font-body ${mobileCtaClass} ${desktopCtaClass} font-medium tracking-[0.3em] uppercase text-muted-foreground hover:text-primary transition-colors duration-500`}
        >
          Contattaci
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
