import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect } from "react";


import {
  ArrowRight,
  Activity,
  Anchor,
  ChevronLeft,
  ChevronRight,
  Gauge,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import marine from "@/assets/marine banner.jpeg";
import { PageHero } from "@/components/site/PageShell";

export const Route = createFileRoute("/services/marine-boiler")({
  component: MarineBoilerPage,
});

const whyChooseUs = [
  {
    icon: Anchor,
    title: "Marine Boiler Solutions",
    description:
      "Specialized thermal and marine boiler solutions focused on reliability and operational efficiency.",
  },
  {
    icon: Wrench,
    title: "End-to-End support",
    description: "Design, supply, installation, commissioning, servicing and upgrades.",
  },
  {
    icon: ShieldCheck,
    title: "Safety-led delivery",
    description:
      "Maintenance and technical work aligned with applicable safety and class requirements.",
  },
  {
    icon: Activity,
    title: "Lifecycle performance",
    description: "Retrofits, efficiency improvements and service-life extension.",
  },
];

const capabilities = [
  {
    icon: Gauge,
    title: "Inspection & diagnostics",
    description:
      "Onboard inspections, troubleshooting, NDE and borescope assessments to identify issues before they escalate.",
  },
  {
    icon: Wrench,
    title: "Repair & refurbishment",
    description:
      "Boiler repairs, tube renewal, refractory work, insulation restoration and protective surface treatment.",
  },
  {
    icon: Activity,
    title: "Automation & efficiency",
    description:
      "Burner automation, BMS, ignition systems, instrumentation and performance optimisation.",
  },
  {
    icon: ShieldCheck,
    title: "Safety & lifecycle",
    description:
      "Fitness-for-service assessment, life-extension studies, design upgrades and retrofit solutions.",
  },
];

const MARINE_SERVICES = [
  {
    number: "01",
    title: "Insulation Repair and Re-application",
    description:
      "Repair or replacement of damaged boiler insulation to support thermal performance and protect surrounding equipment.",
    image: "/media/1.png",
  },
  {
    number: "02",
    title: "Commissioning Support",
    description:
      "Technical support during system checks, startup, functional testing and commissioning activities.",
    image: "/media/2.png",
  },
  {
    number: "03",
    title: "Refractory Re-installation & Repair",
    description:
      "Refractory inspection, lining repairs and reinstatement to help protect boiler components from high temperatures.",
    image: "/media/3.png",
  },
  {
    number: "04",
    title: "Chemical Cleaning and Descaling",
    description:
      "Cleaning and descaling solutions to address deposits and help maintain heat-transfer performance.",
    image: "/media/4.png",
  },
  {
    number: "05",
    title: "Surface Preparation and Re-painting",
    description:
      "Surface preparation and coating application to help protect equipment against corrosion and environmental exposure.",
    image: "/media/5.png",
  },
  {
    number: "06",
    title: "Onboard Boiler Inspection, Operation, Troubleshooting and Maintenance",
    description:
      "Onboard technical assistance, operating checks, fault investigation and preventive maintenance.",
    image: "/media/6.png",
  },
  {
    number: "07",
    title: "Boiler Repairs, Design Upgrades & Retrofit Solutions",
    description:
      "Repair and upgrade solutions tailored to equipment condition, operational needs and lifecycle requirements.",
    image: "/media/7.png",
  },
  {
    number: "08",
    title: "Burner Automation, BMS & Ignition System Services",
    description:
      "Support for burner controls, burner management systems, ignition equipment and operating sequences.",
    image: "/media/8.png",
  },
  {
    number: "09",
    title: "Electrical & Instrumentation Services",
    description:
      "Inspection and servicing of instrumentation, control wiring, sensors and related electrical systems.",
    image: "/media/9.png",
  },
  {
    number: "10",
    title: "Performance Optimization & Efficiency Study",
    description:
      "Review of operating performance and potential improvements in combustion, heat transfer and energy efficiency.",
    image: "/media/10.png",
  },
  {
    number: "11",
    title: "Non-destructive Examination (NDE) & Borescope Inspection",
    description:
      "Equipment condition assessment using suitable non-destructive examination methods and borescope inspection.",
    image: "/media/11.png",
  },
  {
    number: "12",
    title: "Life Extension and Fitness-for-Service (FFS) Assessment – API 579-1 / ASME FFS",
    description:
      "Engineering assessments to evaluate equipment condition and support repair, continued operation or upgrade decisions.",
    image: "/media/12.png",
  },
  {
    number: "13",
    title: "Boiler Tube Assessment, Plugging & Renewal",
    description:
      "Boiler tube condition assessment and appropriate plugging or renewal solutions based on inspection findings.",
    image: "/media/13.png",
  },
];


function MarineBoilerPage() {
  const capabilitiesSliderRef = useRef<HTMLDivElement>(null);

  const scrollCapabilities = (direction: "left" | "right") => {
    const slider = capabilitiesSliderRef.current;
    if (!slider) return;

    slider.scrollBy({
      left: direction === "right" ? slider.clientWidth * 0.8 : -slider.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  return (
    <>
      <PageHero
        eyebrow="Marine solutions"
        title="Reliable marine boiler systems from design to optimization."
        description="Reliable marine boiler services, maintenance and upgrades designed to support safe vessel operations and dependable performance."
        image={marine}
      />

      {/* WHY CHOOSE US */}
      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f58220]">
              Why choose us
            </span>

            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-[#061a34] sm:text-4xl lg:text-5xl">
              Marine Boiler Expertise
              <span className="text-[#f58220]">.</span>
            </h2>

            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">
              Practical engineering support focused on safety, equipment reliability and long-term
              vessel performance.
            </p>

            <a
              href="/contact"
              className="mt-8 inline-flex rounded-full bg-[#061a34] px-6 py-3.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#f58220] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f58220]"
            >
              Discuss your requirements
            </a>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {whyChooseUs.map((item, index) => (
              <MarineInteractiveCard
                key={item.title}
                index={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* MARINE CAPABILITIES */}
      <section className="relative overflow-hidden bg-[#061a34] px-5 py-20 sm:px-8 lg:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-10 size-96 rounded-full bg-[#f58220]/10 blur-[100px]"
        />

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 max-w-3xl"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f58220]">
              Our capabilities
            </span>

            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Marine engineering, built around reliability
              <span className="text-[#f58220]">.</span>
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/65">
              From inspections and repairs to automation and lifecycle upgrades, we help keep marine
              boiler systems operating safely and efficiently.
            </p>
          </motion.div>

          {/* CAPABILITIES SLIDER */}
          <div className="relative">
            <div
              ref={capabilitiesSliderRef}
              className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-5"
              style={{ scrollbarWidth: "none" }}
            >
              {capabilities.map((item, index) => (
                <div key={item.title} className="w-[85%] shrink-0 snap-start sm:w-[48%] lg:w-[32%]">
                  <MarineInteractiveCard
                    index={index}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                  />
                </div>
              ))}
            </div>

            {/* SLIDER CONTROLS */}
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => scrollCapabilities("left")}
                aria-label="Previous capabilities"
                className="flex size-12 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-[#f58220] hover:bg-[#f58220] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f58220]"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                type="button"
                onClick={() => scrollCapabilities("right")}
                aria-label="Next capabilities"
                className="flex size-12 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-[#f58220] hover:bg-[#f58220] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f58220]"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED SERVICE LIST */}
      <section className="bg-white px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#061a34] sm:text-4xl">
              Marine Boiler Services
              <span className="text-[#f58220]">.</span>
            </h2>
          </div>

          <MarineServiceCardGrid items={MARINE_SERVICES} />
        </div>
      </section>

      {/* ENQUIRY SECTION */}
      <section className="overflow-hidden bg-[#F58220] px-5 py-16 text-[#061A34] sm:px-8 lg:py-20">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-5xl"
          >
            <p className="text-xs font-bold uppercase tracking-[0.24em]">Start a conversation</p>

            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Need support with marine boiler or spare parts?
            </h2>
          </motion.div>

          <motion.a
            href="/contact"
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex min-h-14 shrink-0 items-center justify-center gap-4 rounded-md bg-[#E1EAF5] px-7 text-sm font-semibold text-[#061A34] shadow-sm transition-colors duration-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#061A34] sm:px-9"
          >
            Discuss your requirement
            <ArrowRight
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </motion.a>
        </div>
      </section>
    </>
  );
}

function MarineInteractiveCard({
  index,
  icon: Icon,
  title,
  description,
}: {
  index: number;
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  const [active, setActive] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
        ease: "easeOut",
      }}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse" || event.pointerType === "pen") {
          setActive(true);
        }
      }}
      onPointerLeave={() => setActive(false)}
      onClick={() => {
        if (window.matchMedia("(hover: none)").matches) {
          setActive((current) => !current);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setActive((current) => !current);
        }
        if (event.key === "Escape") setActive(false);
      }}
      tabIndex={0}
      role="button"
      aria-expanded={active}
      aria-label={title}
      animate={{
        scale: active ? 1.025 : 1,
        backgroundColor: active ? "#f58220" : "#0b2545",
        borderColor: active ? "#f58220" : "rgba(255,255,255,0.10)",
      }}
      whileTap={{ scale: 0.985 }}
      className="group relative h-full w-full cursor-pointer overflow-hidden rounded-2xl border p-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#f58220] sm:p-8"
      style={{ transformOrigin: "center" }}
    >
      <motion.div
        aria-hidden="true"
        animate={{
          opacity: active ? 0.2 : 0,
          scale: active ? 1.2 : 0.8,
        }}
        transition={{ duration: 0.35 }}
        className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-white blur-3xl"
      />

      <motion.div
        aria-hidden="true"
        animate={{
          scale: active ? 1.35 : 1,
          opacity: active ? 0.22 : 0.08,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="pointer-events-none absolute -bottom-16 -right-12 size-48 rounded-full bg-[#f58220] blur-2xl"
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-7 flex items-center justify-between">
          <motion.div
            animate={{
              backgroundColor: active ? "rgba(255,255,255,0.18)" : "rgba(245,130,32,0.10)",
              rotate: active ? -6 : 0,
              scale: active ? 1.12 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="flex size-12 items-center justify-center rounded-xl border border-white/20"
          >
            <Icon
              size={24}
              color={active ? "#ffffff" : "#f58220"}
              strokeWidth={1.7}
              aria-hidden="true"
            />
          </motion.div>
        </div>

        <motion.h3
          animate={{ x: active ? 3 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-xl font-semibold leading-snug tracking-tight text-white sm:text-2xl"
        >
          {title}
        </motion.h3>

        <motion.p
          animate={{
            color: active ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.65)",
          }}
          transition={{ duration: 0.25 }}
          className="mt-3 max-w-md text-sm leading-6 sm:text-base"
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
}



export function MarineServiceCardGrid({ items }: { items: typeof MARINE_SERVICES }) {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Prevent SSR hydration mismatch by ensuring hover state only runs client-side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((service, index) => {
            const isHovered = isMounted && activeCard === index;

            return (
              <motion.div
                key={service.number}
                onMouseEnter={() => isMounted && setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6 shadow-sm transition-all duration-300 sm:p-7 ${
                  isHovered
                    ? "border-[#f58220] bg-[#f58220] text-white shadow-xl shadow-orange-500/15"
                    : "border-slate-200 bg-white text-slate-900 hover:border-slate-300"
                }`}
              >
                <div>
                  {/* Blueprint Illustration Container */}
                  <div
                    className={`relative mb-6 flex h-48 w-full items-center justify-center overflow-hidden rounded-xl border p-2 transition-colors duration-300 ${
                      isHovered
                        ? "border-white/20 bg-white/10"
                        : "border-slate-100 bg-[#f8fafc] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"
                    }`}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Header with Number & Title */}
                  <div className="flex flex-col gap-1">
                    <span
                      className={`text-sm font-bold tracking-wider transition-colors duration-300 ${
                        isHovered ? "text-white/90" : "text-[#f58220]"
                      }`}
                    >
                      {service.number}
                    </span>
                    <h3
                      className={`text-xl font-bold leading-snug tracking-tight transition-colors duration-300 ${
                        isHovered ? "text-white" : "text-[#061a34]"
                      }`}
                    >
                      {service.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p
                    className={`mt-3 text-sm leading-relaxed transition-colors duration-300 sm:text-base ${
                      isHovered ? "text-white/90" : "text-slate-600"
                    }`}
                  >
                    {service.description}
                  </p>
                </div>

                {/* Footer Action Link - Right Aligned */}
                <div className="mt-6 flex justify-end pt-2">
                  <a
                    href="/contact"
                    className={`inline-flex items-center gap-1.5 text-sm font-semibold underline underline-offset-4 transition-colors ${
                      isHovered
                        ? "text-white decoration-white hover:text-slate-100"
                        : "text-[#061a34] decoration-[#f58220] hover:text-[#f58220]"
                    }`}
                  >
                    Enquire
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}