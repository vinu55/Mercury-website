import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BriefcaseBusiness,
  ClipboardList,
  DraftingCompass,
  FileText,
} from "lucide-react";

export const Route = createFileRoute("/careers")({
  component: CareersPage,
});

const roles = [
  {
    title: "Design Engineer",
    description:
      "Support the design and engineering of boilers, thermal equipment, and energy systems for marine and land-based applications.",
    Icon: DraftingCompass,
  },
  {
    title: "Detailing Engineer",
    description:
      "Prepare detailed engineering drawings, layouts, and technical documentation for thermal equipment and engineering projects.",
    Icon: ClipboardList,
  },
  {
    title: "Proposal Assessment Engineer",
    description:
      "Assist with reviewing technical requirements, assessing project proposals, and preparing engineering documentation for customer requirements.",
    Icon: FileText,
  },
];

function CareersPage() {
  return (
    <main className="min-h-screen bg-white pt-32 text-[#06152a]">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f58220]">
          Careers at Mercury
        </p>

        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">
          Build the future of energy.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-8 text-[#294f8f]/75 sm:text-lg">
          Explore engineering career paths at Mercury Energy Solutions and discover the roles that
          contribute to our thermal equipment and energy projects.
        </p>
      </section>

      {/* Career roles */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:pb-28">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f58220]">
            Career opportunities
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Explore our engineering roles
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {roles.map(({ title, description, Icon }) => (
            <article
              key={title}
              className="flex flex-col rounded-2xl border border-[#294f8f]/15 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#f58220]/50 hover:shadow-lg sm:p-8"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-[#f58220]/10">
                <Icon className="size-6 text-[#f58220]" />
              </div>

              <h3 className="mt-6 text-xl font-semibold">{title}</h3>

              <p className="mt-3 flex-1 text-sm leading-7 text-[#294f8f]/75">{description}</p>

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled
                  className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-[#294f8f]/20 px-4 py-2.5 text-sm font-semibold text-[#294f8f]/60 opacity-70"
                >
                  More Details
                  <ArrowRight className="size-4" />
                </button>

                <button
                  type="button"
                  disabled
                  className="inline-flex cursor-not-allowed items-center gap-2 rounded-full bg-[#f58220]/60 px-4 py-2.5 text-sm font-semibold text-white opacity-70"
                >
                  Apply Now
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Current openings notice */}
        <div className="mt-12 rounded-2xl border border-[#f58220]/25 bg-[#fff8f1] px-6 py-8 text-center sm:px-10 sm:py-10">
          <BriefcaseBusiness className="mx-auto size-8 text-[#f58220]" />

          <h2 className="mt-4 text-2xl font-semibold">No New Openings at Present</h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#294f8f]/80 sm:text-base">
            We are not accepting applications for new positions at the moment. Please check back for
            future career updates.
          </p>
        </div>
      </section>
    </main>
  );
}
