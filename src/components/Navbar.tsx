import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Languages, ChevronDown } from "lucide-react";
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
const logoMobileClass = "h-36";
const logoDesktopClass = "md:h-36";

// dimensioni pulsante CTA (mobile + desktop)
const ctaMobileClass = "text-[8px]"; // esempio: h-6 testo piccolissimo
const ctaDesktopClass = "md:text-[13px]"; // le stesse regole Tailwind usate per il logo

const Navbar = () => {
  const { language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement | null>(null);

  const copy = {
    menuOpen: language === "it" ? "Apri menu" : "Open menu",
    menuClose: language === "it" ? "Chiudi menu" : "Close menu",
    contact: language === "it" ? "Contattaci" : "Contact us",
    language: language === "it" ? "Lingua" : "Language",
    languageAria: language === "it" ? "Seleziona lingua" : "Select language",
    italian: "Italiano",
    english: "English",
  };

  const toggleMobileMenu = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const toggleLanguageMenu = useCallback(() => {
    setLanguageOpen((prev) => !prev);
  }, []);

  const selectLanguage = useCallback(
    (nextLanguage: "it" | "en") => {
      setLanguage(nextLanguage);
      setLanguageOpen(false);
    },
    [setLanguage],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        languageMenuRef.current &&
        !languageMenuRef.current.contains(event.target as Node)
      ) {
        setLanguageOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
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

            <div ref={languageMenuRef} className="relative">
              <button
                type="button"
                onClick={toggleLanguageMenu}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-border text-[10px] tracking-[0.18em] uppercase text-foreground/70 hover:text-primary hover:border-primary/50 transition-colors"
                aria-label={copy.languageAria}
                aria-expanded={languageOpen}
                aria-controls="language-menu"
              >
                <Languages className="w-3.5 h-3.5" />
                <span>{language.toUpperCase()}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${languageOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {languageOpen && (
                  <motion.div
                    id="language-menu"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 min-w-[140px] border border-border bg-background/95 backdrop-blur-xl p-1"
                  >
                    <button
                      type="button"
                      onClick={() => selectLanguage("it")}
                      className={`w-full text-left px-3 py-2 text-xs tracking-[0.18em] uppercase transition-colors ${
                        language === "it"
                          ? "text-primary bg-primary/10"
                          : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                      }`}
                    >
                      {copy.italian}
                    </button>
                    <button
                      type="button"
                      onClick={() => selectLanguage("en")}
                      className={`w-full text-left px-3 py-2 text-xs tracking-[0.18em] uppercase transition-colors ${
                        language === "en"
                          ? "text-primary bg-primary/10"
                          : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                      }`}
                    >
                      {copy.english}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
