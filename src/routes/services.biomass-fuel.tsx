import { createFileRoute } from "@tanstack/react-router";
import renewables from "@/assets/renewables.jpg";
import {
  EnquiryBand,
  PageHero,
  ServiceList,
} from "@/components/site/PageShell";

const work = [
  "Fuel Conversion, Retrofits and Firing System Upgrades",
  "Upgrades and Conversion Services",
  "Biomass & Bagasse Supply",
];

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

      <section className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10">
        <p className="eyebrow mb-8 text-accent">
          Scope of work
        </p>

        <ServiceList items={work} />

        <div className="mt-24">
          <p className="eyebrow text-accent">
            Fuel comparison
          </p>

          <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">
            Compare operating characteristics.
          </h2>

          <div className="mt-10 overflow-x-auto">
            <table className="min-w-[900px] w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  {[
                    "Fuel",
                    "GCV",
                    "Ash",
                    "Moisture",
                    "Fuel cost",
                    "Steam cost",
                    "Handling",
                    "Environmental context",
                  ].map((h) => (
                    <th
                      className="p-4 font-semibold"
                      key={h}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.map((r) => (
                  <tr
                    key={r.fuel}
                    className="border-b border-border even:bg-muted transition-colors duration-200 hover:bg-primary/5"
                  >
                    <td className="p-4 font-semibold">
                      {r.fuel}
                    </td>

                    <td className="p-4">{r.gcv}</td>
                    <td className="p-4">{r.ash}</td>
                    <td className="p-4">{r.moisture}</td>
                    <td className="p-4">{r.cost}</td>
                    <td className="p-4">{r.steam}</td>
                    <td className="p-4">{r.handling}</td>
                    <td className="p-4">{r.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
          <p className="eyebrow text-accent">
            Advantage of biomass pellets
          </p>

          <div className="mt-8 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((a, i) => (
              <div
                className="bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground hover:shadow-lg"
                key={a}
              >
                <span className="text-sm font-semibold text-accent">
                  0{i + 1}
                </span>

                <h3 className="mt-5 text-lg font-semibold">
                  {a}
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