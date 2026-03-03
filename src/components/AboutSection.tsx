import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-gradient-dark">
      <div ref={ref} className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
            About Artevent Studio
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Where Vision Meets{" "}
            <span className="text-gradient-gold">Cinematic Craft</span>
          </h2>
          <div className="w-20 h-0.5 bg-primary mb-8" />
          <p className="text-muted-foreground font-body leading-relaxed mb-6 text-lg">
            Artevent Studio is a premium video production house trusted by enterprise
            brands to transform their narratives into powerful visual experiences.
          </p>
          <p className="text-muted-foreground font-body leading-relaxed">
            With a team of award-winning directors, cinematographers, and editors, we
            craft every frame with intention — blending artistry with strategic
            storytelling that elevates your brand above the noise.
          </p>
        </motion.div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-[4/3] bg-gradient-card border-glow rounded-sm overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 border-2 border-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="w-0 h-0 border-l-[16px] border-l-primary border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1" />
                </div>
                <p className="text-muted-foreground font-body text-sm tracking-widest uppercase">
                  Watch Our Reel
                </p>
              </div>
            </div>
          </div>
          {/* Decorative element */}
          <div className="absolute -bottom-4 -right-4 w-full h-full border border-primary/20 rounded-sm -z-10" />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
