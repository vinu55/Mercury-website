import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import renewables from "@/assets/biomass banner.jpeg";
import { EnquiryBand, PageHero } from "@/components/site/PageShell";

type BiomassService = {
  number: string;
  title: string;
  description: string;
  image: string;
};

const work = [
  "Bioenergy Technology",
  "Engineering Feasibility & Assessment Study",
  "Bioenergy Conversion & Co-firing",
  "Biomass Fuel Supply (Briquettes & Pellets)",
  "Biomass Supply for CBG Plants",
  "Agricultural Biomass Backward Integration",
] as const;

const serviceDescriptions: Record<string, string> = {
  "Bioenergy Technology":
    "Practical bioenergy solutions tailored to industrial boilers, fuel systems, and plant operating requirements.",

  "Engineering Feasibility & Assessment Study":
    "Assess plant equipment, fuel demand, operating conditions, and infrastructure to determine bioenergy conversion feasibility.",

  "Bioenergy Conversion & Co-firing":
    "Evaluate and implement suitable fuel conversion, boiler retrofits, and bioenergy co-firing solutions to reduce fossil fuel use.",

  "Biomass Fuel Supply (Briquettes & Pellets)":
    "Supply of biomass fuels, including briquettes, pellets and other biomass-based fuels for industrial applications.",

  "Biomass Supply for CBG Plants":
    "Supply of agricultural biomass and other feedstock materials for compressed biogas (CBG) plant operations.",

  "Agricultural Biomass Backward Integration":
    "Integrated sourcing of agricultural biomass to strengthen feedstock availability and support reliable bioenergy supply chains.",
};

const serviceImages = [
  "/media/b1.png",
  "/media/b2.png",
  "/media/b3.png",
  "/media/bioene.png",
  "/media/bioind.png",
  "/media/agri.png",
];

const biomassServices: BiomassService[] = work.map((title, index) => ({
  number: String(index + 1).padStart(2, "0"),
  title,
  description: serviceDescriptions[title] ?? "",
  image: serviceImages[index] ?? "",
}));
const rows = [
  {
    fuel: "Biomass Pellets",
    gcv: "4,000–4,500 kcal/kg*",
    ash: "2–5%*",
    moisture: "5–8%*",
    form: "Uniform, compact pellets",
    handling: "Suitable for automated feeding",
    combustion: "Performance depends on fuel quality and equipment",
    impact: "Renewable when sustainably sourced",
    applications: "Industrial boilers and thermal-fluid heaters",
  },
  {
    fuel: "Biomass Briquettes",
    gcv: "3,600–4,000 kcal/kg*",
    ash: "5–12%*",
    moisture: "8–12%*",
    form: "Dense, compact blocks",
    handling: "Convenient bulk handling",
    combustion: "Suitable for compatible industrial boilers",
    impact: "Supports agricultural-residue utilisation",
    applications: "Boilers, furnaces and industrial heating",
  },
  {
    fuel: "Wood",
    gcv: "2,800+ kcal/kg*",
    ash: "9–10%*",
    moisture: "25–40%*",
    form: "Logs or wood pieces",
    handling: "Difficult handling; uneven logs",
    combustion: "Depends on moisture and wood quality",
    impact: "Smoke emissions and potential deforestation impact",
    applications: "Wood-fired boilers and heating systems",
  },
  {
    fuel: "Coal",
    gcv: "5,000–6,000 kcal/kg*",
    ash: "5–20%*",
    moisture: "5–15%*",
    form: "Lumps or fines",
    handling: "Requires suitable handling and ash management",
    combustion: "Performance depends on coal grade and equipment",
    impact: "Fossil fuel with significant CO₂ emissions",
    applications: "Industrial boilers and furnaces",
  },
];

const advantages = [
  "Carbon Credit Benefits",
  "Reduced Fossil Fuel Dependence",
  "Utilisation of Bioenergy Waste",
  "Cost-Effective Industrial Energy",
];

export const Route = createFileRoute("/services/biomass-fuel")({
  head: () => ({
    meta: [
      {
        title: "Bioenergy solution | Mercury Energy Solutions",
      },
      {
        name: "description",
        content:
          "Bioenergy conversion, firing system upgrades, briquettes, pellets and bagasse supply with fuel comparison.",
      },
      {
        property: "og:title",
        content: "Bioenergy solution",
      },
      {
        property: "og:description",
        content: "Practical fuel transition and quality bioenergy supply.",
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
        eyebrow="Bioenergy solution"
        title="A practical pathway to renewable industrial fuel."
        description="Industrial biomass energy solutions, engineering feasibility assessments, fuel cost analysis, conversion and co-firing support, and reliable biomass supply to help reduce fossil fuel use and carbon emissions."
        image={renewables}
      />

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#061a34] sm:text-4xl">
              Bioenergy & Decarbonisation Solutions
              <span className="text-[#f58220]">.</span>
            </h2>

            <p className="mt-4 max-w-3xl leading-7 text-slate-600">
              We help industries assess bioenergy suitability, evaluate engineering feasibility, and
              implement practical solutions to reduce fossil fuel consumption and carbon emissions.
              Our services cover fuel conversion, co-firing, cost analysis, bioenergy supply, and
              feedstock integration for CBG plants.
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
            Select a fuel to explore its listed characteristics and compare fuel and steam costs.
          </p>

          <InteractiveFuelComparison rows={rows} />
        </div>
      </section>

      {/* BIOMASS ADVANTAGES */}
      <section className="bg-muted py-20">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
          <p className="eyebrow text-accent">Advantage of biomass pellets</p>

          <div className="mt-8 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((advantage, index) => (
              <div
                className="bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground hover:shadow-lg"
                key={advantage}
              >
                <span className="text-sm font-semibold text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-5 text-lg font-semibold">{advantage}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EnquiryBand service="your bioenergy transition" />
    </main>
  );
}

type FuelRow = (typeof rows)[number];

function InteractiveFuelComparison({ rows }: { rows: FuelRow[] }) {
  const [selectedFuel, setSelectedFuel] = useState(rows[0]?.fuel ?? "");

  const selectedRow = rows.find((row) => row.fuel === selectedFuel);

  return (
    <div className="mt-10">
      {/* Fuel selectors */}
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
                  : "border-slate-300 bg-white text-[#061a34] hover:border-[#f58220] hover:bg-orange-50"
              }`}
            >
              {row.fuel}
            </button>
          );
        })}
      </div>

      {/* Selected fuel summary */}
      {selectedRow && (
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f58220]">
            Selected fuel
          </p>

          <h3 className="mt-2 text-xl font-semibold text-[#061a34]">{selectedRow.fuel}</h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">{selectedRow.impact}</p>
        </div>
      )}

      {/* Comparison table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full min-w-[1100px] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-[#061a34] text-white">
              {["Particulars", "Biomass Pellets", "Biomass Briquettes", "Wood", "Coal"].map(
                (heading) => (
                  <th key={heading} scope="col" className="p-4 font-semibold">
                    {heading}
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody>
            {[
              {
                label: "Gross Calorific Value (GCV)",
                key: "gcv",
              },
              {
                label: "Moisture Content",
                key: "moisture",
              },
              {
                label: "Ash Content",
                key: "ash",
              },
              {
                label: "Fuel Form",
                key: "form",
              },
              {
                label: "Handling & Storage",
                key: "handling",
              },
              {
                label: "Combustion",
                key: "combustion",
              },
              {
                label: "Environmental Profile",
                key: "impact",
              },
              {
                label: "Typical Applications",
                key: "applications",
              },
            ].map((item) => (
              <tr key={item.key} className="border-b border-slate-100 last:border-0">
                <th scope="row" className="bg-slate-50 p-4 font-semibold text-[#061a34]">
                  {item.label}
                </th>

                {rows.map((row) => {
                  const active = row.fuel === selectedFuel;
                  const value = row[item.key as keyof FuelRow];

                  return (
                    <td
                      key={row.fuel}
                      className={`p-4 leading-6 transition-colors ${
                        active ? "bg-orange-50/70 font-medium text-[#061a34]" : "text-slate-600"
                      }`}
                    >
                      {value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs leading-5 text-slate-500">
        *Indicative values only. Actual GCV, moisture and ash content depend on fuel source,
        processing and supplier specifications. Verify technical data before making purchasing or
        operational decisions.
      </p>
    </div>
  );
}

function BiomassServiceAccordionList({ items }: { items: BiomassService[] }) {
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
