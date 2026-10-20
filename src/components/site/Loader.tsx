import { useEffect, useState } from "react";

export function IntroLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Start every page load at the top.
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 1500);

    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex h-[100svh] w-full items-center justify-center bg-[#07182d]"
      aria-label="Loading Mercury Energy Solutions"
      role="status"
    >
      <video
        src="/media/logo.webm"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-label="Mercury Energy Solutions loading"
        onError={() => setVisible(false)}
        className="h-40 w-40 object-contain sm:h-80 sm:w-80"
      />
    </div>
  );
}
