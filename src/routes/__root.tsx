
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { Header, Footer, WhatsAppButton } from "@/components/site/SiteChrome";

// Google Analytics 4
const GA_MEASUREMENT_ID = "G-0S8Z10SLVX";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: any[]) => void;
  }
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        name: "theme-color",
        content: "#092B59",
      },
      {
        httpEquiv: "Content-Security-Policy",
        content:
          "default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval'; " +
          "img-src 'self' data: blob: https:; " +
          "worker-src 'self' blob:; " +
          "media-src 'self' data: blob: https:;",
      },
    ],

    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "icon",
        type: "image/png",
        href: "/models/mercurylogo.png",
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Sora:wght@400;500;600;700&display=swap",
      },
    ],

    scripts: [
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`,
        async: true,
      },
      {
        children: `
          window.dataLayer = window.dataLayer || [];

          function gtag() {
            window.dataLayer.push(arguments);
          }

          window.gtag = gtag;

          gtag('js', new Date());

          gtag('config', '${GA_MEASUREMENT_ID}', {
            send_page_view: false
          });
        `,
      },
    ],
  }),

  shellComponent: ({ children }: { children: ReactNode }) => (
    <html lang="en" translate="no" className="notranslate">
      <head>
        <HeadContent />
      </head>

      <body>
        {children}
        <Scripts />
      </body>
    </html>
  ),

  component: Root,

  notFoundComponent: () => (
    <main className="grid min-h-screen place-items-center px-5 text-center">
      <div>
        <p className="eyebrow text-accent">404</p>

        <h1 className="mt-4 text-5xl font-semibold">
          Page not found
        </h1>

        <Link
          to="/"
          className="mt-6 inline-block text-primary underline"
        >
          Return home
        </Link>
      </div>
    </main>
  ),
});

function Root() {
  // Track TanStack Router navigation
  const currentUrl = useRouterState({
    select: (state) => state.location.href,
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.gtag) return;

    window.gtag("event", "page_view", {
      page_path: currentUrl,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [currentUrl]);

  // Existing console warning filter
  if (typeof console !== "undefined") {
    const g = globalThis as typeof globalThis & {
      __clockWarnFiltered?: boolean;
    };

    if (!g.__clockWarnFiltered) {
      g.__clockWarnFiltered = true;

      const originalWarn = console.warn.bind(console);

      console.warn = (...args: unknown[]) => {
        const msg =
          typeof args[0] === "string" ? args[0] : "";

        if (
          msg.includes(
            "THREE.Clock: This module has been deprecated"
          )
        ) {
          return;
        }

        originalWarn(...args);
      };
    }
  }

  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Outlet />
      <Footer />
      <WhatsAppButton />
    </QueryClientProvider>
  );
}
