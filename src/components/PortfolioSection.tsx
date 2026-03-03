import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { X, Play } from "lucide-react";

const projects = [
  {
    title: "TechVault Brand Launch",
    category: "Corporate Film",
    description: "A cinematic reveal for TechVault's global rebrand, shot across three continents.",
  },
  {
    title: "Summit 2025 Highlights",
    category: "Event Coverage",
    description: "Full multi-day coverage of the annual leadership summit with 5,000+ attendees.",
  },
  {
    title: "Nova Product Reveal",
    category: "Product Video",
    description: "A sleek product launch video that drove 3M+ views in the first 48 hours.",
  },
  {
    title: "CEO Vision Series",
    category: "Executive Interview",
    description: "A 6-part thought leadership series featuring Fortune 500 executives.",
  },
  {
    title: "Meridian Rebrand Story",
    category: "Brand Storytelling",
    description: "Documenting a 100-year-old company's transformation for a new era.",
  },
  {
    title: "Apex Annual Gala",
    category: "Event Coverage",
    description: "Black-tie gala captured with cinematic elegance and real-time editing.",
  },
];

const PortfolioSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="portfolio" className="section-padding bg-gradient-dark">
      <div ref={ref} className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
            Selected Work
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Our <span className="text-gradient-gold">Portfolio</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onClick={() => setSelected(i)}
              className="group cursor-pointer relative aspect-[16/10] bg-gradient-card border-glow rounded-sm overflow-hidden hover-card-lift"
            >
              <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-background/90 via-background/40 to-transparent">
                <span className="text-primary font-body text-xs tracking-[0.2em] uppercase mb-1">
                  {project.category}
                </span>
                <h3 className="font-display text-lg font-semibold">{project.title}</h3>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-14 h-14 border-2 border-primary rounded-full flex items-center justify-center bg-background/50 backdrop-blur-sm">
                  <Play className="w-5 h-5 text-primary ml-0.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setSelected(null)}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 text-foreground/60 hover:text-foreground transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video bg-gradient-card border-glow rounded-sm flex items-center justify-center mb-6">
                <div className="w-20 h-20 border-2 border-primary rounded-full flex items-center justify-center">
                  <Play className="w-8 h-8 text-primary ml-1" />
                </div>
              </div>
              <h3 className="font-display text-2xl font-bold mb-2">
                {projects[selected].title}
              </h3>
              <p className="text-primary font-body text-sm tracking-widest uppercase mb-3">
                {projects[selected].category}
              </p>
              <p className="text-muted-foreground font-body leading-relaxed">
                {projects[selected].description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioSection;
