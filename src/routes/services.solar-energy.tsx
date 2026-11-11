import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
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

          <SolarServiceCardGrid items={solarServices} />
        </div>
      </section>

      {/* OUR PROCESS */}

      <EnquiryBand service="your solar project" />
    </main>
  );
}

function SolarServiceCardGrid({ items }: { items: SolarService[] }) {
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