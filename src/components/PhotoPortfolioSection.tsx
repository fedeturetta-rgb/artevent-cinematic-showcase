import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const photos = [
  { src: "/images/ARTEVENT22.jpg", title: "Corporate Gala", category: "Eventi" },
  { src: "/images/ARTEVENT2_2.png", title: "Brand Identity", category: "Branding" },
  { src: "/images/film-aziendali-thumb.jpg", title: "Set Cinematografico", category: "Behind the Scenes" },
  { src: "/images/Fede.JPG", title: "Ritratto Creativo", category: "Ritratti" },
  { src: "/images/Guido.JPG", title: "Ritratto Executive", category: "Ritratti" },
  { src: "/images/hero-bg.jpg", title: "Location Scouting", category: "Paesaggi" },
  { src: "/images/ARTEVENT22.jpg", title: "Evento Premium", category: "Eventi" },
  { src: "/images/ARTEVENT2_2.png", title: "Visual Design", category: "Branding" },
  { src: "/images/film-aziendali-thumb.jpg", title: "Produzione", category: "Behind the Scenes" },
];

/* ─── 1. GRIGLIA CLASSICA ─── */
const GridGallery = ({ onSelect }: { onSelect: (i: number) => void }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const showTestimonials = false;   // 👈 QUI

  if (!showTestimonials) return null;   // 👈 QUI

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <p className="font-body text-[11px] tracking-[0.5em] uppercase text-primary/80 mb-6">
          Galleria Fotografica
        </p>
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light">
          Portfolio <span className="italic text-primary">Fotografico</span>
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.slice(0, 6).map((photo, i) => (
          <motion.div
            key={`grid-${i}`}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            onClick={() => onSelect(i)}
            className="group cursor-pointer relative aspect-[4/3] bg-card border border-border overflow-hidden hover-card-lift"
          >
            <img
              src={photo.src}
              alt={photo.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <span className="font-body text-[10px] tracking-[0.4em] uppercase text-primary/70 mb-2">
                {photo.category}
              </span>
              <h3 className="font-display text-xl font-light tracking-wide">{photo.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ─── 2. MASONRY ─── */
const MasonryGallery = ({ onSelect }: { onSelect: (i: number) => void }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const heights = ["aspect-[3/4]", "aspect-[4/3]", "aspect-[1/1]", "aspect-[3/4]", "aspect-[4/3]", "aspect-[1/1]", "aspect-[4/3]", "aspect-[3/4]", "aspect-[1/1]"];

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <p className="font-body text-[11px] tracking-[0.5em] uppercase text-primary/80 mb-6">
          Composizione Dinamica
        </p>
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light">
          Visione <span className="italic text-primary">Artistica</span>
        </h2>
      </motion.div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {photos.map((photo, i) => (
          <motion.div
            key={`masonry-${i}`}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            onClick={() => onSelect(i)}
            className={`group cursor-pointer relative ${heights[i]} bg-card border border-border overflow-hidden break-inside-avoid hover-card-lift`}
          >
            <img
              src={photo.src}
              alt={photo.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="font-body text-[10px] tracking-[0.4em] uppercase text-primary/70 mb-1 block">
                {photo.category}
              </span>
              <h3 className="font-display text-lg font-light tracking-wide">{photo.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ─── 3. CAROSELLO ─── */
const CarouselGallery = ({ onSelect }: { onSelect: (i: number) => void }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  const showTestimonials = false;   // 👈 QUI

  if (!showTestimonials) return null;   // 👈 QUI

  const prev = () => setCurrent((c) => (c === 0 ? photos.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === photos.length - 1 ? 0 : c + 1));

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <p className="font-body text-[11px] tracking-[0.5em] uppercase text-primary/80 mb-6">
          In Evidenza
        </p>
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light">
          Scatti <span className="italic text-primary">Selezionati</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative"
      >
        <div
          className="relative aspect-[21/9] bg-card border border-border overflow-hidden cursor-pointer"
          onClick={() => onSelect(current)}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={photos[current].src}
              alt={photos[current].title}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-10">
            <span className="font-body text-[10px] tracking-[0.4em] uppercase text-primary/70 mb-2 block">
              {photos[current].category}
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-light tracking-wide">
              {photos[current].title}
            </h3>
          </div>
        </div>

        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 border border-border bg-background/50 backdrop-blur-sm flex items-center justify-center hover:border-primary transition-colors duration-300"
        >
          <ChevronLeft className="w-5 h-5 text-foreground/70" strokeWidth={1} />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 border border-border bg-background/50 backdrop-blur-sm flex items-center justify-center hover:border-primary transition-colors duration-300"
        >
          <ChevronRight className="w-5 h-5 text-foreground/70" strokeWidth={1} />
        </button>

        <div className="flex justify-center gap-2 mt-6">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current ? "bg-primary w-6" : "bg-border hover:bg-primary/40"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

/* ─── SEZIONE PRINCIPALE ─── */
const PhotoPortfolioSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section id="photo-portfolio" className="section-padding bg-gradient-dark">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ height: 0 }}
          animate={inView ? { height: 60 } : {}}
          transition={{ duration: 0.8 }}
          className="w-px bg-primary/30 mx-auto mb-12"
        />

        <div className="space-y-32">
          <GridGallery onSelect={setLightbox} />
          <MasonryGallery onSelect={setLightbox} />
          <CarouselGallery onSelect={setLightbox} />
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/98 backdrop-blur-2xl flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-8 right-8 text-foreground/40 hover:text-foreground transition-colors"
            >
              <X className="w-6 h-6" strokeWidth={1} />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={photos[lightbox].src}
                alt={photos[lightbox].title}
                className="w-full max-h-[75vh] object-contain mb-8"
              />
              <p className="font-body text-[10px] tracking-[0.4em] uppercase text-primary/70 mb-3">
                {photos[lightbox].category}
              </p>
              <h3 className="font-display text-3xl font-light tracking-wide">
                {photos[lightbox].title}
              </h3>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhotoPortfolioSection;
