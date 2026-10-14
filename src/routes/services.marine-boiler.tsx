
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import type { ElementType, PointerEvent as ReactPointerEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Activity,
  Anchor,
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
    title: "Marine expertise",
    description:
      "Solutions for vessels, shipboard systems and marine power equipment.",
  },
  {
    icon: Wrench,
    title: "End-to-end support",
    description:
      "Design, supply, installation, commissioning, servicing and upgrades.",
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
    description:
      "Retrofits, efficiency improvements and service-life extension.",
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
    image: "/media/01.jpeg",
  },
  {
    number: "02",
    title: "Commissioning Support",
    description:
      "Technical support during system checks, startup, functional testing and commissioning activities.",
    image: "/media/02.jpeg",
  },
  {
    number: "03",
    title: "Refractory Re-installation & Repair",
    description:
      "Refractory inspection, lining repairs and reinstatement to help protect boiler components from high temperatures.",
    image: "/media/03.jpeg",
  },
  {
    number: "04",
    title: "Chemical Cleaning and Descaling",
    description:
      "Cleaning and descaling solutions to address deposits and help maintain heat-transfer performance.",
    image: "/media/04.jpeg",
  },
  {
    number: "05",
    title: "Surface Preparation and Re-painting",
    description:
      "Surface preparation and coating application to help protect equipment against corrosion and environmental exposure.",
    image: "/media/05.jpeg",
  },
  {
    number: "06",
    title:
      "Onboard Boiler Inspection, Operation, Troubleshooting and Maintenance",
    description:
      "Onboard technical assistance, operating checks, fault investigation and preventive maintenance.",
    image: "/media/06.jpeg",
  },
  {
    number: "07",
    title: "Boiler Repairs, Design Upgrades & Retrofit Solutions",
    description:
      "Repair and upgrade solutions tailored to equipment condition, operational needs and lifecycle requirements.",
    image: "/media/07.jpeg",
  },
  {
    number: "08",
    title: "Burner Automation, BMS & Ignition System Services",
    description:
      "Support for burner controls, burner management systems, ignition equipment and operating sequences.",
    image: "/media/08.jpeg",
  },
  {
    number: "09",
    title: "Electrical & Instrumentation Services",
    description:
      "Inspection and servicing of instrumentation, control wiring, sensors and related electrical systems.",
    image: "/media/09.jpeg",
  },
  {
    number: "10",
    title: "Performance Optimization & Efficiency Study",
    description:
      "Review of operating performance and potential improvements in combustion, heat transfer and energy efficiency.",
    image: "/media/10.jpeg",
  },
  {
    number: "11",
    title: "Non-destructive Examination (NDE) & Borescope Inspection",
    description:
      "Equipment condition assessment using suitable non-destructive examination methods and borescope inspection.",
    image: "/media/11.jpeg",
  },
  {
    number: "12",
    title:
      "Life Extension and Fitness-for-Service (FFS) Assessment – API 579-1 / ASME FFS",
    description:
      "Engineering assessments to evaluate equipment condition and support repair, continued operation or upgrade decisions.",
    image: "/media/12.jpeg",
  },
  {
    number: "13",
    title: "Boiler Tube Assessment, Plugging & Renewal",
    description:
      "Boiler tube condition assessment and appropriate plugging or renewal solutions based on inspection findings.",
    image: "/media/13.jpeg",
  },
];


function MarineBoilerPage() {
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
              Marine expertise<span className="text-[#f58220]">.</span>
              <br />
              Reliable execution<span className="text-[#f58220]">.</span>
            </h2>

            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">
              Practical engineering support focused on safety, equipment
              reliability and long-term vessel performance.
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
              From inspections and repairs to automation and lifecycle upgrades,
              we help keep marine boiler systems operating safely and
              efficiently.
            </p>
          </motion.div>

          <div className="marine-capabilities-marquee">
            <div className="marine-capabilities-track">
              {[0, 1].map((group) => (
                <div
                  key={group}
                  className="marine-capabilities-group"
                  aria-hidden={group === 1}
                >
                  {capabilities.map((item, index) => (
                    <div
                      key={`${group}-${item.title}`}
                      className="marine-capability-card"
                    >
                      <MarineInteractiveCard
                        index={index}
                        icon={item.icon}
                        title={item.title}
                        description={item.description}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED SERVICE LIST */}
      <section className="bg-white px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f58220]">
              Complete scope
            </span>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#061a34] sm:text-4xl">
              Marine Boiler Services
              <span className="text-[#f58220]">.</span>
            </h2>
          </div>

          <MarineServiceAccordionList items={MARINE_SERVICES} />
        </div>
      </section>

      {/* ENQUIRY SECTION */}
      <section className="bg-[#061a34] px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f58220]">
              Let&apos;s work together
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Need marine boiler support
              <span className="text-[#f58220]">?</span>
            </h2>

            <p className="mt-4 leading-7 text-white/70">
              Get in touch to discuss your equipment, maintenance needs and
              engineering requirements.
            </p>
          </div>

          <a
            href="/contact"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#f58220] px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-[#061a34] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Contact our team
          </a>
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
              backgroundColor: active
                ? "rgba(255,255,255,0.18)"
                : "rgba(245,130,32,0.10)",
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
            color: active
              ? "rgba(255,255,255,0.96)"
              : "rgba(255,255,255,0.65)",
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

function MarineServiceAccordionList({
  items,
}: {
  items: typeof MARINE_SERVICES;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [pointer, setPointer] = useState({ x: 24, y: 24 });

  const hoveredService =
    hoveredIndex !== null ? items[hoveredIndex] : undefined;

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;

    const previewWidth = Math.min(420, window.innerWidth - 32);
    const previewHeight = 300;
    const padding = 16;

    let x = event.clientX + 28;
    let y = event.clientY + 28;

    if (x + previewWidth > window.innerWidth - padding) {
      x = event.clientX - previewWidth - 28;
    }

    if (y + previewHeight > window.innerHeight - padding) {
      y = window.innerHeight - previewHeight - padding;
    }

    setPointer({
      x: Math.max(padding, x),
      y: Math.max(padding, y),
    });
  };

  return (
    <div className="w-full divide-y divide-slate-200 border-y border-slate-200">
      {items.map((service, index) => {
        const isOpen = openIndex === index;
        const isHovered = hoveredIndex === index;
        const showDescription = isHovered || isOpen;

        return (
          <div
            key={service.number}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse" || event.pointerType === "pen") {
                setHoveredIndex(index);
              }
            }}
            onPointerLeave={(event) => {
              if (event.pointerType === "mouse" || event.pointerType === "pen") {
                setHoveredIndex(null);
              }
            }}
            onPointerMove={handlePointerMove}
            onClick={() => setOpenIndex(isOpen ? null : index)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setOpenIndex(isOpen ? null : index);
              }
              if (event.key === "Escape") setOpenIndex(null);
            }}
            role="button"
            tabIndex={0}
            aria-expanded={isOpen}
            className="group relative cursor-pointer bg-white px-4 py-6 transition-colors duration-300 hover:bg-orange-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#f58220] sm:px-6 sm:py-8"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-start">
              <span
                className={`shrink-0 pt-1 text-sm font-semibold tracking-wider transition-colors duration-300 ${
                  isHovered ? "text-[#f58220]" : "text-[#061a34]"
                }`}
              >
                {service.number}
              </span>

              <div className="min-w-0 flex-1">
                <h3
                  className={`text-xl font-semibold tracking-tight transition-colors duration-300 sm:text-2xl ${
                    isHovered ? "text-[#f58220]" : "text-[#061a34]"
                  }`}
                >
                  {service.title}
                </h3>

                <motion.div
                  initial={false}
                  animate={{
                    height: showDescription ? "auto" : 0,
                    opacity: showDescription ? 1 : 0,
                    y: showDescription ? 0 : -5,
                  }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden"
                  aria-hidden={!showDescription}
                >
                  <p className="max-w-3xl pt-3 text-sm leading-6 text-slate-600 sm:text-base">
                    {service.description}
                  </p>

                  {isOpen && (
                    <a
                      href="/contact"
                      onClick={(event) => event.stopPropagation()}
                      className="mt-3 inline-block text-sm font-semibold text-[#061a34] underline decoration-[#f58220] underline-offset-4 transition-colors hover:text-[#f58220]"
                    >
                      Enquire
                    </a>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        );
      })}

      <AnimatePresence>
        {hoveredService && (
          <motion.div
            key={hoveredService.number}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="pointer-events-none fixed z-[100] hidden overflow-hidden rounded-2xl border border-white/80 bg-[#061a34] shadow-2xl md:block"
            style={{
              left: pointer.x,
              top: pointer.y,
              width: "min(420px, calc(100vw - 32px))",
              height: 300,
            }}
          >
            <img
              src={hoveredService.image}
              alt={hoveredService.title}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#061a34] via-[#061a34]/90 to-transparent px-5 pb-5 pt-16">
              
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
