import type { MetadataRoute } from 'next';
import { stories } from './data';
import { absoluteUrl } from './seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl('/') },
    { url: absoluteUrl('/sobre/') },
    { url: absoluteUrl('/contato/') },
    { url: absoluteUrl('/politica-de-privacidade/') },
    ...stories.filter(story => story.published).map(story => ({
      url: absoluteUrl(`/materia/${story.slug}/`),
    })),
  ];
}
