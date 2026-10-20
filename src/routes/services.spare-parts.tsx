import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Search,
  Wrench,
  Flame,
  Droplets,
  Gauge,
  Ship,
  Settings2,
  Zap,
  SlidersHorizontal,
  Package,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState, type PointerEvent as ReactPointerEvent } from "react";
import marine from "@/assets/spare part banner.jpeg";
import { EnquiryBand, PageHero } from "@/components/site/PageShell";
import { Input } from "@/components/ui/input";

import { AnimatePresence } from "motion/react";

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
          "Explore spare parts and manufacturers for boilers, burners, pumps, valves, tank management, smoke density, electrical equipment and engines.",
      },
      {
        property: "og:title",
        content: "Industrial Spare Parts | Mercury Energy Solutions",
      },
      {
        property: "og:description",
        content: "Specialist sourcing across boiler, burner, pump, valve and control components.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const categories = [
  {
    name: "Boilers",
    icon: Flame,
  },
  {
    name: "Burners",
    icon: Gauge,
  },
  {
    name: "Pumps",
    icon: Droplets,
  },
  {
    name: "Water Control",
    icon: SlidersHorizontal,
  },
  {
    name: "Engine",
    icon: Ship,
  },
  {
    name: "Tank Management System",
    icon: Settings2,
  },
  {
    name: "Smoke Density",
    icon: Gauge,
  },
  {
    name: "Valves",
    icon: Wrench,
  },
  {
    name: "Water Level",
    icon: Droplets,
  },
  {
    name: "Blower",
    icon: Settings2,
  },
  {
    name: "Electrical Equipment",
    icon: Zap,
  },
  {
    name: "Other Equipment",
    icon: Package,
  },
];

const manufacturerGroups = [
  {
    name: "Boilers",
    brands: ["Aalborg", "Kangrim", "Saacke", "Osaka", "Greens"],
  },
  {
    name: "Burners",
    brands: [
      "Weishaupt",
      "Saacke",
      "KBSA / D",
      "Volcano",
      "Sunflame",
      "Oilon",
      "Clayton",
      "Riello",
    ],
  },
  {
    name: "Pumps",
    brands: ["Allweiler", "Grundfos", "Dickow", "KBS", "Kral", "Suntec", "Danfoss"],
  },
  {
    name: "Water Control",
    brands: ["Igema", "Mobrey", "Gestra", "Spirax", "Wika"],
  },
  {
    name: "Engine",
    brands: ["Wärtsilä Corporation", "Mitsubishi Heavy Industries", "Hyundai Heavy Industries"],
  },
  {
    name: "Tank Management System",
    brands: [
      "Rosemount",
      "Kongsberg Gruppen",
      "Saab TankRadar",
      "Consilium AB",
      "Emerson Electric",
      "Endress+Hauser",
      "VEGA Grieshaber KG",
    ],
  },
  {
    name: "Smoke Density",
    brands: ["Mobrey", "Green Instruments", "Skil", "Sick", "Fuji Electric"],
  },
  {
    name: "Valves",
    brands: ["ARI", "Leser", "NAF", "Meson", "Klinger", "Barker & Bille"],
  },
  {
    name: "Water Level",
    brands: ["Danfoss", "EGO", "Parker", "Econosto"],
  },
  {
    name: "Blower",
    brands: ["Spirax", "Samson", "Tyco Valves", "Masonelian"],
  },
  {
    name: "Electrical Equipment",
    brands: [
      "Emerson",
      "Finder",
      "Salzer",
      "Endress & Hauser",
      "Carlo Gavazzi",
      "Siemens",
      "SES",
      "PRElectronic",
      "Johnson",
      "Erab",
      "Honeywell",
      "Dungs",
      "Landis & Gyr",
      "ABB",
      "Sauter",
      "Gestra",
      "Linak",
      "Vacon",
      "Danfoss",
      "Telemecanique",
    ],
  },
  {
    name: "Other Equipment",
    brands: [
      "Haselhofer",
      "Monarch",
      "Altec",
      "Camozzi",
      "Omron",
      "Rosemount",
      "SKF",
      "Belpa",
      "Danimant",
      "Clyde Bergmann",
      "Aqua Metro",
      "FAG",
      "Opsis",
      "Jumo",
      "Delf",
      "Stelnen",
      "Norgreen",
      "Air Torque",
    ],
  },
];

const products = [
  { number: "01", name: "Marine Engine Part", image: "/media/s1.jpg" },
  { number: "02", name: "Pressure Switch", image: "/media/s2.jpg" },
  { number: "03", name: "Pressure Sensor", image: "/media/s3.jpg" },
  { number: "04", name: "Pressure Gauge", image: "/media/s4.jpg" },
  { number: "05", name: "Tank Management System", image: "/media/s5.jpg" },
  { number: "06", name: "Relay", image: "/media/s6.jpg" },
  { number: "07", name: "Solenoid Valve", image: "/media/s7.jpg" },
  { number: "08", name: "Oil Meter", image: "/media/s8.jpg" },
  { number: "09", name: "Temperature Sensor", image: "/media/s9.jpg" },
  { number: "10", name: "Burner Electrode", image: "/media/s10.jpg" },
  { number: "11", name: "Burner Controller Unit", image: "/media/s11.jpg" },
  { number: "12", name: "Burner Transformer Unit", image: "/media/s12.jpg" },
  { number: "13", name: "Control Valves", image: "/media/s13.jpg" },
  { number: "14", name: "Manual Valves", image: "/media/s14.jpg" },
  { number: "15", name: "Flame Amplifier", image: "/media/s15.jpg" },
  { number: "16", name: "Motors", image: "/media/s16.jpg" },
  { number: "17", name: "Pumps", image: "/media/s17.jpg" },
  { number: "18", name: "Burner Oil Pump", image: "/media/s18.jpg" },
  { number: "19", name: "Water Gauge Glass", image: "/media/s19.jpg" },
  {
    number: "20",
    name: "Programmable Logic Controllers",
    image: "/media/s20.jpg",
  },
];
function Page() {
  const categorySliderRef = useRef<HTMLDivElement>(null);

  const scrollCategories = (direction: "left" | "right") => {
    categorySliderRef.current?.scrollBy({
      left:
        direction === "right"
          ? categorySliderRef.current.clientWidth * 0.75
          : -categorySliderRef.current.clientWidth * 0.75,
      behavior: "smooth",
    });
  };
  const [q, setQ] = useState("");
  const [activeCategory, setActiveCategory] = useState("All categories");

  const filteredManufacturers = useMemo(() => {
    const query = q.trim().toLowerCase();

    return manufacturerGroups.filter((group) => {
      const matchesCategory = activeCategory === "All categories" || group.name === activeCategory;

      const matchesSearch =
        !query ||
        group.name.toLowerCase().includes(query) ||
        group.brands.some((brand) => brand.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [q, activeCategory]);

  const filteredProducts = useMemo(() => {
    const query = q.trim().toLowerCase();

    return products.filter((product) => product.name.toLowerCase().includes(query));
  }, [q]);

  return (
    <main>
      <PageHero
        eyebrow="Industrial spare parts"
        title="Critical components, clearly sourced."
        description="Explore spare parts and manufacturers across boiler, burner, pump, valve, instrumentation, electrical and engine systems."
        image={marine}
      />

      {/* MANUFACTURER DIRECTORY */}
      <section className="bg-white px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f58220]">
              Manufacturer network
            </span>

            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-[#061a34] sm:text-4xl lg:text-5xl">
              Spare parts for critical systems
              <span className="text-[#f58220]">.</span>
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Browse manufacturers by equipment category or search for a particular manufacturer to
              help identify your requirement.
            </p>
          </motion.div>

          {/* SEARCH */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative w-full max-w-xl">
              <Search
                aria-hidden="true"
                className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400"
              />

              <Input
                value={q}
                onChange={(event) => setQ(event.target.value)}
                placeholder="Search category or manufacturer..."
                className="h-14 rounded-xl border-slate-200 bg-slate-50 pl-12 text-[#061a34] focus-visible:ring-[#f58220]"
                aria-label="Search spare parts manufacturers"
              />
            </div>

            <p className="text-sm text-slate-500">
              {filteredManufacturers.length} categories found
            </p>
          </div>

          {/* CATEGORY FILTERS */}
          <div className="mt-7">
            <div className="flex items-center gap-2 sm:gap-3">
              {/* LEFT ARROW */}
              <button
                type="button"
                onClick={() => scrollCategories("left")}
                aria-label="Scroll categories left"
                className="flex size-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-[#061a34] transition-colors hover:border-[#f58220] hover:bg-orange-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f58220]"
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>

              {/* CATEGORY SLIDER */}
              <div
                ref={categorySliderRef}
                className="flex min-w-0 flex-1 gap-2 overflow-x-auto scroll-smooth py-1"
                style={{ scrollbarWidth: "none" }}
              >
                {/* ALL EQUIPMENT */}
                <button
                  type="button"
                  onClick={() => setActiveCategory("All categories")}
                  aria-pressed={activeCategory === "All categories"}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors duration-300 ${
                    activeCategory === "All categories"
                      ? "border-[#061a34] bg-[#061a34] text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-[#f58220] hover:bg-orange-50 hover:text-[#061a34]"
                  }`}
                >
                  <Package size={16} aria-hidden="true" />
                  All Equipment
                </button>

                {/* INDIVIDUAL CATEGORIES */}
                {categories.map((category) => {
                  const Icon = category.icon;
                  const active = activeCategory === category.name;

                  return (
                    <button
                      key={category.name}
                      type="button"
                      onClick={() => setActiveCategory(category.name)}
                      aria-pressed={active}
                      className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors duration-300 ${
                        active
                          ? "border-[#061a34] bg-[#061a34] text-white"
                          : "border-slate-200 bg-white text-slate-600 hover:border-[#f58220] hover:bg-orange-50 hover:text-[#061a34]"
                      }`}
                    >
                      <Icon size={16} aria-hidden="true" />
                      {category.name}
                    </button>
                  );
                })}
              </div>

              {/* RIGHT ARROW */}
              <button
                type="button"
                onClick={() => scrollCategories("right")}
                aria-label="Scroll categories right"
                className="flex size-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-[#061a34] transition-colors hover:border-[#f58220] hover:bg-orange-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f58220]"
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>
          </div>
          {/* MANUFACTURER CARDS */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredManufacturers.map((group, index) => {
              const category = categories.find((item) => item.name === group.name);
              const Icon = category?.icon ?? Package;

              return (
                <motion.article
                  key={group.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 0.4,
                    delay: (index % 3) * 0.06,
                  }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#f58220] hover:bg-[#f58220] hover:shadow-xl sm:p-7"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-[#061a34] text-[#f58220] transition-colors duration-300 group-hover:bg-white/20 group-hover:text-white">
                      <Icon size={23} strokeWidth={1.7} />
                    </div>

                    <span className="text-sm font-medium text-slate-400 transition-colors duration-300 group-hover:text-white/80">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-semibold text-[#061a34] transition-colors duration-300 group-hover:text-white">
                    {group.name}
                  </h3>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.brands.map((brand) => (
                      <span
                        key={brand}
                        className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors duration-300 group-hover:bg-white/20 group-hover:text-white"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>

                  <a
                    href={`/contact?service=${encodeURIComponent(`Spare parts - ${group.name}`)}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#f58220] transition-colors duration-300 group-hover:text-white"
                  >
                    Enquire
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </a>
                </motion.article>
              );
            })}
          </div>

          {filteredManufacturers.length === 0 && (
            <div className="py-16 text-center">
              <Package className="mx-auto size-10 text-slate-300" />

              <h3 className="mt-4 text-xl font-semibold text-[#061a34]">
                No matching manufacturers
              </h3>

              <p className="mt-2 text-slate-500">
                Try another search or select a different category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setQ("");
                  setActiveCategory("All categories");
                }}
                className="mt-5 rounded-full bg-[#061a34] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#f58220]"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* SPARE PARTS GALLERY */}
      <section className="bg-white px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f58220]">
              Component catalogue
            </span>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#061a34] sm:text-4xl lg:text-5xl">
              Spare parts &amp; equipment
              <span className="text-[#f58220]">.</span>
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Explore our spare parts catalogue. Select a component to learn more and enquire about
              your equipment requirements.
            </p>
          </motion.div>

          <div className="relative max-w-xl">
            <Search
              aria-hidden="true"
              className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400"
            />

            <Input
              value={q}
              onChange={(event) => setQ(event.target.value)}
              placeholder="Search components..."
              className="h-14 rounded-xl border-slate-200 bg-slate-50 pl-12 text-[#061a34] focus-visible:ring-[#f58220]"
              aria-label="Search spare parts"
            />
          </div>

          <p className="mt-4 text-sm text-slate-500">{filteredProducts.length} components</p>

          <div className="mt-8">
            <SparePartsAccordionList items={filteredProducts} />
          </div>
        </div>
      </section>

      {/* ENQUIRY */}
      <EnquiryBand service="your spare parts requirement" />
    </main>
  );
}
function SparePartsAccordionList({ items }: { items: typeof products }) {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);
  const [pointer, setPointer] = useState({ x: 24, y: 24 });

  const hoveredProduct =
    hoveredIndex !== null ? items.find((item) => item.number === hoveredIndex) : undefined;

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" && event.pointerType !== "pen") {
      return;
    }

    const previewWidth = Math.min(420, window.innerWidth - 32);
    const previewHeight = 300;
    const padding = 16;

    let x = event.clientX + 28;
    let y = event.clientY + 28;

    if (x + previewWidth > window.innerWidth - padding) {
      x = event.clientX - previewWidth - 28;
    }

    if (y + previewHeight > window.innerHeight - padding) {
      y = window.innerHeight - previewHeight - padding;
    }

    setPointer({
      x: Math.max(padding, x),
      y: Math.max(padding, y),
    });
  };

  return (
    <div className="relative w-full divide-y divide-slate-200 border-y border-slate-200">
      {items.map((product) => {
        const isOpen = openIndex === product.number;
        const isHovered = hoveredIndex === product.number;
        const showDescription = isHovered || isOpen;

        return (
          <div
            key={product.number}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse" || event.pointerType === "pen") {
                setHoveredIndex(product.number);
              }
            }}
            onPointerLeave={(event) => {
              if (event.pointerType === "mouse" || event.pointerType === "pen") {
                setHoveredIndex(null);
              }
            }}
            onPointerMove={handlePointerMove}
            className={`group relative cursor-pointer px-4 py-6 transition-colors duration-300 focus-within:outline-none sm:px-6 sm:py-8 ${
              showDescription ? "bg-orange-50/40" : "bg-white"
            }`}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
              <span
                className={`shrink-0 pt-1 text-sm font-semibold tracking-wider transition-colors duration-300 ${
                  showDescription ? "text-[#f58220]" : "text-[#061a34]"
                }`}
              >
                {product.number}
              </span>

              <div className="min-w-0 flex-1">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : product.number)}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      setOpenIndex(null);
                      setHoveredIndex(null);
                    }
                  }}
                  className={`text-left text-xl font-semibold tracking-tight outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[#f58220] sm:text-2xl ${
                    showDescription ? "text-[#f58220]" : "text-[#061a34]"
                  }`}
                >
                  {product.name}
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: showDescription ? "auto" : 0,
                    opacity: showDescription ? 1 : 0,
                    y: showDescription ? 0 : -5,
                  }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden"
                  aria-hidden={!showDescription}
                >
                  <p className="max-w-3xl pt-3 text-sm leading-6 text-slate-600 sm:text-base">
                    Contact our team to confirm availability, compatibility and sourcing options for
                    this component.
                  </p>

                  {isOpen && (
                    <a
                      href={`/contact?service=${encodeURIComponent(
                        `Spare part - ${product.name}`,
                      )}`}
                      onClick={(event) => event.stopPropagation()}
                      className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#061a34] underline decoration-[#f58220] underline-offset-4 transition-colors hover:text-[#f58220]"
                    >
                      Enquire
                      <ArrowRight size={16} aria-hidden="true" />
                    </a>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        );
      })}

      {items.length === 0 && (
        <p className="py-16 text-center text-slate-500">
          No matching components found. Try another search.
        </p>
      )}

      <AnimatePresence>
        {hoveredProduct && (
          <motion.div
            key={hoveredProduct.number}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="pointer-events-none fixed z-[100] hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl md:block"
            style={{
              left: pointer.x,
              top: pointer.y,
              width: "min(420px, calc(100vw - 32px))",
              height: 300,
            }}
          >
            <img
              src={hoveredProduct.image}
              alt={hoveredProduct.name}
              className="h-full w-full object-contain p-2"
              onError={(event) => {
                event.currentTarget.style.visibility = "hidden";
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
