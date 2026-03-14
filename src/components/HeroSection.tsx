import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/SHOWREEL_homepage_16.9.mp4" type="video/mp4" />
        </video>
        <div className="cinema-overlay absolute inset-0" />
      </div>


      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Vertical line */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 60 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-px bg-primary/40 mx-auto mb-10"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-body text-[11px] md:text-xs tracking-[0.5em] uppercase text-primary/80 mb-8"
        >
          Produzione Foto/Video Corporate
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-[1.1] uppercase mb-10 tracking-wide"
        >
          Raccontiamo Storie{" "}
          <br />
          Che Muovono i Brand
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-6 justify-center mt-14"
        >
          <a
            href="#portfolio" //per far apparire il tasto togli la scritta "hidden" dopo className
            className="hidden px-10 py-4 border border-foreground/20 text-foreground/80 font-body font-medium text-[11px] uppercase tracking-[0.3em] hover:bg-primary transition-all duration-500" 
          >
            Scopri chi siamo
          </a>
          <a
            href="#about" //per far apparire il tasto togli la scritta "hidden" dopo className
            className="hidden px-10 py-4 border border-foreground/20 text-foreground/80 font-body font-medium text-[11px] uppercase tracking-[0.3em] hover:bg-primary transition-all duration-500"
          >
            Scopri i Lavori
          </a>
          <a
            href="#contact" //per far apparire il tasto togli la scritta "hidden" dopo className
            className="hidden px-10 py-4 border border-foreground/20 text-foreground/80 font-body font-medium text-[11px] uppercase tracking-[0.3em] hover:border-primary hover:text-primary transition-all duration-500"
          >
            scopri i servizi
          </a>
        </motion.div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="font-body text-[13px] tracking-[0.4em] uppercase text-foreground/40"
        >
          Scorri in basso
        </motion.span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-10 bg-foreground/20"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
