import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

type Partner = {
  name: string;
  logoSrc?: string;
};

// Inserisci qui i tuoi loghi (consigliato: /public/images/partners/...).
const partners: Partner[] = [
  { name: "Microsoft" },
  { name: "Real Madrid" },
  { name: "Volvo" },
  { name: "Ralph Lauren" },
  { name: "Kansas City Chiefs" },
  { name: "Walmart" },
  { name: "Google" },
  { name: "Apple" },
  { name: "NBCUniversal" },
  { name: "Prime Video" },
  { name: "Shopify" },
];

const gridPartners = partners.slice(0, 9);

const PartnerLogo = ({ partner }: { partner: Partner }) => {
  if (partner.logoSrc) {
    return (
      <img
        src={partner.logoSrc}
        alt={partner.name}
        className="max-h-10 w-auto opacity-60 grayscale transition-all duration-300 group-hover:opacity-95 group-hover:grayscale-0"
        loading="lazy"
      />
    );
  }

  return (
    <span className="whitespace-nowrap font-body text-base md:text-lg font-semibold tracking-tight text-foreground/45 transition-colors duration-300 group-hover:text-foreground/80">
      {partner.name}
    </span>
  );
};

const PartnersSection = () => {
  const { language } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const copy = {
    label: language === "it" ? "Collaborazioni" : "Collaborations",
    heading: language === "it" ? "Aziende con cui abbiamo lavorato" : "Brands we have worked with",
    sliderLabel: language === "it" ? "Versione Scorrevole" : "Scrolling Version",
    gridLabel: language === "it" ? "Versione 3x3" : "3x3 Version",
  };

  return (
    <section id="partners" className="bg-gradient-dark pb-20">
      <div ref={ref} className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="px-6 sm:px-0 text-center mb-8"
        >
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-primary/70 mb-4">
            {copy.label}
          </p>
          <h2 className="font-display text-2xl md:text-4xl font-light text-foreground/90">
            {copy.heading}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-10"
        >
          <p className="px-6 sm:px-0 mb-4 font-body text-[10px] tracking-[0.35em] uppercase text-muted-foreground">
            {copy.sliderLabel}
          </p>

          <div className="relative border-y border-border/80 bg-black/25 py-7 overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />

            <motion.div
              className="flex w-max items-center gap-10 md:gap-14"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            >
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="group flex h-11 min-w-[130px] shrink-0 items-center justify-center px-1"
                >
                  <PartnerLogo partner={partner} />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <p className="px-6 sm:px-0 mb-4 font-body text-[10px] tracking-[0.35em] uppercase text-muted-foreground">
            {copy.gridLabel}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 px-6 sm:px-0">
            {gridPartners.map((partner, index) => (
              <motion.div
                key={`grid-${partner.name}`}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.03 * index }}
                className="group relative aspect-[4/3] border border-border bg-gradient-card overflow-hidden hover-card-lift"
              >
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <PartnerLogo partner={partner} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
