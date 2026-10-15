
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import renewables from "@/assets/solar banner .jpeg";
import {
  EnquiryBand,
  PageHero,
} from "@/components/site/PageShell";

type SolarService = {
  number: string;
  title: string;
  description: string;
  image: string;
};

const solutions = [
  "Solar Park",
  "Solar Rooftop",
  "Solar Water Heating",
  "Solar Generator",
  "Solar Trees (Solar Hub)",
  "Operations & Maintenance (O&M)",
  "CSR & Corporate Gifting",
] as const;

const serviceDescriptions: Record<
  (typeof solutions)[number],
  string
> = {
  "Solar Park":
    "Solar park solutions for large-scale energy generation, planned around available land, project requirements and energy demand.",
  "Solar Rooftop":
    "Rooftop solar systems for commercial and industrial facilities, making productive use of existing roof space.",
  "Solar Water Heating":
    "Solar thermal solutions designed to provide hot water for suitable commercial and industrial applications.",
  "Solar Generator":
    "Solar power generation solutions planned around site conditions, energy requirements and project objectives.",
  "Solar Trees (Solar Hub)":
    "Space-efficient solar tree concepts that combine renewable energy generation with distinctive architectural design.",
  "Operations & Maintenance (O&M)":
    "Inspection, performance monitoring and maintenance support to help solar installations operate reliably.",
  "CSR & Corporate Gifting":
    "Solar-themed corporate gifting and sustainability initiatives for organisations looking to support environmental awareness.",
};

const serviceImages = [
  "/media/s1.jpeg",
  "/media/s2.jpeg",
  "/media/s3.jpeg",
  "/media/s4.jpeg",
  "/media/s5.jpeg",
  "/media/s6.jpeg",
  "/media/s7.jpeg",
];

const solarServices: SolarService[] = solutions.map(
  (title, index) => ({
    number: String(index + 1).padStart(2, "0"),
    title,
    description: serviceDescriptions[title],
    image: serviceImages[index] ?? "/media/Solar Panel.png",
  }),
);

const process = [
  "Consultation and Feasibility Study",
  "Customized Proposal",
  "Professional Installation",
  "System Activation & Monitoring",
  "Maintenance & Support",
];

const benefits = [
  "Sustainable Energy",
  "Cost Savings",
  "Net Zero",
  "Long-Term Reliability",
];

export const Route = createFileRoute("/services/solar-energy")({
  head: () => ({
    meta: [
      {
        title: "Solar Energy Solutions | Mercury Energy Solutions",
      },
      {
        name: "description",
        content:
          "Industrial and commercial solar parks, rooftops, water heating, generators, solar trees and O&M.",
      },
      {
        property: "og:title",
        content: "Solar Energy Solutions",
      },
      {
        property: "og:description",
        content:
          "Industrial and commercial solar delivery from feasibility to support.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <main>
      <PageHero
        eyebrow="Solar energy solutions"
        title="Commercial solar designed around your operating context."
        description="Industrial and commercial solar projects—from feasibility and proposal through installation, monitoring and support."
        image={renewables}
      />

      {/* SOLAR SERVICES */}
      <section className="bg-white px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f58220]">
              Industrial & commercial projects
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#061a34] sm:text-4xl">
              Solar Energy Services
              <span className="text-[#f58220]">.</span>
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              Explore our solar solutions for commercial and industrial
              energy requirements. Select a service to learn more.
            </p>
          </div>

          <SolarServiceAccordionList items={solarServices} />
        </div>
      </section>

      {/* OUR PROCESS */}


{/* OUR PROCESS */}
<section className="overflow-hidden bg-[#061a34] py-20 text-white">
  <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f58220]">
      Our process
    </p>

    <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
      From feasibility to ongoing support
      <span className="text-[#f58220]">.</span>
    </h2>

    <p className="mt-5 max-w-2xl text-base leading-7 text-white/65">
      A structured approach to delivering reliable solar energy solutions,
      from initial assessment to long-term system performance.
    </p>
  </div>

  <div className="solar-process-marquee mt-12">
    <div className="solar-process-track">
      {[...process, ...process].map((step, index) => (
        <div
          key={`${step}-${index}`}
          className="solar-process-card group relative flex min-h-[290px] w-[280px] shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0b2545] p-7 text-center text-white transition-all duration-300 hover:-translate-y-2 hover:border-[#f58220] hover:bg-[#f58220] hover:text-white hover:shadow-xl sm:w-[320px] sm:p-8"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-[#f58220]/10 blur-3xl transition-all duration-500 group-hover:bg-white/20"
          />

          <div className="relative z-10">
            <h3 className="text-2xl font-semibold leading-snug tracking-tight">
              {step}
            </h3>

            <div className="mx-auto mt-5 h-1 w-12 rounded-full bg-[#f58220] transition-all duration-300 group-hover:w-20 group-hover:bg-white" />
          </div>
        </div>
      ))}
    </div>
  </div>

  <style>{`
    .solar-process-marquee {
      width: 100%;
      overflow: hidden;
    }

    .solar-process-track {
      display: flex;
      width: max-content;
      gap: 1.25rem;
      animation: solar-process-scroll 32s linear infinite;
      will-change: transform;
    }

    .solar-process-marquee:hover .solar-process-track {
      animation-play-state: paused;
    }

    @keyframes solar-process-scroll {
      from {
        transform: translateX(0);
      }

      to {
        transform: translateX(calc(-50% - 0.625rem));
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .solar-process-track {
        animation: none;
      }

      .solar-process-card {
        transition: none;
      }
    }
  `}</style>
</section>


{/* BENEFITS */}
<section className="bg-[#f5f7fa] px-5 py-20 sm:px-8 lg:py-24">
  <div className="mx-auto max-w-7xl">
    <p className="text-left text-xs font-semibold uppercase tracking-[0.24em] text-[#f58220]">
  Benefits
</p>

<h2 className="mt-3 text-left text-3xl font-semibold tracking-tight text-[#061a34] sm:text-4xl">
  Designed for long-term value
  <span className="text-[#f58220]">.</span>
</h2>

    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {benefits.map((benefit, index) => (
        <motion.div
          key={benefit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.45,
            delay: index * 0.08,
          }}
          whileHover={{ y: -8 }}
          className="group flex min-h-[170px] cursor-pointer items-center justify-center rounded-2xl bg-white p-7 text-center shadow-sm transition-shadow duration-300 hover:shadow-xl"
        >
          <h3 className="text-xl font-semibold tracking-tight text-[#061a34] transition-colors duration-300 group-hover:text-[#f58220]">
            {benefit}
          </h3>
        </motion.div>
      ))}
    </div>
  </div>
</section>


      <EnquiryBand service="your solar project" />
    </main>
  );
}

function SolarServiceAccordionList({
  items,
}: {
  items: SolarService[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [pointer, setPointer] = useState({ x: 24, y: 24 });

  const hoveredService =
    hoveredIndex !== null ? items[hoveredIndex] : undefined;

  function handlePointerMove(
    event: ReactPointerEvent<HTMLDivElement>,
  ) {
    if (
      event.pointerType !== "mouse" &&
      event.pointerType !== "pen"
    ) {
      return;
    }

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
  }

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
              if (
                event.pointerType === "mouse" ||
                event.pointerType === "pen"
              ) {
                setHoveredIndex(index);
              }
            }}
            onPointerLeave={(event) => {
              if (
                event.pointerType === "mouse" ||
                event.pointerType === "pen"
              ) {
                setHoveredIndex(null);
              }
            }}
            onPointerMove={handlePointerMove}
            onClick={() => setOpenIndex(isOpen ? null : index)}
            onKeyDown={(event) => {
              if (
                event.key === "Enter" ||
                event.key === " "
              ) {
                event.preventDefault();
                setOpenIndex(isOpen ? null : index);
              }

              if (event.key === "Escape") {
                setOpenIndex(null);
              }
            }}
            role="button"
            tabIndex={0}
            aria-expanded={isOpen}
            className="group relative cursor-pointer bg-white px-4 py-6 transition-colors duration-300 hover:bg-orange-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#f58220] sm:px-6 sm:py-8"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
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
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
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

            
            
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
