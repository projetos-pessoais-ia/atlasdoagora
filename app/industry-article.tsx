import Link from 'next/link';
import type {Story} from './data';
import {absoluteUrl} from './seo';
import {IndustryChart} from './industry-chart';
import {industrySource, industryRows, industryPercent} from './industry-data';

export function IndustryArticle({story}: {story: Story}) {
  const url = absoluteUrl('/materia/' + story.slug + '/');
  const first = industryRows[0];
  const last = industryRows[industryRows.length - 1];
  const schema = {'@context': 'https://schema.org', '@graph': [
    {'@type': 'BlogPosting', '@id': url + '#article', url, mainEntityOfPage: {'@type': 'WebPage', '@id': url}, headline: story.title, description: story.description, inLanguage: 'pt-BR', articleSection: story.category, datePublished: story.publishedAt, dateModified: story.publishedAt, image: {'@type': 'ImageObject', url: absoluteUrl(story.cover), width: 1800, height: 1320}, author: {'@type': 'Organization', name: 'Redação Atlas do Agora', url: absoluteUrl('/sobre/')}, publisher: {'@type': 'Organization', name: 'Atlas do Agora', url: absoluteUrl('/'), logo: {'@type': 'ImageObject', url: absoluteUrl('/brand/logo-light.png')}}, citation: [industrySource.sourcePage, industrySource.tableUrl, industrySource.methodologyUrl, industrySource.classificationUrl]},
    {'@type': 'BreadcrumbList', itemListElement: [
      {'@type': 'ListItem', position: 1, name: 'Início', item: absoluteUrl('/')},
      {'@type': 'ListItem', position: 2, name: story.category, item: absoluteUrl('/?categoria=' + encodeURIComponent(story.category))},
      {'@type': 'ListItem', position: 3, name: story.title, item: url},
    ]},
  ]};
  return <article className="industry-story">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema).replace(/</g, '\\u003c')}}/>
    <figure className="industry-cover"><picture><source media="(min-width: 801px)" srcSet="/editorial/industria-transformacao-pib-horizontal.webp" width="1800" height="1320"/><img src="/editorial/industria-transformacao-pib-vertical.webp" width="1200" height="1680" fetchPriority="high" alt="Gráfico da participação da indústria de transformação no PIB brasileiro, de 12,7% em 2010 a 9,5% em 2023. Queda de 3,2 pontos percentuais. Série do IBGE a preços constantes de 2010, sobre uma paisagem industrial ilustrativa."/></picture><figcaption>Participação da indústria de transformação no PIB, a preços constantes de 2010. Fonte: IBGE, indicador ODS 9.2.1. Visualização: Atlas do Agora. A paisagem é uma ilustração criada com IA e não retrata uma fábrica específica.</figcaption></figure>
    <div className="industry-copy">
      <p>A participação da <strong>indústria de transformação no PIB brasileiro</strong> passou de <strong>{industryPercent(first.share)} em {first.year}</strong> para <strong>{industryPercent(last.share)} em {last.year}</strong>, segundo a série do IBGE para o indicador ODS 9.2.1. A diferença entre o início e o fim do período é de <strong>3,2 pontos percentuais</strong>.</p>
      <p>Os percentuais já são publicados pelo instituto e foram reproduzidos no gráfico. A série usa <strong>preços constantes de 2010</strong>: esse ano é a referência de preços tanto para a contribuição da indústria de transformação quanto para o PIB. Na consulta realizada em 4 de novembro de 2026, os dados disponíveis vão de 2010 a 2023.</p>
      <nav className="industry-contents" aria-label="Nesta matéria"><a href="#grafico-industria">Explore os anos ↓</a><a href="#recorte-industria">Entenda o indicador ↓</a><a href="#fontes-industria">Consulte as fontes ↓</a></nav>
      <h2>O que mudou entre 2010 e 2023?</h2>
      <p>O maior percentual do período é o de 2010, com 12,7%. Em 2014, a participação estava em <strong>11,4%</strong>; em 2018, em <strong>10,7%</strong>. Em 2022, chegou a <strong>9,9%</strong> e, no ano seguinte, a <strong>9,5%</strong>, o menor valor da série consultada.</p>
      <p>A trajetória não foi uma queda em todos os anos. Os valores publicados se repetem em 2012 e 2013, ambos com 12,0%. De 2016 para 2017, há uma alta de 10,6% para 10,7%, percentual que se mantém em 2018. O gráfico abaixo permite acompanhar cada observação e comparar dois anos.</p>
    </div>
    <IndustryChart/>
    <div className="industry-copy">
      <h2 id="recorte-industria">Que indústria entra nesse indicador?</h2>
      <p>O recorte é a <strong>indústria de transformação</strong>, que reúne atividades como fabricação de alimentos, roupas, máquinas e veículos. Indústrias extrativas, construção, eletricidade e saneamento são outros grupos de atividades e não fazem parte da indústria de transformação.</p>
      <p>Para medir sua contribuição ao PIB, o IBGE usa o <strong>valor adicionado</strong>: o valor da produção depois de descontados os bens e serviços consumidos no processo produtivo. Essa medida evita tratar o valor dos insumos comprados como uma contribuição inteiramente nova de quem os utiliza.</p>
      <aside className="industry-explainer"><strong>Por que aparece “preços constantes de 2010”?</strong><p>O indicador mantém os preços daquele ano como referência para acompanhar a evolução em volume. Por isso, seus percentuais devem ser comparados com os da mesma série. Uma participação calculada a preços correntes, isto é, com os preços de cada ano, responde a uma comparação diferente.</p></aside>
      <h2>Menor participação significa menor produção?</h2>
      <p>A participação é uma relação entre a contribuição da indústria de transformação e o PIB total. Ela pode diminuir quando o setor cresce menos que o conjunto da economia, mesmo que sua produção aumente. <strong>O percentual, sozinho, não permite concluir que a produção caiu.</strong></p>
      <p>A diferença de 12,7% para 9,5% é expressa em <strong>pontos percentuais</strong>: 12,7 menos 9,5 resulta em 3,2. A série mostra a mudança no peso relativo do setor, mas não identifica, por si só, suas causas, a quantidade de fábricas ou o número de empregos.</p>
      <p>Para explorar outro retrato da economia brasileira, veja também <Link href="/materia/de-onde-vem-a-eletricidade-do-brasil/">de onde vem a eletricidade do Brasil</Link>, com dados da Empresa de Pesquisa Energética.</p>
    </div>
    <section className="industry-sources" id="fontes-industria" aria-labelledby="industry-source-title"><div className="industry-kicker">FONTES E METODOLOGIA</div><h2 id="industry-source-title">Os dados originais do IBGE</h2><p>Indicador ODS 9.2.1, tabela 6587 do SIDRA, variável 9312: valor adicionado da indústria de transformação em proporção do PIB. Brasil, dados anuais de 2010 a 2023, a preços constantes de 2010. Consulta: 4 de novembro de 2026.</p><p>Reproduzimos os 14 percentuais com uma casa decimal, como publicados pelo IBGE. As diferenças do texto e do comparador são subtrações entre esses valores, arredondadas para uma casa decimal e expressas em pontos percentuais. As linhas unem as observações anuais, sem estimar anos adicionais.</p><div className="industry-source-links"><a href={industrySource.sourcePage} target="_blank" rel="noopener noreferrer">Ver o indicador e a metodologia ↗</a><a href={industrySource.tableUrl} target="_blank" rel="noopener noreferrer">Consultar a tabela no SIDRA ↗</a><a href={industrySource.classificationUrl} target="_blank" rel="noopener noreferrer">Ver a classificação de atividades do IBGE (PDF) ↗</a></div><p className="industry-credit">Texto e visualização: Redação Atlas do Agora. <Link href="/sobre/#editorial">Conheça nossa proposta editorial</Link>.</p></section>
  </article>;
}
