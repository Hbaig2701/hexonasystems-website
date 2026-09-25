import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

/**
 * There was no vitest config: `vitest run` was picking up content/seo.test.ts
 * on defaults alone, and that file only ever used relative imports.
 *
 * lib/lead.ts needs two things the defaults do not give. `@/` has to resolve
 * the same way tsconfig resolves it, and `server-only` has to be stubbed,
 * because it throws by design outside a server context and that is exactly
 * what protects the webhook secret from ever reaching a client bundle.
 */
export default defineConfig({
  resolve: {
    alias: {
      'server-only': fileURLToPath(new URL('./test/server-only-stub.ts', import.meta.url)),
      '@': fileURLToPath(new URL('.', import.meta.url)),
    },
  },
});
