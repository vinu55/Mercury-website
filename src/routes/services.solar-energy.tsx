import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import renewables from "@/assets/solar banner.jpeg";
import { EnquiryBand, PageHero } from "@/components/site/PageShell";

type SolarService = {
  number: string;
  title: string;
  description: string;
  image: string;
};

const solutions = [
  "Solar Rooftop",
  "Solar Water Heating",
  "Operations & Maintenance (O&M)",
] as const;

const serviceDescriptions: Record<(typeof solutions)[number], string> = {
  "Solar Rooftop":
    "Rooftop solar systems for commercial and industrial facilities, making productive use of existing roof space.",
  "Solar Water Heating":
    "Solar thermal solutions designed to provide hot water for suitable commercial and industrial applications.",
  "Operations & Maintenance (O&M)":
    "Inspection, performance monitoring and maintenance support to help solar installations operate reliably.",
};

const serviceImages = ["/media/s02.jpeg", "/media/s03.jpeg", "/media/s06.jpeg"];

const solarServices: SolarService[] = solutions.map((title, index) => ({
  number: String(index + 1).padStart(2, "0"),
  title,
  description: serviceDescriptions[title],
  image: serviceImages[index] ?? "/media/Solar Panel.png",
}));

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
        content: "Industrial and commercial solar delivery from feasibility to support.",
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
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#061a34] sm:text-4xl">
              Solar Energy Services
              <span className="text-[#f58220]">.</span>
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              Explore our solar solutions for commercial and industrial energy requirements. Select
              a service to learn more.
            </p>
          </div>

          <SolarServiceAccordionList items={solarServices} />
        </div>
      </section>

      {/* OUR PROCESS */}

      <EnquiryBand service="your solar project" />
    </main>
  );
}

function SolarServiceAccordionList({ items }: { items: SolarService[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [pointer, setPointer] = useState({ x: 24, y: 24 });

  const hoveredService = hoveredIndex !== null ? items[hoveredIndex] : undefined;

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" && event.pointerType !== "pen") {
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
