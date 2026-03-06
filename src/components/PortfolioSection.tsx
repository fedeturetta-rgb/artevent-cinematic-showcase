import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    title: "TEST1",
    category: "Film Aziendale",
    video: "/videos/hero-bg.mov",
  },
  {
    title: "Summit Conference",
    category: "Copertura Evento",
    video: "/videos/hero-bg.mov",
  },
  {
    title: "Aura Product Launch",
    category: "Video Prodotto",
    video: "/videos/hero-bg.mov",
  },
  {
    title: "CEO Vision Series",
    category: "Intervista Executive",
    video: "/videos/hero-bg.mov",
  },
];

const PortfolioSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="portfolio" className="section-padding bg-background">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-body text-[11px] tracking-[0.5em] uppercase text-primary/80 mb-6">
            Enjoy
          </p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light">
            Lavori <span className="italic text-primary">Selezionati</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden mb-5">
                <video
                  src={project.video}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  muted
                  autoPlay
                  loop
                  playsInline
                />
              </div>
              <h3 className="font-display text-xl md:text-2xl font-light tracking-wide mb-1">
                {project.title}
              </h3>
              <p className="font-body text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
                {project.category}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
