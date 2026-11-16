import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity-studio/sanity.config';

export const dynamic = 'force-static';

// Sets noindex and the correct viewport for the Studio.
export { metadata, viewport } from 'next-sanity/studio';

export default function AdminControlPage() {
  return <NextStudio config={config} />;
}
