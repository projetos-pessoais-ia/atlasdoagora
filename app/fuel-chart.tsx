'use client';

import {useState} from 'react';
import {brl, fuelColor, fuelRegions, fuelSource, getFuelRows, type FuelOrder} from './fuel-data';

export function FuelChart() {
  const [region, setRegion] = useState('all');
  const [order, setOrder] = useState<FuelOrder>('highest');
  const [selected, setSelected] = useState<string | null>(null);
  const rows = getFuelRows(region, order);
  const active = rows.find(row => row.uf === selected);
  const difference = active ? Math.round((active.cost50Litres - fuelSource.national.cost50Litres) * 100) / 100 : 0;

  return <section className="fuel-chart" id="comparar-estados" aria-labelledby="fuel-chart-title">
    <div className="fuel-chart-heading"><div><div className="fuel-kicker">EXPLORE OS DADOS</div><h2 id="fuel-chart-title">Quanto custa no seu estado?</h2></div><p>Filtre por região e altere a ordem. Selecione o nome de uma UF para comparar com a média brasileira.</p></div>
    <div className="fuel-controls">
      <label htmlFor="fuel-region">Região<select id="fuel-region" value={region} onChange={event => {setRegion(event.target.value); setSelected(null);}}>{fuelRegions.map(option => <option key={option.id} value={option.id}>{option.label}</option>)}</select></label>
      <label htmlFor="fuel-order">Ordenar por<select id="fuel-order" value={order} onChange={event => setOrder(event.target.value as FuelOrder)}><option value="highest">Maior custo</option><option value="lowest">Menor custo</option><option value="name">Nome do estado</option></select></label>
      <div className="fuel-benchmark"><span>MÉDIA BRASILEIRA · 50 L</span><strong>{brl(fuelSource.national.cost50Litres)}</strong></div>
    </div>
    <div className="fuel-selection" aria-live="polite" aria-atomic="true">
      {active ? <><h3>{active.name} <span>({active.uf})</span></h3><p><strong>{brl(active.pricePerLitre)}/L × 50 litros = {brl(active.cost50Litres)}</strong><span>{difference === 0 ? 'Mesmo valor da média brasileira.' : `${brl(Math.abs(difference))} ${difference > 0 ? 'acima' : 'abaixo'} do custo calculado pela média brasileira.`}</span></p></> : <><h3>50 litros, a mesma medida para todas as UFs</h3><p>As barras partem de zero e usam a mesma escala. A linha tracejada marca os {brl(fuelSource.national.cost50Litres)} da média brasileira.</p></>}
    </div>
    <p className="fuel-chart-note" role="status">{rows.length} UFs exibidas · Gasolina comum · Semana de 18 a 24/10/2026.</p>
    <div className="fuel-table-scroll" role="region" aria-label="Ranking de preços por estado" tabIndex={0}>
      <table className="fuel-table"><caption>Custo estimado para abastecer 50 litros de gasolina comum, por UF</caption>
        <thead><tr><th scope="col">Estado / DF</th><th scope="col">Preço por litro</th><th scope="col">Custo de 50 litros<div className="fuel-axis" aria-hidden="true"><span>R$ 0</span><span>R$ 200</span><span>R$ 400</span></div></th></tr></thead>
        <tbody>{rows.map(row => <tr key={row.uf} className={selected === row.uf ? 'fuel-row-selected' : undefined}>
          <th scope="row"><button type="button" aria-pressed={selected === row.uf} onClick={() => setSelected(row.uf)}><span className="fuel-uf">{row.uf}</span><span>{row.name}</span></button></th>
          <td>{brl(row.pricePerLitre)}</td>
          <td><strong>{brl(row.cost50Litres)}</strong><div className="fuel-bar" aria-hidden="true"><span style={{width: `${row.cost50Litres / 400 * 100}%`, background: fuelColor(row.cost50Litres)}}/><i style={{left: `${fuelSource.national.cost50Litres / 400 * 100}%`}}/></div></td>
        </tr>)}</tbody>
      </table>
    </div>
    <p className="fuel-chart-note">Fonte: ANP. Cálculo: preço médio de revenda por UF × 50 litros. Estados com o mesmo valor permanecem empatados; a ordem entre eles é alfabética.</p>
  </section>;
}
