import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Camera, Aperture, Focus, Sun } from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Fotografia d'Autore",
    description: "Scatti che raccontano storie uniche, con un'estetica cinematografica e una cura maniacale per ogni dettaglio.",
  },
  {
    icon: Aperture,
    title: "Ritratti & Branding",
    description: "Ritratti professionali e immagini di brand che comunicano personalità, valori e autenticità.",
  },
  {
    icon: Focus,
    title: "Eventi & Reportage",
    description: "Copertura fotografica discreta e raffinata per eventi aziendali, conferenze e occasioni speciali.",
  },
  {
    icon: Sun,
    title: "Still Life & Prodotto",
    description: "Fotografia di prodotto con illuminazione studiata per esaltare texture, materiali e design.",
  },
];

const AboutPhotoSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about-photo" className="section-padding bg-gradient-dark">
      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Decorative line */}
        <motion.div
          initial={{ height: 0 }}
          animate={inView ? { height: 60 } : {}}
          transition={{ duration: 0.8 }}
          className="w-px bg-primary/30 mx-auto mb-12"
        />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-body text-[11px] tracking-[0.5em] uppercase text-primary/80 mb-6">
            Fotografia
          </p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light leading-tight">
            L'Arte di Catturare{" "}
            <span className="italic text-primary">l'Istante Perfetto</span>
          </h2>
        </motion.div>

        {/* Intro text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <p className="text-foreground/70 font-body text-sm leading-[2] mb-6">
            La fotografia è il cuore pulsante della nostra visione creativa. 
            Ogni scatto nasce dall'unione tra tecnica impeccabile e sensibilità artistica, 
            trasformando momenti fugaci in immagini senza tempo.
          </p>
          <p className="text-foreground/50 font-body text-sm leading-[2]">
            Dalla composizione alla post-produzione, ogni fase è curata con la stessa 
            attenzione al dettaglio che contraddistingue il nostro lavoro cinematografico — 
            perché un'immagine straordinaria vale più di mille parole.
          </p>
          <div className="luxwine-line-h mx-auto mt-10" />
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              className="group bg-gradient-card border border-border p-8 lg:p-10 hover-card-lift"
            >
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 border border-primary/30 flex items-center justify-center shrink-0 group-hover:border-primary transition-colors duration-700">
                  <feature.icon className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors duration-700" />
                </div>
                <div>
                  <h3 className="font-display text-xl lg:text-2xl font-light mb-3 group-hover:text-primary transition-colors duration-700">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/50 font-body text-sm leading-[1.8]">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutPhotoSection;
