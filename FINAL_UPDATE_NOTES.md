# Teklozy website update package

This package is based on the latest complete Teklozy ZIP available in the conversation. Existing supplied artwork and compositions have been retained; no team or career-level artwork was regenerated or substituted. The ten career-level WebP illustrations had opaque black matte backgrounds, so only the edge-connected black background was converted to transparency while keeping the original illustration content.

## Updates applied in this revision
- Startup India logo moved to the white space immediately above the Our Community heading.
- Footer restyled in the same deep-blue family as the site header, with a CTA band and restored Roadmap links (10-Level Journey, Production Crucibles, Achievements, Student FAQs). The Our Team footer link is not included.
- Community statistics use a more polished three-card visual treatment; the previous 98% claim and placement-outcomes message are removed.
- All ten career-level illustrations (Levels 1–10) now have transparent backgrounds, removing the black rectangles while preserving their artwork and allowing the page background to show through.
- Events & Programs and Career Opportunities pages are included as clean empty-state pages for future real content.
- Contact form is configured for College Partnership only and continues to submit through the existing Supabase helper.
- Login remains available; no public signup page or signup flow is present in this project. Existing accounts and backend auth records are not deleted.
- Image compositions are preserved; the ten career-level illustrations have transparent backgrounds. Community marquee respects `prefers-reduced-motion` and uses lazy loading for gallery images.

## Important data note
The 1,500+ and 60+ figures are carried forward from the supplied project/screenshots; please verify their labels and current accuracy before publishing. The third metric is the factual 10-level journey count. No additional placement percentage is shown because verified placement data was not supplied. Email and LinkedIn destinations were left as currently configured because updated official addresses were not provided.

## Run locally
1. Install Node.js LTS.
2. Copy `.env.example` to `.env` and enter the existing Supabase project URL and publishable/anon key. Never put a service-role key in frontend variables.
3. Run `npm install`.
4. Run `npm test`.
5. Run `npm run build`.
6. Run `npm run dev` and open the localhost URL Vite prints.

For phone/tablet testing on the same Wi-Fi network, run `npm run dev -- --host 0.0.0.0` and open `http://YOUR_PC_IPV4:5173` on the device.

## Validation status
The ZIP structure and included source files were checked. A production build could not be completed in the packaging environment because Vite dependencies were not fully installed (the dependency installation timed out). Please run the build locally before deploying. Responsive layouts are implemented with responsive Tailwind/CSS breakpoints, but physical device testing remains necessary.


## v6 visual update
- Added the approved Our Impact section title and supporting sentence.
- Impact metrics are ordered 60+, 1,500+, 45+ with the approved labels and responsive three-card layout.
- Startup India recognition uses the original supplied logo, a minimal “Proudly part of” line, and a simple community pill; removed decorative blue badge treatment.
- Reduced top spacing before the Startup India mark to avoid the large blank gap shown in the reference.
- Retained the original transparent team hero image (`public/images/ourTeamimg.png`) and existing cross-page Success Stories navigation callback.
- Responsive layout uses single-column cards on phones, compact columns on tablets, and three columns on desktop.


## v7 responsive repair
- Reworked mobile Career Journey layout to use a single-column stage layout, constrain all grid children to the viewport, wrap headings/labels/chips, and scale artwork proportionally.
- Kept tablet journey stages single-column for comfortable reading; retained desktop alternating two-column layout from 1024px upward.
- Added mobile spacing for the Career Journey editorial heading so it clears the fixed navigation.
- Constrained the SVG path container to avoid horizontal overflow on phones.
- Added no new images and preserved the existing artwork.
- Automated source tests: 17/17 passed. Production build and real-device browser checks still require running in the user's environment.
