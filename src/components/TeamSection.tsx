import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const teamMembers = [
  {
    name: "Guido Frigo",
    title: { it: "Regista & Fondatore", en: "Director & Founder" },
    description: {
      it: "Oltre 15 anni di esperienza nella regia di film aziendali e documentari per brand internazionali.",
      en: "Over 15 years of experience directing corporate films and documentaries for international brands.",
    },
    image: "/images/Guido.JPG", // Inserisci il percorso dell'immagine, es: "/images/team-1.jpg"
  },
  {
    name: "Federico Turetta",
    title: { it: "Post-Produzione & Montaggio", en: "Post-Production & Editing" },
    description: {
      it: "Esperto di color grading e montaggio narrativo per produzioni premium.",
      en: "Expert in color grading and narrative editing for premium productions.",
    },
    image: "/images/Fede.JPG",
  },
];

const TeamSection = () => {
  const { language } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const copy = {
    sectionLabel: language === "it" ? "Il Nostro Team" : "Our Team",
    headingMain: language === "it" ? "Le Menti" : "The Creative",
    headingAccent: language === "it" ? "Creative" : "Minds",
    photoFallback: language === "it" ? "Foto" : "Photo",
  };

  return (
    <section id="team" className="section-padding bg-gradient-dark">
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
          className="text-center mb-20"
        >
          <p className="font-body text-[11px] tracking-[0.5em] uppercase text-primary/80 mb-6">
            {copy.sectionLabel}
          </p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light leading-tight">
            {copy.headingMain} <span className="italic text-primary">{copy.headingAccent}</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-px bg-border/30">
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="bg-background p-8 group hover-card-lift border-glow"
            >
              {/* Photo */}
              <div className="aspect-[3/4] mb-8 overflow-hidden bg-gradient-card border border-border">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 border border-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="font-display text-2xl text-primary/40">
                          {member.name.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                      <p className="font-body text-[9px] tracking-[0.3em] uppercase text-muted-foreground">
                        {copy.photoFallback}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="luxwine-line-h mb-6" />
              <h3 className="font-display text-xl md:text-2xl font-light mb-1">
                {member.name}
              </h3>
              <p className="font-body text-[10px] tracking-[0.3em] uppercase text-primary/70 mb-4">
                {member.title[language]}
              </p>
              <p className="font-body text-sm text-foreground/50 leading-relaxed">
                {member.description[language]}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
