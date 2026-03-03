import { Instagram, Linkedin, Youtube, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border px-6 md:px-12 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <a href="#home" className="font-display text-xl font-bold tracking-tight">
            <span className="text-foreground">Arte</span>
            <span className="text-gradient-gold">vent</span>
          </a>
          <p className="text-muted-foreground font-body text-xs mt-2">
            Premium Corporate Video Production
          </p>
        </div>

        <div className="flex items-center gap-6">
          {[Instagram, Linkedin, Youtube, Twitter].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
              aria-label="Social media"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        <p className="text-muted-foreground font-body text-xs">
          © 2026 Artevent Studio. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
