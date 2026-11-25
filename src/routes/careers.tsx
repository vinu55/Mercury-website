
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowDownRight,
  ArrowRight,
  BriefcaseBusiness,
  ClipboardList,
  DraftingCompass,
  FileText,
} from "lucide-react";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers | Mercury Energy Solutions" },
      {
        name: "description",
        content:
          "Explore engineering career paths at Mercury Energy Solutions and discover the roles that contribute to our thermal equipment and energy projects.",
      },
    ],
  }),
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
    <main className="overflow-hidden bg-white text-[#10233F]">

      {/* HERO — SAME RESPONSIVE LAYOUT AS CASE STUDIES */}
      <section className="relative isolate flex min-h-[440px] items-end overflow-hidden bg-[#061A34] sm:min-h-[520px] lg:min-h-[600px]">

        <img
          src="/media/career.png"
          alt="Careers at Mercury Energy Solutions"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />

        {/* Dark overlays for readable text */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#041329]/90 via-[#061A34]/60 to-[#061A34]/25" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#061A34]/75 via-transparent to-[#061A34]/10" />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto w-full max-w-[1440px] px-5 pb-16 pt-32 sm:px-10 sm:pb-20 lg:px-16 lg:pb-24"
        >
          <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#F58220]">
            Careers at Mercury
          </p>

          <h1 className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Build the future
            <br />
            <span className="text-white">
              of energy<span className="text-[#F58220]">.</span>
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            Explore engineering career paths at Mercury Energy Solutions and
            discover the roles that contribute to our thermal equipment and
            energy projects.
          </p>

          <motion.a
            href="#open-roles"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.97 }}
            className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#F58220] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#e87312] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Explore Roles
            <ArrowDownRight size={18} />
          </motion.a>
        </motion.div>
      </section>

      {/* CAREER ROLES */}
      <section
        id="open-roles"
        className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-28"
      >
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 sm:mb-10 lg:mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#F58220]">
            Career opportunities
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#10233F] sm:text-4xl">
            Explore our engineering roles
          </h2>
        </motion.div>

        {/* Responsive role cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {roles.map(({ title, description, Icon }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className="group flex min-w-0 flex-col rounded-2xl border border-[#10233F]/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#F58220]/50 hover:shadow-lg sm:p-7 lg:p-8"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#F58220]/10">
                <Icon className="size-6 text-[#F58220]" />
              </div>

              <h3 className="mt-6 text-xl font-semibold leading-snug text-[#10233F]">
                {title}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-7 text-[#10233F]/75">
                {description}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled
                  className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-[#10233F]/20 px-4 py-2.5 text-sm font-semibold text-[#10233F]/60 opacity-70"
                >
                  More Details
                  <ArrowRight className="size-4" />
                </button>

                <button
                  type="button"
                  disabled
                  className="inline-flex cursor-not-allowed items-center gap-2 rounded-full bg-[#F58220]/60 px-4 py-2.5 text-sm font-semibold text-white opacity-70"
                >
                  Apply Now
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CURRENT OPENINGS NOTICE */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-10 rounded-2xl border border-[#F58220]/25 bg-[#fff8f1] px-6 py-8 text-center sm:mt-12 sm:px-10 sm:py-10"
        >
          <BriefcaseBusiness className="mx-auto size-8 text-[#F58220]" />

          <h2 className="mt-4 text-2xl font-semibold text-[#10233F]">
            No New Openings at Present
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#10233F]/80 sm:text-base">
            We are not accepting applications for new positions at the moment.
            Please check back for future career updates.
          </p>
        </motion.div>
      </section>
    </main>
  );
}
