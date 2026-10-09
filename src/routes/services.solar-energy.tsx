import { createFileRoute } from "@tanstack/react-router";
import renewables from "@/assets/renewables.jpg";
import {
  EnquiryBand,
  PageHero,
  ServiceList,
} from "@/components/site/PageShell";

const solutions = [
  "Solar Park",
  "Solar Rooftop",
  "Solar Water Heating",
  "Solar Generator",
  "Solar Trees (Solar Hub)",
  "Operations & Maintenance (O&M)",
  "CSR & Corporate Gifting",
];

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

      <section className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10">
        <p className="eyebrow mb-8 text-accent">
          Industrial & commercial projects
        </p>

        <ServiceList items={solutions} />
      </section>

      <section className="bg-primary py-20 text-primary-foreground">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
          <p className="eyebrow text-accent">
            Our process
          </p>

          <div className="mt-10 grid gap-px bg-primary-foreground/20 md:grid-cols-5">
            {process.map((p, i) => (
              <div
                className="bg-primary p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-primary/80 hover:shadow-xl"
                key={p}
              >
                <span className="text-accent">
                  0{i + 1}
                </span>

                <h3 className="mt-8 font-semibold leading-6">
                  {p}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
          <p className="eyebrow text-accent">
            Benefits
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div
                className="border-l-2 border-accent py-4 pl-6 text-xl font-semibold transition-all duration-300 hover:translate-x-2 hover:border-primary hover:text-primary"
                key={b}
              >
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      <EnquiryBand service="your solar project" />
    </main>
  );
}