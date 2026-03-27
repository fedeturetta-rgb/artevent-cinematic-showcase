import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

type Partner = {
  name: string;
  logoSrc?: string;
};

const sharedPartnerLogo = "/images/partners/Lidl.png";

// Logo unico replicato nei 9 slot della versione griglia.
const partners: Partner[] = [
  { name: "Lidl", logoSrc: "/images/partners/Lidl.png" },
  { name: "Toyota", logoSrc: "/images/partners/toyota.png" },
  { name: "Fineco Bank", logoSrc: "/images/partners/FinecoBank_Logo.svg.png" },
  { name: "Brugi Store Este", logoSrc: "/images/partners/logo-brugi-store-este.png" },
  { name: "Motorola", logoSrc: "/images/partners/motorola.png" },
  { name: "Samsung", logoSrc: "/images/partners/samsung.png" },
  { name: "Verona", logoSrc: "/images/partners/verona.png" },
];

const PartnerLogo = ({ partner }: { partner: Partner }) => {
  if (partner.logoSrc) {
    return (
      <img
        src={partner.logoSrc}
        alt={partner.name}
        className="max-h-20 w-auto transition-all duration-300"
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

      </div>
    </section>
  );
};

export default PartnersSection;
