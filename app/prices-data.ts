export const priceItems=[
  {
    "code": "7265",
    "classification": "1106015",
    "name": "Limão",
    "value": 46.42,
    "direction": "up"
  },
  {
    "code": "7212",
    "classification": "1103028",
    "name": "Tomate",
    "value": 37.76,
    "direction": "up"
  },
  {
    "code": "7206",
    "classification": "1103020",
    "name": "Abobrinha",
    "value": 29.82,
    "direction": "up"
  },
  {
    "code": "7202",
    "classification": "1103003",
    "name": "Batata-inglesa",
    "value": 24.07,
    "direction": "up"
  },
  {
    "code": "7215",
    "classification": "1103043",
    "name": "Cebola",
    "value": 10.14,
    "direction": "up"
  },
  {
    "code": "7210",
    "classification": "1103026",
    "name": "Pimentão",
    "value": -10.95,
    "direction": "down"
  },
  {
    "code": "7268",
    "classification": "1106019",
    "name": "Manga",
    "value": -9.62,
    "direction": "down"
  },
  {
    "code": "7333",
    "classification": "1108088",
    "name": "Peixe - dourada",
    "value": -9.06,
    "direction": "down"
  },
  {
    "code": "7270",
    "classification": "1106021",
    "name": "Melancia",
    "value": -8.11,
    "direction": "down"
  },
  {
    "code": "7267",
    "classification": "1106018",
    "name": "Mamão",
    "value": -6.59,
    "direction": "down"
  }
];
export const priceTable='https://sidra.ibge.gov.br/tabela/7060';
export const priceRelease='https://agenciadenoticias.ibge.gov.br/agencia-sala-de-imprensa/2013-agencia-de-noticias/releases/48246-ipca-fica-em-0-82-em-setembro';
export const formatPriceChange=(value:number)=>(value>0?'+':value<0?'−':'')+Math.abs(value).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})+'%';
export const priceBar=(value:number)=>({left:((20+Math.min(0,value))/70)*100+'%',width:(Math.abs(value)/70)*100+'%'});
