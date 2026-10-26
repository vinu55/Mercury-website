import { createFileRoute } from "@tanstack/react-router";
import {
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "motion/react";
import { PageHero } from "@/components/site/PageShell";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { COMPANY } from "@/lib/site-data";

type ContactSearch = {
  service?: string;
};

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): ContactSearch =>
    typeof search["service"] === "string"
      ? { service: search["service"] }
      : {},

  head: () => ({
    meta: [
      { title: "Contact | Mercury Energy Solutions" },
      {
        name: "description",
        content:
          "Contact Mercury Energy Solutions for marine boiler, land boiler, biomass, solar and spare parts enquiries.",
      },
      {
        property: "og:title",
        content: "Contact Mercury Energy Solutions",
      },
      {
        property: "og:description",
        content:
          "Discuss your boiler, biomass, solar or spare parts requirement.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),

  component: Contact,
});

const contactItems = [
  {
  label: "India",
  value: "+91 74836 51445",
  href: "tel:+917483651445",
  icon: Phone,
  detail: "Contact our India team",
  },
  {
    label: "Europe",
    value: "+49 177 3623183",
    href: "tel:+491773623183",
    icon: Phone,
    detail: "Contact our Europe team",
  },
  {
    label: "South East Asia",
    value: "+84 39 244 1615",
    href: "tel:+84392441615",
    icon: Phone,
    detail: "Contact our South East Asia team",
  },
  {
    label: "Email",
    value: COMPANY.email,
    href: `mailto:${COMPANY.email}`,
    icon: Mail,
    detail: "Send us your project details",
  },
];

function Contact() {
  const { service } = Route.useSearch();

  const officeMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    COMPANY.office,
  )}`;

  return (
    <main className="bg-white">
      {/* CONTACT HERO */}
      <section className="bg-[#061A34] px-5 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1280px]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F58220]">
              Contact
            </p>

            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl">
              Let’s build together
              <span className="text-[#F58220]">.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="px-5 py-12 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            {/* CONTACT INFORMATION */}
            <motion.aside
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5 }}
              className="flex min-w-0 flex-col"
            >
              <div className="border-b border-slate-200 pb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F58220]">
                  Get in touch
                </p>

                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#061A34] sm:text-3xl">
                  We’re here to help
                  <span className="text-[#F58220]">.</span>
                </h2>

                <p className="mt-3 max-w-md text-sm leading-7 text-slate-600">
                  Reach out to discuss your requirements, request technical
                  information or explore a potential collaboration.
                </p>
              </div>

              <div className="divide-y divide-slate-200">
                {contactItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.label}
  href={item.href}
  target={"external" in item && item.external ? "_blank" : undefined}
  rel={"external" in item && item.external ? "noopener noreferrer" : undefined}
  className="group flex min-w-0 items-start gap-4 py-5 transition-colors"
                    >
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#061A34]/[0.05] text-[#061A34] transition-colors duration-300 group-hover:bg-[#F58220]/10 group-hover:text-[#F58220]">
                        <Icon size={19} strokeWidth={1.8} />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2 font-semibold text-[#061A34]">
                          {item.label}
                          <ArrowUpRight
                            size={15}
                            className="shrink-0 text-slate-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#F58220]"
                          />
                        </span>

                        <span className="mt-1 block break-words text-sm font-medium leading-6 text-slate-700">
                          {item.value}
                        </span>

                        <span className="mt-1 block text-xs leading-5 text-slate-500">
                          {item.detail}
                        </span>
                      </span>
                    </a>
                  );
                })}

                {/* OFFICE */}
                <a
                  href={officeMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex min-w-0 items-start gap-4 py-5 transition-colors"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#061A34]/[0.05] text-[#061A34] transition-colors duration-300 group-hover:bg-[#F58220]/10 group-hover:text-[#F58220]">
                    <MapPin size={19} strokeWidth={1.8} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 font-semibold text-[#061A34]">
                      Our office
                      <ArrowUpRight
                        size={15}
                        className="shrink-0 text-slate-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#F58220]"
                      />
                    </span>

                    <span className="mt-1 block break-words text-sm leading-6 text-slate-700">
                      {COMPANY.office}
                    </span>

                    <span className="mt-1 block text-xs leading-5 text-slate-500">
                      View location on Google Maps
                    </span>
                  </span>
                </a>
              </div>
            </motion.aside>

            {/* ENQUIRY FORM */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="min-w-0"
            >
              <div className="mb-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F58220]">
                  Project enquiry
                </p>

                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#061A34] sm:text-3xl">
                  Send an enquiry
                  <span className="text-[#F58220]">.</span>
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Share a few details below so we can better understand your
                  needs and respond appropriately.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.03] sm:p-8">
                <EnquiryForm initialService={service ?? ""} />
              </div>

              <p className="mt-4 text-xs leading-5 text-slate-500">
                Please provide accurate contact details so our team can follow
                up on your enquiry.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}