'use client';
import {useState} from 'react';
import {allCars,formatConsumption} from './cars-data';
export function CarsChart(){
 const [group,setGroup]=useState('flex');const [selected,setSelected]=useState<string|null>(null);
 const visible=allCars.filter(car=>group==='all'||car.groupId===group);
 const active=allCars.find(car=>car.id===selected);
 return <section className="cars-chart" aria-labelledby="cars-chart-title">
  <div className="cars-chart-heading"><div><div className="cars-kicker">GASOLINA · CIDADE · KM/L</div><h2 id="cars-chart-title">Compare os modelos do ranking</h2></div><p>Escolha um grupo e selecione um carro para consultar a versão e o consumo na estrada.</p></div>
  <div className="cars-filters" role="group" aria-label="Filtrar por tipo de carro">{[{id:'flex',label:'Flex a combustão'},{id:'hybrid',label:'Híbridos sem tomada'},{id:'all',label:'Os dois grupos'}].map(option=><button type="button" key={option.id} aria-pressed={group===option.id} onClick={()=>{setGroup(option.id);setSelected(null)}}>{option.label}</button>)}</div>
  <p className="cars-chart-note" role="status">{visible.length} modelos exibidos · Quanto maior o km/l, maior a distância por litro.</p>
  <div className="cars-bars">{visible.map(car=><button type="button" key={car.id} className={'cars-bar-row '+car.groupId+(selected===car.id?' selected':'')} aria-pressed={selected===car.id} aria-controls="cars-selection" onClick={()=>setSelected(car.id)} onFocus={()=>setSelected(car.id)} onPointerEnter={event=>{if(event.pointerType==='mouse')setSelected(car.id)}}><span className="cars-bar-name">{car.name}<small>{car.version} · {car.engine}</small></span><span className="cars-bar-track" aria-hidden="true"><span style={{width:car.city/20*100+'%'}}/></span><strong>{formatConsumption(car.city)} <span>km/l</span></strong></button>)}</div>
  <div className="cars-scale" aria-hidden="true"><span>0</span><span>5</span><span>10</span><span>15</span><span>20 km/l</span></div>
  <div id="cars-selection" className="cars-selection" role="region" aria-label="Detalhes do carro selecionado" aria-live="polite" aria-atomic="true">{active?<><h3>{active.name} · {active.version}</h3><p>{active.groupTitle} · Motor {active.engine} · Transmissão {active.transmission}</p><div className="cars-consumption-pair"><span>Cidade <strong>{formatConsumption(active.city)} km/l</strong></span><span>Estrada <strong>{formatConsumption(active.highwayValue)} km/l</strong></span></div><p>Os dois valores usam gasolina. A ordem do ranking considera apenas o consumo na cidade.</p></>:<p>As barras mantêm a escala de 0 a 20 km/l nos dois grupos. Toque em um carro, passe o mouse ou navegue pelo teclado para ver seus dados.</p>}</div>
 </section>;
}
