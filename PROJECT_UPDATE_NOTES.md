# Teklozy project update notes

## Implemented in this package

- Replaced the dark fantasy hero background with the approved clean blue-and-white Teko/campus artwork. Hero text is real HTML text, not baked into the image.
- Kept the shared dark capsule header and replaced **How it works** with **Events & Programs** on desktop and mobile.
- Added Events & Programs and Career Opportunities pages with honest empty states for later content.
- Wired the Team page's **Explore Opportunities** CTA to the Career Opportunities page.
- Removed public Sign Up controls and the client-side sign-up helper. Existing email/password and configured OAuth login remain.
- Limited the Contact Us topic to **College Partnership**.
- Added the supplied Startup India logo to the Our Community section.
- Removed manual carousel controls and drag-to-scrub. The community gallery continues its automatic motion and pauses while hovered.
- Reworked the footer, removed its Our Team link and removed nonfunctional legal placeholder buttons.
- Replaced large hero, community, login, team and ten career-stage images with optimized WebP assets; preloaded the hero image and enabled asynchronous image decoding/lazy loading where appropriate.
- Removed unsupported numeric placement claims and unverified sample job/alumni datasets. The community section now explains that verified placement figures will be published when available.
- With no approved team roster supplied, the Our Team page now shows a transparent placeholder rather than publishing sample names and stock portraits.
- Kept the existing email and LinkedIn destinations unchanged because updated official details were not provided.

## Still needs real business details before production

- Supply the approved placement figures to replace the transparent placement notice.
- Supply the official LinkedIn URL if it differs from the existing destination.
- Supply real team member names, roles, photos and profile links to populate the Our Team directory.
- Add real Events & Programs content and verified career listings when ready.
- Configure Supabase Google/GitHub OAuth credentials and production redirect URLs in the Supabase Dashboard.

## Verification status

- `node --test test/*.test.mjs`: 17 tests passed.
- Relative source imports and required image/migration files were checked.
- TypeScript parser check reported no syntax diagnostics; full type-checking was unavailable because dependencies could not be installed in the build environment.
- A full Vite production build was **not** completed in this environment because `npm ci` timed out during dependency installation. Run `npm install`, `npm test` and `npm run build` locally before deploying.
