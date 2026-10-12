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
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import biomass from "@/assets/biomass.png";
import boiler from "@/assets/boiler.png";
import marineboiler from "@/assets/marineboiler.png";
import solarpanel from "@/assets/solarpanel.png";
import spareparts from "@/assets/spareparts.png";

import { IntroLoader } from "@/components/site/Loader";
import { SERVICES } from "@/lib/site-data";


const SunScene = lazy(() => import("@/components/three/SunScene"));

export const Route = createFileRoute("/")({

  head: () => ({
    meta: [
      {
        title: "Mercury Energy Solutions | Boiler, Biomass & Solar Engineering",
      },
      {
        name: "description",
        content:
          "Engineering-led marine boiler, industrial boiler, biomass fuel, solar energy and spare parts solutions.",
      },
      {
        property: "og:title",
        content: "Mercury Energy Solutions",
      },
      {
        property: "og:description",
        content:
          "Engineering energy forward across boiler, biomass and solar systems.",
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

  const heroY = useTransform(
    heroScrollProgress,
    [0, 1],
    [0, 160],
  );

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
  className="relative isolate h-[100svh] min-h-[600px] w-full overflow-hidden bg-[#07182d] text-white"
>
  {/* Background video */}
  <motion.video
    style={{ y: heroY }}
    src="/media/intro.mp4"
    autoPlay
    muted
    loop
    playsInline
    preload="metadata"
    aria-hidden="true"
    className="absolute inset-0 -z-20 h-[115%] w-full object-cover object-center"
  />

  {/* Cinematic overlays */}
  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#06152a]/90 via-[#07182d]/60 to-[#07182d]/15" />
  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#06152a]/80 via-transparent to-[#06152a]/20" />

  {/* Hero content */}
  <div className="mx-auto flex h-full max-w-[1440px] items-center px-6 pb-14 pt-24 sm:px-10 lg:px-16 translate-x-10 translate-y-10">
    <motion.div
      
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-6xl"
    >
      {/* Brand label */}
      <motion.p
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 3, delay: 1.5 }}
        className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#ff922e] sm:mb-7 sm:text-sm sm:tracking-[0.3em] translate-x-2 translate-y-5"
      >
        Mercury Energy Solutions
      </motion.p>

      {/* Animated headline */}
      <div
        className="min-h-[2.15em] sm:min-h-[2.1em]"
        aria-label="Built to perform. Engineered to last."
      >
        <h1 className="text-5xl font-semibold leading-[1.04] tracking-[-0.055em] sm:text-6xl md:text-7xl lg:text-[6.5rem]">
          <TypewriterText
            text="Built to perform"
            delay={1500}
            className="text-white"
          />
          <span className="text-[#f58220]">.</span>

          <br />
          <TypewriterText
            text="Engineered to last"
            delay={2000}
            className="text-white"
          />
          <span className="text-[#f58220]">.</span>
        </h1>
      </div>

      {/* Minimal Explore button */}
      

{/* Animated Explore Button */}
<motion.button
  animate={{ x: 10, y: 24 }}
  type="button"
  onClick={() => {
    document.getElementById("solutions")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }}
  initial="rest"
  whileHover="hover"
  whileTap={{ scale: 0.94 }}
  variants={{
    rest: { width: 52 },
    hover: { width: 135 },
  }}
  transition={{ duration: 0.35, ease: "easeInOut" }}
  className="group flex h-12 items-center overflow-hidden rounded-full bg-[#f58220] text-white shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
  aria-label="Explore solutions"
>
  {/* White animated arrow */}
  <span className="flex h-12 w-[52px] shrink-0 items-center justify-center">
    <motion.span
  variants={{
    rest: { rotate: 0, x: 0 },
    hover: { rotate: 90, x: 6 },
  }}
  transition={{ duration: 0.3, ease: "easeInOut" }}
  className="inline-flex"
>
  <ArrowRight size={23} strokeWidth={2.4} className="text-white" />
</motion.span>
  </span>

  {/* Explore text appears on hover */}

<motion.span
  variants={{
    rest: { opacity: 0, x: -10 },
    hover: { opacity: 1, x: 0 },
  }}
  transition={{ duration: 0.22, delay: 0.06 }}
  className="whitespace-nowrap pr-5 text-sm font-semibold text-white"
>
  Explore
</motion.span>

</motion.button>


    </motion.div>
  </div>

  {/* Scroll indicator */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 3, duration: 0.7 }}
    className="absolute bottom-7 left-6 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.24em] text-white/60 sm:left-10 lg:left-16"
  >
    <span className="flex h-8 w-5 items-start justify-center rounded-full border border-white/30 p-1">
      <motion.span
        animate={{ y: [0, 10, 0], opacity: [1, 0.35, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="h-1.5 w-1 rounded-full bg-[#f58220]"
      />
    </span>
    Scroll to explore
  </motion.div>
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
            min-h-[680px]
            max-w-[1440px]
            items-center
            px-5
            py-20
            lg:grid-cols-[0.85fr_1.15fr]
            lg:px-10
            lg:py-24
          "
        >
          {/* =====================================================
              LEFT — ABOUT TEXT
          ===================================================== */}

          <AboutText scrollProgress={aboutScrollProgress} />

          {/* =====================================================
              RIGHT — 3D SUN
          ===================================================== */}

          <InteractiveSun scrollProgress={aboutScrollProgress} />
        </div>
      </section>

      {/* =========================================================
          SERVICES — LAST SECTION
      ========================================================= */}

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

function ServicesParallax() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

const [horizontalDistance, setHorizontalDistance] = useState(0);
const [viewportHeight, setViewportHeight] = useState(
  typeof window !== "undefined" ? window.innerHeight : 800
);
const [measured, setMeasured] = useState(false);

  /*
   * Measure the real width of the horizontal track.
   *
   * This means we don't guess with -300vw.
   * The animation always ends exactly when the final card
   * reaches the correct position.
   */
  useLayoutEffect(() => {
    const measure = () => {
      const viewport = viewportRef.current;
      const track = trackRef.current;

      if (!viewport || !track) return;

      const viewportWidth = viewport.clientWidth;
      const trackWidth = track.scrollWidth;

      const distance = Math.max(
        0,
        trackWidth - viewportWidth,
      );

      setHorizontalDistance(distance);
      setViewportHeight(window.innerHeight);
      setMeasured(true);
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);

    if (viewportRef.current) {
      resizeObserver.observe(viewportRef.current);
    }

    if (trackRef.current) {
      resizeObserver.observe(trackRef.current);
    }

    window.addEventListener("resize", measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  /*
   * The section height is directly connected to the
   * horizontal distance.
   *
   * Example:
   *
   * 1000px horizontal travel
   * +
   * 100vh sticky viewport
   * =
   * exact vertical scroll duration.
   */
  const sectionHeight =
  horizontalDistance > 0
    ? horizontalDistance + viewportHeight
    : viewportHeight;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /*
   * Direct mapping instead of a spring.
   *
   * This is intentional.
   *
   * A spring can lag behind the user's scroll position.
   * That can cause the footer to appear while the final
   * card is still moving.
   *
   * Direct mapping keeps vertical scroll and horizontal
   * position perfectly synchronized.
   */
  const trackX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -horizontalDistance],
  );

  /*
   * Heading fades away shortly after the section begins.
   */
  const headingOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.18],
    [1, 0.65, 0],
  );

  /*
   * Heading moves slightly upward while disappearing.
   */
  const headingY = useTransform(
    scrollYProgress,
    [0, 0.18],
    [0, -30],
  );

  return (
    <section
  id="solutions"
  ref={sectionRef}
  style={{
    height: measured
      ? `${horizontalDistance + viewportHeight}px`
      : "100vh",
  }}
  className="relative bg-[#061a34] text-white"
>
      <div
        ref={viewportRef}
        className="
          sticky
          top-0
          flex
          h-screen
          w-full
          items-center
          overflow-hidden
        "
      >

        {/* =====================================================
            HEADER
        ===================================================== */}

        <motion.div
          
          className="
            pointer-events-none
  absolute
  left-0
  top-0
  z-30
  w-full
  px-5
  pt-16
  sm:px-8
  sm:pt-20
  lg:px-12
  lg:pt-24
          "
        >
          <div className="mx-auto max-w-[1440px]">

            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-accent sm:text-xs">
              Our solutions
            </p>

            

          </div>
        </motion.div>


        {/* =====================================================
            HORIZONTAL TRACK
        ===================================================== */}

        <motion.div
          ref={trackRef}
          style={{
            x: trackX,
          }}
          className="
            flex
            w-max
            shrink-0
            items-center
            gap-5
            px-5
            pt-16
            will-change-transform
            sm:gap-7
            sm:px-8
            sm:pt-20
            lg:gap-8
            lg:px-12
            lg:pt-24
          "
        >
          {SERVICES.map((service, index) => (
            <ServiceParallaxCard
              key={service.href}
              service={service}
              index={index}
              scrollProgress={scrollYProgress}
            />
          ))}
        </motion.div>


        {/* =====================================================
            BOTTOM UI
        ===================================================== */}

        <div className="
          pointer-events-none
          absolute
          bottom-7
          left-0
          z-30
          w-full
          px-5
          sm:px-8
          lg:px-12
        ">
          <div className="
            mx-auto
            flex
            max-w-[1440px]
            items-center
            justify-between
          ">

            <motion.p
              style={{
                opacity: useTransform(
                  scrollYProgress,
                  [0, 0.7, 1],
                  [1, 0.7, 0.35],
                ),
              }}
              className="
                text-[10px]
                uppercase
                tracking-[0.22em]
                text-white/35
                sm:text-xs
              "
            >
              Scroll to explore
            </motion.p>


            <div className="flex items-center gap-3">

              <div className="
                h-px
                w-20
                overflow-hidden
                bg-white/15
                sm:w-32
              ">
                <motion.div
                  style={{
                    scaleX: scrollYProgress,
                    transformOrigin: "left",
                  }}
                  className="h-full w-full bg-white"
                />
              </div>

              <motion.div
                style={{
                  rotate: useTransform(
                    scrollYProgress,
                    [0, 1],
                    [0, 180],
                  ),
                }}
              >
                <ArrowRight className="size-4 text-white/50" />
              </motion.div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

/* =============================================================
   SERVICE CARD
============================================================= */

function ServiceParallaxCard({
  service,
  index,
  scrollProgress,
}: {
  service: (typeof SERVICES)[number];
  index: number;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const img =
    index === 0
      ? marineboiler
      : index === 1
        ? boiler
        : index === 2
          ? biomass
          : index === 3
            ? solarpanel
            : spareparts;

  const cardStart = index * 0.18;
  const cardEnd = Math.min(cardStart + 0.28, 1);

  const cardScale = useTransform(
    scrollProgress,
    [
      Math.max(0, cardStart - 0.12),
      cardStart,
      cardEnd,
      Math.min(1, cardEnd + 0.12),
    ],
    [0.94, 1, 1, 0.94],
  );

  const cardOpacity = useTransform(
    scrollProgress,
    [
      Math.max(0, cardStart - 0.1),
      cardStart,
      cardEnd,
      Math.min(1, cardEnd + 0.1),
    ],
    [0.72, 1, 1, 0.72],
  );

  const imageX = useTransform(
    scrollProgress,
    [0, 1],
    [index * -25, index * 25],
  );

  const imageScale = useTransform(
    scrollProgress,
    [0, 1],
    [1.08, 1.16],
  );

  return (
    <motion.div
      style={{
        scale: cardScale,
        opacity: cardOpacity,
      }}
      className="
        h-[62vh]
        min-h-[500px]
        w-[82vw]
        max-w-[1080px]
        shrink-0
        will-change-transform
        sm:h-[65vh]
        lg:h-[68vh]
        lg:w-[68vw]
      "
    >
      <Link
        to={service.href}
        className="
          group
          relative
          block
          h-full
          w-full
          overflow-hidden
          rounded-[30px]
          bg-white
          sm:rounded-[34px]
          lg:rounded-[40px]
        "
      >
        {/* Image */}
        <motion.img
  src={img}
  alt={service.title}
  loading={index === 0 ? "eager" : "lazy"}
  style={{
    x: index === 4 ? 0 : imageX,
    scale: index === 4 ? 1 : imageScale,
  }}
  className={`
    absolute
    inset-0
    h-full
    w-full
    ${
      index === 4
        ? "object-contain p-0"
        : "object-contain p-8 sm:p-10 lg:p-14"
    }
  `}
/>

        {/* Service Name + Button */}
        <div
          className="
            absolute
            inset-x-6
            bottom-6
            z-10
            sm:inset-x-8
            sm:bottom-8
            lg:inset-x-10
            lg:bottom-10
          "
        >
          <div className="max-w-3xl">
            

            <span
              className="
                mt-6
                inline-flex
                items-center
                gap-3
                rounded-full
                border
                border-[#294f8f]
                bg-white
                px-5
                py-3
                text-sm
                font-semibold
                text-[#294f8f]
                shadow-sm
                transition-all
                duration-300
                group-hover:bg-[#294f8f]
                group-hover:text-white
                group-hover:shadow-lg
              "
            >
              Explore service

              <ArrowRight
                className="
                  size-4
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
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
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let index = 0;

    setVisibleText("");

    timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        index += 1;
        setVisibleText(text.slice(0, index));

        if (index >= text.length && intervalId) {
          clearInterval(intervalId);
        }
      }, 55);
    }, delay);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
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
    triggerOnce: false,
  });

  const headlineText = "One Partner, Multiple Solutions";

  const descriptionText =
    "Mercury Energy Solutions delivers integrated engineering services, marine and industrial boiler solutions, biomass fuel, solar energy systems, and specialist spare parts — all under one roof.";

  const [headline, setHeadline] = useState("");
  const [description, setDescription] = useState("");

  // Type the headline whenever the section enters the viewport.
  useEffect(() => {
    setHeadline("");
    setDescription("");

    if (!isInView) return;

    let index = 0;
    let timer: ReturnType<typeof setTimeout>;

    const typeNext = () => {
      index += 1;
      setHeadline(headlineText.slice(0, index));

      if (index < headlineText.length) {
        timer = setTimeout(typeNext, 45);
      }
    };

    timer = setTimeout(typeNext, 200);

    return () => clearTimeout(timer);
  }, [isInView]);

  // Start typing the description after the headline finishes.
  useEffect(() => {
    setDescription("");

    if (!isInView || headline.length !== headlineText.length) {
      return;
    }

    let index = 0;
    let timer: ReturnType<typeof setTimeout>;

    const typeNext = () => {
      index += 1;
      setDescription(descriptionText.slice(0, index));

      if (index < descriptionText.length) {
        timer = setTimeout(typeNext, 16);
      }
    };

    timer = setTimeout(typeNext, 300);

    return () => clearTimeout(timer);
  }, [isInView, headline]);

  // Scroll-based movement and opacity.
  const x = useTransform(
    scrollProgress,
    [0, 0.35, 0.75, 1],
    [-70, -30, -8, 0],
  );

  const opacity = useTransform(
    scrollProgress,
    [0, 0.25, 0.65, 1],
    [0, 0.35, 0.85, 1],
  );

  return (
    <motion.div
      ref={inViewRef}
      style={{ x, opacity }}
      className="relative z-20 max-w-2xl lg:pr-8 lg:translate-x-4"
    >
      {/* Section label */}
      <p className="eyebrow text-accent">
        About Mercury
      </p>

      {/* Animated headline with orange period */}
      <h2
        className="mt-4 min-h-[2.4em] text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
        aria-label={`${headlineText}.`}
      >
        <span>{headline}</span>

        {headline.length === headlineText.length && (
          <span className="text-[#f58220]">.</span>
        )}

        {isInView && headline.length < headlineText.length && (
          <span
            aria-hidden="true"
            className="ml-1 inline-block h-[0.8em] w-[2px] translate-y-[0.04em] animate-pulse bg-[#f58220]"
          />
        )}
      </h2>

      {/* Animated description */}
      <p
        className="mt-8 min-h-[8em] max-w-xl text-base leading-8 text-primary-foreground/70 sm:text-lg"
        aria-label={descriptionText}
      >
        {description}

        {isInView &&
          headline.length === headlineText.length &&
          description.length < descriptionText.length && (
            <span
              aria-hidden="true"
              className="ml-1 inline-block h-[0.8em] w-[2px] translate-y-[0.04em] animate-pulse bg-[#f58220]"
            />
          )}
      </p>

      {/* About page link */}
      <Link
        to="/about"
        className="group mt-8 inline-flex items-center gap-2 font-semibold text-primary-foreground transition-colors duration-300 hover:text-accent"
      >
        Discover our approach

        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-2" />
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

  const rotateX = useTransform(
    smoothY,
    [-1, 1],
    [7, -7],
  );

  const rotateY = useTransform(
    smoothX,
    [-1, 1],
    [-10, 10],
  );

  /* =========================================================
     CURSOR MOVEMENT
  ========================================================= */

  const cursorX = useTransform(
    smoothX,
    [-1, 1],
    [-24, 24],
  );

  const cursorY = useTransform(
    smoothY,
    [-1, 1],
    [-16, 16],
  );

  /* =========================================================
     SCROLL MOVEMENT

     The Sun starts:
       x = 100px
       y = 80px
       scale = 0.78

     Then smoothly reaches:
       x = 0
       y = 0
       scale = 1
  ========================================================= */

  const rawScrollX = useTransform(
    scrollProgress,
    [0, 0.2, 0.55, 1],
    [100, 65, 20, 0],
  );

  const rawScrollY = useTransform(
    scrollProgress,
    [0, 0.2, 0.55, 1],
    [80, 45, 12, 0],
  );

  const rawScrollScale = useTransform(
    scrollProgress,
    [0, 0.2, 0.55, 1],
    [0.78, 0.84, 0.94, 1],
  );

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

     Scroll determines the large movement.
     Cursor only adds a small movement on top.
  ========================================================= */

  const combinedX = useTransform(
    [scrollX, cursorX],
    ([scrollValue, cursorValue]) =>
      (scrollValue as number) + (cursorValue as number),
  );

  const combinedY = useTransform(
    [scrollY, cursorY],
    ([scrollValue, cursorValue]) =>
      (scrollValue as number) + (cursorValue as number),
  );

  /* =========================================================
     POINTER
  ========================================================= */

  const handlePointerMove = (
    event: PointerEvent<HTMLDivElement>,
  ) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      ((event.clientX - rect.left) / rect.width) * 2 - 1;

    const y =
      ((event.clientY - rect.top) / rect.height) * 2 - 1;

    mouseX.set(
      Math.max(-1, Math.min(1, x)),
    );

    mouseY.set(
      Math.max(-1, Math.min(1, y)),
    );
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
        h-[420px]
        w-full
        items-center
        justify-center
        sm:h-[500px]
        lg:h-[600px]
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
          lg:translate-x-16
          xl:translate-x-24
          will-change-transform
        "
      >
        <div className="relative h-full w-full">
          <Suspense fallback={null}>
            <SunScene />
          </Suspense>
        </div>
      </motion.div>
    </motion.div>
  );
}
