import type { Metadata } from 'next';
import './globals.css';
import './refinement.css';
import './election.css';
export const metadata: Metadata = { metadataBase: new URL('https://atlas-do-agora.gardengrape66.chatgpt.site'), title: 'Atlas do Agora — O Brasil em perspectiva', description: 'Histórias que os dados contam. Explore economia, sociedade, território e tecnologia através do jornalismo visual. Prévia editorial.' };
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) { return <html lang="pt-BR"><body>{children}</body></html>; }
