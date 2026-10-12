import { Link } from "@tanstack/react-router";
import linkedinIcon from "@/assets/linkedin.png";
import whatsappIcon from "@/assets/whatsapp.png";
import {
  ArrowRight,
  ChevronDown,
  Mail,
  MapPin,
  Menu,
  Phone,
} from "lucide-react";
import { useState } from "react";
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

export function Header() {
  const [contactTransition, setContactTransition] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-[#06152a]/50 backdrop-blur-xl">
      <AnimatePresence>
  {contactTransition && (
    <motion.div
      key="contact-transition"
      className="fixed inset-0 z-[9999] h-screen w-screen bg-[#f58220]"
      initial={{
        clipPath: "circle(0% at 90% 4%)",
      }}
      animate={{
        clipPath: "circle(150% at 90% 4%)",
      }}
      transition={{
        duration: 0.9,
        ease: [0.65, 0, 0.35, 1],
      }}
      onAnimationComplete={() => {
        window.location.assign("/contact");
      }}
    />
  )}
</AnimatePresence>
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 lg:px-2">
        <Link
  to="/"
  aria-label="Mercury Energy Solutions home"
  className="flex shrink-0 items-center gap-0"
>
  <video
    src="/media/logo.webm"
    autoPlay
    loop
    muted
    playsInline
    preload="auto"
    className="h-20 w-20 -mr-3 object-contain sm:h-40 sm:w-40 sm:-mr-11"
  />

  <span className="flex flex-col leading-none">
    <span className="text-lg font-bold tracking-tight text-[#294f8f] sm:text-2xl">
      MERCURY
    </span>
    <span className="mt-0.5 text-[10px] font-bold tracking-[0.08em] text-[#294f8f] sm:text-xs">
      ENERGY SOLUTIONS
    </span>
  </span>
</Link>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Main navigation"
        >
          <Link
            to="/"
            className={navClass}
            activeProps={{ className: `${navClass} text-primary` }}
          >
            Home
          </Link>

          <Link
            to="/about"
            className={navClass}
            activeProps={{ className: `${navClass} text-primary` }}
          >
            About us
          </Link>

{/* Minimal Animated Services Dropdown */}
<div
  className="group relative py-7"
>
  <button
    type="button"
    className={`${navClass} flex items-center gap-1.5`}
  >
    Services
    <ChevronDown className="size-4 transition-transform duration-300 group-hover:rotate-180 group-hover:text-[#f58220]" />
  </button>

  <div
    className="
  invisible absolute left-1/2 top-full z-50
  w-64 -translate-x-1/2 translate-y-2
  rounded-xl
  bg-[#061a34]/65 p-2
  opacity-0 shadow-xl shadow-black/20 backdrop-blur-xl
  transition-all duration-300 ease-out
  group-hover:visible group-hover:translate-y-0 group-hover:opacity-100
"
  >
    {SERVICES.map((s) => {
  const Icon = s.icon;

  return (
    <Link
      key={s.href}
      to={s.href}
      className="
        group/item flex items-center gap-3
        rounded-lg px-4 py-3
        text-sm font-medium text-white/80
        transition-all duration-200
        hover:bg-white/[0.07]
        hover:pl-5 hover:text-[#f58220]
        active:scale-[0.98]
      "
    >
      <Icon
        className="
          size-5 shrink-0
          text-white/60
          transition-colors duration-200
          group-hover/item:text-[#f58220]
        "
        strokeWidth={1.7}
      />

      <span>{s.title}</span>
    </Link>
  );
})}
  </div>
</div>

          <Button
  asChild
  size="lg"
  className="group rounded-full bg-[#f58220] font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-106 hover:bg-[#e87512] hover:shadow-xl active:scale-95"
>
  <Link
    to="/contact"
    onClick={(event) => {
      event.preventDefault();
      if (!contactTransition) setContactTransition(true);
    }}
    className="flex items-center gap-2"
  >
    <span>Contact us</span>
    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
  </Link>
</Button>
        </nav>

        <Sheet>
  <SheetTrigger asChild>
    <Button
      variant="ghost"
      size="icon"
      className="text-white transition-all duration-300 hover:scale-110 hover:bg-white/10 lg:hidden"
      aria-label="Open menu"
    >
      <Menu />
    </Button>
  </SheetTrigger>

  <SheetContent className="w-[88%] border-white/10 bg-[#061a34] text-white">
    <SheetTitle className="sr-only">Navigation</SheetTitle>

    <div className="mt-12 flex flex-col gap-1">
      {[
        { title: "Home", href: "/" },
        { title: "About us", href: "/about" },
        ...SERVICES,
        { title: "Contact us", href: "/contact" },
      ].map((s) => (
        <SheetClose asChild key={s.href}>
          <Link
            to={s.href}
            className="border-b border-white/10 py-4 text-lg font-semibold text-white transition-all duration-200 hover:bg-white/10 hover:pl-3 hover:text-white"
          >
            {s.title}
          </Link>
        </SheetClose>
      ))}
    </div>
  </SheetContent>
</Sheet>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-white text-[#294f8f]">
      <div
        className="
          mx-auto
          grid
          max-w-[1440px]
          grid-cols-1
          gap-12
          px-5
          py-14
          sm:px-8
          sm:py-16
          lg:grid-cols-[1.4fr_1fr_1.3fr_0.65fr]
          lg:gap-10
          lg:px-10
          lg:py-16
          xl:gap-14
        "
      >
        {/* Company */}
        <div className="flex flex-col justify-center">
          <img
            src={logo}
            alt="Mercury Energy Solutions"
            className="
              h-auto
              w-[220px]
              object-contain
              object-left
              sm:w-[260px]
              lg:w-[280px]
              xl:w-[300px]
            "
          />

          <p
            className="
              mt-5
              max-w-md
              text-sm
              font-medium
              leading-7
              text-[#294f8f]/80
              sm:text-base
            "
          >
            Engineering solutions for a more efficient future.
          </p>
        </div>

        {/* Solutions */}
        <div>
          <p className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-[#f58220]">
            Solutions
          </p>

          <div className="mt-5 grid gap-3">
            {SERVICES.map((s) => (
              <Link
                key={s.href}
                to={s.href}
                className="
                  w-fit
                  text-sm
                  font-medium
                  text-[#294f8f]/80
                  transition-all
                  duration-200
                  hover:translate-x-1
                  hover:text-[#f58220]
                "
              >
                {s.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <p className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-[#f58220]">
            Contact
          </p>

          <div className="mt-5 grid gap-4 text-sm font-medium text-[#294f8f]/80">
            <a
              href={`tel:${COMPANY.phoneHref}`}
              className="
                flex
                items-start
                gap-3
                transition-all
                duration-200
                hover:translate-x-1
                hover:text-[#f58220]
              "
            >
              <Phone className="mt-0.5 size-4 shrink-0 text-[#f58220]" />
              <span>{COMPANY.phone}</span>
            </a>

            <a
              href={`mailto:${COMPANY.email}`}
              className="
                flex
                items-start
                gap-3
                break-all
                transition-all
                duration-200
                hover:translate-x-1
                hover:text-[#f58220]
              "
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

        {/* Social Media */}
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
              className="
                inline-flex
                items-center
                justify-center
                transition-all
                duration-300
                hover:-translate-y-1
                hover:scale-105
              "
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

      {/* Copyright */}
      <div
        className="
          border-t
          border-[#294f8f]/15
          px-5
          py-5
          text-center
          text-xs
          font-medium
          leading-6
          text-[#294f8f]/65
          sm:px-8
        "
      >
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
      className="
        fixed
        bottom-5
        right-5
        z-40
        flex
        size-13
        items-center
        justify-center
        transition-transform
        duration-300
        hover:scale-150
      "
    >
      <img
        src={whatsappIcon}
        alt="WhatsApp"
        className="size-13 object-contain"
      />
    </a>
  );
}