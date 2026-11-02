# Hero portrait asset

- Asset: `public/portrait-cutout.webp` (1200 × 1200, transparent WebP).
- Source: the user's supplied portrait; original retained as `public/portrait.webp`.
- Tool: built-in ImageGen, followed by WebP compression with Sharp.
- Final prompt: "Use case: background-extraction. Edit target: the supplied photograph of Ahmer wearing clear glasses and a navy suit with a white shirt and navy tie. Remove ONLY the grey studio background to actual alpha transparency, with clean fine hair edges and transparent negative space around shoulders. Preserve the exact person's face, glasses, hair, expression, skin, pose, suit, tie, lighting, proportions and framing. No beautification, no new clothing, no identity changes, no text, no outline, no shadow, no background. Output a clean transparent PNG cutout for a website hero."
