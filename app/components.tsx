'use client';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, Search, X, Menu, Clock3, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { categories } from './data';

export { ArrowUpRight, ArrowRight, Search, X, Clock3, ChevronDown };
export function Logo(){return <span className="brand-image"><img src="/brand/logo-light.webp" alt="Atlas do Agora" width="465" height="150"/></span>}
export function Header({active='Todos', onCategory, onSearch}:{active?:string;onCategory?:(s:string)=>void;onSearch?:()=>void}){
 const [menu,setMenu]=useState(false);
 return <><div className="utility"><div className="shell"><span>UM OLHAR PARA O MUNDO. <b>O BRASIL NO CENTRO.</b></span><span className="utility-right">Jornalismo visual & dados <i/></span></div></div>
 <header><div className="shell masthead"><Link href="/" aria-label="Atlas do Agora — início"><Logo/></Link><span className="brand-promise">Informação que ganha forma.<br/><b>Perspectivas que ampliam o olhar.</b></span><div className="header-actions"><Link className="about-link" href="/sobre/">Sobre o Atlas <ArrowUpRight size={15}/></Link><button className="search-button" aria-label="Buscar matérias" onClick={()=>onSearch?onSearch():window.location.assign('/?busca=1')}><Search size={20}/></button><button className="mobile-menu" onClick={()=>setMenu(!menu)} aria-label={menu?'Fechar menu':'Abrir menu'} aria-expanded={menu}>{menu?<X/>:<Menu/>}</button></div></div></header>
 <div className={'nav-wrap '+(menu?'menu-open':'')}><nav className="shell nav" aria-label="Categorias"><div className="nav-categories">{categories.map(c=>onCategory?<button key={c} className={active===c?'active':''} onClick={()=>{onCategory(c);setMenu(false)}}>{c==='Todos'?'Início':c}</button>:<Link key={c} href={'/?categoria='+encodeURIComponent(c)}>{c==='Todos'?'Início':c}</Link>)}</div><a className="nav-explore" href="/#explorar">Explore os dados <ArrowUpRight size={16}/></a></nav></div></>
}
export function Footer(){return <footer><div className="shell footer-top"><div><Link href="/" aria-label="Início"><Logo/></Link><p>Um olhar para o mundo,<br/>com o Brasil no centro.</p></div><div><h3>Explore</h3>{categories.slice(1).map(c=><Link key={c} href={'/?categoria='+encodeURIComponent(c)}>{c}</Link>)}</div><div><h3>O projeto</h3><Link href="/sobre/">Sobre o Atlas</Link><Link href="/sobre/#editorial">Nossa proposta editorial</Link><span className="footer-note">Dados com contexto.<br/>Informação com perspectiva.</span></div></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} Atlas do Agora</span><span>Jornalismo visual · Dados com contexto</span><a href="#top">Voltar ao topo ↑</a></div></footer>}
