import Link from 'next/link';
import type {Story} from './data';
import {absoluteUrl} from './seo';
import {FuelChart} from './fuel-chart';
import {brl, fuelSource, fuelMethodology, getFuelRows} from './fuel-data';

export function FuelArticle({story}: {story: Story}) {
  const url = absoluteUrl('/materia/' + story.slug + '/');
  const highest = getFuelRows()[0];
  const lowest = getFuelRows('all', 'lowest')[0];
  const schema = {'@context': 'https://schema.org', '@graph': [
    {'@type': 'BlogPosting', '@id': url + '#article', url, mainEntityOfPage: {'@type': 'WebPage', '@id': url}, headline: story.title, description: story.description, inLanguage: 'pt-BR', articleSection: story.category, datePublished: story.publishedAt, dateModified: story.publishedAt, image: {'@type': 'ImageObject', url: absoluteUrl(story.cover), width: 1800, height: 1380}, author: {'@type': 'Organization', name: 'Redação Atlas do Agora', url: absoluteUrl('/sobre/')}, publisher: {'@type': 'Organization', name: 'Atlas do Agora', url: absoluteUrl('/'), logo: {'@type': 'ImageObject', url: absoluteUrl('/brand/logo-light.png')}}, citation: [fuelSource.sourcePage, fuelSource.sourceFile, fuelMethodology]},
    {'@type': 'BreadcrumbList', itemListElement: [
      {'@type': 'ListItem', position: 1, name: 'Início', item: absoluteUrl('/')},
      {'@type': 'ListItem', position: 2, name: story.category, item: absoluteUrl('/?categoria=' + encodeURIComponent(story.category))},
      {'@type': 'ListItem', position: 3, name: story.title, item: url},
    ]},
  ]};
  return <article className="fuel-story">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema).replace(/</g, '\\u003c')}}/>
    <figure className="fuel-cover"><picture><source media="(min-width: 801px)" srcSet="/editorial/gasolina-50-litros-horizontal.webp" width="1800" height="1380"/><img src="/editorial/gasolina-50-litros-vertical.webp" width="1200" height="2260" fetchPriority="high" alt="Mapa e ranking do custo de 50 litros de gasolina comum nas 27 UFs. Roraima: R$ 378,00; Rio Grande do Sul: R$ 308,00. Médias da ANP de 18 a 24 de outubro de 2026."/></picture><figcaption>Estimativa para 50 litros de gasolina comum, com os preços médios por UF. Fonte: ANP, semana de 18 a 24 de outubro de 2026. Cálculo e visualização: Atlas do Agora.</figcaption></figure>
    <div className="fuel-copy">
      <p>Abastecer <strong>50 litros de gasolina comum</strong> custaria de <strong>{brl(lowest.cost50Litres)} no {lowest.name}</strong> a <strong>{brl(highest.cost50Litres)} em {highest.name}</strong>, usando os preços médios da Agência Nacional do Petróleo, Gás Natural e Biocombustíveis (ANP) na semana de <strong>18 a 24 de outubro de 2026</strong>. A diferença entre os dois estados é de <strong>{brl(highest.cost50Litres - lowest.cost50Litres)}</strong>.</p>
      <p>O Atlas do Agora multiplicou o preço médio do litro por 50 em cada um dos 26 estados e no Distrito Federal. O volume é igual em toda a comparação: o que muda é a média de preço registrada para cada UF.</p>
      <nav className="fuel-contents" aria-label="Nesta matéria"><a href="#comparar-estados">Compare os estados ↓</a><a href="#calculo-gasolina">Como calculamos ↓</a><a href="#fontes-gasolina">Consulte as fontes ↓</a></nav>
      <h2>Onde os 50 litros custariam mais e menos?</h2>
      <p>Roraima tem a maior média do recorte, com <strong>R$ 7,56 por litro</strong>. Acre e Rondônia vêm em seguida, empatados em R$ 7,43 por litro, ou <strong>R$ 371,50</strong> para 50 litros. No Amazonas, a conta chega a R$ 351,50.</p>
      <p>Na outra ponta, o Rio Grande do Sul registra <strong>R$ 6,16 por litro</strong>. Depois aparecem Santa Catarina, com R$ 314,50 para 50 litros, e Paraíba, com R$ 315,50. A tabela interativa abaixo reúne os valores de todas as UFs.</p>
    </div>
    <FuelChart/>
    <div className="fuel-copy">
      <h2>Qual é o custo pela média brasileira?</h2>
      <p>O preço médio nacional informado pela ANP é de <strong>{brl(fuelSource.national.pricePerLitre)} por litro</strong>. Aplicado ao mesmo volume, resulta em <strong>{brl(fuelSource.national.cost50Litres)} para abastecer 50 litros</strong>.</p>
      <p>Esse valor vem da linha nacional da planilha oficial. Não calculamos uma média simples dos 27 preços estaduais: a ANP utiliza ponderação nos resultados estaduais, regionais e nacionais, com base em informações de vendas.</p>
      <h2 id="calculo-gasolina">Como calculamos o custo de abastecer</h2>
      <p>Usamos a coluna de preço médio de revenda da <strong>gasolina comum</strong> na aba de estados da planilha semanal da ANP. Para cada UF, a conta é a mesma:</p>
      <div className="fuel-formula"><span>PREÇO MÉDIO POR LITRO × 50</span><strong>Custo estimado do abastecimento</strong><p>Exemplo: R$ 6,16 × 50 = R$ 308,00.</p></div>
      <p>Os preços por litro são apresentados com duas casas decimais e os totais em reais e centavos. A comparação inclui todas as 27 UFs e mantém os empates. Gasolina aditivada, etanol e diesel não entram neste recorte.</p>
      <aside><strong>Uma referência de preço, com data definida</strong><p>As médias não representam o preço de todos os postos. O valor efetivamente pago pode variar dentro de uma mesma cidade ou estado. A conta considera a compra de 50 litros; completar um tanque que ainda contém combustível exige um volume menor.</p></aside>
      <p>O período da pesquisa está indicado na imagem e no gráfico. Este é um retrato daquela semana, consultado em 3 de novembro de 2026, e não uma cotação em tempo real.</p>
      <p>O preço por litro é uma parte da conta de quem usa o carro. Para comparar a distância percorrida com esse combustível, veja também os <Link href="/materia/carros-mais-economicos-2026-consumo-inmetro/">carros mais econômicos em 2026, segundo os dados de consumo do Inmetro</Link>.</p>
    </div>
    <section className="fuel-sources" id="fontes-gasolina" aria-labelledby="fuel-source-title"><div className="fuel-kicker">FONTES E METODOLOGIA</div><h2 id="fuel-source-title">Os dados originais da ANP</h2><p>Levantamento de Preços de Combustíveis, semana de 18 a 24 de outubro de 2026. Dados estaduais da aba ESTADOS e média nacional da aba BRASIL. Consulta realizada em 3 de novembro de 2026.</p><div className="fuel-source-links"><a href={fuelSource.sourcePage} target="_blank" rel="noopener noreferrer">Consultar a pesquisa da ANP ↗</a><a href={fuelSource.sourceFile} target="_blank" rel="noopener noreferrer">Abrir a planilha oficial (XLSX) ↗</a><a href={fuelMethodology} target="_blank" rel="noopener noreferrer">Como a ANP faz o levantamento ↗</a></div><p className="fuel-credit">Texto, cálculo e visualização: Redação Atlas do Agora. <Link href="/sobre/#editorial">Conheça nossa proposta editorial</Link>.</p></section>
  </article>;
}
