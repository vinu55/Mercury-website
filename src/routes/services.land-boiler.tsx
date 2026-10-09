import { createFileRoute } from "@tanstack/react-router";
import land from "@/assets/land-boiler.jpg";
import {
  EnquiryBand,
  PageHero,
  ServiceList,
} from "@/components/site/PageShell";
import { LAND_SERVICES } from "@/lib/site-data";

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
        content:
          "Industrial boiler engineering, upgrades and performance support.",
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

      <section className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10">
        <p className="eyebrow mb-8 text-accent">
          Scope of work
        </p>

        <ServiceList items={LAND_SERVICES} />
      </section>

      <EnquiryBand service="your industrial boiler" />
    </main>
  );
}