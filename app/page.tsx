import { Surface } from '@/components/ui/Surface';

/** Placeholder. The seven-section homepage is Phase 3 (§8). */
export default function HomePage() {
  return (
    <Surface surface="void" rule={false}>
      <div className="shell">
        <p className="t-label mb-6 text-fg-3">Phase 1 · tokens and primitives</p>
        <h1 className="t-display-1 max-w-[18ch]">The homepage ships in Phase 3.</h1>
        <p className="t-lead mt-8 text-fg-2">
          See <a href="/styleguide" className="link">the styleguide</a>.
        </p>
      </div>
    </Surface>
  );
}
