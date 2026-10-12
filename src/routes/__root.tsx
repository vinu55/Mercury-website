import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useLayoutEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import {
  Header,
  Footer,
  WhatsAppButton,
} from "@/components/site/SiteChrome";

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
        href: "/favicon.png",
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

  shellComponent: ({
    children,
  }: {
    children: ReactNode;
  }) => (
    <html lang="en">
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
  const { queryClient } = Route.useRouteContext();

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
