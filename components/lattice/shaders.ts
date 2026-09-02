/**
 * components/lattice/shaders.ts — the lattice cell shader.
 *
 * Every part of §5.3's three-state table lives here: the assembly wave, the
 * seat flash, the stroke opacity ramp, the sealed breathing pulse, and the
 * cursor field from §5.4. Doing it on the GPU is what keeps ~180 cells at
 * 60fps with zero per-frame allocation on the JS side.
 */

export const cellVertexShader = /* glsl */ `
  attribute vec2  aCenter;    // assembled centre of this cell
  attribute vec2  aScatter;   // FRACTURED offset, 12–40px
  attribute float aRot;       // FRACTURED rotation, 2–8°
  attribute float aOrder;     // 0 at viewport centre → 1 at the furthest cell

  uniform float uProgress;    // scroll progress, 0 → 1
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uMouseActive;
  uniform float uRadius;      // cursor field radius, 220px (§5.4)

  varying float vAlpha;
  varying float vFlash;

  float easeOut(float t) { return 1.0 - pow(1.0 - t, 3.0); }

  void main() {
    // Global assembly window: 0.25 → 0.70 (§5.3)
    float p = clamp((uProgress - 0.25) / 0.45, 0.0, 1.0);

    // The wave propagates outward from the viewport centre: cells nearest the
    // centre settle first. A cell at aOrder=1 starts at 55% of the window.
    float local = easeOut(clamp((p - aOrder * 0.55) / 0.45, 0.0, 1.0));

    vec2  center = aCenter + aScatter * (1.0 - local);
    float rot    = aRot * (1.0 - local);

    float c = cos(rot);
    float s = sin(rot);
    vec2  v = vec2(position.x * c - position.y * s,
                   position.x * s + position.y * c);
    vec2 pos = center + v;

    // ---- Cursor field (§5.4) ------------------------------------------------
    // FRACTURED: the cursor REPELS cells (max 8px) — moving the mouse makes
    // things worse. SEALED: it illuminates instead, no displacement.
    vec2  toCell = aCenter - uMouse;
    float d      = length(toCell);
    float field  = (1.0 - smoothstep(0.0, uRadius, d)) * uMouseActive;
    vec2  dir    = d > 0.001 ? toCell / d : vec2(0.0, 1.0);
    pos += dir * field * 8.0 * (1.0 - p);

    // ---- Seat flash ---------------------------------------------------------
    // As a cell closes, its edges brighten to --accent. A Gaussian peak rather
    // than a timed decay, so it reads identically scrubbing in either direction.
    float g = (local - 0.92) / 0.09;
    vFlash = exp(-g * g);

    // ---- Stroke opacity -----------------------------------------------------
    float base   = mix(0.22, 0.42, local);
    float illum  = field * smoothstep(0.70, 1.0, uProgress) * 0.58;
    // Sealed state breathes: global opacity 0.7 → 1.0 on an 8s cycle, so the
    // lattice never looks like a frozen image.
    float breathe = mix(1.0,
                        0.85 + 0.15 * sin(uTime * 0.7853981634),
                        smoothstep(0.70, 0.90, uProgress));
    vAlpha = (base + illum) * breathe;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 0.0, 1.0);
  }
`;

export const cellFragmentShader = /* glsl */ `
  precision mediump float;

  uniform vec3 uStroke;
  uniform vec3 uAccent;

  varying float vAlpha;
  varying float vFlash;

  void main() {
    vec3 color = mix(uStroke, uAccent, clamp(vFlash, 0.0, 1.0));
    gl_FragColor = vec4(color, clamp(vAlpha, 0.0, 1.0));
  }
`;

/**
 * Packets. Positions, colours and alpha are computed on the CPU — there are
 * only ~120 of them and their pathing is graph traversal, which is far cheaper
 * to express in JS than to encode into a simulation texture.
 */
export const packetVertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aAlpha;
  attribute vec3  aColor;

  varying float vAlpha;
  varying vec3  vColor;

  void main() {
    vAlpha = aAlpha;
    vColor = aColor;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize;
  }
`;

export const packetFragmentShader = /* glsl */ `
  precision mediump float;

  varying float vAlpha;
  varying vec3  vColor;

  void main() {
    // Round point with a soft edge — antialias is off on the context, so the
    // falloff is handled here (§5.6).
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float mask = 1.0 - smoothstep(0.34, 0.5, d);
    if (mask <= 0.0) discard;
    gl_FragColor = vec4(vColor, vAlpha * mask);
  }
`;
