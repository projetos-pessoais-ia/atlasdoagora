'use client';
import {useState} from 'react';
import {voteOrigins,voteDestinations,voteReportUrl,votePercent,VoteDestination} from './transfer-data';

export function TransferArticle(){
  const [selected,setSelected]=useState('caiado');
  const [focus,setFocus]=useState<VoteDestination|'all'>('all');
  const [sort,setSort]=useState('editorial');
  const active=voteOrigins.find(g=>g.id===selected)!;
  const ordered=[...voteOrigins].sort((a,b)=>sort==='editorial'?0:b[sort as VoteDestination]-a[sort as VoteDestination]);
  return <div className="transfer-story">
    <figure className="transfer-cover"><img src="/editorial/transferencia-votos-2026-capa.webp" width="1600" height="1000" alt="Intenção de voto no segundo turno entre eleitores que declararam voto em Caiado, Cury, Renan Santos e outras candidaturas no primeiro turno. Valores completos no gráfico e na tabela abaixo."/><figcaption>Percentuais dentro de cada eleitorado declarado. Cada faixa tem sua própria base; a largura não representa a quantidade de eleitores.</figcaption></figure>

    <div className="transfer-facts" aria-label="Três leituras dos dados">
      <div><span>ENTRE OS ELEITORES DE CAIADO</span><strong>69,8%</strong><p>declararam intenção de voto em Flávio Bolsonaro.</p></div>
      <div><span>ENTRE OS ELEITORES DE CURY</span><strong>52,1%</strong><p>declararam intenção de voto em Lula.</p></div>
      <div><span>ENTRE OS ELEITORES DE RENAN</span><strong>34,6%</strong><p>responderam branco, nulo ou não sei.</p></div>
    </div>

    <section className="transfer-chart" aria-labelledby="transfer-chart-title">
      <div className="transfer-chart-heading"><div><span className="transfer-eyebrow">EXPLORE A PESQUISA</span><h2 id="transfer-chart-title">O destino declarado de cada grupo</h2><p>Escolha um destino para destacá-lo. Clique ou toque numa faixa para consultar os percentuais.</p></div><label className="transfer-sort">Ordenar por<select value={sort} onChange={e=>setSort(e.target.value)}><option value="editorial">Ordem editorial</option>{voteDestinations.map(d=><option key={d.key} value={d.key}>{d.name}</option>)}</select></label></div>
      <div className="transfer-controls" role="group" aria-label="Destacar destino do voto"><button type="button" aria-pressed={focus==='all'} onClick={()=>setFocus('all')}>Todos os destinos</button>{voteDestinations.map(d=><button key={d.key} type="button" aria-pressed={focus===d.key} onClick={()=>setFocus(d.key)}><i style={{background:d.color}}/>{d.name}</button>)}</div>
      <div className="transfer-axis"><span>VOTO DECLARADO NO 1º TURNO</span><span>INTENÇÃO NO 2º TURNO · % DO GRUPO</span></div>
      <div className="transfer-bars">{ordered.map(group=><div className={'transfer-row '+(group.id===selected?'is-selected':'')} key={group.id}>
        <button className="transfer-origin" type="button" aria-pressed={selected===group.id} aria-controls="transfer-detail" onClick={()=>setSelected(group.id)}><strong>{group.name}</strong><span>{group.party}</span></button>
        <div className="transfer-row-content"><div className="transfer-stack" aria-label={'Intenção de voto entre eleitores de '+group.name}>{voteDestinations.map(d=><button type="button" key={d.key} className={'transfer-segment '+(focus!=='all'&&focus!==d.key?'is-muted':'')} style={{flex:`${group[d.key]} 1 0`,background:d.color}} aria-label={`${group.name}: ${votePercent(group[d.key])} para ${d.name}`} aria-controls="transfer-detail" onClick={()=>{setSelected(group.id);setFocus(d.key)}}><span>{votePercent(group[d.key])}</span></button>)}</div><p className="transfer-row-values">{voteDestinations.map(d=><span key={d.key}><i style={{background:d.color}}/>{d.name}: <b>{votePercent(group[d.key])}</b></span>)}</p></div>
      </div>)}</div>
      <div id="transfer-detail" className="transfer-detail" aria-live="polite" aria-atomic="true"><div><span className="transfer-eyebrow">GRUPO SELECIONADO</span><h3>{active.name}</h3><p>{active.id==='others'?'O relatório agrupa as candidaturas não individualizadas na categoria “Outro”. Não é possível isolar o eleitorado de Zema.':`Entre os entrevistados que declararam voto em ${active.name} no primeiro turno:`}</p></div><dl>{voteDestinations.map(d=><div key={d.key}><dt><i style={{background:d.color}}/>{d.name}</dt><dd>{votePercent(active[d.key])}</dd></div>)}</dl></div>
      <p className="transfer-note">Fonte: Atlas/Bloomberg, campo de 13 a 18 de outubro de 2026, página 9. A soma de Cury é 100,1% por arredondamento; os valores publicados foram preservados. A margem nacional de ±1 p.p. não deve ser aplicada automaticamente a esses subgrupos.</p>
    </section>

    <article className="transfer-copy">
      <h2>Uma nova escolha depois do primeiro turno</h2>
      <p>A disputa do segundo turno coloca uma pergunta para quem escolheu uma candidatura eliminada: qual é a preferência agora? A pesquisa Atlas/Bloomberg divulgada em 19 de outubro de 2026 permite observar essa intenção entre grupos definidos pelo voto que os entrevistados declararam no primeiro turno.</p>
      <p>O cruzamento não acompanha o voto individual nas urnas e não representa uma transferência já realizada. É um retrato das respostas coletadas entre 13 e 18 de outubro, antes da votação do segundo turno. Também não permite afirmar que um apoio anunciado por uma liderança causou a escolha de seus eleitores.</p>
      <h2>Os percentuais mudam conforme o eleitorado de origem</h2>
      <p>Entre os entrevistados que declararam voto em Ronaldo Caiado, 69,8% indicaram Flávio Bolsonaro, 24,5% escolheram Lula e 5,7% responderam branco, nulo ou não sei. No grupo que declarou voto em Augusto Cury, os percentuais foram de 42,4%, 52,1% e 5,6%, respectivamente.</p>
      <p>No eleitorado declarado de Renan Santos, 33,5% indicaram Flávio, 31,9% apontaram Lula e 34,6% ficaram na categoria branco/nulo/não sei. Essa última categoria reúne respostas diferentes: não deve ser interpretada como se todos fossem eleitores indecisos.</p>
      <aside><strong>Percentual de um grupo não é percentual do Brasil.</strong><p>Os eleitorados de origem têm tamanhos diferentes. Uma faixa de 100% representa o conjunto de respostas daquele grupo, não a mesma quantidade de pessoas das outras faixas. Por isso, estes percentuais não devem ser somados nem convertidos diretamente em votos nacionais.</p></aside>
      <h2>Por que Zema não aparece em uma linha própria?</h2>
      <p>A tabela do relatório individualiza Caiado, Cury e Renan, além dos finalistas. As demais candidaturas aparecem na categoria “Outro”. Nesse conjunto, 61,3% indicaram Flávio, 30,7% escolheram Lula e 8,0% responderam branco, nulo ou não sei. Os números não podem ser atribuídos especificamente a Romeu Zema ou a qualquer outro candidato do agrupamento.</p>
      <h2>O limite está no tamanho de cada recorte</h2>
      <p>O levantamento nacional tem 4.998 respondentes. Isso não significa que cada eleitorado mostrado aqui tenha 4.998 entrevistas. A tabela de cruzamentos não informa a base de respondentes nem a margem específica de cada um desses grupos. A margem nacional de um ponto percentual, com confiança informada de 95%, não basta para declarar diferenças estatisticamente significativas entre esses recortes.</p>
      <p>A leitura adequada é descritiva: mostrar o percentual publicado para cada resposta, sem transformar uma diferença numérica em certeza sobre o resultado da eleição.</p>
    </article>

    <section className="transfer-table-section" aria-labelledby="transfer-table-title"><h2 id="transfer-table-title">Os números da fonte, sem atalhos</h2><p>Intenção de voto no segundo turno, por voto declarado no primeiro. Todos os valores são percentuais.</p><div className="transfer-table-wrap" tabIndex={0} role="region" aria-label="Tabela completa da intenção por eleitorado"><table><thead><tr><th scope="col">Eleitorado declarado</th>{voteDestinations.map(d=><th key={d.key} scope="col">{d.name}</th>)}</tr></thead><tbody>{voteOrigins.map(g=><tr key={g.id}><th scope="row">{g.name}</th>{voteDestinations.map(d=><td key={d.key}>{votePercent(g[d.key])}</td>)}</tr>)}</tbody></table></div><a className="transfer-download" href="/editorial/transferencia-votos-2026.csv" download>Baixar os dados em CSV ↓</a></section>

    <section className="transfer-method" aria-labelledby="transfer-method-title"><span className="transfer-eyebrow">TRANSPARÊNCIA</span><h2 id="transfer-method-title">Fontes e metodologia</h2><ul>
      <li><strong>Fonte primária:</strong> <a href={voteReportUrl} target="_blank" rel="noopener noreferrer">relatório Atlas/Bloomberg, divulgado em 19/10/2026</a>. Ficha técnica na página 5 e cruzamento por voto no primeiro turno na página 9. O documento está disponível na <a href="https://www.atlasintel.org/polls/general-release-polls" target="_blank" rel="noopener noreferrer">página de pesquisas públicas do instituto</a>.</li>
      <li><strong>Coleta e método:</strong> 13 a 18/10/2026, recrutamento digital aleatório (Atlas RDR), com 4.998 respondentes e pós-estratificação descrita pelo instituto. O relatório define a população-alvo como a população adulta brasileira.</li>
      <li><strong>Precisão:</strong> margem nacional informada de ±1 ponto percentual e nível de confiança de 95%. Bases e margens específicas dos quatro subgrupos não são informadas na tabela consultada; não fizemos testes de significância nem estimativas de quantidade de votos.</li>
      <li><strong>Registro informado no relatório:</strong> BR-02418/2026. A consulta de registros é disponibilizada pelo <a href="https://www.tse.jus.br/eleicoes/pesquisas-eleitorais/pesquisas-eleitorais" target="_blank" rel="noopener noreferrer">TSE/PesqEle</a>. Registro não significa aprovação prévia dos resultados pelo TSE.</li>
      <li><strong>Recorte editorial:</strong> três candidaturas eliminadas individualizadas e a categoria “Outro”. Linhas sobre os finalistas, votos brancos/nulos e ausência no primeiro turno ficam fora deste recorte. A resposta “Branco/Nulo/Não sei” foi mantida como categoria única.</li>
      <li><strong>Tratamento:</strong> transcrição dos percentuais originais, sem recalcular votos válidos, combinar institutos ou transformar percentuais em volumes. Diferenças de até um décimo na soma decorrem do arredondamento da fonte.</li>
    </ul><p>Consulta: 22 de outubro de 2026. Texto, cálculos de apresentação e design: Atlas do Agora.</p></section>
  </div>;
}
