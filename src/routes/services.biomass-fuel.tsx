
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import renewables from "@/assets/biomass banner.jpeg";
import {
  EnquiryBand,
  PageHero,
} from "@/components/site/PageShell";


type BiomassService = {
  number: string;
  title: string;
  description: string;
  image: string;
};

const work = [
  "Fuel Conversion, Retrofits and Firing System Upgrades",
  "Upgrades and Conversion Services",
  "Biomass & Bagasse Supply",
] as const;

const serviceDescriptions: Record<string, string> = {
  "Fuel Conversion, Retrofits and Firing System Upgrades":
    "Fuel conversion and firing-system modifications tailored to boiler configuration, fuel requirements and operating needs.",
  "Upgrades and Conversion Services":
    "Boiler upgrade and conversion support developed around existing equipment, plant requirements and lifecycle needs.",
  "Biomass & Bagasse Supply":
    "Biomass and bagasse supply support for industrial operations requiring suitable alternative boiler fuels.",
};

const serviceImages = [
  "/media/b1.jpeg",
  "/media/b2.jpeg",
  "/media/b3.jpeg",
];

 const biomassServices: BiomassService[] = work.map((title, index) => ({
  number: String(index + 1).padStart(2, "0"),
  title,
  description: serviceDescriptions[title] ?? "",
  image: serviceImages[index] ?? "",
}));
const rows = [
  {
    fuel: "Biomass briquettes",
    gcv: "3600+",
    ash: "8–14%",
    moisture: "10%",
    cost: "₹6/kg avg.",
    steam: "₹1.45/kg",
    handling: "Easy, high-density packaged delivery",
    impact:
      "Emissions within pollution-control limits; supports farmers, reduces pollution and waste",
  },
  {
    fuel: "Wood",
    gcv: "2800+",
    ash: "9–10%",
    moisture: "25–40%",
    cost: "₹7.5/kg",
    steam: "₹2.08/kg",
    handling: "Difficult, uneven logs",
    impact: "Dense smoke and deforestation impact",
  },
  {
    fuel: "Coal",
    gcv: "5500+",
    ash: "5–7%",
    moisture: "10%",
    cost: "₹13/kg",
    steam: "₹2.60/kg",
    handling: "Difficult and unhygienic",
    impact:
      "High CO₂ and SO₂; major pollution and import dependency",
  },
];

const advantages = [
  "More combustion time",
  "Easy transportation",
  "Tax benefit",
  "Lower emission of harmful gases",
  "Concentrated energy",
  "Highly economical",
  "High thermal value",
  "Made from biomass waste",
];

export const Route = createFileRoute("/services/biomass-fuel")({
  head: () => ({
    meta: [
      {
        title: "Biomass Fuel Solutions | Mercury Energy Solutions",
      },
      {
        name: "description",
        content:
          "Biomass fuel conversion, firing system upgrades, briquettes, pellets and bagasse supply with fuel comparison.",
      },
      {
        property: "og:title",
        content: "Biomass Fuel Solutions",
      },
      {
        property: "og:description",
        content:
          "Practical fuel transition and quality biomass supply.",
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
        eyebrow="Biomass fuel solutions"
        title="A practical pathway to renewable industrial fuel."
        description="Conversion support and high-quality biomass fuel produced without chemical binders, adhesives, fillers or sub-standard inputs."
        image={renewables}
      />

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f58220]">
              Scope of work
            </span>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#061a34] sm:text-4xl">
              Biomass Fuel Services
              <span className="text-[#f58220]">.</span>
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              Explore our fuel conversion, boiler upgrade and biomass
              supply services for industrial operations.
            </p>
          </div>

          <BiomassServiceAccordionList items={biomassServices} />
        </div>
      </section>

      {/* FUEL COMPARISON */}
      
<section className="bg-[#f5f7fa] px-5 py-20 sm:px-8 lg:py-24">
  <div className="mx-auto max-w-7xl">
    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f58220]">
      Fuel comparison
    </p>

    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#061a34] sm:text-5xl">
      Compare operating characteristics
      <span className="text-[#f58220]">.</span>
    </h2>

    <p className="mt-4 max-w-2xl leading-7 text-slate-600">
      Select a fuel to explore its listed characteristics and compare
      fuel and steam costs.
    </p>

    <InteractiveFuelComparison rows={rows} />
  </div>
</section>


      {/* BIOMASS ADVANTAGES */}
      <section className="bg-muted py-20">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
          <p className="eyebrow text-accent">
            Advantage of biomass pellets
          </p>

          <div className="mt-8 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((advantage, index) => (
              <div
                className="bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground hover:shadow-lg"
                key={advantage}
              >
                <span className="text-sm font-semibold text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-5 text-lg font-semibold">
                  {advantage}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EnquiryBand service="your biomass fuel transition" />
    </main>
  );
}

type FuelRow = (typeof rows)[number];

function InteractiveFuelComparison({
  rows,
}: {
  rows: FuelRow[];
}) {
  const [selectedFuel, setSelectedFuel] = useState(
    rows[0]?.fuel ?? "",
  );
  const [sortBy, setSortBy] = useState<"default" | "fuel" | "cost">(
    "default",
  );

  const selectedRow = rows.find(
    (row) => row.fuel === selectedFuel,
  );

  const displayedRows = [...rows].sort((a, b) => {
    if (sortBy === "fuel") {
      return a.fuel.localeCompare(b.fuel);
    }

    if (sortBy === "cost") {
      const getCost = (value: string) =>
        Number(value.replace(/[^\d.]/g, "")) || 0;

      return getCost(a.cost) - getCost(b.cost);
    }

    return rows.indexOf(a) - rows.indexOf(b);
  });

  return (
    <div className="mt-10">
      {/* Interactive fuel selectors */}
      <div className="mb-6 flex flex-wrap gap-3">
        {rows.map((row) => {
          const active = selectedFuel === row.fuel;

          return (
            <button
              key={row.fuel}
              type="button"
              onClick={() => setSelectedFuel(row.fuel)}
              aria-pressed={active}
              className={`rounded-full border px-5 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f58220] ${
                active
                  ? "border-[#061a34] bg-[#061a34] text-white"
                  : "border-slate-300 bg-white text-[#061a34] hover:border-[#f58220]"
              }`}
            >
              {row.fuel}
            </button>
          );
        })}
      </div>

      {/* Selected fuel details */}
     

      {/* Table controls */}
      
      {/* Responsive comparison table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-[#061a34] text-white">
              {[
                "Fuel",
                "GCV",
                "Ash",
                "Moisture",
                "Fuel cost",
                "Steam cost",
                "Handling",
                "Environmental context",
              ].map((heading) => (
                <th
                  key={heading}
                  scope="col"
                  className="p-4 font-semibold"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {displayedRows.map((row) => {
              const active = row.fuel === selectedFuel;

              return (
                <tr
                  key={row.fuel}
                  onClick={() => setSelectedFuel(row.fuel)}
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" ||
                      event.key === " "
                    ) {
                      event.preventDefault();
                      setSelectedFuel(row.fuel);
                    }
                  }}
                  tabIndex={0}
                  aria-selected={active}
                  className={`cursor-pointer border-b border-slate-100 transition-colors duration-200 last:border-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#f58220] ${
                    active
                      ? "bg-orange-50"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <th
                    scope="row"
                    className={`p-4 font-semibold ${
                      active ? "text-[#f58220]" : "text-[#061a34]"
                    }`}
                  >
                    {row.fuel}
                  </th>

                  <td className="p-4">{row.gcv}</td>
                  <td className="p-4">{row.ash}</td>
                  <td className="p-4">{row.moisture}</td>
                  <td className="p-4 font-medium">{row.cost}</td>
                  <td className="p-4 font-medium">{row.steam}</td>
                  <td className="p-4">{row.handling}</td>
                  <td className="p-4">{row.impact}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs leading-5 text-slate-500">
        Figures are displayed as provided in the current fuel comparison
        data. Verify pricing, GCV basis and operating assumptions before
        using them for purchasing or cost estimates.
      </p>
    </div>
  );
}

function BiomassServiceAccordionList({
  items,
}: {
  items: BiomassService[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [pointer, setPointer] = useState({ x: 24, y: 24 });

  const hoveredService =
    hoveredIndex !== null ? items[hoveredIndex] : undefined;

  function handlePointerMove(
    event: ReactPointerEvent<HTMLDivElement>,
  ) {
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
