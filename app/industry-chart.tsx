'use client';

import {useEffect, useId, useRef, useState, type PointerEvent} from 'react';
import {industryRows, industryPercent, industryDifference, industryPoints, nearestIndustryIndex} from './industry-data';

export function IndustryChart() {
  const [selectedIndex, setSelectedIndex] = useState(industryRows.length - 1);
  const [comparisonIndex, setComparisonIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [width, setWidth] = useState(960);
  const container = useRef<HTMLDivElement>(null);
  const chartId = useId();
  useEffect(() => {
    const node = container.current;
    if (!node) return;
    const resize = () => setWidth(Math.max(240, Math.round(node.getBoundingClientRect().width)));
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const activeIndex = hoveredIndex ?? selectedIndex;
  const active = industryRows[activeIndex];
  const reference = industryRows[comparisonIndex];
  const difference = industryDifference(active.share, reference.share);
  const height = width < 600 ? 320 : 380;
  const plot = {left: 48, right: width - 26, top: 36, bottom: height - 46};
  const x = (index: number) => plot.left + index / (industryRows.length - 1) * (plot.right - plot.left);
  const y = (share: number) => plot.top + (14 - share) / 6 * (plot.bottom - plot.top);
  const visibleYears = width < 860 ? [2010, 2014, 2018, 2023] : industryRows.map(row => row.year);
  const points = industryRows.map((row, index) => `${x(index)},${y(row.share)}`).join(' ');
  function pointerIndex(event: PointerEvent<SVGSVGElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const localX = (event.clientX - bounds.left) / bounds.width * width;
    return nearestIndustryIndex(localX, plot.left, plot.right);
  }

  return <section className="industry-chart" id="grafico-industria" aria-labelledby="industry-chart-title">
    <div className="industry-chart-heading"><div><div className="industry-kicker">EXPLORE A SÉRIE</div><h2 id="industry-chart-title">A participação da indústria, ano a ano</h2></div><p>Passe o mouse pela linha ou toque no gráfico. Use os campos para escolher um ano e a referência da comparação.</p></div>
    <div className="industry-chart-controls">
      <label htmlFor="industry-selected-year">Ano em foco<select id="industry-selected-year" value={selectedIndex} onChange={event => {setSelectedIndex(Number(event.target.value)); setHoveredIndex(null);}}>{industryRows.map((row, index) => <option value={index} key={row.year}>{row.year}</option>)}</select></label>
      <label htmlFor="industry-reference-year">Comparar com<select id="industry-reference-year" value={comparisonIndex} onChange={event => {setComparisonIndex(Number(event.target.value)); setHoveredIndex(null);}}>{industryRows.map((row, index) => <option value={index} key={row.year}>{row.year}</option>)}</select></label>
      <p>Brasil · Dados anuais do IBGE<br/><strong>Preços constantes de 2010</strong></p>
    </div>
    <div className="industry-chart-reading" aria-live="polite" aria-atomic="true">
      <div><span>PARTICIPAÇÃO EM {active.year}</span><strong>{industryPercent(active.share)}</strong></div>
      <div><span>DIFERENÇA EM RELAÇÃO A {reference.year}</span><strong className="industry-reading-difference">{industryPoints(difference)}</strong><p>{difference === 0 ? 'Mesma participação na precisão publicada.' : `${Math.abs(difference).toLocaleString('pt-BR', {minimumFractionDigits: 1, maximumFractionDigits: 1})} ${Math.abs(difference) === 1 ? 'ponto percentual' : 'pontos percentuais'} ${difference > 0 ? 'acima' : 'abaixo'} de ${reference.year}.`}</p></div>
    </div>
    <div className="industry-chart-canvas" ref={container}>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} role="img" aria-labelledby={`${chartId}-title ${chartId}-description`} onPointerMove={event => {if (event.pointerType === 'mouse') setHoveredIndex(pointerIndex(event));}} onPointerLeave={() => setHoveredIndex(null)} onPointerUp={event => {if (event.pointerType !== 'mouse') {setSelectedIndex(pointerIndex(event)); setHoveredIndex(null);}}}>
        <title id={`${chartId}-title`}>Participação da indústria de transformação no PIB, de 2010 a 2023</title>
        <desc id={`${chartId}-description`}>Série anual do IBGE a preços constantes de 2010. Vai de 12,7% em 2010 a 9,5% em 2023. Eixo vertical de 8% a 14%. Os valores completos estão na tabela abaixo; os campos de seleção permitem explorar o gráfico pelo teclado.</desc>
        {[8,9,10,11,12,13,14].map(value => <g key={value}><line x1={plot.left} x2={plot.right} y1={y(value)} y2={y(value)} stroke="#b9cbe0" strokeWidth="1"/><text x={plot.left - 12} y={y(value) + 5} textAnchor="end" fill="#365270" fontSize="14" fontWeight="600">{value}%</text></g>)}
        <line className="industry-reference-line" x1={plot.left} x2={plot.right} y1={y(reference.share)} y2={y(reference.share)} stroke="#637a99" strokeWidth="2" strokeDasharray="6 5"/>
        <polyline points={points} fill="none" stroke="#1558cc" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round"/>
        <line x1={x(activeIndex)} x2={x(activeIndex)} y1={plot.top} y2={plot.bottom} stroke="#1558cc" strokeWidth="1.5" strokeDasharray="3 5" opacity=".6"/>
        {industryRows.map((row, index) => <g key={row.year}><circle data-year={row.year} data-share={row.share} cx={x(index)} cy={y(row.share)} r={index === activeIndex ? 7 : 4} fill={index === activeIndex ? '#1558cc' : '#fffdf7'} stroke={index === activeIndex ? '#fffdf7' : '#1558cc'} strokeWidth={index === activeIndex ? 3 : 2}/>{visibleYears.includes(row.year) && <text x={x(index)} y={plot.bottom + 28} textAnchor="middle" fontSize="14" fontWeight={index === activeIndex ? '700' : '500'} fill="#365270">{row.year}</text>}</g>)}
      </svg>
    </div>
    <div className="industry-chart-legend"><span><i/>Participação no PIB</span><span><i className="industry-reference-key"/>Referência: {reference.year} · {industryPercent(reference.share)}</span></div>
    <p className="industry-chart-note">Cada ponto corresponde a um ano. A escala vertical vai de 8% a 14%. “p.p.” significa pontos percentuais.</p>
    <details className="industry-data-table"><summary>Ver os 14 valores da série do IBGE</summary><table><caption>Brasil · Indústria de transformação em proporção do PIB · Preços constantes de 2010</caption><thead><tr><th scope="col">Ano</th><th scope="col">Participação no PIB</th></tr></thead><tbody>{industryRows.map(row => <tr key={row.year}><th scope="row">{row.year}</th><td>{industryPercent(row.share)}</td></tr>)}</tbody></table></details>
  </section>;
}
