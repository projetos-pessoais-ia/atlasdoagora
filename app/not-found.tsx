import Link from 'next/link';
import {Header,Footer} from './components';
export default function NotFound(){return <><Header/><main className="shell empty-state"><div className="section-kicker">404 / FORA DO MAPA</div><h1>Esta página saiu do radar.</h1><p>Volte ao início para encontrar uma nova perspectiva.</p><Link className="button-dark" href="/">Voltar ao Atlas →</Link></main><Footer/></>}
