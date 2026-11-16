import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity-studio/sanity.config';

export const dynamic = 'force-static';

// Sets noindex and the correct viewport for the Studio.
export { metadata, viewport } from 'next-sanity/studio';

/**
 * The root layout wraps every route in the site header and footer. The Studio
 * is a full-screen app, so it sits in a fixed layer above them instead of
 * restructuring the layout for the rest of the site.
 */
export default function AdminControlPage() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 2147483000, background: '#fff', overflow: 'auto' }}>
      <NextStudio config={config} />
    </div>
  );
}
