import { createFileRoute, Link } from "@tanstack/react-router";

import {
  lazy,
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";

import biomass from "@/assets/biomass.png";
import boiler from "@/assets/boiler.png";
import marineboiler from "@/assets/marineboiler.png";
import solarpanel from "@/assets/solarpanel.png";
import spareparts from "@/assets/spareparts.png";

import { IntroLoader } from "@/components/site/Loader";
import { SERVICES } from "@/lib/site-data";

const MARQUEE_SERVICES = [
  "DESIGN & ENGINEERING",
  "BOILERS",
  "MARINE",
  "SERVICES",
  "TROUBLESHOOTING",
  "E & I AUTOMATIONS",
  "SPARES",
  "SUPPLY",
  "BIO ENERGY",
];

const SunScene = lazy(() => import("@/components/three/SunScene"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Mercury Energy Solutions | Complete Solutions for Marine, Land-Based Boilers & Thermal Equipment.",
      },
      {
        name: "description",
        content:
          "Engineering-led marine boiler, industrial boiler, bioenergy, solar energy and spare parts solutions.",
      },
      {
        property: "og:title",
        content: "Mercury Energy Solutions",
      },
      {
        property: "og:description",
        content: "Complete Solutions for Marine, Land-Based Boilers & Thermal Equipment.",
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

  component: Home,
});

function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);
  /* =========================================================
     HERO SCROLL
  ========================================================= */

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(heroScrollProgress, [0, 1], [0, 160]);

  /* =========================================================
     ABOUT SCROLL
  ========================================================= */

  const { scrollYProgress: aboutScrollProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "center center"],
  });

  return (
    <main>
      <IntroLoader />

      {/* =========================================================
          HERO VIDEO
      ========================================================= */}

      {/* CINEMATIC HERO */}
      {/* =========================================================
    CINEMATIC HERO — TYPEWRITER ANIMATION
========================================================= */}

      <section
        ref={heroRef}
        className="relative isolate h-[100svh] min-h-[600px] w-full overflow-hidden bg-black text-white"
      >
        {/* Full-screen responsive video */}
        {/* Full-screen responsive video */}
<video
  autoPlay
  loop
  muted
  playsInline
  preload="auto"
  className="h-full w-full object-cover"
  style={{
    transform: "translate3d(0, 0, 0)",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    imageRendering: "crisp-edges",
  }}
>
  <source src="/media/intro.mp4" type="video/mp4" />
</video>

        {/* Hero content */}
        <div className="absolute inset-x-0 bottom-8 z-20 mx-auto max-w-[1440px] px-5 sm:bottom-14 sm:px-10 lg:bottom-16 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <motion.p
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="eyebrow text-accent !text-xs font-semibold uppercase tracking-[0.15em] sm:!text-base sm:tracking-[0.25em]"
            >
              Mercury Energy Solutions
            </motion.p>

            <h1
              aria-label="Complete Solutions for Marine and Land-Based Boilers and Thermal Equipment."
              className="mt-3 max-w-3xl text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl"
            >
              <TypewriterText
                text="Complete Solutions for Marine, Land-Based Boilers & Thermal Equipment"
                delay={500}
                className="inline"
              />
              <span className="text-[#f58220]">.</span>
            </h1>

            <motion.button
              type="button"
              initial="rest"
              whileHover="hover"
              whileTap={{ scale: 0.94 }}
              onClick={() =>
                document.getElementById("solutions")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
              variants={{
                rest: { width: 46 },
                hover: { width: 125 },
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="group mt-5 flex h-11 items-center overflow-hidden rounded-full bg-[#f58220] text-white shadow-lg sm:mt-6 sm:h-12"
              aria-label="Explore solutions"
            >
              <span className="flex h-11 w-[46px] shrink-0 items-center justify-center sm:h-12 sm:w-[48px]">
                <ArrowRight size={21} strokeWidth={2.4} />
              </span>

              <motion.span
                variants={{
                  rest: { opacity: 0, x: -8 },
                  hover: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.2 }}
                className="whitespace-nowrap pr-4 text-sm font-semibold"
              >
                Explore
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          ABOUT + INTERACTIVE 3D SUN
      ========================================================= */}
<section
  ref={aboutRef}
  className="relative overflow-hidden bg-[#061a34] text-primary-foreground"
>
  <div
    className="
      mx-auto
      grid
      grid-cols-1
      landscape:grid-cols-[1.1fr_0.9fr]
      landscape:items-center
      landscape:min-h-[380px]
      min-h-0
      max-w-[1440px]
      items-center
      px-5
      pt-4
      pb-6
      lg:min-h-[680px]
      lg:grid-cols-[1.15fr_0.85fr]
      lg:px-10
      lg:py-24
    "
  >
    {/* LEFT — ABOUT TEXT */}
    <AboutText scrollProgress={aboutScrollProgress} />

    {/* RIGHT — 3D SUN */}
    <InteractiveSun scrollProgress={aboutScrollProgress} />
  </div>
</section>
      {/* =========================================================
          MOVING ENGINEERING SERVICES TEXT
      ========================================================= */}

     <section
        aria-label="Mercury engineering capabilities"
        className="overflow-hidden bg-[#061a34] py-2.5 sm:py-8"
     >
        <div className="services-marquee">
          <div className="services-marquee-track">
            {[...MARQUEE_SERVICES, ...MARQUEE_SERVICES].map((service, index) => (
              <span
                key={`${service}-${index}`}
                className="flex shrink-0 items-center whitespace-nowrap text-lg font-semibold tracking-[0.12em] text-white transition-colors duration-300 hover:text-[#f58220] sm:text-xl sm:tracking-[0.16em]"
              >
                {service}
                <span className="mx-5 text-white sm:mx-8"></span>
              </span>
            ))}
          </div>
        </div>

        <style>{`
          .services-marquee {
            width: 100%;
            overflow: hidden;
          }

          .services-marquee-track {
            display: flex;
            width: max-content;
            will-change: transform;
            animation: mercury-services-marquee 35s linear infinite;
          }

          @keyframes mercury-services-marquee {
            from {
              transform: translateX(-50%);
            }
            to {
              transform: translateX(0);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .services-marquee-track {
              animation: none;
            }
          }
        `}</style>
      </section>

      {/* =========================================================
          OUR SOLUTIONS — HORIZONTAL SCROLL
      ========================================================= */}

      <ServicesParallax />
    </main>
  );
}

/* =============================================================
   ABOUT TEXT
   Smoothly enters from the left based on scroll.
============================================================= */
/* =============================================================
   OUR SOLUTIONS — SMOOTH HORIZONTAL SCROLL
============================================================= */





const serviceImages = [
  marineboiler,
  boiler,
  biomass,
  solarpanel,
  spareparts,
];

const descriptions = [
  "Reliable marine boiler systems engineered for demanding vessel operations and long-term performance.",
  "Efficient industrial boiler solutions built for dependable performance and demanding applications.",
  "Sustainable biomass systems designed to deliver efficient and reliable thermal energy.",
  "Practical solar solutions supporting energy efficiency and more sustainable operations.",
  "Quality spare parts and dependable support to keep your equipment running smoothly.",
];



/* =============================================================
   SERVICE SCROLL CARD
============================================================= */




function ServiceScrollCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.97, 1, 0.97],
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.8, 1, 1, 0.8],
  );

  const image = serviceImages[index % serviceImages.length];

  return (
    <motion.article
      ref={cardRef}
      style={{ scale, opacity }}
      className="
        group relative mx-auto w-full min-w-0 max-w-5xl
        overflow-hidden rounded-2xl sm:rounded-3xl
        border border-white/10 bg-[#061a34]
        shadow-[0_16px_45px_rgba(0,0,0,0.2)]
      "
    >
      {/* Entire image is clickable */}
      <Link
        to={service.href}
        aria-label={`View ${service.title} services`}
        className="
  group/image relative isolate block
  h-[190px] w-full overflow-hidden
  rounded-2xl
  focus-visible:outline-none
  focus-visible:ring-2 focus-visible:ring-inset
  focus-visible:ring-[#f58220]
  sm:h-[300px]
  sm:rounded-3xl
  md:h-[360px]
  lg:h-[440px]
  xl:h-[480px]
"
      >
        <img
          src={image}
          alt={service.title}
          loading={index === 0 ? "eager" : "lazy"}
          className="
            absolute inset-0 block h-full w-full
            object-cover object-center
            transition-transform duration-700 ease-out
            group-hover/image:scale-[1.03]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0
            bg-gradient-to-t from-[#061a34]/25 to-transparent
          "
        />
      </Link>

      {/* Separate animated arrow link */}
      <Link
        to={service.href}
        aria-label={`Explore ${service.title}`}
        className="
          group/button absolute bottom-2 right-2 z-10
          flex size-10 items-center justify-center
          rounded-full bg-[#f58220] text-white
          shadow-[0_6px_20px_rgba(245,130,32,0.35)]
          transition-all duration-300 ease-out
          hover:scale-110 hover:bg-[#ff963d]
          hover:shadow-[0_10px_28px_rgba(245,130,32,0.5)]
          focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-white
          sm:bottom-6 sm:right-6 sm:size-[76px]
          md:size-[84px]
        "
      >
        <span
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-[-3px]
            rounded-full border-2 border-transparent
            border-t-white border-r-white/70
            animate-spin [animation-duration:2.5s]
            motion-reduce:animate-none
          "
        />

        <ArrowRight
          className="
            size-5 transition-transform duration-300 ease-out
            group-hover/button:rotate-[-45deg]
            sm:size-8
          "
        />

        <span className="sr-only">Explore service</span>
      </Link>
    </motion.article>
  );
}




/* =============================================================
   SERVICES SECTION + RIGHT-SIDE NAVIGATION
============================================================= */


function ServicesParallax() {
  const [activeService, setActiveService] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;

    const updateNavigation = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const sectionRect = section.getBoundingClientRect();

        setIsVisible(
          sectionRect.top < window.innerHeight &&
          sectionRect.bottom > 0
        );

        const cards = SERVICES.map((_, index) =>
          document.getElementById(`service-${index}`)
        ).filter(Boolean) as HTMLElement[];

        const viewportCenter = window.innerHeight / 2;
        let nearestIndex = 0;
        let nearestDistance = Infinity;

        cards.forEach((card, index) => {
          const rect = card.getBoundingClientRect();
          const cardCenter = rect.top + rect.height / 2;
          const distance = Math.abs(cardCenter - viewportCenter);

          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestIndex = index;
          }
        });

        setActiveService(nearestIndex);
      });
    };

    updateNavigation();

    window.addEventListener("scroll", updateNavigation, {
      passive: true,
    });
    window.addEventListener("resize", updateNavigation);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateNavigation);
      window.removeEventListener("resize", updateNavigation);
    };
  }, []);

  return (
    <>
      <section
  id="solutions"
  className="
    relative w-full min-w-0 overflow-x-clip
    bg-[#061a34] px-3 py-10 text-white
    sm:px-6 sm:py-14
    lg:px-12 lg:py-20
  "
>
        <div className="mx-auto max-w-7xl">
          {/* Section heading */}
          <div className="mb-8 sm:mb-12">
            <p className="eyebrow text-accent !text-base font-semibold uppercase tracking-[0.2em] sm:!text-base lg:!text-lg sm:tracking-[0.25em]">
              Our Solutions
            </p>
          </div>

          {/* Service cards */}
          <div className="flex min-w-0 flex-col gap-8 sm:gap-12 lg:gap-16">
  {SERVICES.map((service, index) => (
    <div
      key={service.href}
      id={`service-${index}`}
      className="w-full min-w-0 scroll-mt-24"
    >
      <ServiceScrollCard
        service={service}
        index={index}
      />
    </div>
  ))}
</div>
        </div>
      </section>

      {/* Dots-only navigation */}
      
    </>
  );
}


/* =========================================================
   TYPEWRITER TEXT
========================================================= */

function TypewriterText({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;
    let index = 0;

    setVisibleText("");

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        index += 1;
        setVisibleText(text.slice(0, index));

        if (index >= text.length && intervalId) {
          clearInterval(intervalId);
        }
      }, 55);
    }, delay);

    return () => {
      clearTimeout(timeoutId);

      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [text, delay]);

  return (
    <span className={className}>
      {visibleText}
      {visibleText.length < text.length && (
        <span
          aria-hidden="true"
          className="ml-1 inline-block h-[0.78em] w-[2px] translate-y-[0.04em] animate-pulse bg-[#f58220]"
        />
      )}
    </span>
  );
}

/* =============================================================
   ABOUT TEXT
============================================================= */

function AboutText({
  scrollProgress,
}: {
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const { ref: inViewRef, inView: isInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const headlineText = "One Partner, Multiple Solutions";
  const descriptionText =
    "Mercury Energy Solutions delivers integrated engineering services, marine and industrial boiler solutions, bioenergy, solar energy systems, and specialist spare parts — all under one roof.";

  const [headline, setHeadline] = useState("");
  const [description, setDescription] = useState("");
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || hasAnimated) return;

    let headlineIndex = 0;
    let descriptionIndex = 0;
    let headlineTimer: ReturnType<typeof setTimeout>;
    let descriptionTimer: ReturnType<typeof setTimeout>;

    const typeDescription = () => {
      descriptionIndex += 1;
      setDescription(descriptionText.slice(0, descriptionIndex));

      if (descriptionIndex < descriptionText.length) {
        descriptionTimer = setTimeout(typeDescription, 18);
      } else {
        setHasAnimated(true);
      }
    };

    const typeHeadline = () => {
      headlineIndex += 1;
      setHeadline(headlineText.slice(0, headlineIndex));

      if (headlineIndex < headlineText.length) {
        headlineTimer = setTimeout(typeHeadline, 55);
      } else {
        descriptionTimer = setTimeout(typeDescription, 350);
      }
    };

    headlineTimer = setTimeout(typeHeadline, 250);

    return () => {
      clearTimeout(headlineTimer);
      clearTimeout(descriptionTimer);
    };
  }, [isInView, hasAnimated]);

  const x = useTransform(scrollProgress, [0, 0.35, 0.75, 1], [-40, -20, -5, 0]);

  const opacity = useTransform(scrollProgress, [0, 0.25, 0.65, 1], [0, 0.35, 0.85, 1]);

  
return (
  <motion.div
    ref={inViewRef}
    style={{ x, opacity }}
    className="relative z-20 w-full max-w-2xl lg:max-w-none lg:pr-8 lg:translate-x-4"
  >
    <p className="eyebrow text-accent !text-base font-semibold uppercase tracking-[0.2em] sm:!text-base lg:!text-lg sm:tracking-[0.25em]">
      About Mercury
    </p>

    <h2
      className="
        mt-3 max-w-3xl text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl
      "
      
      aria-label={`${headlineText}.`}
    >
      <span>{hasAnimated ? headlineText : headline}</span>
      {(hasAnimated || headline === headlineText) && (
        <span className="text-[#f58220]">.</span>
      )}

      {!hasAnimated && isInView && headline !== headlineText && (
        <span
          aria-hidden="true"
          className="ml-1 inline-block h-[0.8em] w-[2px] animate-pulse bg-[#f58220] align-baseline"
        />
      )}
    </h2>

    <p
      className="
        mt-2
        landscape:mt-2
        sm:mt-4
        min-h-0
        landscape:min-h-0
        sm:min-h-[10rem]
        lg:min-h-[12rem]
        max-w-xl
        text-xs
        landscape:text-xs
        sm:text-lg
        lg:text-xl
        leading-5
        landscape:leading-5
        sm:leading-8
        lg:leading-9
        text-white/70
      "
      aria-label={descriptionText}
    >
      {hasAnimated ? descriptionText : description}

      {!hasAnimated &&
        headline === headlineText &&
        isInView &&
        description !== descriptionText && (
          <span
            aria-hidden="true"
            className="ml-1 inline-block h-[0.8em] w-[2px] animate-pulse bg-[#f58220] align-baseline"
          />
        )}
    </p>

    <Link
      to="/about"
      onClick={(e) => {
        e.preventDefault();

        if (document.getElementById("page-transition-overlay")) return;

        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        const overlay = document.createElement("div");
        overlay.id = "page-transition-overlay";

        Object.assign(overlay.style, {
          position: "fixed",
          inset: "0",
          background: "#f58220",
          zIndex: "99999",
          clipPath: `circle(0px at ${x}px ${y}px)`,
          transition: "clip-path 850ms cubic-bezier(0.76, 0, 0.24, 1)",
          pointerEvents: "none",
        });

        document.body.appendChild(overlay);

        const radius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        );

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            overlay.style.clipPath = `circle(${radius}px at ${x}px ${y}px)`;
          });
        });

        setTimeout(() => {
          overlay.remove();
          window.location.assign("/about");
        }, 850);
      }}
      aria-label="Discover our approach"
      className="
        mt-4
        landscape:mt-3
        sm:mt-8
        inline-flex
        h-10
        w-10
        landscape:h-10
        landscape:w-10
        sm:h-12
        sm:w-12
        items-center
        justify-center
        rounded-full
        bg-[#f58220]
        text-white
        transition-transform
        duration-300
        hover:scale-110
        active:scale-95
      "
    >
      <ArrowRight className="size-4 sm:size-5 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  </motion.div>
);

}

/* =============================================================
   INTERACTIVE 3D SUN

   Scroll:
   - Starts slightly right and smaller
   - Smoothly moves into position
   - Smoothly grows

   Cursor:
   - Sun follows cursor subtly
   - Sun tilts toward cursor

   Actual 3D rotation/grabbing:
   - Handled inside SunScene.tsx
============================================================= */
function InteractiveSun({
  scrollProgress,
}: {
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  /* =========================================================
     CURSOR POSITION
  ========================================================= */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 80,
    damping: 20,
    mass: 0.7,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 80,
    damping: 20,
    mass: 0.7,
  });

  /* =========================================================
     CURSOR ROTATION
  ========================================================= */

  const rotateX = useTransform(smoothY, [-1, 1], [7, -7]);
  const rotateY = useTransform(smoothX, [-1, 1], [-10, 10]);

  /* =========================================================
     CURSOR MOVEMENT
  ========================================================= */

  const cursorX = useTransform(smoothX, [-1, 1], [-24, 24]);
  const cursorY = useTransform(smoothY, [-1, 1], [-16, 16]);

  /* =========================================================
     SCROLL MOVEMENT
  ========================================================= */

  const rawScrollX = useTransform(scrollProgress, [0, 0.2, 0.55, 1], [100, 65, 20, 0]);
  const rawScrollY = useTransform(scrollProgress, [0, 0.2, 0.55, 1], [80, 45, 12, 0]);
  const rawScrollScale = useTransform(scrollProgress, [0, 0.2, 0.55, 1], [0.78, 0.84, 0.94, 1]);
  const rawScrollOpacity = useTransform(
    scrollProgress,
    [0, 0.2, 0.45, 0.75, 1],
    [0.25, 0.6, 0.9, 0.98, 1],
  );

  const scrollX = useSpring(rawScrollX, {
    stiffness: 55,
    damping: 24,
    mass: 0.8,
  });

  const scrollY = useSpring(rawScrollY, {
    stiffness: 55,
    damping: 24,
    mass: 0.8,
  });

  const scrollScale = useSpring(rawScrollScale, {
    stiffness: 45,
    damping: 22,
    mass: 1,
  });

  const scrollOpacity = useSpring(rawScrollOpacity, {
    stiffness: 60,
    damping: 25,
    mass: 0.8,
  });

  /* =========================================================
     COMBINE SCROLL + CURSOR MOVEMENT
  ========================================================= */

  const combinedX = useTransform(
    [scrollX, cursorX],
    ([scrollValue, cursorValue]) => (scrollValue as number) + (cursorValue as number),
  );

  const combinedY = useTransform(
    [scrollY, cursorY],
    ([scrollValue, cursorValue]) => (scrollValue as number) + (cursorValue as number),
  );

  /* =========================================================
     POINTER HANDLERS
  ========================================================= */

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;

    mouseX.set(Math.max(-1, Math.min(1, x)));
    mouseY.set(Math.max(-1, Math.min(1, y)));
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      style={{
        x: combinedX,
        y: combinedY,
        scale: scrollScale,
        opacity: scrollOpacity,
      }}
      className="
        relative
        flex
        /* Keep it compact on landscape phones */
        h-[240px]
        landscape:h-[280px]
        sm:h-[450px]
        lg:h-[600px]
        w-full
        items-center
        justify-center
        will-change-transform
      "
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
        }}
        className="
          relative
          flex
          h-full
          w-full
          items-center
          justify-center
          will-change-transform
          landscape:translate-x-0 landscape:translate-y-0
          lg:-translate-y-10 lg:translate-x-16
          xl:-translate-y-16 xl:translate-x-24
        "
      >
        <div className="relative -my-12 landscape:my-0 h-[calc(100%+96px)] landscape:h-full w-[calc(100%+96px)] landscape:w-full sm:my-0 sm:h-full sm:w-full">
          <Suspense fallback={null}>
            <SunScene />
          </Suspense>
        </div>
      </motion.div>
    </motion.div>
  );
}