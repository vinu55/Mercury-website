import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
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
  "/media/b4.png",
  "/media/b5.png",
  "/media/b6.png",
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

          <BiomassServiceCardGrid items={biomassServices} />
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

function BiomassServiceCardGrid({ items }: { items: BiomassService[] }) {
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