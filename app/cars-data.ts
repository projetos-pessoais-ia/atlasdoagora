import source from '../public/editorial/carros-consumo-2026-dados.json';
const names:Record<string,string>={'MOBI':'Fiat Mobi','KWID':'Renault Kwid','ONIX PLUS':'Chevrolet Onix Plus','I20':'Hyundai i20','ONIX':'Chevrolet Onix','CIVIC HYBRID':'Honda Civic Hybrid','KONA':'Hyundai Kona','NIRO':'Kia Niro','PRELUDE':'Honda Prelude','YARIS CROSS':'Toyota Yaris Cross'};
export const carsSource=source;
export const carsSourcePage='https://www.gov.br/inmetro/pt-br/assuntos/regulamentacao/avaliacao-da-conformidade/programa-brasileiro-de-etiquetagem/tabelas-de-eficiencia-energetica/veiculos-automotivos-pbe-veicular';
export const carGroups=source.groups.map(group=>({...group,items:group.items.map(row=>({...row,id:group.id+'-'+row.fields[1]+'-'+row.fields[2],name:names[row.fields[2]],version:row.fields[3],engine:row.fields[4],highwayValue:Number(row.highway.replace(',','.')),tiedVersions:[...new Set(row.tiedVersions)]}))}));
export const allCars=carGroups.flatMap(group=>group.items.map(row=>({...row,groupId:group.id,groupTitle:group.title})));
export const formatConsumption=(value:number)=>value.toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1});
