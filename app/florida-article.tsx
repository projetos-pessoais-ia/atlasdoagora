import { absoluteUrl } from './seo';
import { florida } from './florida-data';
import style from './florida-article.module.css';

function RegistrationGap() {
  return <figure className={style.chart} aria-labelledby="fl-gap-title" aria-describedby="fl-gap-note">
    <figcaption>
      <span className={style.kicker}>FLÓRIDA · 2014 E 2024</span>
      <h2 id="fl-gap-title">A vantagem democrata em 2014 e 2024</h2>
      <p>Diferença entre a parcela de democratas e a de republicanos no cadastro de eleitores nascidos no Brasil, em pontos percentuais.</p>
    </figcaption>
    <dl className={style.rows}>{florida.records.map(({year,repMinusDem})=>{
      const lead=-repMinusDem;
      return <div className={style.row} key={year}>
        <dt>{year}</dt>
        <dd>
          <span aria-hidden="true" className={style.track}><span className={style.range} style={{width:(lead/25*100)+'%'}}/></span>
          <strong>{lead} p.p.</strong>
        </dd>
      </div>;
    })}</dl>
    <div className={style.scale} aria-hidden="true"><span>0</span><span>25 p.p.</span></div>
    <p className={style.chartNote} id="fl-gap-note">Zero significa que os dois partidos têm a mesma parcela de registros. Fonte: <a href={florida.sources.gap}>ElectionSmith, 7 de outubro de 2026</a>.</p>
  </figure>;
}

export function FloridaArticle() {
  const url=absoluteUrl('/materia/'+florida.slug+'/');
  const schema={'@context':'https://schema.org','@graph':[
    {'@type':'BlogPosting','@id':url+'#article',url,mainEntityOfPage:{'@type':'WebPage','@id':url},headline:florida.title,description:florida.description,inLanguage:'pt-BR',articleSection:florida.category,datePublished:florida.publishedAt,dateModified:florida.publishedAt,image:{'@type':'ImageObject',url:absoluteUrl(florida.cover),width:florida.width,height:florida.height},author:{'@type':'Organization',name:'Redação Atlas do Agora',url:absoluteUrl('/sobre/')},publisher:{'@type':'Organization',name:'Atlas do Agora',url:absoluteUrl('/'),logo:{'@type':'ImageObject',url:absoluteUrl('/brand/logo-light.png')}},citation:Object.values(florida.sources)},
    {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Início',item:absoluteUrl('/')},{'@type':'ListItem',position:2,name:florida.category,item:absoluteUrl('/?categoria='+encodeURIComponent(florida.category))},{'@type':'ListItem',position:3,name:florida.title,item:url}]}
  ]};
  return <article className={style.article}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema).replace(/</g,'\\u003c')}}/>
    <figure className={style.cover}>
      <a href={florida.cover} aria-label="Ampliar a capa Brasileiros na Flórida"><img src={florida.cover} alt={florida.alt} width={florida.width} height={florida.height} fetchPriority="high"/></a>
      <figcaption>Ilustração: Atlas do Agora. O tamanho das pastas não representa a quantidade de eleitores.</figcaption>
    </figure>
    <div className={style.copy}>
      <p>Em 2014, havia cerca de 23 democratas a mais que republicanos para cada 100 eleitores nascidos no Brasil que os pesquisadores identificaram no cadastro da Flórida. Dez anos depois, havia apenas um a mais. Os democratas continuavam à frente dos republicanos nesse grupo, mas a diferença quase desapareceu.</p>
      <p>O resultado vem de duas análises de Daniel A. Smith, Isabella Betancur, Kerem Castillo e Samuel Camargo Torres, publicadas no <em>ElectionSmith</em> em outubro de 2026. A equipe comparou os registros de cidadãos americanos naturalizados segundo o país de nascimento. Como essa informação nem sempre consta no cadastro, o estudo abrange apenas os eleitores cuja origem foi possível identificar. Os resultados são da Flórida e não representam todos os brasileiros que vivem nos Estados Unidos.</p>
      <RegistrationGap/>
      <p>A distância entre os dois partidos diminuiu <strong>22 pontos percentuais</strong>. Isso não significa que 22 em cada 100 eleitores trocaram de partido: o grupo cadastrado em 2024 não era necessariamente o mesmo de 2014. Também há eleitores registrados sem filiação partidária.</p>
      <h2>O registro mostra em quem essas pessoas votaram?</h2>
      <p>Não. Na Flórida, em geral, a filiação define de qual primária partidária o eleitor pode participar. Já na eleição geral, um eleitor registrado como democrata, por exemplo, pode votar em um republicano, e vice-versa. O cadastro informa a filiação; a escolha na urna continua secreta.</p>
      <section className={style.sources} aria-labelledby="fl-sources">
        <h2 id="fl-sources">Fontes</h2>
        <ul>
          <li><a href={florida.sources.registration}>ElectionSmith: registros eleitorais por país de nascimento</a> · 2 de outubro de 2026</li>
          <li><a href={florida.sources.gap}>ElectionSmith: diferença entre republicanos e democratas</a> · 7 de outubro de 2026</li>
          <li><a href={florida.sources.elections}>Divisão de Eleições da Flórida: como funcionam as primárias e a eleição geral</a></li>
        </ul>
      </section>
    </div>
  </article>;
}
