import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { useLanguage } from "@/contexts/LanguageContext";

const navLinks = {
  it: [
    { label: "Home", href: "#home" },
    { label: "Chi Siamo", href: "#about" },
    { label: "Lavori", href: "#portfolio" },
    { label: "Servizi", href: "#services" },
    { label: "Il Team", href: "#team" },
    { label: "Contatti", href: "#contact" },
  ],
  en: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Work", href: "#portfolio" },
    { label: "Services", href: "#services" },
    { label: "Team", href: "#team" },
    { label: "Contact", href: "#contact" },
  ],
};

// Scegli qui un file presente in public/images.
// Esempio: "/images/ARTEVENT2_2.png". Lascia stringa vuota per usare il logo SVG.
const logoImagePath = "/images/Logo_ARTEVENT_PRODUCTION_bianco.png";

// dimensioni logo (mobile + desktop)
const logoMobileClass = "h-12";
const logoDesktopClass = "md:h-20";

// dimensioni pulsante CTA (mobile + desktop)
const ctaMobileClass = "text-[8px]"; // esempio: h-6 testo piccolissimo
const ctaDesktopClass = "md:text-[13px]"; // le stesse regole Tailwind usate per il logo

const Navbar = () => {
  const { language, toggleLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const copy = {
    menuOpen: language === "it" ? "Apri menu" : "Open menu",
    menuClose: language === "it" ? "Chiudi menu" : "Close menu",
    contact: language === "it" ? "Contattaci" : "Contact us",
    languageToggle: language === "it" ? "EN" : "IT",
    languageAria:
      language === "it"
        ? "Passa alla lingua inglese"
        : "Switch to Italian language",
  };

  const toggleMobileMenu = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    };

    document.body.style.overflow = mobileOpen ? "hidden" : "";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen, closeMobileMenu]);

  return (
    <>
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
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-24">
          {/* Hamburger - left */}
          <div className="relative z-[60] flex items-center gap-2">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="p-2 -ml-2 text-foreground/70 hover:text-primary transition-colors"
              aria-label={mobileOpen ? copy.menuClose : copy.menuOpen}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <button
              type="button"
              onClick={toggleLanguage}
              className="px-2.5 py-1 border border-border text-[10px] tracking-[0.25em] uppercase text-foreground/70 hover:text-primary hover:border-primary/50 transition-colors"
              aria-label={copy.languageAria}
            >
              {copy.languageToggle}
            </button>
          </div>

          {/* Logo - center */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none">
            <a href="#home" onClick={closeMobileMenu} className="pointer-events-auto">
              {logoImagePath ? (
                <img
                  src={logoImagePath}
                  alt="Artevent logo"
                  className={`${logoMobileClass} ${logoDesktopClass} w-auto object-contain`}
                />
              ) : (
                <Logo
                  size={32}
                  className={`${logoMobileClass} ${logoDesktopClass} w-auto`}
                />
              )}
            </a>
          </div>

          {/* Right side - CTA */}
          <a
            href="#contact"
            onClick={closeMobileMenu}
            className={`inline-flex font-body ${ctaMobileClass} ${ctaDesktopClass} font-medium tracking-[0.3em] uppercase text-muted-foreground hover:text-primary transition-colors duration-500`}
          >
            {copy.contact}
          </a>
        </div>
      </motion.nav>

      {/* Full-screen menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-2xl pt-24"
          >
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center gap-10 px-6"
            >
              {navLinks[language].map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="font-display text-3xl md:text-4xl font-light tracking-[0.15em] uppercase text-foreground/80 hover:text-primary transition-colors duration-500"
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
