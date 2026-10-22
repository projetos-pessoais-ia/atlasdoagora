import type { Metadata } from 'next';

export const siteUrl = 'https://www.atlasdoagora.com.br/';
export const siteName = 'Atlas do Agora';
export const siteDescription = 'Mapas, gráficos e histórias visuais para entender o Brasil, com fontes verificáveis, contexto e metodologia em cada análise.';
export const isPreview = process.env.VERCEL_ENV === 'preview' || process.env.VERCEL_ENV === 'development';

export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString();
}

export function pageMetadata({ path, title, description, image = '/brand/logo-light.png', imageAlt = siteName, article = false }: {
  path: string; title: string; description: string; image?: string; imageAlt?: string; article?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: article ? 'article' : 'website',
      url,
      title,
      description,
      siteName,
      locale: 'pt_BR',
      images: [{ url: absoluteUrl(image), alt: imageAlt, ...(article ? { width: 1600, height: 1000 } : {}) }],
    },
    twitter: {
      card: article ? 'summary_large_image' : 'summary',
      title,
      description,
      images: [{ url: absoluteUrl(image), alt: imageAlt }],
    },
  };
}
