import type { Metadata } from 'next';
import './globals.css';
import './refinement.css';
export const metadata: Metadata = { title: 'Atlas do Agora — O Brasil em perspectiva', description: 'Histórias que os dados contam. Explore economia, sociedade, território e tecnologia através do jornalismo visual. Prévia editorial.' };
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) { return <html lang="pt-BR"><body>{children}</body></html>; }
