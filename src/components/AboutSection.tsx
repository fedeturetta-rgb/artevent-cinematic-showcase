import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Configura l'URL del tuo video qui
  // Puoi usare un link YouTube, un iframe Vimeo (es. "https://player.vimeo.com/video/123456789"),
  // un URL diretto a un MP4 remoto oppure un percorso locale come "/videos/reel.mp4".
  const videoUrl = "https://player.vimeo.com/video/1171082957";

  // Configura l'URL della thumbnail (foto o poster del video)
  // Puoi usare un'immagine locale (es. "/images/thumbnail.jpg") o un URL remoto.
  const thumbnailUrl = "fedeturetta-rgb/artevent-cinematic-showcase/src/assets/ARTEVENT_logo.png"; // Cambia questo con il tuo percorso immagine

  return (
    <section id="about" className="section-padding bg-gradient-dark">
      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Top decorative line */}
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
            Chi è Artevent Studio
          </p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light leading-tight">
            Dove la Visione Incontra{" "}
            <span className="italic text-primary">l'Arte Cinematografica</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-20 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-foreground/70 font-body text-sm leading-[2] mb-8">
              Artevent Studio è una casa di produzione video premium, scelta dai brand
              più prestigiosi per trasformare le loro narrazioni in esperienze visive potenti.
            </p>
            <p className="text-foreground/50 font-body text-sm leading-[2]">
              Con un team di registi, direttori della fotografia e montatori pluripremiati,
              curiamo ogni singolo fotogramma con intenzione — unendo arte e storytelling
              strategico per elevare il tuo brand sopra il rumore.
            </p>
            <div className="luxwine-line-h mt-10" />
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div
              onClick={() => setIsVideoOpen(true)}
              className="aspect-[4/3] bg-gradient-card border border-border overflow-hidden relative group cursor-pointer transition-all duration-700 hover:border-primary"
            >
              <img
                src={thumbnailUrl}
                alt="Video Thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors duration-700">
                <div className="text-center">
                  <div className="w-20 h-20 border border-primary/40 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:border-primary transition-colors duration-700">
                    <div className="w-0 h-0 border-l-[14px] border-l-primary/70 border-t-[9px] border-t-transparent border-b-[9px] border-b-transparent ml-1 group-hover:border-l-primary transition-colors duration-700" />
                  </div>
                  <p className="font-body text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
                    Guarda il Nostro Reel
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Dialog */}
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-4xl bg-black border-border">
          <DialogClose className="absolute top-4 right-4 z-50" />
          <div className="w-full aspect-video">
            {videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be") || videoUrl.includes("vimeo.com") ? (
              // Embed provider (YouTube/Vimeo)
              <iframe
                width="100%"
                height="100%"
                src={videoUrl}
                title="Artevent Studio Reel"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              />
            ) : videoUrl.startsWith("http") ? (
              // Video from URL (mp4 or other supported type)
              <video
                width="100%"
                height="100%"
                controls
                autoPlay
                className="rounded-lg bg-black"
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              // Local video file
              <video
                width="100%"
                height="100%"
                controls
                autoPlay
                className="rounded-lg bg-black"
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default AboutSection;
