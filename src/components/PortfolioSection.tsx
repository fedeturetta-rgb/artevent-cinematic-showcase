import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { X, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getVideoEmbedUrl, isEmbeddableVideoUrl } from "@/lib/video";

type Project = {
  title: string;
  category: { it: string; en: string };
  description: { it: string; en: string };
  videoUrl: string;
  thumbnailUrl: string;
  gallery?: string[];
};

const projects: Project[] = [
  {
    title: "AR-DY Parrucchieri",
    category: { it: "", en: "" },
    description: {
      it: "",
      en: "",
    },
    videoUrl: "https://drive.google.com/file/d/1T4l5_xxfhaF2RuGplF5Jk3qaNkx9LzC6/view?usp=sharing",
    thumbnailUrl: "/videos/1_comp.mp4",
  },
  {
    title: "Summit 2025 Highlights",
    category: { it: "", en: "" },
    description: {
      it: "",
      en: "",
    },
    videoUrl: "",
    thumbnailUrl: "/videos/2.mp4",
    gallery: [
      "/images/ARTEVENT22.jpg",
      "/images/ARTEVENT2_2.png",
      "/images/film-aziendali-thumb.jpg",
      "/images/Fede.JPG",
      "/images/Guido.JPG",
      "/images/hero-bg.jpg",
      "/images/ARTEVENT22.jpg",
      "/images/ARTEVENT2_2.png",
      "/images/film-aziendali-thumb.jpg",
    ],
  },
   {
    title: "Summit 2025 Highlights",
    category: { it: "", en: "" },
    description: {
      it: "",
      en: "",
    },
    videoUrl: "",
    thumbnailUrl: "/videos/2.mp4",
    gallery: [
      "/images/ARTEVENT22.jpg",
      "/images/ARTEVENT2_2.png",
      "/images/film-aziendali-thumb.jpg",
      "/images/Fede.JPG",
      "/images/Guido.JPG",
      "/images/hero-bg.jpg",
      "/images/ARTEVENT22.jpg",
      "/images/ARTEVENT2_2.png",
      "/images/film-aziendali-thumb.jpg",
    ],
  },
  {
    title: "Serie Visione CEO",
    category: { it: "", en: "" },
    description: {
      it: "",
      en: "",
    },
    videoUrl: "https://player.vimeo.com/video/555333111",
    thumbnailUrl: "/videos/1.mp4",
  },
  {
    title: "Storia Rebrand Meridian",
    category: { it: "", en: "" },
    description: {
      it: "",
      en: "",
    },
    videoUrl: "https://player.vimeo.com/video/111222333",
    thumbnailUrl: "/videos/1_comp.mp4",
  },
  {
    title: "Gala Annuale Apex",
    category: { it: "", en: "" },
    description: {
      it: "",
      en: "",
    },
    videoUrl: "https://player.vimeo.com/video/222333444",
    thumbnailUrl: "/videos/SHOWREEL_homepage_16.9.mp4",
  },
  {
    title: "Storia Rebrand Meridian",
    category: { it: "", en: "" },
    description: {
      it: "",
      en: "",
    },
    videoUrl: "https://player.vimeo.com/video/111222333",
    thumbnailUrl: "/videos/1_comp.mp4",
  },
  {
    title: "Gala Annuale Apex",
    category: { it: "", en: "" },
    description: {
      it: "",
      en: "",
    },
    videoUrl: "https://player.vimeo.com/video/222333444",
    thumbnailUrl: "/videos/SHOWREEL_homepage_16.9.mp4",
  },
];

const PortfolioSection = () => {
  const { language } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryIndices, setGalleryIndices] = useState<Record<number, number>>({});

  const prevImage = (i: number) => {
    setGalleryIndices((prev) => {
      const len = projects[i].gallery?.length || 1;
      const current = prev[i] || 0;
      return { ...prev, [i]: current === 0 ? len - 1 : current - 1 };
    });
  };

  const nextImage = (i: number) => {
    setGalleryIndices((prev) => {
      const len = projects[i].gallery?.length || 1;
      const current = prev[i] || 0;
      return { ...prev, [i]: (current + 1) % len };
    });
  };

  const copy = {
    sectionLabel: language === "it" ? "Lavori Selezionati" : "Selected Work",
    headingMain: language === "it" ? "Il Nostro" : "Our",
    headingAccent: language === "it" ? "Portfolio" : "Portfolio",
  };

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
            {copy.sectionLabel}
          </p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light">
            {copy.headingMain} <span className="italic text-primary">{copy.headingAccent}</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onClick={() => setSelected(i)}
              className="group cursor-pointer relative aspect-[4/3] bg-gradient-card border border-border overflow-hidden hover-card-lift"
            >
              {/* gallery manual slideshow or video thumbnail */}
              {project.gallery && project.gallery.length > 0 ? (
                <>
                  <img
                    src={project.gallery[galleryIndices[i] || 0]}
                    alt={`${project.title} - ${(galleryIndices[i] || 0) + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(i); }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/50 border border-border rounded-full flex items-center justify-center hover:border-primary transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 text-foreground/70" strokeWidth={1} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(i); }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/50 border border-border rounded-full flex items-center justify-center hover:border-primary transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-foreground/70" strokeWidth={1} />
                  </button>
                </>
              ) : project.thumbnailUrl ? (
                <video
                  src={project.thumbnailUrl}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : null}

              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <span className="font-body text-[10px] tracking-[0.4em] uppercase text-primary/70 mb-2">
                  {project.category[language]}
                </span>
                <h3 className="font-display text-xl font-light tracking-wide">{project.title}</h3>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-8 h-8 border border-primary/40 rounded-full flex items-center justify-center bg-background/30 backdrop-blur-sm">
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
              className={`w-full ${projects[selected].gallery ? 'max-w-5xl' : 'max-w-3xl'}`}
              onClick={(e) => e.stopPropagation()}
            >
              {projects[selected].gallery ? (
                <>
                  <div className="grid grid-cols-4 grid-rows-2 gap-3 mb-8">
                    {projects[selected].gallery!.slice(0,8).map((src, i) => (
                      <div key={i} className="aspect-square bg-card border border-border overflow-hidden">
                        <img
                          src={src}
                          alt={`${projects[selected].title} - ${i + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                          onClick={() => setSelectedImage(src)}
                        />
                      </div>
                    ))}
                  </div>
                  {selectedImage && (
                    <div
                      className="fixed inset-0 z-60 bg-background/90 flex items-center justify-center p-6"
                      onClick={() => setSelectedImage(null)}
                    >
                      <img
                        src={selectedImage}
                        className="max-w-full max-h-full object-contain"
                        alt="fullscreen"
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="aspect-video bg-gradient-card border border-border flex items-center justify-center mb-8">
                  {projects[selected].videoUrl ? (
                    (() => {
                      const url = projects[selected].videoUrl as string;
                      if (isEmbeddableVideoUrl(url)) {
                        return (
                          <iframe
                            width="100%"
                            height="100%"
                            src={getVideoEmbedUrl(url)}
                            title={projects[selected].title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded-lg"
                          />
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
              )}
              <p className="font-body text-[10px] tracking-[0.4em] uppercase text-primary/70 mb-3">
                {projects[selected].category[language]}
              </p>
              <h3 className="font-display text-3xl font-light mb-4 tracking-wide">
                {projects[selected].title}
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-[2]">
                {projects[selected].description[language]}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioSection;
