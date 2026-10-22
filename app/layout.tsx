import type { Metadata } from 'next';
import './globals.css';
import './refinement.css';
import './election.css';
import './age.css';
import './post-header.css';
import './transfer.css';
export const metadata: Metadata = { metadataBase: new URL('https://atlas-do-agora.gardengrape66.chatgpt.site'), title: 'Atlas do Agora — O Brasil em perspectiva', description: 'Mapas, gráficos e histórias visuais para entender o Brasil, com fontes verificáveis, contexto e metodologia em cada análise.' };
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) { return <html lang="pt-BR"><body>{children}</body></html>; }
