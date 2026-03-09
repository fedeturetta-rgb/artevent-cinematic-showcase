import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { X, Play } from "lucide-react";

const projects = [
  {
    title: "Lancio Brand TechVault",
    category: "Film Aziendale",
    description: "Una rivelazione cinematografica per il rebrand globale di TechVault, girata in tre continenti.",
    // sample Vimeo video and a thumbnail image
    videoUrl: "/videos/1.mp4",
    thumbnailUrl: "/videos/1.mp4",
  },
  {
    title: "Summit 2025 Highlights",
    category: "Copertura Evento",
    description: "Copertura completa multi-giornata del summit annuale di leadership con oltre 5.000 partecipanti.",
    videoUrl: "https://player.vimeo.com/video/987654321",
    thumbnailUrl: "/videos/2.mp4",
  },
  {
    title: "Lancio Prodotto Nova",
    category: "Video Prodotto",
    description: "Un video di lancio prodotto elegante che ha generato oltre 3 milioni di visualizzazioni nelle prime 48 ore.",
    videoUrl: "https://player.vimeo.com/video/987654321",
    thumbnailUrl: "/videos/SHOWREEL_homepage_16.9.mp4",
  },
  {
    title: "Serie Visione CEO",
    category: "Intervista Executive",
    description: "Una serie di thought-leadership in 6 episodi con dirigenti Fortune 500.",
    videoUrl: "https://player.vimeo.com/video/555333111",
    thumbnailUrl: "/videos/1.mp4",
  },
  {
    title: "Storia Rebrand Meridian",
    category: "Brand Storytelling",
    description: "Documentare la trasformazione di un'azienda centenaria per una nuova era.",
    videoUrl: "https://player.vimeo.com/video/111222333",
    thumbnailUrl: "/videos/SHOWREEL_homepage_16.9.mp4",
  },
  {
    title: "Gala Annuale Apex",
    category: "Copertura Evento",
    description: "Gala catturato con eleganza cinematografica e montaggio in tempo reale.",
    videoUrl: "https://player.vimeo.com/video/222333444",
    thumbnailUrl: "/videos/SHOWREEL_homepage_16.9.mp4",
  },
];

const PortfolioSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="portfolio" className="section-padding bg-gradient-dark">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ height: 0 }}
          animate={inView ? { height: 60 } : {}}
          transition={{ duration: 0.8 }}
          className="w-px bg-primary/30 mx-auto mb-12"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <p className="font-body text-[11px] tracking-[0.5em] uppercase text-primary/80 mb-6">
            Lavori Selezionati
          </p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light">
            Il Nostro <span className="italic text-primary">Portfolio</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onClick={() => setSelected(i)}
              className="group cursor-pointer relative aspect-[4/3] bg-gradient-card border border-border overflow-hidden hover-card-lift"
            >
              {/* thumbnail if available */}
              {project.thumbnailUrl && (
                <video
                  src={project.thumbnailUrl}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              )}

              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <span className="font-body text-[10px] tracking-[0.4em] uppercase text-primary/70 mb-2">
                  {project.category}
                </span>
                <h3 className="font-display text-xl font-light tracking-wide">{project.title}</h3>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-16 h-16 border border-primary/40 rounded-full flex items-center justify-center bg-background/30 backdrop-blur-sm">
                  <Play className="w-5 h-5 text-primary ml-0.5" strokeWidth={1} />
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
            className="fixed inset-0 z-50 bg-background/98 backdrop-blur-2xl flex items-center justify-center p-6"
            onClick={() => setSelected(null)}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-8 right-8 text-foreground/40 hover:text-foreground transition-colors"
            >
              <X className="w-6 h-6" strokeWidth={1} />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video bg-gradient-card border border-border flex items-center justify-center mb-8">
                {projects[selected].videoUrl ? (
                  // embed video same logic as AboutSection
                  (() => {
                    const url = projects[selected].videoUrl as string;
                    if (url.includes("youtube.com") || url.includes("youtu.be") || url.includes("vimeo.com")) {
                      return (
                        <iframe
                          width="100%"
                          height="100%"
                          src={url}
                          title={projects[selected].title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="rounded-lg"
                        />
                      );
                    } else if (url.startsWith("http")) {
                      return (
                        <video
                          width="100%"
                          height="100%"
                          controls
                          autoPlay
                          className="rounded-lg bg-black"
                        >
                          <source src={url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      );
                    } else {
                      return (
                        <video
                          width="100%"
                          height="100%"
                          controls
                          autoPlay
                          className="rounded-lg bg-black"
                        >
                          <source src={url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      );
                    }
                  })()
                ) : (
                  <div className="w-20 h-20 border border-primary/40 rounded-full flex items-center justify-center">
                    <Play className="w-7 h-7 text-primary ml-1" strokeWidth={1} />
                  </div>
                )}
              </div>
              <p className="font-body text-[10px] tracking-[0.4em] uppercase text-primary/70 mb-3">
                {projects[selected].category}
              </p>
              <h3 className="font-display text-3xl font-light mb-4 tracking-wide">
                {projects[selected].title}
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-[2]">
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
