import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { siteUrl, siteName, siteDescription, pageMetadata, isPreview } from './seo';
import './globals.css';
import './refinement.css';
import './election.css';
import './age.css';
import './post-header.css';
import './transfer.css';
import './datafolha.css';
import './electricity.css';
import './prices.css';
export const metadata: Metadata = {
  ...pageMetadata({path:'/', title:siteName+' — O Brasil em perspectiva', description:siteDescription}),
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  robots: isPreview ? {index:false, follow:false} : {index:true, follow:true, googleBot:{index:true, follow:true, 'max-image-preview':'large'}},
  icons: { icon: [{url:'/favicon.ico',sizes:'any'},{url:'/favicon.svg',type:'image/svg+xml'},{url:'/favicon-32.png',type:'image/png',sizes:'32x32'}], apple:[{url:'/apple-touch-icon.png',sizes:'180x180',type:'image/png'}] },
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="pt-BR"><head>
    {process.env.NODE_ENV === 'production' && !isPreview && <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3156649226090669" crossOrigin="anonymous"/>}
  </head><body>{children}{process.env.VERCEL === '1' && <Analytics />}</body></html>;
}
