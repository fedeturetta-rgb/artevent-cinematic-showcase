import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    label: "Telefono",
    value: "+39 02 1234 5678",
    href: "tel:+390212345678",
  },
  {
    icon: Phone,
    label: "Telefono",
    value: "+39 02 1234 5678",
    href: "tel:+390212345678",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@arteventstudio.it",
    href: "mailto:info@arteventstudio.it",
  },
  {
    icon: MapPin,
    label: "Indirizzo",
    value: "Via Callesella, 1425, 37040 Zimella VR",
    href: "https://maps.app.goo.gl/j3BSYqzer5mX5bsb7",
  },
];

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="section-padding bg-gradient-dark">
      <div ref={ref} className="max-w-4xl mx-auto">
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
            Contattaci
          </p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light">
            Restiamo in{" "}
            <span className="italic text-primary">Contatto</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-px bg-border/30">
          {contactInfo.map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              target={item.icon === MapPin ? "_blank" : undefined}
              rel={item.icon === MapPin ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="bg-background p-10 group hover-card-lift border-glow text-center flex flex-col items-center"
            >
              <div className="w-14 h-14 border border-primary/20 rounded-full flex items-center justify-center mb-6 group-hover:border-primary/50 transition-colors duration-500">
                <item.icon className="w-5 h-5 text-primary/60 group-hover:text-primary transition-colors duration-500" strokeWidth={1} />
              </div>
              <p className="font-body text-[10px] tracking-[0.4em] uppercase text-primary/70 mb-3">
                {item.label}
              </p>
              <p className="font-body text-sm text-foreground/70 group-hover:text-foreground transition-colors duration-500 leading-relaxed">
                {item.value}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
