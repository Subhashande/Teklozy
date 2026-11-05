# Teklozy v15 — Reference-led Website Update

## Our Team desktop section
- Replaced the team hero artwork with the exact transparent PNG supplied by the user (`public/images/ourTeamimg.png`).
- Updated the Team page to load that PNG directly, preserving its transparency and original composition.
- Set the desktop hero to a wide 5:7 text/artwork composition, with reference-matched heading scale, paragraph spacing and full artwork visibility.
- Preserved the shared header and team page content.

## Mobile homepage
- Replaced the separate hard-edged image-banner approach with a continuous blue-gradient hero.
- Added the mascot/building artwork as a bottom-positioned scene with a soft top fade so it blends into the background.
- Kept the headline, description, full-width CTA and three horizontal feature cards above the mascot scene.
- Set a taller mobile hero so the following section does not appear immediately after a short image strip.
- Added narrow-phone spacing adjustments.

## Validation
- Automated tests: 17 passed.
- ZIP integrity: verified.
- Production build and live browser/device preview were not run because `node_modules` are not installed in this working copy.
- Environment files and build/cache folders excluded from ZIP.
