import { createFileRoute } from "@tanstack/react-router";
import marine from "@/assets/marine-boiler.jpg";
import {
  EnquiryBand,
  PageHero,
  ServiceList,
} from "@/components/site/PageShell";
import { MARINE_SERVICES } from "@/lib/site-data";

export const Route = createFileRoute("/services/marine-boiler")({
  head: () => ({
    meta: [
      {
        title: "Marine Boiler Solutions | Mercury Energy Solutions",
      },
      {
        name: "description",
        content:
          "Marine boiler inspection, repair, refractory, cleaning, automation, optimization, NDE, FFS and tube services.",
      },
      {
        property: "og:title",
        content: "Marine Boiler Solutions",
      },
      {
        property: "og:description",
        content:
          "End-to-end technical support for marine boiler systems.",
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
        eyebrow="Marine boiler solutions"
        title="Technical support across the marine boiler lifecycle."
        description="From onboard inspection and troubleshooting to major repair, automation and life-extension assessment."
        image={marine}
      />

      <section className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10">
        <p className="eyebrow mb-8 text-accent">
          Scope of work
        </p>

        <ServiceList items={MARINE_SERVICES} />
      </section>

      <EnquiryBand service="your marine boiler" />
    </main>
  );
}