import { motion, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { X, Play, ChevronLeft, ChevronRight } from "lucide-react";

import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { useLanguage } from "@/contexts/LanguageContext";
import { getVideoEmbedUrl, isEmbeddableVideoUrl } from "@/lib/video";

type MediaItem =
  | {
      type: "image";
      src: string;
      alt?: string;
    }
  | {
      type: "video";
      src: string;
      poster?: string;
    };

type Project = {
  title: string;
  category: { it: string; en: string };
  description: { it: string; en: string };
  videoUrl: string;
  thumbnailUrl: string;
  gallery?: string[];
  media?: MediaItem[];
};

type SelectedProjectState = {
  projectIndex: number;
  mediaIndex: number;
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
    media: [
      {
        type: "video",
        src: "https://drive.google.com/file/d/1T4l5_xxfhaF2RuGplF5Jk3qaNkx9LzC6/view?usp=sharing",
        poster: "/videos/1_comp.mp4",
      },
      { type: "image", src: "/images/ARTEVENT22.jpg", alt: "Summit 2025 opening" },
      { type: "image", src: "/images/Fede.JPG", alt: "Summit 2025 portrait" },
      { type: "video", src: "/videos/2.mp4", poster: "/videos/2.mp4" },
      { type: "image", src: "/images/Guido.JPG", alt: "Summit 2025 speaker" },
      { type: "image", src: "/images/ARTEVENT22.jpg", alt: "Summit 2025 opening" },
      { type: "image", src: "/images/Fede.JPG", alt: "Summit 2025 portrait" },
      { type: "video", src: "/videos/2.mp4", poster: "/videos/2.mp4" },
      { type: "image", src: "/images/Guido.JPG", alt: "Summit 2025 speaker" },
    ],
  },
  {
    title: "Summit 2025 Highlights",
    category: { it: "Evento", en: "Event" },
    description: {
      it: "Una selezione di contenuti misti pensata per mostrare foto e clip nello stesso carosello.",
      en: "A mixed media selection designed to showcase photos and clips in the same carousel.",
    },
    videoUrl: "",
    thumbnailUrl: "/videos/2.mp4",
    media: [
      { type: "image", src: "/images/ARTEVENT22.jpg", alt: "Summit 2025 opening" },
      { type: "image", src: "/images/Fede.JPG", alt: "Summit 2025 portrait" },
      { type: "video", src: "/videos/2.mp4", poster: "/videos/2.mp4" },
      { type: "image", src: "/images/Guido.JPG", alt: "Summit 2025 speaker" },
      { type: "image", src: "/images/film-aziendali-thumb.jpg", alt: "Summit 2025 stage" },
    ],
  },
  {
    title: "Summit 2025 Highlights - Extended",
    category: { it: "Video", en: "Video" },
    description: {
      it: "Clip principale del progetto, utilizzabile come slide singola nel carosello.",
      en: "Main clip for the project, usable as a single slide in the carousel.",
    },
    videoUrl: "",
    thumbnailUrl: "/videos/2.mp4",
  },
  {
    title: "Serie Visione CEO",
    category: { it: "Ritratti", en: "Portraits" },
    description: {
      it: "Serie fotografica editoriale con visualizzazione a scorrimento nel lightbox.",
      en: "Editorial portrait series displayed in a swipeable lightbox.",
    },
    videoUrl: "",
    thumbnailUrl: "/videos/1.mp4",
    gallery: [
      "/images/Fede.JPG",
      "/images/Guido.JPG",
      "/images/hero-bg.jpg",
      "/images/ARTEVENT2_2.png",
    ],
  },
  {
    title: "Storia Rebrand Meridian",
    category: { it: "Brand Story", en: "Brand Story" },
    description: {
      it: "Narrazione video per il rebranding con apertura in modale dedicata.",
      en: "Video storytelling for the rebrand with dedicated modal playback.",
    },
    videoUrl: "https://player.vimeo.com/video/111222333",
    thumbnailUrl: "/videos/1_comp.mp4",
  },
  {
    title: "Gala Annuale Apex",
    category: { it: "Evento Premium", en: "Premium Event" },
    description: {
      it: "Aftermovie e contenuti di scena raccolti in un unico progetto.",
      en: "Aftermovie and scene content collected in a single project.",
    },
    videoUrl: "https://player.vimeo.com/video/222333444",
    thumbnailUrl: "/videos/SHOWREEL_homepage_16.9.mp4",
  },
  {
    title: "Storia Rebrand Meridian - Archive",
    category: { it: "Archivio", en: "Archive" },
    description: {
      it: "Versione archivio del progetto per mantenere una seconda referenza in griglia.",
      en: "Archive version of the project to keep a second reference in the grid.",
    },
    videoUrl: "https://player.vimeo.com/video/111222333",
    thumbnailUrl: "/videos/1_comp.mp4",
  },
  {
    title: "Gala Annuale Apex - Archive",
    category: { it: "Archivio", en: "Archive" },
    description: {
      it: "Versione archivio con playback diretto da modale.",
      en: "Archive version with direct modal playback.",
    },
    videoUrl: "https://player.vimeo.com/video/222333444",
    thumbnailUrl: "/videos/SHOWREEL_homepage_16.9.mp4",
  },
];

const DIRECT_VIDEO_FILE_PATTERN = /\.(mp4|webm|ogg|mov)$/i;

function isDirectVideoFile(src: string): boolean {
  return DIRECT_VIDEO_FILE_PATTERN.test(src);
}

function getProjectMedia(project: Project): MediaItem[] {
  if (project.media?.length) {
    return project.media;
  }

  const media: MediaItem[] = [];

  if (project.videoUrl) {
    media.push({ type: "video", src: project.videoUrl, poster: project.thumbnailUrl });
  } else if (project.thumbnailUrl && isDirectVideoFile(project.thumbnailUrl) && !project.gallery?.length) {
    media.push({ type: "video", src: project.thumbnailUrl, poster: project.thumbnailUrl });
  }

  if (project.gallery?.length) {
    media.push(...project.gallery.map((src) => ({ type: "image" as const, src, alt: project.title })));
  }

  return media;
}

function getPreviewMedia(project: Project): MediaItem | null {
  if (project.media?.length) {
    return project.media[0];
  }

  if (project.gallery?.length) {
    return { type: "image", src: project.gallery[0], alt: project.title };
  }

  if (project.thumbnailUrl) {
    if (isDirectVideoFile(project.thumbnailUrl)) {
      return { type: "video", src: project.thumbnailUrl, poster: project.thumbnailUrl };
    }

    return { type: "image", src: project.thumbnailUrl, alt: project.title };
  }

  if (project.videoUrl) {
    return { type: "video", src: project.videoUrl };
  }

  return null;
}

function getMediaThumbnail(media: MediaItem, fallback: string): string {
  if (media.type === "image") {
    return media.src;
  }

  return media.poster ?? fallback;
}

const PortfolioSection = () => {
  const { language } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<SelectedProjectState | null>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [activeSlide, setActiveSlide] = useState(0);

  const selectedProject =
    selected !== null && selected.projectIndex >= 0 && selected.projectIndex < projects.length
      ? projects[selected.projectIndex]
      : null;
  const selectedMedia = selectedProject ? getProjectMedia(selectedProject) : [];

  const openProject = (projectIndex: number, mediaIndex = 0) => {
    setSelected({ projectIndex, mediaIndex });
  };

  useEffect(() => {
    if (selected === null) {
      setActiveSlide(0);
      return;
    }

    const safeMediaIndex = Math.min(Math.max(selected.mediaIndex, 0), Math.max(selectedMedia.length - 1, 0));
    setActiveSlide(safeMediaIndex);
    carouselApi?.scrollTo(safeMediaIndex, true);
  }, [selected, selectedMedia.length, carouselApi]);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const updateActiveSlide = () => {
      setActiveSlide(carouselApi.selectedScrollSnap());
    };

    updateActiveSlide();
    carouselApi.on("select", updateActiveSlide);
    carouselApi.on("reInit", updateActiveSlide);

    return () => {
      carouselApi.off("select", updateActiveSlide);
      carouselApi.off("reInit", updateActiveSlide);
    };
  }, [carouselApi]);

  const copy = {
    sectionLabel: language === "it" ? "Lavori Selezionati" : "Selected Work",
    headingMain: language === "it" ? "Il Nostro" : "Our",
    headingAccent: language === "it" ? "Portfolio" : "Portfolio",
    dragHint: language === "it" ? "Trascina il carosello o usa le frecce" : "Drag the carousel or use the arrows",
    quickOpen: language === "it" ? "Apri direttamente foto o video" : "Open a specific photo or video",
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
          {projects.map((project, i) => {
            const previewMedia = getPreviewMedia(project);
            const projectMedia = getProjectMedia(project);

            return (
              <motion.div
                key={`${project.title}-${i}`}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onClick={() => openProject(i, 0)}
                className="group cursor-pointer relative aspect-[4/3] bg-gradient-card border border-border overflow-hidden hover-card-lift"
              >
                {previewMedia?.type === "image" ? (
                  <img
                    src={previewMedia.src}
                    alt={previewMedia.alt ?? project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    draggable={false}
                  />
                ) : previewMedia?.type === "video" ? (
                  <video
                    src={previewMedia.src}
                    poster={previewMedia.poster}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : null}

                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <span className="font-body text-[10px] tracking-[0.4em] uppercase text-primary/70 mb-2">
                    {project.category[language]}
                  </span>
                  <h3 className="font-display text-xl font-light tracking-wide">{project.title}</h3>
                </div>

                <div className="absolute right-4 top-4 rounded-full border border-primary/40 bg-background/30 px-3 py-1 text-[10px] tracking-[0.3em] uppercase text-primary/80 backdrop-blur-sm">
                  {projectMedia.length} media
                </div>

                {projectMedia.length > 1 && (
                  <div className="absolute left-4 right-4 bottom-20 z-10">
                    <p className="mb-2 text-[9px] uppercase tracking-[0.3em] text-foreground/60 opacity-90 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
                      {copy.quickOpen}
                    </p>
                    <div className="flex gap-2 overflow-x-auto pb-1 opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
                      {projectMedia.map((media, mediaIndex) => {
                        const thumbnailSrc = getMediaThumbnail(media, project.thumbnailUrl);

                        return (
                          <button
                            key={`${project.title}-preview-${mediaIndex}`}
                            onClick={(event) => {
                              event.stopPropagation();
                              openProject(i, mediaIndex);
                            }}
                            className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border border-border/80 bg-background/70 backdrop-blur-sm transition-colors hover:border-primary"
                            aria-label={`Open media ${mediaIndex + 1} for ${project.title}`}
                          >
                            {thumbnailSrc ? (
                              <img
                                src={thumbnailSrc}
                                alt={`${project.title} preview ${mediaIndex + 1}`}
                                className="h-full w-full object-cover"
                                draggable={false}
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-background/70">
                                <Play className="h-4 w-4 text-primary" strokeWidth={1.5} />
                              </div>
                            )}
                            {media.type === "video" && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                <Play className="h-3.5 w-3.5 text-white" fill="currentColor" strokeWidth={1.5} />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-10 h-10 border border-primary/40 rounded-full flex items-center justify-center bg-background/30 backdrop-blur-sm">
                    <Play className="w-5 h-5 text-primary ml-0.5" strokeWidth={1} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-6"
            onClick={() => setSelected(null)}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 z-10 text-foreground/50 hover:text-foreground transition-colors"
              aria-label="Close portfolio media"
            >
              <X className="w-6 h-6" strokeWidth={1} />
            </button>

            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="w-full max-w-6xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative rounded-[28px] border border-border bg-card/80 p-4 md:p-6 shadow-[0_30px_120px_rgba(0,0,0,0.35)]">
                <div className="relative">
                  <Carousel
                    setApi={setCarouselApi}
                    opts={{ loop: selectedMedia.length > 1 }}
                    className="cursor-grab active:cursor-grabbing select-none"
                  >
                    <CarouselContent className="-ml-0">
                      {selectedMedia.map((media, index) => (
                        <CarouselItem key={`${selectedProject.title}-${index}`} className="pl-0">
                          <div className="aspect-[16/10] max-h-[72vh] overflow-hidden rounded-[22px] border border-border bg-background/70 flex items-center justify-center">
                            {media.type === "image" ? (
                              <img
                                src={media.src}
                                alt={media.alt ?? `${selectedProject.title} ${index + 1}`}
                                className="w-full h-full object-contain"
                                draggable={false}
                              />
                            ) : isEmbeddableVideoUrl(media.src) ? (
                              <iframe
                                src={getVideoEmbedUrl(media.src)}
                                title={`${selectedProject.title} ${index + 1}`}
                                className="h-full w-full"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            ) : (
                              <video
                                className="h-full w-full bg-black"
                                controls
                                playsInline
                                poster={media.poster}
                                preload="metadata"
                              >
                                <source src={media.src} type="video/mp4" />
                              </video>
                            )}
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>

                  {selectedMedia.length > 1 && (
                    <>
                      <button
                        onClick={() => carouselApi?.scrollPrev()}
                        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/70 text-foreground/80 backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
                        aria-label="Previous media"
                      >
                        <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
                      </button>
                      <button
                        onClick={() => carouselApi?.scrollNext()}
                        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/70 text-foreground/80 backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
                        aria-label="Next media"
                      >
                        <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
                      </button>
                    </>
                  )}
                </div>

                <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="font-body text-[10px] tracking-[0.4em] uppercase text-primary/70 mb-3">
                      {selectedProject.category[language]}
                    </p>
                    <h3 className="font-display text-3xl font-light tracking-wide mb-3">
                      {selectedProject.title}
                    </h3>
                    <p className="text-muted-foreground font-body text-sm leading-[2] max-w-2xl">
                      {selectedProject.description[language]}
                    </p>
                  </div>

                  <div className="md:text-right">
                    <p className="font-body text-[10px] tracking-[0.35em] uppercase text-foreground/50 mb-3">
                      {copy.dragHint}
                    </p>
                    <div className="flex max-w-full items-center gap-2 overflow-x-auto pb-1 md:justify-end">
                      {selectedMedia.map((_, index) => (
                        <button
                          key={`${selectedProject.title}-thumb-${index}`}
                          onClick={() => carouselApi?.scrollTo(index)}
                          className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border transition-all duration-300 ${
                            index === activeSlide
                              ? "border-primary shadow-[0_0_0_1px_rgba(212,175,55,0.45)]"
                              : "border-border hover:border-primary/50"
                          }`}
                          aria-label={`Go to media ${index + 1}`}
                        >
                          {(() => {
                            const media = selectedMedia[index];
                            const thumbnailSrc = getMediaThumbnail(media, selectedProject.thumbnailUrl);

                            return thumbnailSrc ? (
                              <img
                                src={thumbnailSrc}
                                alt={`${selectedProject.title} thumbnail ${index + 1}`}
                                className="h-full w-full object-cover"
                                draggable={false}
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-background/70">
                                <Play className="h-4 w-4 text-primary" strokeWidth={1.5} />
                              </div>
                            );
                          })()}
                          {selectedMedia[index].type === "video" && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                              <Play className="h-4 w-4 text-white" fill="currentColor" strokeWidth={1.5} />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioSection;
