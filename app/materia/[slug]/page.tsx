import Link from 'next/link';
import {notFound} from 'next/navigation';
import {stories} from '../../data';
import {Header,Footer,ArrowRight} from '../../components';
import type {Metadata} from 'next';
import {pageMetadata} from '../../seo';
import {TransferArticle} from '../../transfer-article';
import {AgeArticle} from '../../age-article';
import {PostHeader} from '../../post-header';
import {ElectionArticle} from '../../election-article';
export const dynamicParams = false;
export function generateStaticParams(){return stories.map(s=>({slug:s.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const s=stories.find(s=>s.slug===slug);if(!s)notFound();return pageMetadata({path:`/materia/${s.slug}/`,title:`${s.title} — Atlas do Agora`,description:s.description,image:s.cover,imageAlt:s.title,article:true})}
export default async function Article({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const story=stories.find(s=>s.slug===slug);if(!story)notFound();
 return <div id="top"><Header/><main className="shell article-page election-page"><div className="breadcrumbs"><Link href="/">Início</Link><span>/</span><Link href={'/?categoria='+encodeURIComponent(story.category)}>{story.category}</Link></div><PostHeader kicker={story.tag+' · '+story.category} title={story.title} description={story.slug==='para-onde-vao-os-eleitores-dos-candidatos-eliminados'?story.description:story.slug==='onde-estao-os-eleitores-do-brasil'?'Cinco unidades da Federação reúnem mais da metade dos eleitores aptos nas Eleições 2026. Veja o mapa, o ranking completo e a distribuição por região.':'O grupo de 60 anos ou mais ganhou participação entre 2022 e 2026. Já os eleitores de 21 a 34 anos perderam espaço no total. Veja o que mostram os cadastros oficiais do TSE.'} publication="Publicado em 22 de outubro de 2026" source={story.sourceDetail??(story.slug==='onde-estao-os-eleitores-do-brasil'?'Dados: TSE · Base gerada em 14 de julho de 2026':'Dados: TSE · Eleitorado das Eleições 2022 e 2026')}/>{story.slug==='para-onde-vao-os-eleitores-dos-candidatos-eliminados'?<TransferArticle/>:story.slug==='como-mudou-a-idade-do-eleitorado-brasileiro'?<AgeArticle/>:<ElectionArticle/>}<section className="related"><div className="section-kicker">OUTRAS PERSPECTIVAS</div><div>{stories.filter(s=>s.slug!==story.slug).map(s=><Link href={"/materia/"+s.slug+"/"} key={s.slug}><span className="eyebrow">{s.category}</span><h3>{s.title}</h3><ArrowRight size={18}/></Link>)}</div></section><Link className="back-link" href="/#explorar">Ver todas as matérias <ArrowRight size={17}/></Link></main><Footer/></div>;
}
