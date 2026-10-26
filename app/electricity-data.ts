export const electricityReport='https://www.epe.gov.br/sites-pt/publicacoes-dados-abertos/publicacoes/PublicacoesArquivos/publicacao-975/topico-847/BEN_S%C3%ADntese_2026_PT.pdf';
export const electricityExplainer='https://www.epe.gov.br/pt/abcdenergia/matriz-energetica-e-eletrica';
export const electricitySources=[
 {id:'hydro',name:'Hidráulica',value:51.2,color:'#44baf3',description:'A energia da água movimenta turbinas nas usinas hidrelétricas. No recorte publicado pela EPE, a fonte hidráulica corresponde a pouco mais da metade da oferta interna de eletricidade.'},
 {id:'wind',name:'Eólica',value:14.9,color:'#75e0c8',description:'O vento movimenta as pás dos aerogeradores. A participação apresentada é a parcela da eletricidade disponível atribuída à fonte eólica, e não a participação na capacidade instalada.'},
 {id:'solar',name:'Solar',value:11.4,color:'#ffd166',description:'A fonte solar transforma a energia do sol em eletricidade. Os dados do BEN incluem a geração distribuída, como a de painéis instalados em telhados, além das usinas centralizadas.'},
 {id:'bio',name:'Biomassa',value:8.4,color:'#afd66a',description:'A categoria reúne fontes como lenha, bagaço de cana, licor preto, biodiesel e outras fontes primárias. O licor preto é um subproduto da produção de celulose que pode ser aproveitado na geração de eletricidade.'},
 {id:'gas',name:'Gás natural',value:7.5,color:'#ff9275',description:'O gás natural é utilizado como combustível em usinas termelétricas. A eletricidade produzida a partir dessa fonte integra a parcela não renovável da matriz.'},
 {id:'coal',name:'Carvão e derivados',value:2.2,color:'#b1a0d9',description:'Além do carvão, o agrupamento publicado pela EPE inclui gás de coqueria, gás de alto-forno, gás de aciaria e alcatrão. São fontes não renováveis.'},
 {id:'nuclear',name:'Nuclear',value:2,color:'#fa9bc3',description:'A geração nuclear utiliza o calor liberado pela fissão de núcleos atômicos para produzir eletricidade. No BEN, essa participação integra o conjunto das fontes não renováveis.'},
 {id:'oil',name:'Derivados de petróleo',value:1.5,color:'#c4a18b',description:'Derivados de petróleo são utilizados como combustíveis na geração termelétrica. Esta parcela representa a eletricidade atribuída a esse agrupamento no gráfico de composição da EPE.'},
 {id:'import',name:'Eletricidade importada',value:.9,color:'#8ea7c4',description:'A oferta interna também considera o saldo entre importações e exportações de eletricidade. O BEN apresenta a eletricidade importada em uma categoria própria, separada das fontes de geração nacional.'},
];
export const electricityPercent=(value:number)=>value.toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1})+'%';
let cursor=0;
const ranges=electricitySources.map(source=>{const start=cursor;cursor+=Math.round(source.value*10);return {...source,start,end:cursor}});
export const electricityTiles=Array.from({length:100},(_,index)=>ranges.flatMap(source=>{
 const start=Math.max(index*10,source.start),end=Math.min(index*10+10,source.end);
 return end>start?[{id:source.id,color:source.color,share:(end-start)/10}]:[];
}));
