import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import land from "@/assets/land-boiler.jpg";
import { EnquiryBand, PageHero } from "@/components/site/PageShell";
import { LAND_SERVICES } from "@/lib/site-data";

type LandService = {
  number: string;
  title: string;
  description: string;
  image: string;
};

/*
 * LAND_SERVICES is a readonly tuple of strings.
 * Convert it into service objects for the interactive list.
 */
const LAND_SERVICE_IMAGES = [
  "/media/01.jpg",
  "/media/02.jpg",
  "/media/b2.png",
  "/media/04.jpg",
  "/media/05.jpg",
  "/media/06.jpg",
  "/media/08.jpg",
];

const LAND_SERVICE_DESCRIPTIONS: Record<string, string> = {
  "Design and Engineering":
    "Engineering and design support for industrial boiler systems, tailored to plant specifications, capacity requirements and operating conditions.",

  "Fuel Conversion, Retrofits and Firing System Upgrades":
    "Boiler fuel conversion and firing-system modifications to accommodate fuel requirements and existing system configurations.",

  "Upgrades and Services":
    "Boiler modernization, component upgrades and system modifications to meet changing plant requirements and equipment needs.",

  "Annual Maintenance Contracts (AMC)":
    "Scheduled inspections and preventive maintenance to support equipment reliability, reduce unplanned downtime and maintain service continuity.",

  "Boiler Supply and Spare Parts":
    "Boiler equipment, replacement components and spare parts to support installation, maintenance and repair requirements.",

  "Performance Improvement Studies":
    "Technical assessments of boiler operation to identify performance gaps, combustion issues and opportunities for improvement.",

  "Performance Optimization":
    "Practical operational adjustments focused on combustion control, heat utilization and overall boiler efficiency.",
};

const LAND_SERVICE_ITEMS: LandService[] = LAND_SERVICES.map((title, index) => ({
  number: String(index + 1).padStart(2, "0"),
  title,
  description: LAND_SERVICE_DESCRIPTIONS[title] ?? "",
  image: LAND_SERVICE_IMAGES[index % LAND_SERVICE_IMAGES.length] ?? land,
}));

export const Route = createFileRoute("/services/land-boiler")({
  head: () => ({
    meta: [
      {
        title: "Land Boiler Solutions | Mercury Energy Solutions",
      },
      {
        name: "description",
        content:
          "Design, engineering, fuel conversion, retrofits, AMC, upgrades and performance improvement for industrial boilers.",
      },
      {
        property: "og:title",
        content: "Land Boiler Solutions",
      },
      {
        property: "og:description",
        content: "Industrial boiler engineering, upgrades and performance support.",
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
        eyebrow="Land boiler solutions"
        title="Industrial boiler capability from design to optimization."
        description="Engineering, conversion and lifecycle services developed around plant performance and practical operating needs."
        image={land}
      />

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#061a34] sm:text-4xl">
              Land Boiler Services
              <span className="text-[#f58220]">.</span>
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              Explore our industrial boiler engineering, maintenance, upgrade and performance
              support services.
            </p>
          </div>

          <LandServiceAccordionList items={LAND_SERVICE_ITEMS} />
        </div>
      </section>

      <EnquiryBand service="your industrial boiler" />
    </main>
  );
}

function LandServiceAccordionList({ items }: { items: LandService[] }) {
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
