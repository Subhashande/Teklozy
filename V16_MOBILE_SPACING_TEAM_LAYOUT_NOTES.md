# Teklozy v16 — Mobile spacing and Team hero repair

## Career Levels mobile
- Added larger, consistent vertical gaps between each stage.
- Hid the oversized desktop SVG river path on phone layouts so it no longer runs through text and illustrations.
- Stacked each stage as readable information followed by its illustration.
- Reduced illustration height on small phones and kept stage number badges inside the artwork area.
- Improved stage label wrapping, chip spacing, and separators between stage blocks.

## Our Team desktop
- Restored a 12-column desktop grid so the text and image spans fit the same row.
- This fixes the artwork being pushed below the visible hero and the metrics column wrapping one character per line.
- Kept the original uploaded transparent team artwork.

## Team profile
- Subash's role is now Forward Deployed Engineer.
- Profile tagline: “Turning real-world challenges into practical, production-ready solutions with users and teams.”

## Validation
- Automated tests: 17 passed.
- ZIP integrity checked.
- Production build and browser preview not run because node_modules are not installed in this working copy.
