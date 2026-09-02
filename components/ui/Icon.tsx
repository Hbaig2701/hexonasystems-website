/**
 * components/ui/Icon.tsx
 *
 * A small, drawn icon set. §15 rules out emoji as section icons, and a generic
 * icon-library glyph is the same failure with better kerning. These are 1.25px
 * strokes on a 20px grid, drawn in the same hairline language as the lattice —
 * hexagons, rules, packets — so they read as part of the system rather than
 * decoration bolted onto it.
 */

export type IconName =
  | 'award'
  | 'scoreboard'
  | 'amplifier'
  | 'seam'
  | 'businesses'
  | 'value'
  | 'check'
  | 'cross';

const STROKE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width="20"
      height="20"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {paths(name)}
    </svg>
  );
}

function paths(name: IconName) {
  switch (name) {
    // A hexagonal cell with a star seated in it — the award.
    case 'award':
      return (
        <>
          <path d="M10 1.6 L16.4 5.3 L16.4 12.7 L10 16.4 L3.6 12.7 L3.6 5.3 Z" {...STROKE} />
          <path d="M10 5.6 L11.3 8.3 L14.2 8.7 L12.1 10.8 L12.6 13.7 L10 12.3 L7.4 13.7 L7.9 10.8 L5.8 8.7 L8.7 8.3 Z" {...STROKE} />
        </>
      );

    // Rising bars against a baseline — revenue, measured.
    case 'scoreboard':
      return (
        <>
          <path d="M2.6 16.4 H17.4" {...STROKE} />
          <path d="M5.4 16.4 V11.2" {...STROKE} />
          <path d="M10 16.4 V7.4" {...STROKE} />
          <path d="M14.6 16.4 V3.6" {...STROKE} />
        </>
      );

    // A small input widening into a large output — amplification.
    case 'amplifier':
      return (
        <>
          <path d="M3 8.4 V11.6" {...STROKE} />
          <path d="M6.6 6.2 L6.6 13.8" {...STROKE} />
          <path d="M10.4 3.4 L17 8 L17 12 L10.4 16.6 Z" {...STROKE} />
        </>
      );

    // Two cells with a gap between them, and a packet falling through it.
    case 'seam':
      return (
        <>
          <path d="M2.4 5.2 H8.2" {...STROKE} />
          <path d="M11.8 5.2 H17.6" {...STROKE} />
          <path d="M2.4 14.8 H8.2" {...STROKE} />
          <path d="M11.8 14.8 H17.6" {...STROKE} />
          <circle cx="10" cy="8.4" r="1.1" fill="currentColor" stroke="none" />
          <circle cx="10" cy="12.4" r="0.7" fill="currentColor" stroke="none" opacity="0.5" />
        </>
      );

    // Three cells connected — businesses running on one system.
    case 'businesses':
      return (
        <>
          <path d="M5 2.8 L8.4 4.8 L8.4 8.8 L5 10.8 L1.6 8.8 L1.6 4.8 Z" {...STROKE} />
          <path d="M15 2.8 L18.4 4.8 L18.4 8.8 L15 10.8 L11.6 8.8 L11.6 4.8 Z" {...STROKE} />
          <path d="M10 10.2 L13.4 12.2 L13.4 16.2 L10 18.2 L6.6 16.2 L6.6 12.2 Z" {...STROKE} />
        </>
      );

    // An upward trend inside a frame — value generated.
    case 'value':
      return (
        <>
          <path d="M2.6 2.6 V17.4 H17.4" {...STROKE} />
          <path d="M5.6 13.4 L9 9.4 L12 11.6 L16.6 5.6" {...STROKE} />
          <path d="M13.2 5.6 H16.6 V9" {...STROKE} />
        </>
      );

    case 'check':
      return <path d="M4 10.4 L8.2 14.4 L16 5.8" {...STROKE} />;

    case 'cross':
      return (
        <>
          <path d="M5.4 5.4 L14.6 14.6" {...STROKE} />
          <path d="M14.6 5.4 L5.4 14.6" {...STROKE} />
        </>
      );
  }
}
