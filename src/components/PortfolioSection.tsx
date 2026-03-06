import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    title: "TEST1",
    category: "Film Aziendale",
    image: "https://images.unsplash.com/photo-1619955888965-354ae3b9fd68?q=80&w=800",
  },
  {
    title: "Summit Conference",
    category: "Copertura Evento",
    image: "https://images.unsplash.com/photo-1664817550935-79d3b6255a82?q=80&w=800",
  },
  {
    title: "Aura Product Launch",
    category: "Video Prodotto",
    image: "https://images.unsplash.com/photo-1654723011663-2ac59c385b16?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
  {
    title: "CEO Vision Series",
    category: "Intervista Executive",
    image: "https://images.unsplash.com/photo-1654723011680-0e037c2a4f18?crop=entropy&cs=srgb&fm=jpg&q=85",
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
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
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
