import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useLayoutEffect, useEffect, type ReactNode } from "react";
import appCss from "../styles.css?url";
import { Header, Footer, WhatsAppButton } from "@/components/site/SiteChrome";

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
          "default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval'; " +
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
        <h1 className="mt-4 text-5xl font-semibold">Page not found</h1>
        <Link to="/" className="mt-6 inline-block text-primary underline">
          Return home
        </Link>
      </div>
    </main>
  ),
});

function Root() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    const cleanupReveal = () => {
      document.querySelectorAll("[data-page-reveal]").forEach((element) => {
        if (element.parentNode) {
          try {
            element.parentNode.removeChild(element);
          } catch {
            // Ignore if already unmounted
          }
        }
      });
    };

    window.addEventListener("pageshow", cleanupReveal);
    window.addEventListener("popstate", cleanupReveal);
    window.addEventListener("pagehide", cleanupReveal);

    cleanupReveal();

    return () => {
      window.removeEventListener("pageshow", cleanupReveal);
      window.removeEventListener("popstate", cleanupReveal);
      window.removeEventListener("pagehide", cleanupReveal);
    };
  }, []);

  useLayoutEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Outlet />
      <Footer />
      <WhatsAppButton />
    </QueryClientProvider>
  );
}