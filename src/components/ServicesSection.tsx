import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Film, Camera, Mic, Package, Clapperboard } from "lucide-react";
import filmAziendaliThumb from "@/assets/film-aziendali-thumb.jpg";

const services = [
  {
    icon: Film,
    title: "Film Aziendali",
    description: "Film cinematografici che catturano l'essenza e i valori della tua azienda con una produzione di livello hollywoodiano.",
    thumbnailUrl: filmAziendaliThumb,
  },
  {
    icon: Camera,
    title: "Copertura Eventi",
    description: "Documentazione multi-camera che trasforma conferenze e gala in narrazioni visive coinvolgenti.",
    thumbnailUrl: "src/assets/ARTEVENT22.jpg",
  },
  {
    icon: Clapperboard,
    title: "Brand Storytelling",
    description: "Contenuti narrativi strategici che creano connessioni emotive profonde con il tuo pubblico target.",
  },
  {
    icon: Package,
    title: "Video Prodotto",
    description: "Showcase di prodotto eleganti e ad alto impatto, progettati per convertire gli spettatori in clienti.",
  },
  {
    icon: Mic,
    title: "Interviste Executive",
    description: "Contenuti di thought-leadership professionali che posizionano i tuoi leader come autorità del settore.",
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="section-padding">
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
            Cosa Facciamo
          </p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light">
            I Nostri <span className="italic text-primary">Servizi</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`bg-background group cursor-pointer hover:bg-card transition-colors duration-700 overflow-hidden ${service.thumbnailUrl ? '' : 'p-10 md:p-12'}`}
            >
              {service.thumbnailUrl ? (
                <div className="relative">
                  <img src={service.thumbnailUrl} alt={service.title} className="w-full h-48 object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="p-10 md:p-12">
                    <service.icon className="w-7 h-7 text-primary/60 mb-8 group-hover:text-primary transition-colors duration-500" strokeWidth={1} />
                    <h3 className="font-display text-xl md:text-2xl font-light mb-4 tracking-wide">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground font-body text-xs leading-[2] tracking-wide">
                      {service.description}
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <service.icon className="w-7 h-7 text-primary/60 mb-8 group-hover:text-primary transition-colors duration-500" strokeWidth={1} />
                  <h3 className="font-display text-xl md:text-2xl font-light mb-4 tracking-wide">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground font-body text-xs leading-[2] tracking-wide">
                    {service.description}
                  </p>
                </>
              )}
            </motion.div>
          ))}
          {/* Empty cell to complete the grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-background p-10 md:p-12 flex items-center justify-center"
          >
            <a
              href="#contact"
              className="font-body text-[11px] tracking-[0.3em] uppercase text-primary/70 hover:text-primary transition-colors duration-500 border-b border-primary/30 pb-1"
            >
              Richiedi un Preventivo
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
