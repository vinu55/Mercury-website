# Mercury Energy Solutions Website Plan

## Direction
Build a polished, responsive corporate website using the selected **Precision Engineering Editorial** direction, refined around:

- Navy `#092B59`, blue `#174A8B`, solar orange `#FF7900`, and cool white `#F6F8FA`
- Sora headings and Manrope body text
- Clean modular layouts, strong industrial photography, precise spacing, and restrained motion
- The supplied Mercury logo placed at the **top left**
- No invented certifications, statistics, clients, locations, or performance claims

## Website Structure

### Shared experience
- Responsive header with logo, Home, About Us, Services menu, and Contact button
- Mobile navigation designed for smaller screens
- Short opening loader using the supplied rotating-logo video, optimized so visitors are not forced through the full 17-second clip
- Floating WhatsApp button linked to `+91 6366414655`
- Footer with logo, service links, LinkedIn, email, phone, office address, and registered address
- Smooth page transitions, layered parallax, scroll reveals, image movement, and precise hover feedback with reduced-motion support

### Home page
- Full-viewport cinematic video opening that immediately showcases marine boilers, land boilers, biomass fuel, solar energy, and industrial spare parts, with subtle parallax depth in the overlaid content
- Minimal overlaid message and one clear consultation/contact action
- Professional About preview focused on the company’s engineering and energy capabilities
- Animated modular service showcase with exactly five linked services
- Trust-building content based only on verified company facts, industries served, capabilities, contact accessibility, and existing-site information
- Closing 3D sun feature using the supplied `.glb`, rotating smoothly in an unframed full-width scene

### About Us page
- Company overview and engineering focus
- Executive Director: Bhimreddy Biradar
- Office and registered addresses
- Existing-site global-presence information, clearly phrased without overstating unverified facts
- Strong editorial imagery and restrained scrolling transitions

### Service pages
Create a dedicated page for each service, with clear navigation and enquiry actions:

1. **Marine Boiler Solutions** — all 13 supplied repair, inspection, automation, optimization, NDE, FFS, and tube-assessment services.
2. **Land Boiler Solutions** — all 8 supplied engineering, conversion, AMC, retrofit, fuel-supply, and performance services.
3. **Biomass Fuel Solutions** — conversion services, biomass and bagasse supply, full briquette/wood/coal comparison, and the eight supplied pellet advantages.
4. **Solar Energy Solutions** — seven solution types, the complete five-stage process, and the four supplied benefits.
5. **Spare Parts** — organized, searchable/scannable product and manufacturer groups rather than the current continuous text block, plus the supplied component list.

### Contact page
- Enquiry form for name, company, email, phone, service interest, and message
- Email delivery to `bhimreddy@mercuryenergysolutions.com`
- Clear success and error feedback
- Direct phone, email, WhatsApp, LinkedIn, office address, and registered address
- Lovable Cloud setup for reliable form delivery and secure server-side handling

## Media and Motion
- Use the supplied logo as the primary brand asset and derive the favicon from it
- Use the uploaded `logo_animation2.mp4` only as a short, muted loading sequence
- Create an original cinematic hero video tailored to Mercury’s five service areas; optimize it for autoplay, muted playback, mobile cropping, and fast loading
- Use the supplied `sun.glb` in a Three.js closing scene with gentle rotation, pointer-responsive movement, and layered parallax depth
- Apply parallax selectively to industrial imagery and section transitions so the experience feels dimensional without distracting from technical content or mobile performance
- Generate cohesive industrial supporting imagery where the supplied assets do not cover the required subjects

## Content and Trust
- Treat the contact details supplied in this brief as authoritative where they differ from the old site
- Use the current website only to recover useful company context, not outdated addresses or phone numbers
- Correct spelling, capitalization, and presentation while preserving the technical meaning of every supplied service
- Add unique search and social metadata for Home, About, Contact, and every service page

## Technical Details
- Build separate routes for Home, About, Contact, and each of the five services
- Use semantic design tokens throughout and retain the selected palette and typography exactly
- Store large uploaded/generated media through the project asset system
- Implement the 3D scene with Three.js and lazy-load it so it does not delay the main page
- Make every navigation item, service card, form state, email link, phone link, LinkedIn link, and WhatsApp action functional
- Verify desktop and mobile layouts, video fallback behavior, loader completion, all navigation, form submission, 3D rendering, and accessibility
