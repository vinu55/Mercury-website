import { useEffect, useState } from "react";

export function IntroLoader() {
const [visible, setVisible] = useState(true);

useEffect(() => {
const timer = window.setTimeout(() => {
setVisible(false);
}, 5000);
}, []);

if (!visible) return null;

return ( <div className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-transparent">
<video
src="/media/logo.webm"
autoPlay
loop
muted
playsInline
preload="auto"
aria-label="Mercury Energy Solutions loading"
onError={() => setVisible(false)}
className="h-40 w-40 object-contain sm:h-82 sm:w-82"
/> </div>
);
}
