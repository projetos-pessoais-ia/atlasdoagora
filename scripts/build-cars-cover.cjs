const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),sharp=require(path.join(root,'node_modules/sharp'));
const dir=path.join(root,'public/editorial');const data=JSON.parse(fs.readFileSync(path.join(dir,'carros-consumo-2026-dados.json'),'utf8'));
const C={bg:'#dfeaff',ink:'#152c51',blue:'#244bdb',teal:'#087e86',paper:'#f9fbff',yellow:'#f9d24b',muted:'#45627e'};
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
const t=(x,y,s,n=24,c=C.ink,a='')=>`<text x="${x}" y="${y}" font-size="${n}" fill="${c}" ${a}>${esc(s)}</text>`;
const names={'MOBI':'Fiat Mobi','KWID':'Renault Kwid','ONIX PLUS':'Chevrolet Onix Plus','I20':'Hyundai i20','ONIX':'Chevrolet Onix','CIVIC HYBRID':'Honda Civic Hybrid','KONA':'Hyundai Kona','NIRO':'Kia Niro','PRELUDE':'Honda Prelude','YARIS CROSS':'Toyota Yaris Cross'};
const variants={'MOBI':'Like · 1.0 · manual','KWID':'Zen 2¹ · 1.0 · manual','ONIX PLUS':'MT · 1.0 · manual','I20':'Comfort¹ · 1.0 · manual','ONIX':'MT · 1.0 turbo · manual','CIVIC HYBRID':'Touring · 2.0 · CVT','KONA':'Ultimate¹ · 1.6 · DCT','NIRO':'EX¹ · 1.6 · DCT','PRELUDE':'Top¹ · 2.0 · CVT','YARIS CROSS':'XRX¹ · 1.5 · CVT'};
// Generic top-view marker: a visual cue, not a representation of a specific vehicle.
const car=(x,y,color,scale=1)=>`<g transform="translate(${x} ${y}) scale(${scale})"><ellipse rx="30" ry="13" cy="3" fill="#142747" opacity=".16"/><rect x="-16" y="-18" width="14" height="7" rx="2" fill="#152c51"/><rect x="-16" y="11" width="14" height="7" rx="2" fill="#152c51"/><rect x="10" y="-18" width="12" height="7" rx="2" fill="#152c51"/><rect x="10" y="11" width="12" height="7" rx="2" fill="#152c51"/><rect x="-29" y="-14" width="59" height="28" rx="10" fill="${color}" stroke="#152c51" stroke-width="1.5"/><path d="M4 -11H14L19 -8V8L14 11H4Z" fill="#152c51"/><path d="M-20 -9H-14V9H-20Z" fill="#152c51"/><rect x="26" y="-10" width="3" height="6" rx="1" fill="#fff8ba"/><rect x="26" y="4" width="3" height="6" rx="1" fill="#fff8ba"/></g>`;
const pump=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><circle cx="104" cy="115" r="116" fill="${C.yellow}"/><rect x="38" y="22" width="104" height="172" rx="12" fill="${C.blue}"/><rect x="51" y="37" width="78" height="51" rx="6" fill="${C.paper}"/>${t(90,74,'1 L',34,C.blue,'font-weight="900" text-anchor="middle"')}<path d="M62 126H117M62 142H100" stroke="${C.yellow}" stroke-width="8"/><path d="M143 88Q184 75 182 118V160Q182 188 166 171V76L153 62" fill="none" stroke="${C.ink}" stroke-width="10" stroke-linecap="round"/><path d="M26 197H154" stroke="${C.ink}" stroke-width="12"/></g>`;
function panel(group,x,y,w,mobile){
 const color=group.id==='flex'?C.teal:C.blue;const extraGap=mobile?17:11;const rowH=(mobile?105:98)+extraGap;let s=`<rect x="${x}" y="${y}" width="${w}" height="${(mobile?675:635)+5*extraGap}" rx="26" fill="${C.paper}"/>`;
 s+=`<rect x="${x+26}" y="${y+29}" width="8" height="44" rx="4" fill="${color}"/>`+t(x+50,y+59,group.title,mobile?38:33,C.ink,'font-weight="800"')+t(x+w-30,y+57,'TOP 5',mobile?24:21,color,'font-weight="800" text-anchor="end"');
 s+=t(x+32,y+98,'Gasolina na cidade · km/l',mobile?36:23,C.muted);
 const start=x+(mobile?61:50),trackW=w-(mobile?210:170); // Identical domain 0–20 for both groups.
 group.items.forEach((r,i)=>{const ry=y+139+i*rowH;const key=r.fields[2],len=r.city/20*trackW;
  s+=t(x+32,ry,String(r.rank).padStart(2,'0'),mobile?27:23,color,'font-weight="800"');
  s+=t(x+(mobile?90:85),ry,names[key],mobile?40:28,C.ink,'font-weight="800"');
  s+=t(x+(mobile?90:85),ry+29+extraGap,variants[key],mobile?36:22,C.muted);
  s+=`<rect x="${start}" y="${ry+49+extraGap}" width="${trackW}" height="14" rx="7" fill="#e3eaf3"/><rect x="${start}" y="${ry+49+extraGap}" width="${len}" height="14" rx="7" fill="${color}"/><path d="M${start+5} ${ry+56+extraGap}H${start+len-24}" stroke="white" opacity=".7" stroke-width="2" stroke-dasharray="10 10"/>`;
  s+=car(start+len,ry+56+extraGap,C.yellow,mobile?.82:.72);
  s+=t(x+w-32,ry+59+extraGap,r.city.toFixed(1).replace('.',','),mobile?44:39,color,'font-family="Arial,sans-serif" font-weight="900" text-anchor="end"');
 });
 return s;
}
(async()=>{
 const logo=await sharp(path.join(root,'public/brand/logo-light.png')).resize(205,66,{fit:'contain'}).png().toBuffer();
 for(const mobile of [false,true]){
  const W=mobile?1200:1600,H=mobile?2150:1235;
  let body=`<rect width="${W}" height="${H}" fill="${C.bg}"/><path d="M${W-380} 0H${W}V330Z" fill="#c7d9ff"/><image x="${mobile?50:56}" y="25" width="180" height="58" href="data:image/png;base64,${logo.toString('base64')}"/>`;
  body+=t(W-54,66,'MOBILIDADE / BRASIL / 2026',mobile?24:22,C.muted,'text-anchor="end" letter-spacing="1.4"');
  body+=t(54,150,'QUAIS CARROS',mobile?70:74,C.ink,'font-weight="900" letter-spacing="-2.5"');
  body+=t(54,230,'RODAM MAIS',mobile?70:74,C.ink,'font-weight="900" letter-spacing="-2.5"');
  body+=t(54,310,'COM 1 LITRO?',mobile?70:74,C.blue,'font-weight="900" letter-spacing="-2.5"');
  body+=pump(mobile?917:1280,120,mobile?.8:.91);
  if(!mobile){body+=t(710,174,'DOIS GRUPOS. UM MESMO CRITÉRIO.',21,C.blue,'font-weight="800" letter-spacing="1"');body+=t(710,218,'Mais km/l = mais distância',28,C.ink);body+=t(710,254,'por litro de gasolina.',28,C.ink);body+=t(710,299,'Os 5 primeiros modelos de cada grupo.',23,C.muted);}
  else body+=t(54,368,'Gasolina na cidade. Quanto maior o km/l, melhor.',32,C.muted);
  if(mobile){body+=panel(data.groups[0],40,408,1120,true);body+=panel(data.groups[1],40,1195,1120,true);}
  else {body+=panel(data.groups[0],42,360,744,false);body+=panel(data.groups[1],814,360,744,false);}
  const fy=mobile?2005:1093,sz=mobile?27:22;
  body+=t(54,fy,'Uma entrada por modelo: melhor resultado urbano dentro do grupo.',sz,C.muted);
  body+=t(54,fy+(mobile?38:30),'¹ Há outras versões com o mesmo valor. Empates mantidos. Escala: 0–20 km/l.',sz,C.muted);
  body+=t(54,fy+(mobile?76:60),'Fonte: Inmetro · PBE Veicular 2026 · Consumo real pode variar.',sz,C.muted);
  body+=`<path d="M54 ${H-42}H${W-54}" stroke="${C.ink}" opacity=".2"/>`+t(54,H-16,'PDF: ATUALIZAÇÃO 14/08/2026 · CONSULTA 01/11/2026',mobile?22:18,C.muted,'letter-spacing=".5"')+t(W-54,H-16,'ATLAS DO AGORA',mobile?22:18,C.muted,'text-anchor="end" letter-spacing="1.5"');
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><title>Quais carros rodam mais com 1 litro? Gasolina na cidade, PBE Veicular 2026.</title><g font-family="Arial,Helvetica,sans-serif">${body}</g></svg>`;
  const name='carros-consumo-2026-'+(mobile?'vertical':'horizontal');fs.writeFileSync(path.join(dir,name+'.svg'),svg);await sharp(Buffer.from(svg)).webp({quality:94}).toFile(path.join(dir,name+'.webp'));
  console.log(name,W,H);
 }
})();