export type VoteDestination = 'flavio'|'lula'|'other';
export type VoteOrigin = {id:string;name:string;party:string;flavio:number;lula:number;other:number};
export const voteOrigins:VoteOrigin[] = [
  {id:'caiado',name:'Ronaldo Caiado',party:'PSD',flavio:69.8,lula:24.5,other:5.7},
  {id:'cury',name:'Augusto Cury',party:'Avante',flavio:42.4,lula:52.1,other:5.6},
  {id:'renan',name:'Renan Santos',party:'Missão',flavio:33.5,lula:31.9,other:34.6},
  {id:'others',name:'Outras candidaturas',party:'Categoria “Outro” na fonte',flavio:61.3,lula:30.7,other:8.0},
];
export const voteDestinations:{key:VoteDestination;name:string;color:string}[] = [
  {key:'flavio',name:'Flávio Bolsonaro',color:'#58d1d5'},
  {key:'lula',name:'Lula',color:'#ff9a7e'},
  {key:'other',name:'Branco/nulo/não sei',color:'#c2aff0'},
];
export const voteReportUrl='https://cdn1.atlasintel.org/pesquisa_atlas_bloomberg__nacional_261019_1_4df1944681acf96f.pdf';
export const votePercent=(value:number)=>value.toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1})+'%';
