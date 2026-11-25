
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

// Google Tag Manager
const GTM_ID = "GTM-NL33L4XD";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
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

    // Google Tag Manager installation
    scripts: [
      {
        children: `
          (function(w,d,s,l,i){
            w[l]=w[l]||[];
            w[l].push({
              'gtm.start': new Date().getTime(),
              event:'gtm.js'
            });

            var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),
                dl=l!='dataLayer'?'&l='+l:'';

            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;

            f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
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
        {/* Google Tag Manager - NoScript */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>

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
    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
      event: "virtual_page_view",
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
