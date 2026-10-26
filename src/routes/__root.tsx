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

// Global DOM unmount patch: prevents async 3D loaders (Draco/Three.js) 
// and router transitions from throwing "NotFoundError: Failed to execute 'removeChild' on 'Node'"
if (typeof window !== "undefined") {
  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(child: T): T {
    if (child.parentNode !== this) {
      return child;
    }
    return originalRemoveChild.call(this, child) as T;
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(
    newNode: T,
    referenceNode: Node | null
  ): T {
    if (referenceNode && referenceNode.parentNode !== this) {
      return newNode;
    }
    return originalInsertBefore.call(this, newNode, referenceNode) as T;
  };
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

  // Clean up page-reveal elements during browser navigation safely
  useEffect(() => {
    const cleanupReveal = () => {
      document.querySelectorAll("[data-page-reveal]").forEach((element) => {
        // Only remove if it has a parent and is not actively being unmounted by React
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
  // Preserve the existing scroll-restoration behavior.
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