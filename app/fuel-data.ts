import source from '../public/editorial/gasolina-50-litros-dados.json';

export const fuelSource = source;
export const fuelMethodology = 'https://www.gov.br/anp/pt-br/assuntos/precos-e-defesa-da-concorrencia/precos/precos-revenda-e-de-distribuicao-combustiveis';
export type FuelRow = typeof source.items[number];
export type FuelOrder = 'highest' | 'lowest' | 'name';
export const fuelRegions = [
  {id: 'all', label: 'Todas as regiões'},
  {id: 'NORTE', label: 'Norte'},
  {id: 'NORDESTE', label: 'Nordeste'},
  {id: 'CENTRO OESTE', label: 'Centro-Oeste'},
  {id: 'SUDESTE', label: 'Sudeste'},
  {id: 'SUL', label: 'Sul'},
];
export const brl = (value: number) => value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
export const fuelColor = (cost: number) => cost <= 320 ? '#fff0ad' : cost <= 340 ? '#ffc268' : cost <= 360 ? '#ff8c60' : '#ef5c72';
export function getFuelRows(region = 'all', order: FuelOrder = 'highest'): FuelRow[] {
  return source.items.filter(row => region === 'all' || row.region === region).sort((a, b) => {
    const difference = order === 'highest' ? b.cost50Litres - a.cost50Litres : order === 'lowest' ? a.cost50Litres - b.cost50Litres : 0;
    return difference || a.name.localeCompare(b.name, 'pt-BR');
  });
}
