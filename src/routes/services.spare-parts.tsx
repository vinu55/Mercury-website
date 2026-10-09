import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import marine from "@/assets/marine-boiler.jpg";
import {
  EnquiryBand,
  PageHero,
} from "@/components/site/PageShell";
import { Input } from "@/components/ui/input";
import { SPARES } from "@/lib/site-data";

export const Route = createFileRoute("/services/spare-parts")({
  ssr: false,
  head: () => ({
    meta: [
      {
        title: "Boiler & Industrial Spare Parts | Mercury Energy Solutions",
      },
      {
        name: "description",
        content:
          "Search boiler, burner, pump, valve, tank management, smoke density, electrical and engine part manufacturers.",
      },
      {
        property: "og:title",
        content: "Industrial Spare Parts",
      },
      {
        property: "og:description",
        content:
          "Specialist sourcing across boiler, burner, pump, valve and control components.",
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
  const [q, setQ] = useState("");

  const filtered = useMemo(
    () =>
      SPARES.filter((s) =>
        (s.name + " " + s.brands)
          .toLowerCase()
          .includes(q.toLowerCase()),
      ),
    [q],
  );

  return (
    <main>
      <PageHero
        eyebrow="Spare parts"
        title="Critical components, clearly sourced."
        description="A broad manufacturer and product network across boiler, burner, pump, valve, instrumentation and tank-management systems."
        image={marine}
      />

      <section className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10">
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search manufacturer or component"
            className="h-13 pl-12"
            aria-label="Search spare parts"
          />
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          Product availability and compatibility are confirmed against your
          technical requirement.
        </p>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {filtered.map((s) => (
            <article
              key={s.name}
              className="border border-border bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <h2 className="text-xl font-semibold transition-colors duration-300 hover:text-primary">
                {s.name}
              </h2>

              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {s.brands}
              </p>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-20 text-center text-muted-foreground">
            No matching category. Send us your part number or equipment
            details.
          </p>
        )}
      </section>

      <EnquiryBand service="your spare parts requirement" />
    </main>
  );
}