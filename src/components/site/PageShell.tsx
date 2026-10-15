
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

export function PageHero({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-primary pt-20 text-primary-foreground">
      <div className="absolute inset-0 opacity-30">
        {image && (
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <div className="absolute inset-0 bg-hero-overlay" />

      <div className="relative mx-auto flex min-h-[62vh] max-w-[1440px] items-end px-5 py-16 lg:px-10 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          <p className="eyebrow text-accent">{eyebrow}</p>

          <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
            {title.endsWith(".") ? title.slice(0, -1) : title}
            <span className="text-[#f58220]">.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-primary-foreground/75 sm:text-lg">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export function ServiceList({ items }: { items: string[] }) {
  return (
    <div className="grid border-t border-border md:grid-cols-2">
      {items.map((item, i) => (
        <motion.div
          key={item}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="group flex gap-5 border-b border-border p-6 md:min-h-40 md:border-r lg:p-8"
        >
          <span className="font-heading text-sm font-semibold text-accent">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h2 className="text-xl font-semibold leading-snug transition-transform group-hover:translate-x-1">
            {item}
          </h2>
        </motion.div>
      ))}
    </div>
  );
}

export function EnquiryBand({ service }: { service: string }) {
  return (
    <section className="bg-accent py-14 text-accent-foreground">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-8 px-5 lg:flex-row lg:items-center lg:px-10">
        <div>
          <p className="eyebrow">Start a conversation</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Need support with {service}?
          </h2>
        </div>
        <Button asChild size="lg" variant="secondary">
          <Link to="/contact" search={{ service }}>
            Discuss your requirement <ArrowRight />
          </Link>
        </Button>
      </div>
    </section>
  );
}
