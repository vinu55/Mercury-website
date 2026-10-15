
import { Link, useNavigate } from "@tanstack/react-router";
import linkedinIcon from "@/assets/linkedin.png";
import whatsappIcon from "@/assets/whatsapp.png";
import {
  ArrowDownRight,
  ArrowRight,
  ChevronDown,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
  House,
  Info,
  Building2,
  Wrench,
  Sun,
  Ship,
  Factory,
  Layers,
  Sparkles,
} from "lucide-react";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { COMPANY, SERVICES } from "@/lib/site-data";

const navClass =
  "relative text-sm font-medium text-white transition-colors duration-300 hover:text-[#f58220] after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-[#f58220] after:transition-all after:duration-300 hover:after:w-full";

function getServiceIcon(title: string) {
  const name = title.toLowerCase();

  if (name.includes("marine")) return Ship;
  if (name.includes("solar") || name.includes("renewable")) return Sun;
  if (name.includes("spare")) return Wrench;
  if (name.includes("biomass")) return Factory;
  if (name.includes("land") || name.includes("boiler")) return Building2;

  return Layers;
}

export function Header() {
  const navigate = useNavigate();
  const [contactTransition, setContactTransition] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigatingRef = useRef(false);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setServicesOpen(false);
  };

  // Desktop contact transition
  const handleContactClick = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();

    if (navigatingRef.current) return;

    navigatingRef.current = true;
    closeMobileMenu();
    setContactTransition(true);
  };

  const handleTransitionComplete = async () => {
    if (!navigatingRef.current) return;

    try {
      await navigate({ to: "/contact" });
    } finally {
      setContactTransition(false);
      navigatingRef.current = false;
    }
  };

  // Mobile contact: close the menu and navigate directly
  const handleMobileContactClick = async (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    closeMobileMenu();
    setContactTransition(false);
    navigatingRef.current = false;

    await navigate({ to: "/contact" });
  };

  return (
    <>
      {/* Desktop page transition */}
      <AnimatePresence>
        {contactTransition && (
          <motion.div
            key="contact-transition"
            data-page-reveal="true"
            className="pointer-events-none fixed inset-0 z-[9999] bg-[#f58220]"
            initial={{ clipPath: "circle(0% at 90% 4%)" }}
            animate={{ clipPath: "circle(150% at 90% 4%)" }}
            exit={{ clipPath: "circle(0% at 90% 4%)" }}
            transition={{
              duration: 0.9,
              ease: [0.65, 0, 0.35, 1],
            }}
            onAnimationComplete={(definition) => {
              if (
                definition &&
                typeof definition === "object" &&
                "clipPath" in definition &&
                definition.clipPath === "circle(150% at 90% 4%)"
              ) {
                void handleTransitionComplete();
              }
            }}
          />
        )}
      </AnimatePresence>

      <header className="fixed inset-x-0 top-0 z-40 bg-[#06152a]/50 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-3 sm:px-5 lg:px-2">
          {/* Animated Mercury logo */}
          <Link
            to="/"
            aria-label="Mercury Energy Solutions home"
            onClick={closeMobileMenu}
            className="flex min-w-0 shrink-0 items-center gap-0"
          >
            <video
  src="/media/logo.webm"
  autoPlay
  loop
  muted
  playsInline
  preload="auto"
  className="h-24 w-24 -mr-5 object-contain sm:h-40 sm:w-40 sm:-mr-11"
/>

            <span className="flex flex-col leading-none">
              <span className="text-base font-bold tracking-tight text-[#294f8f] sm:text-2xl">
                MERCURY
              </span>
              <span className="mt-1 whitespace-nowrap text-[8px] font-bold tracking-[0.08em] text-[#294f8f] sm:text-xs">
                ENERGY SOLUTIONS
              </span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            <Link to="/" className={navClass}>
              Home
            </Link>

            <Link to="/about" className={navClass}>
              About
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                className={`${navClass} flex items-center gap-1`}
                aria-expanded={servicesOpen}
                onClick={() => setServicesOpen((open) => !open)}
              >
                Services
                <ChevronDown
                  className={`size-4 transition-transform duration-300 ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              
<AnimatePresence>
  {servicesOpen && (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute left-0 top-full mt-4 w-60 overflow-hidden rounded-xl bg-[#06152a]/95 p-2 shadow-xl backdrop-blur-xl"
    >
      {SERVICES.map((service) => {
        const Icon = getServiceIcon(service.title);

        return (
          <Link
            key={service.href}
            to={service.href}
            onClick={() => setServicesOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-white/85 transition-colors duration-200 hover:bg-white/10 hover:text-[#f58220]"
          >
            <Icon className="size-4 shrink-0 text-[#f58220]" />
            <span>{service.title}</span>
          </Link>
        );
      })}
    </motion.div>
  )}
</AnimatePresence>
</div>

            <Button
              asChild
              className="rounded-full bg-[#f58220] px-5 text-white transition-all duration-300 hover:scale-105 hover:bg-[#ff963b]"
            >
              <Link
                to="/contact"
                onClick={handleContactClick}
                className="flex items-center gap-2"
              >
                <span>Contact us</span>
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </nav>

          {/* Full-screen mobile navigation */}
          <div className="lg:hidden">
            <Sheet
              open={mobileOpen}
              onOpenChange={(open) => {
                setMobileOpen(open);
                if (!open) setServicesOpen(false);
              }}
            >
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={
                    mobileOpen
                      ? "Close navigation menu"
                      : "Open navigation menu"
                  }
                  className="size-11 border-0 bg-transparent text-white shadow-none hover:bg-transparent hover:text-[#f58220]"
                >
                  <span className="relative flex size-6 items-center justify-center">
                    <motion.span
                      animate={{
                        rotate: mobileOpen ? 45 : 0,
                        y: mobileOpen ? 0 : -6,
                      }}
                      transition={{ duration: 0.22 }}
                      className="absolute h-[2px] w-6 rounded-full bg-current"
                    />
                    <motion.span
                      animate={{
                        opacity: mobileOpen ? 0 : 1,
                        scaleX: mobileOpen ? 0 : 1,
                      }}
                      transition={{ duration: 0.15 }}
                      className="absolute h-[2px] w-6 rounded-full bg-current"
                    />
                    <motion.span
                      animate={{
                        rotate: mobileOpen ? -45 : 0,
                        y: mobileOpen ? 0 : 6,
                      }}
                      transition={{ duration: 0.22 }}
                      className="absolute h-[2px] w-6 rounded-full bg-current"
                    />
                  </span>
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="h-[100dvh] w-full max-w-none overflow-y-auto border-0 bg-[#06152a] p-0 text-white sm:max-w-none [&>button]:hidden"
              >
                <motion.div
                  initial={{ opacity: 0, x: 35 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex min-h-full flex-col"
                >
                  {/* Minimal header: no company logo or white circles */}
                  <div className="flex h-20 shrink-0 items-center justify-between border-b border-white/10 px-5 sm:px-8">
                    <SheetTitle className="text-xl font-bold uppercase tracking-[0.2em] text-white sm:text-2xl">
  Explore<span className="ml-1 text-[#f58220]">.</span>
</SheetTitle>

                    <SheetClose asChild>
                      <button
                        type="button"
                        aria-label="Close navigation menu"
                        className="flex size-11 items-center justify-center border-0 bg-transparent text-white transition-colors hover:text-[#f58220]"
                      >
                        <X className="size-6" />
                      </button>
                    </SheetClose>
                  </div>

                  {/* Main menu */}
                  <div className="flex flex-1 flex-col px-5 pb-8 pt-8 sm:px-8">
                   

                    <nav
                      aria-label="Mobile navigation"
                      className="flex flex-col"
                    >
                      <SheetClose asChild>
                        <Link
                          to="/"
                          onClick={closeMobileMenu}
                          className="group flex min-h-[60px] items-center gap-4 border-b border-white/10 py-4 text-xl font-medium transition-colors hover:text-[#f58220]"
                        >
                          <House className="size-5 text-white/45 transition-colors group-hover:text-[#f58220]" />
                          <span>Home</span>
                          <ArrowDownRight className="ml-auto size-5 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-[#f58220]" />
                        </Link>
                      </SheetClose>

                      <SheetClose asChild>
                        <Link
                          to="/about"
                          onClick={closeMobileMenu}
                          className="group flex min-h-[60px] items-center gap-4 border-b border-white/10 py-4 text-xl font-medium transition-colors hover:text-[#f58220]"
                        >
                          <Info className="size-5 text-white/45 transition-colors group-hover:text-[#f58220]" />
                          <span>About</span>
                          <ArrowDownRight className="ml-auto size-5 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-[#f58220]" />
                        </Link>
                      </SheetClose>

                      {/* Services accordion */}
                      <div className="border-b border-white/10">
                        <button
                          type="button"
                          onClick={() =>
                            setServicesOpen((open) => !open)
                          }
                          aria-expanded={servicesOpen}
                          className="group flex min-h-[60px] w-full items-center gap-4 py-4 text-left text-xl font-medium transition-colors hover:text-[#f58220]"
                        >
                          <Layers className="size-5 text-[#f58220]" />
                          <span>Services</span>
                          <ChevronDown
                            className={`ml-auto size-5 text-white/50 transition-transform duration-300 ${
                              servicesOpen
                                ? "rotate-180 text-[#f58220]"
                                : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {servicesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                duration: 0.25,
                                ease: "easeInOut",
                              }}
                              className="overflow-hidden"
                            >
                              <div className="mb-4 ml-2 border-l border-[#f58220]/50 pl-4">
                                {SERVICES.map((service) => {
                                  const Icon = getServiceIcon(
                                    service.title
                                  );

                                  return (
                                    <SheetClose
                                      asChild
                                      key={service.href}
                                    >
                                      <Link
                                        to={service.href}
                                        onClick={closeMobileMenu}
                                        className="group flex min-h-12 items-center gap-3 rounded-lg px-3 py-3 text-sm text-white/65 transition-colors hover:bg-white/5 hover:text-white"
                                      >
                                        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-[#f58220] transition-colors group-hover:bg-[#f58220]/15">
                                          <Icon className="size-4" />
                                        </span>
                                        <span>{service.title}</span>
                                        <ArrowRight className="ml-auto size-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                                      </Link>
                                    </SheetClose>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </nav>

                    {/* Contact CTA */}
                    <div className="mt-auto pt-10">
                      

                      <Link
                        to="/contact"
                        onClick={handleMobileContactClick}
                        className="flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#f58220] px-6 text-base font-semibold text-white transition-colors hover:bg-[#ff963b]"
                      >
                        Contact us
                        <ArrowRight className="size-5" />
                      </Link>

                      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs text-white/45">
                        <a
                          href={`tel:${COMPANY.phoneHref}`}
                          className="inline-flex items-center gap-2 transition-colors hover:text-white"
                        >
                          <Phone className="size-3.5" />
                          Call us
                        </a>
                        <a
                          href={`mailto:${COMPANY.email}`}
                          className="inline-flex items-center gap-2 transition-colors hover:text-white"
                        >
                          <Mail className="size-3.5" />
                          Email us
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="h-1 shrink-0 bg-gradient-to-r from-[#f58220] via-[#f58220]/40 to-transparent" />
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer className="bg-white text-[#294f8f]">
      <div
        className="
          mx-auto grid max-w-[1440px] grid-cols-1 gap-12
          px-5 py-14 sm:px-8 sm:py-16
          lg:grid-cols-[1.4fr_1fr_1.3fr_0.65fr]
          lg:gap-10 lg:px-10 lg:py-16 xl:gap-14
        "
      >
        <div className="flex flex-col justify-center">
          <img
            src={logo}
            alt="Mercury Energy Solutions"
            className="h-auto w-[220px] object-contain object-left sm:w-[260px] lg:w-[280px] xl:w-[300px]"
          />

          <p className="mt-5 max-w-md text-sm font-medium leading-7 text-[#294f8f]/80 sm:text-base">
            Engineering solutions for a more efficient future.
          </p>
        </div>

        <div>
          <p className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-[#f58220]">
            Solutions
          </p>

          <div className="mt-5 grid gap-3">
            {SERVICES.map((service) => (
              <Link
                key={service.href}
                to={service.href}
                className="w-fit text-sm font-medium text-[#294f8f]/80 transition-all duration-200 hover:translate-x-1 hover:text-[#f58220]"
              >
                {service.title}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-[#f58220]">
            Contact
          </p>

          <div className="mt-5 grid gap-4 text-sm font-medium text-[#294f8f]/80">
            <a
              href={`tel:${COMPANY.phoneHref}`}
              className="flex items-start gap-3 transition-all duration-200 hover:translate-x-1 hover:text-[#f58220]"
            >
              <Phone className="mt-0.5 size-4 shrink-0 text-[#f58220]" />
              <span>{COMPANY.phone}</span>
            </a>

            <a
              href={`mailto:${COMPANY.email}`}
              className="flex items-start gap-3 break-all transition-all duration-200 hover:translate-x-1 hover:text-[#f58220]"
            >
              <Mail className="mt-0.5 size-4 shrink-0 text-[#f58220]" />
              <span>{COMPANY.email}</span>
            </a>

            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-[#f58220]" />
              <span className="leading-6">{COMPANY.office}</span>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-[#f58220]" />
              <span className="leading-6">{COMPANY.registered}</span>
            </div>
          </div>
        </div>

        <div className="text-left lg:text-center">
          <p className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-[#f58220]">
            Social Media
          </p>

          <div className="mt-5 flex justify-start lg:justify-center">
            <a
              href={COMPANY.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="Mercury Energy Solutions on LinkedIn"
              className="inline-flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:scale-105"
            >
              <img
                src={linkedinIcon}
                alt="LinkedIn"
                className="size-11 object-contain"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-[#294f8f]/15 px-5 py-5 text-center text-xs font-medium leading-6 text-[#294f8f]/65 sm:px-8">
        © {new Date().getFullYear()} Mercury Energy Solutions Private Limited
      </div>
    </footer>
  );
}

export function WhatsAppButton() {
  return (
    <a
      href={COMPANY.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Mercury on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex size-13 items-center justify-center transition-transform duration-300 hover:scale-150"
    >
      <img
        src={whatsappIcon}
        alt="WhatsApp"
        className="size-13 object-contain"
      />
    </a>
  );
}
