import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowDownRight } from "lucide-react";

const MotionLink = motion.create(Link);

export const Route = createFileRoute("/manufacturing")({
  head: () => ({
    meta: [
      { title: "Manufacturing | Mercury Energy Solutions" },
      {
        name: "description",
        content:
          "Mercury Energy Solutions manufacturing capabilities — launching soon.",
      },
      {
        name: "robots",
        content: "noindex, nofollow",
      },
    ],
  }),
  component: ManufacturingPage,
});

const manufacturingImages = {
  heading: "/media/manufactoring.jpg",
};

function ManufacturingPage() {
  return (
    <main className="overflow-hidden bg-white text-[#10233F]">
      {/* HERO */}
      <section className="relative isolate flex min-h-[440px] items-end overflow-hidden bg-[#061A34] sm:min-h-[520px] lg:min-h-[600px]">
        <img
          src={manufacturingImages.heading}
          alt="Mercury Energy Solutions manufacturing"
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
            Manufacturing — Coming Soon
          </p>

          <h1 className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Building
            <br />
            <span className="text-white">
              for a better future<span className="text-[#F58220]">.</span>
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            Our dedicated manufacturing capabilities are currently under
            development. Full details will be announced shortly.
          </p>

          <MotionLink
            to="/"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.97 }}
            className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#F58220] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#e87312] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Explore Solutions
            <ArrowDownRight size={18} />
          </MotionLink>
        </motion.div>
      </section>
    </main>
  );
}
