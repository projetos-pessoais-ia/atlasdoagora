import { absoluteUrl } from './seo';
import historical from '../public/editorial/aluguel-brasil-2016-2025-dados.json';
import styles from './rent-article.module.css';

export const rentTitle = 'O Brasil mora mais de aluguel: o que mostram os dados do IBGE';
export const rentDescription = 'Domicílios alugados passaram de 18,4% para 23,8% do total entre 2016 e 2025. Veja a evolução e a comparação com os imóveis próprios.';

export function RentArticle() {
  const url=absoluteUrl('/materia/brasil-mora-mais-de-aluguel-ibge-2016-2025/');
  const schema={'@context':'https://schema.org','@type':'BlogPosting',headline:rentTitle,description:rentDescription,url,mainEntityOfPage:url,inLanguage:'pt-BR',articleSection:'Sociedade',datePublished:'2026-11-06',dateModified:'2026-11-06',image:{'@type':'ImageObject',url:absoluteUrl('/editorial/aluguel-brasil-2016-2025.webp'),width:1800,height:1320},author:{'@type':'Organization',name:'Redação Atlas do Agora',url:absoluteUrl('/sobre/')},publisher:{'@type':'Organization',name:'Atlas do Agora',url:absoluteUrl('/'),logo:{'@type':'ImageObject',url:absoluteUrl('/brand/logo-light.png')}},citation:['https://sidra.ibge.gov.br/tabela/6821']};
  return <article className={styles.article}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/>
    <figure className={styles.cover}>
      <a href="/editorial/aluguel-brasil-2016-2025.png" aria-label="Ampliar o gráfico sobre aluguel no Brasil"><img src="/editorial/aluguel-brasil-2016-2025.webp" width={1800} height={1320} fetchPriority="high" alt="Parcela de domicílios alugados no Brasil: de 18,4% em 2016 para 23,8% em 2025, alta de 5,4 pontos percentuais. Em 2025, eram 18,9 milhões. Não há observações para 2020 e 2021."/></a>
      <figcaption>Gráfico: Atlas do Agora, com dados do IBGE. Ilustração decorativa criada com IA; o tamanho do círculo não representa uma quantidade.</figcaption>
    </figure>
    <div className={styles.copy}>
      <p>O aluguel ganhou espaço na moradia dos brasileiros. Em 2025, <strong>23,8% dos domicílios particulares permanentes eram alugados</strong>, ante 18,4% em 2016. A mudança equivale a uma alta de 5,4 pontos percentuais em nove anos, segundo a PNAD Contínua do IBGE.</p>
      <p>Em números absolutos, o país passou de cerca de 12,3 milhões para <strong>18,9 milhões de domicílios alugados</strong>. São aproximadamente 6,6 milhões a mais, um crescimento de 54,1% no período. Em 2025, quase um em cada quatro domicílios estava nessa condição.</p>
      <h2>Como o aluguel avançou entre 2016 e 2025</h2>
      <p>A participação ficou em 18,4% nos dois primeiros anos da série. Chegou a 19,2% em 2019, a 21,0% em 2022 e continuou aumentando até 2025, o maior percentual entre os anos disponíveis na tabela.</p>
      <div className={styles.tableWrap}><table><caption>Parcela de domicílios alugados no Brasil</caption><thead><tr><th scope="col">Ano</th><th scope="col">Participação</th></tr></thead><tbody>{historical.records.map(row=><tr key={row.year}><th scope="row">{row.year}</th><td>{row.value.toLocaleString('pt-BR',{minimumFractionDigits:1})}%</td></tr>)}</tbody></table></div>
      <p className={styles.note}>A tabela do IBGE não apresenta resultados para 2020 e 2021. O gráfico deixa esse intervalo em aberto, sem estimar os valores ausentes.</p>
      <h2>E os imóveis próprios?</h2>
      <p>Os domicílios próprios já pagos continuaram sendo a condição mais comum, mas perderam participação: passaram de 66,8% para 60,2% do total. Isso não significa que sua quantidade diminuiu. Ela cresceu de cerca de 44,5 milhões para 47,8 milhões, enquanto o total de domicílios do país também aumentou.</p>
      <div className={styles.tableWrap}><table><caption>Condição de ocupação dos domicílios — participação no total</caption><thead><tr><th scope="col">Condição</th><th scope="col">2016</th><th scope="col">2025</th></tr></thead><tbody>
        <tr><th scope="row">Próprio já pago</th><td>66,8%</td><td>60,2%</td></tr>
        <tr><th scope="row">Próprio ainda pagando</th><td>6,2%</td><td>6,8%</td></tr>
        <tr><th scope="row">Alugado</th><td>18,4%</td><td>23,8%</td></tr>
        <tr><th scope="row">Cedido</th><td>8,5%</td><td>8,9%</td></tr>
        <tr><th scope="row">Outra condição</th><td>0,2%</td><td>0,3%</td></tr>
      </tbody></table></div>
      <p className={styles.note}>Percentuais arredondados podem não somar exatamente 100%.</p>
      <h2>Como ler esses números</h2>
      <p>Os percentuais se referem a <strong>domicílios, não a pessoas</strong>. A alta de 5,4 pontos percentuais mede a mudança na participação do aluguel; o crescimento de 54,1% mede a variação na quantidade de domicílios alugados. São medidas diferentes.</p>
      <p>Essa comparação descreve a distribuição da moradia no país. Sozinha, ela não identifica por que o aluguel cresceu nem acompanha quais famílias passaram de um imóvel próprio para um alugado.</p>
      <section className={styles.sources} aria-labelledby="rent-sources"><h2 id="rent-sources">Fonte e metodologia</h2>
        <p>IBGE, PNAD Contínua Anual, tabela 6821 do SIDRA. Recorte: Brasil, domicílios particulares permanentes por condição de ocupação. Foram usadas as variáveis de quantidade de domicílios (162, em mil unidades) e distribuição percentual (9784).</p>
        <p>Todos os anos foram consultados na mesma versão da base, em 6 de novembro de 2026. Os resultados mais recentes se referem a 2025.</p>
        <ul><li><a href="https://sidra.ibge.gov.br/tabela/6821">Consultar a tabela 6821 no SIDRA</a></li><li><a href="https://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/46449-domicilios-alugados-cresceram-mais-de-50-desde-2016">Ler a publicação do IBGE sobre os resultados</a></li></ul>
      </section>
    </div>
  </article>;
}
