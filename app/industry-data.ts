import source from '../public/editorial/industria-transformacao-pib-dados.json';

export const industrySource = source;
export const industryRows = source.items;
export const industrySlug = 'participacao-industria-transformacao-pib-brasil-2010-2023';
export const industryPercent = (value: number) => value.toLocaleString('pt-BR', {minimumFractionDigits: 1, maximumFractionDigits: 1}) + '%';
export function industryDifference(value: number, reference: number): number {
  return Math.round((value - reference) * 10) / 10;
}
export function industryPoints(value: number): string {
  return (value < 0 ? '−' : value > 0 ? '+' : '') + Math.abs(value).toLocaleString('pt-BR', {minimumFractionDigits: 1, maximumFractionDigits: 1}) + ' p.p.';
}
export function nearestIndustryIndex(localX: number, left: number, right: number): number {
  return Math.max(0, Math.min(industryRows.length - 1, Math.round((localX - left) / (right - left) * (industryRows.length - 1))));
}
