import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Newspaper } from "lucide-react";

export const Route = createFileRoute("/updates")({
  component: UpdatesPage,
});

function UpdatesPage() {
  return (
    <main className="min-h-screen bg-white pt-32 text-[#06152a]">
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f58220]">
          Company updates
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
          What’s happening at Mercury.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-[#294f8f]/75 sm:text-lg">
          Explore company announcements, industry developments, events and the latest news from
          Mercury Energy Solutions.
        </p>

        <div className="mt-12 rounded-2xl border border-[#294f8f]/15 p-8 sm:p-12">
          <Newspaper className="size-8 text-[#f58220]" />
          <h2 className="mt-5 text-2xl font-semibold">Latest updates coming soon</h2>
          <p className="mt-3 leading-7 text-[#294f8f]/75">
            We’ll share our latest announcements and company news here.
          </p>
        </div>
      </section>
    </main>
  );
}
