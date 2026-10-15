
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  Handshake,
  Lightbulb,
  MapPin,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { motion } from "motion/react";

import marine from "@/assets/marine-boiler.jpg";
import worldmap from "@/assets/worldmap.png";
import { COMPANY } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Mercury Energy Solutions" },
      {
        name: "description",
        content:
          "Discover Mercury Energy Solutions, our vision, mission, values and international presence across energy engineering.",
      },
      { property: "og:title", content: "About Mercury Energy Solutions" },
      {
        property: "og:description",
        content:
          "Engineering expertise. Reliable energy systems. Long-term partnerships.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: About,
});

const values = [
  {
    number: "01",
    title: "Integrity",
    description:
      "Honest decisions, transparent communication and accountability.",
    Icon: ShieldCheck,
  },
  {
    number: "02",
    title: "Client-centered",
    description:
      "Solutions shaped around our customers' needs and goals.",
    Icon: Handshake,
  },
  {
    number: "03",
    title: "Quality",
    description:
      "Reliable engineering with safety and performance in focus.",
    Icon: Check,
  },
  {
    number: "04",
    title: "Excellence",
    description:
      "Continuous improvement and a commitment to getting it right.",
    Icon: Sparkles,
  },
];

const markets = [
  {
    role: "Headquarters",
    countries: ["🇮🇳 India"],
    color: "#F58220",
  },
  {
    role: "Business development",
    countries: ["🇩🇪 Germany", "🇫🇮 Finland", "🇮🇩 Indonesia"],
    color: "#294F8F",
  },
  {
    role: "Manufacturing",
    countries: [
      "🇻🇳 Vietnam",
      "🇹🇭 Thailand",
      "🇲🇾 Malaysia",
      "🇸🇬 Singapore",
    ],
    color: "#0D9488",
  },
  {
    role: "Coming soon",
    countries: ["🇬🇷 Greece"],
    color: "#94A3B8",
  },
];

const services = [
  { label: "Marine", href: "/services/marine-boiler" },
  { label: "Industry", href: "/services/land-boiler" },
  { label: "Biomass", href: "/services/biomass-fuel" },
  { label: "Solar", href: "/services/solar-energy" },
  { label: "Spare parts", href: "/services/spare-parts" },
];


const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function About() {
  return (
    <main className="overflow-hidden bg-white text-[#10233F]">
      {/* HERO */}
      
      {/* HERO — MUTED BACKGROUND VIDEO */}
      <section className="relative isolate flex min-h-[440px] items-end overflow-hidden bg-[#061A34] sm:min-h-[520px] lg:min-h-[600px]">
        <video
          src="/media/about.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />

        {/* Dark overlays for readable text */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#041329]/90 via-[#061A34]/60 to-[#061A34]/25" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#061A34]/75 via-transparent to-[#061A34]/10" />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto w-full max-w-[1440px] px-5 pb-16 pt-32 sm:px-10 sm:pb-20 lg:px-16 lg:pb-24"
        >
          <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#F58220]">
            About Mercury
          </p>

          <h1 className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Built on Trust<span className="text-[#F58220]">,</span>
            <br />
            <span className="text-white">
              Driven by Engineering<span className="text-[#F58220]">.</span>
            </span>
          </h1>

          <motion.a
            href="#who-we-are"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.97 }}
            className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#F58220] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#e87312] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Discover Mercury
            <ArrowDownRight size={18} />
          </motion.a>
        </motion.div>
      </section>


      {/* WHO WE ARE */}
      <section
        id="who-we-are"
        className="scroll-mt-20 px-5 py-20 sm:px-10 sm:py-28 lg:px-16"
      >
        <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#F58220]">
              Who we are
            </p>

            <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Built around the realities of operating energy systems<span className="text-[#F58220]">.</span>
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0.12 }}
            className="self-center"
          >
            <p className="text-base leading-8 text-slate-600">
              Mercury Energy Solutions Private Limited provides design,
              engineering, supply and services for boilers and power equipment
              across marine and land-based applications.
            </p>

            <p className="mt-5 text-base leading-8 text-slate-600">
              Our capabilities span boiler systems, fuel conversion, biomass,
              solar energy, retrofits, maintenance and spare parts—supporting
              dependable operations throughout the equipment lifecycle.
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {services.map((service, index) => (
                <motion.div
                  key={service.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.07, duration: 0.35 }}
                >
                  <Link
                    to={service.href}
                    className="group inline-flex min-h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-[#10233F] transition-all duration-300 hover:border-[#F58220] hover:bg-[#F58220] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F58220] focus-visible:ring-offset-2"
                  >
                    {service.label}
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* VISION + MISSION */}
      <section className="bg-[#F5F7FA] px-5 py-16 sm:px-10 sm:py-20 lg:px-16">
        <div className="mx-auto max-w-[1280px]">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mb-10 max-w-xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#F58220]">
              Our direction
            </p>
            
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2">
            <motion.article
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55 }}
              whileHover={{ y: -5 }}
              className="group rounded-2xl border border-slate-200/80 bg-white p-7 transition-all duration-500 hover:border-[#F58220] hover:bg-[#F58220] hover:shadow-xl hover:shadow-orange-900/10 sm:p-10"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-orange-50 text-[#F58220] transition-colors duration-500 group-hover:bg-white/15 group-hover:text-white">
                <Lightbulb size={23} />
              </div>

              <h3 className="mt-6 text-xl font-semibold text-slate-900 transition-colors duration-500 group-hover:text-white">
                Our vision <span className="text-[#F58220]">.</span>
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600 transition-colors duration-500 group-hover:text-white/90">
                To become a trusted leader in energy solutions, recognized for
                engineering excellence, commitment and lasting customer
                relationships.
              </p>
            </motion.article>

            <motion.article
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="group rounded-2xl border border-slate-200/80 bg-white p-7 transition-all duration-500 hover:border-[#F58220] hover:bg-[#F58220] hover:shadow-xl hover:shadow-orange-900/10 sm:p-10"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-orange-50 text-[#F58220] transition-colors duration-500 group-hover:bg-white/15 group-hover:text-white">
                <Target size={23} />
              </div>

              <h3 className="mt-6 text-xl font-semibold text-slate-900 transition-colors duration-500 group-hover:text-white">
                Our mission <span className="text-[#F58220]">.</span>
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600 transition-colors duration-500 group-hover:text-white/90">
                To engineer, supply and service boiler systems and power
                equipment for marine and land applications, prioritizing safe,
                efficient and sustainable operations.
              </p>
            </motion.article>
          </div>
        </div>
      </section>

      {/* VALUES — CONTINUOUS RIGHT-TO-LEFT MARQUEE */}
      <section className="overflow-hidden bg-[#061A34] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-10 lg:px-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#F58220]">
                What guides us
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Our values<span className="text-[#F58220]">.</span>
              </h2>
            </div>
          </motion.div>
        </div>

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#061A34] to-transparent sm:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#061A34] to-transparent sm:w-16" />

          <div className="values-marquee flex w-max">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                aria-hidden={copy === 1 ? true : undefined}
                className="flex shrink-0"
              >
                {values.map(({ number, title, description, Icon }) => (
                  <article
                    key={`${copy}-${title}`}
                    className="group mx-2 w-[260px] rounded-xl border border-white/10 bg-white/[0.035] p-5 transition-all duration-300 hover:border-[#F58220]/60 hover:bg-white/[0.07] sm:w-[300px] sm:p-6"
                  >
                    <div className="flex items-center justify-between">
                      <span aria-hidden="true" />
                      <Icon
                        size={20}
                        strokeWidth={1.7}
                        className="text-[#F58220] transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>

                    <h3 className="mt-5 text-base font-semibold text-white">
                      {title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/60">
                      {description}
                    </p>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>

        <style>{`
          .values-marquee {
            animation: values-scroll 34s linear infinite;
            will-change: transform;
          }

          .values-marquee:hover {
            animation-play-state: paused;
          }

          @keyframes values-scroll {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .values-marquee {
              animation: none;
              transform: translateX(0);
            }
          }
        `}</style>
      </section>

      {/* GLOBAL PRESENCE */}

{/* GLOBAL PRESENCE — BORDERLESS MAP + TEXT ANIMATION */}
<section className="overflow-hidden bg-[#F5F7FA] py-14 sm:py-20">
  <div className="mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-16">
    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#F58220]">
        Global presence
      </p>

      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#10233F] sm:text-5xl">
        Connected across markets
        <motion.span
          className="inline-block text-[#F58220]"
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          .
        </motion.span>
      </h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25, duration: 0.8 }}
        className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base"
      >
        A growing international network supporting engineering, manufacturing
        and energy solutions across markets.
      </motion.p>
    </motion.div>

    <div className="mt-8 grid items-center gap-8 lg:grid-cols-[4fr_1fr] lg:gap-10">
      {/* Free-floating map — no border or card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative flex min-h-[240px] items-center justify-center sm:min-h-[360px] lg:min-h-[460px]"
      >
        <motion.img
          src={worldmap}
          alt="World map showing Mercury Energy Solutions' international presence"
          loading="lazy"
          className="h-auto max-h-[480px] w-full object-contain"
          whileHover={{ scale: 1.025 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* Subtle animated accent */}
        
      </motion.div>

      {/* Animated market details */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-1 lg:gap-y-7">
        {markets.map((market, index) => (
          <motion.div
            key={market.role}
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              delay: index * 0.12,
              duration: 0.55,
              ease: "easeOut",
            }}
            whileHover={{ x: 4 }}
            className="group min-w-0 cursor-default"
          >
            <div className="flex items-center gap-2.5">
              <motion.span
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: market.color }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  delay: index * 0.3,
                  ease: "easeInOut",
                }}
              />

              <h3 className="text-sm font-semibold text-[#10233F] transition-colors duration-300 group-hover:text-[#F58220]">
                {market.role}
              </h3>
            </div>

            <motion.p
              className="mt-2 pl-5 text-xs leading-6 text-slate-500 sm:text-sm"
              initial={{ opacity: 0.65 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              {market.countries.join(" · ")}
            </motion.p>

            <motion.div
              className="ml-5 mt-2 h-px origin-left bg-[#F58220]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.35 + index * 0.12,
                duration: 0.6,
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  </div>
</section>

     
      {/* FIND US — SINGLE MAP EMBED */}

      {/* FIND US — OFFICE DETAILS LEFT, MAP RIGHT */}
      <section
        id="find-us"
        className="bg-[#061A34] px-5 py-20 text-white sm:px-10 sm:py-24 lg:px-16"
      >
        <div className="mx-auto max-w-[1280px]">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="mb-9"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#F58220]">
              Find us
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Our office<span className="text-[#F58220]">.</span>
            </h2>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-stretch">
            {/* LEFT — OFFICE DETAILS */}
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-start justify-center py-4 lg:py-8"
            >
              <div className="flex size-12 items-center justify-center rounded-xl border border-[#F58220]/25 bg-[#F58220]/10 text-[#F58220]">
                <MapPin size={23} />
              </div>

              <p className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#F58220]">
                India · Headquarters
              </p>

              <h3 className="mt-3 text-xl font-semibold text-white">
                Mercury Energy Solutions
              </h3>

              <p className="mt-4 text-sm leading-7 text-white/70">
                {COMPANY.office}
              </p>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  COMPANY.office,
                )}`}
                target="_blank"
                rel="noreferrer"
                className="group mt-7 inline-flex min-h-11 w-fit items-center gap-3 rounded-full bg-[#F58220] px-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#e87312] hover:shadow-lg hover:shadow-orange-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F58220] focus-visible:ring-offset-2 focus-visible:ring-offset-[#061A34]"
              >
                Open in Google Maps
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </motion.div>

            {/* RIGHT — MAP */}
            <motion.div
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="relative min-h-[320px] overflow-hidden rounded-2xl border border-white/10 bg-[#102d4c] sm:min-h-[400px] lg:min-h-[440px]"
            >
              <iframe
                title="Mercury Energy Solutions office in Pune, India"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  COMPANY.office,
                )}&z=14&output=embed`}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FINAL CTA — MINIMAL, NO WHITE CARD */}
      <section className="bg-gradient-to-br from-[#eef3f8] via-[#f8fafc] to-[#e9eff6] px-5 py-16 sm:px-10 sm:py-20 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-7 rounded-2xl border border-white/40 bg-white/30 p-7 shadow-xl shadow-[#061A34]/5 backdrop-blur-xl sm:p-10 lg:flex-row lg:items-center lg:p-12"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F58220]">
              Start a conversation
            </p>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#061A34] sm:text-3xl">
              Let’s discuss your next project
              <span className="text-[#F58220]">.</span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">
              Connect with our team to discuss your engineering and energy
              requirements.
            </p>
          </div>

          <Link
            to="/contact"
            className="group inline-flex min-h-12 shrink-0 items-center gap-3 rounded-full bg-[#061A34] px-6 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#F58220] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F58220] focus-visible:ring-offset-2"
          >
            Contact us
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </section>
    </main>
  );

}