import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="section-padding bg-gradient-dark">
      <div ref={ref} className="max-w-3xl mx-auto">
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
            Inizia un Progetto
          </p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light">
            Creiamo Qualcosa di{" "}
            <span className="italic text-primary">Potente</span>
          </h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          <div className="grid sm:grid-cols-2 gap-8">
            <input
              type="text"
              placeholder="Il Tuo Nome"
              required
              className="w-full bg-transparent border-b border-border px-0 py-4 font-body text-xs tracking-wider text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-colors duration-500"
            />
            <input
              type="text"
              placeholder="Azienda"
              className="w-full bg-transparent border-b border-border px-0 py-4 font-body text-xs tracking-wider text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-colors duration-500"
            />
          </div>
          <input
            type="email"
            placeholder="Indirizzo Email"
            required
            className="w-full bg-transparent border-b border-border px-0 py-4 font-body text-xs tracking-wider text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-colors duration-500"
          />
          <textarea
            placeholder="Raccontaci del tuo progetto..."
            rows={4}
            required
            className="w-full bg-transparent border-b border-border px-0 py-4 font-body text-xs tracking-wider text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-colors duration-500 resize-none"
          />
          <div className="pt-4">
            <button
              type="submit"
              className="group inline-flex items-center gap-4 font-body text-[11px] tracking-[0.3em] uppercase text-primary hover:text-foreground transition-colors duration-500"
            >
              {submitted ? "Messaggio Inviato ✓" : "Invia il Messaggio"}
              {!submitted && (
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1} />
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
