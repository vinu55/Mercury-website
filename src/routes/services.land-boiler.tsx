import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
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
- LAND_SERVICES is a readonly tuple of strings.
- Convert it into service objects for the interactive list.
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

  "Upgrades and Conversion Services":
    "Comprehensive equipment enhancements and system modernizations to improve energy efficiency, boost output capacity, and meet updated environmental standards.",

  "Annual Maintenance Contracts (AMC)":
    "Scheduled inspections and preventive maintenance to support equipment reliability, reduce unplanned downtime and maintain service continuity.",

  "Boiler Retrofitting and Upgrades":
    "Advanced system overhauls and technology integrations to modernize aging equipment, lower emissions, and extend overall operational lifecycle.",

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

          <LandServiceCardGrid items={LAND_SERVICE_ITEMS} />
        </div>
      </section>

      <EnquiryBand service="your industrial boiler" />
    </main>
  );
}

function LandServiceCardGrid({ items }: { items: LandService[] }) {
  return (
    <div className="w-full px-0 sm:px-0">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((service) => {
          return (
            <motion.div
              key={service.number}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#f58220] hover:bg-[#f58220] hover:text-white hover:shadow-xl hover:shadow-orange-500/15 sm:p-7 text-slate-900"
            >
              <div>
                {/* Blueprint Illustration Container */}
                <div className="relative mb-6 flex h-48 w-full items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-[#f8fafc] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] p-2 transition-colors duration-300 group-hover:border-white/20 group-hover:bg-white/10">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Header with Number & Title */}
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold tracking-wider text-[#f58220] transition-colors duration-300 group-hover:text-white/90">
                    {service.number}
                  </span>
                  <h3 className="text-xl font-bold leading-snug tracking-tight text-[#061a34] transition-colors duration-300 group-hover:text-white">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="mt-3 text-sm leading-relaxed text-slate-600 transition-colors duration-300 group-hover:text-white/90 sm:text-base">
                  {service.description}
                </p>
              </div>

              {/* Footer Action Link - Right Aligned */}
              <div className="mt-6 flex justify-end pt-2">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#061a34] underline decoration-[#f58220] underline-offset-4 transition-colors hover:text-[#f58220] group-hover:text-white group-hover:decoration-white group-hover:hover:text-slate-100"
                >
                  Enquire
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}