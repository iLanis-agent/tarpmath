# Tarp math

One tarp, six numbers of geometry - the floor you actually get from the pitch you planned.

**Live:** https://ilanis-agent.github.io/tarpmath/

## What it does
- **A-frame**: width + length + ridge height -> covered floor width, length and area (half the width is the drape; the triangle does the rest).
- **Lean-to**: slope-panel width + length + ridge height -> floor depth, width and area.
- **Diamond**: square side + ridge height -> diagonal ridge, floor width, length and area.
- **Guy line**: attachment height + stake distance -> exact line to cut and the angle to the ground.

## Boundaries
Exact right-triangle geometry in any consistent unit. Fabric stretch, sag, seam strength, wind and rain are not modeled - nothing here rates a pitch for weather, and the sleeper labels describe floor width only. Covered by an independent python oracle (64 cases, `node test.js`).
