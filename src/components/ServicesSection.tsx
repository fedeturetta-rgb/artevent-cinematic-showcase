import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Film, Camera, Mic, Package, Clapperboard } from "lucide-react";
import filmAziendaliThumb from "@/assets/film-aziendali-thumb.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const services = [
  {
    icon: Film,
    title: { it: "Film Aziendali", en: "Corporate Films" },
    description: {
      it: "Film cinematografici che catturano l'essenza e i valori della tua azienda con una produzione di livello hollywoodiano.",
      en: "Cinematic films that capture your company's essence and values with Hollywood-level production.",
    },
    thumbnailUrl: filmAziendaliThumb,
  },
  {
    icon: Camera,
    title: { it: "Copertura Eventi", en: "Event Coverage" },
    description: {
      it: "Documentazione multi-camera che trasforma conferenze e gala in narrazioni visive coinvolgenti.",
      en: "Multi-camera documentation that turns conferences and galas into engaging visual narratives.",
    },
    thumbnailUrl: filmAziendaliThumb,
  },
  {
    icon: Clapperboard,
    title: { it: "Brand Storytelling", en: "Brand Storytelling" },
    description: {
      it: "Contenuti narrativi strategici che creano connessioni emotive profonde con il tuo pubblico target.",
      en: "Strategic narrative content that creates deep emotional connections with your target audience.",
    },
    thumbnailUrl: filmAziendaliThumb,
  },
  {
    icon: Package,
    title: { it: "Video Prodotto", en: "Product Video" },
    description: {
      it: "Showcase di prodotto eleganti e ad alto impatto, progettati per convertire gli spettatori in clienti.",
      en: "Elegant, high-impact product showcases designed to convert viewers into customers.",
    },
    thumbnailUrl: filmAziendaliThumb,
  },
  {
    icon: Mic,
    title: { it: "Interviste Executive", en: "Executive Interviews" },
    description: {
      it: "Contenuti di thought-leadership professionali che posizionano i tuoi leader come autorita del settore.",
      en: "Professional thought-leadership content that positions your leaders as industry authorities.",
    },
    thumbnailUrl: filmAziendaliThumb,
  },
];

const ServicesSection = () => {
  const { language } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const copy = {
    sectionLabel: language === "it" ? "Cosa Facciamo" : "What We Do",
    headingMain: language === "it" ? "I Nostri" : "Our",
    headingAccent: language === "it" ? "Servizi" : "Services",
    cta: language === "it" ? "Richiedi un Preventivo" : "Request a Quote",
  };

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
            {copy.sectionLabel}
          </p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light">
            {copy.headingMain} <span className="italic text-primary">{copy.headingAccent}</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {services.map((service, i) => (
            <motion.div
              key={service.title.en}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`bg-background group cursor-pointer hover:bg-card transition-colors duration-700 overflow-hidden ${service.thumbnailUrl ? '' : 'p-10 md:p-12'}`}
            >
              {service.thumbnailUrl ? (
                <div className="relative">
                  <img src={service.thumbnailUrl} alt={service.title[language]} className="w-full h-48 object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="p-10 md:p-12">
                    <service.icon className="w-7 h-7 text-primary/60 mb-8 group-hover:text-primary transition-colors duration-500" strokeWidth={1} />
                    <h3 className="font-display text-xl md:text-2xl font-light mb-4 tracking-wide">
                      {service.title[language]}
                    </h3>
                    <p className="text-muted-foreground font-body text-xs leading-[2] tracking-wide">
                      {service.description[language]}
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <service.icon className="w-7 h-7 text-primary/60 mb-8 group-hover:text-primary transition-colors duration-500" strokeWidth={1} />
                  <h3 className="font-display text-xl md:text-2xl font-light mb-4 tracking-wide">
                    {service.title[language]}
                  </h3>
                  <p className="text-muted-foreground font-body text-xs leading-[2] tracking-wide">
                    {service.description[language]}
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
              {copy.cta}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
