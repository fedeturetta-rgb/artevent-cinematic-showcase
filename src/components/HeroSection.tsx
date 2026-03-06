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
          <source src="/videos/hero-bg.mov" type="video/quicktime" />
        </video>
        <div className="cinema-overlay absolute inset-0" />
      </div>

      {/* Side slide indicators */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-4">
        {["01", "02", "03"].map((num, i) => (
          <span
            key={num}
            className={`font-body text-xs tracking-widest transition-all duration-500 ${
              i === 0 ? "text-primary" : "text-foreground/20"
            }`}
          >
            {num}
          </span>
        ))}
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
          Produzione Video Corporate Premium
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-[1.1] mb-10 tracking-wide"
        >
          Tradizione, Innovazione{" "}
          <br className="hidden md:block" />
          e <span className="italic text-primary">Qualità</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-6 justify-center mt-14"
        >
          <a
            href="#portfolio"
            className="px-10 py-4 bg-primary/90 text-primary-foreground font-body font-medium text-[11px] uppercase tracking-[0.3em] hover:bg-primary transition-all duration-500"
          >
            Scopri i Lavori
          </a>
          <a
            href="#contact"
            className="px-10 py-4 border border-foreground/20 text-foreground/80 font-body font-medium text-[11px] uppercase tracking-[0.3em] hover:border-primary hover:text-primary transition-all duration-500"
          >
            Prenota una Call
          </a>
        </motion.div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
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
