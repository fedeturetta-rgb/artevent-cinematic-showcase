import { Instagram, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border px-6 md:px-12 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center gap-8">
          {/* Logo */}
          <a href="#home" className="text-center">
            <span className="font-display text-xl font-light tracking-[0.15em] uppercase text-foreground">
              Arte
            </span>
            <span className="font-display text-xl font-light tracking-[0.15em] uppercase text-primary">
              vent
            </span>
            <p className="font-body text-[8px] tracking-[0.5em] uppercase text-muted-foreground mt-0.5">
              Studio
            </p>
          </a>

          {/* Social */}
          <div className="flex items-center gap-8">
            {[Instagram, Linkedin, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="text-foreground/20 hover:text-primary transition-colors duration-500"
                aria-label="Social media"
              >
                <Icon className="w-4 h-4" strokeWidth={1} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground/50">
            © 2026 Artevent Studio. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
