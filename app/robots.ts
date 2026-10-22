import type { MetadataRoute } from 'next';
import { absoluteUrl, isPreview } from './seo';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return isPreview
    ? { rules: { userAgent: '*', disallow: '/' } }
    : { rules: { userAgent: '*', allow: '/' }, sitemap: absoluteUrl('/sitemap.xml') };
}
