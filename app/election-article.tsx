'use client';
import {useEffect,useRef} from 'react';
import {electionContent} from './election-content';
export function ElectionArticle(){const root=useRef<HTMLDivElement>(null);useEffect(()=>{const controller=new AbortController();function listen(target:EventTarget,type:string,fn:(event:any)=>void){target.addEventListener(type,fn,{signal:controller.signal})}


  const map = root.current!.querySelector<HTMLElement>('.map-interactive')!;
  const tooltip = map.querySelector<HTMLElement>('.map-tooltip')!;
  const states = [...map.querySelectorAll<SVGPathElement>('path[data-state]')];
  let pinned: SVGPathElement | null = null;
  let active: SVGPathElement | null = null;
  let lastPointerType: string | null = null;
  function show(state: SVGPathElement, event?: PointerEvent) {
    active = state;
    tooltip.querySelector<HTMLElement>('.map-tooltip-name')!.textContent = state.dataset.state || ''; 
    tooltip.querySelector<HTMLElement>('.map-tooltip-count')!.textContent = state.dataset.count + ' eleitores';
    tooltip.querySelector<HTMLElement>('.map-tooltip-share')!.textContent = state.dataset.share + ' do total nacional';
    tooltip.hidden = false;
    const box = map.getBoundingClientRect();
    const region = state.getBoundingClientRect();
    const pointer = event && event.pointerType === 'mouse';
    const x = pointer ? event.clientX - box.left : region.left + region.width / 2 - box.left;
    const y = pointer ? event.clientY - box.top : region.top + region.height / 2 - box.top;
    const w = tooltip.offsetWidth, h = tooltip.offsetHeight;
    const left = Math.max(8, Math.min(x + 14, box.width - w - 8));
    const top = y - h - 14 >= 8 ? y - h - 14 : Math.min(y + 18, box.height - h - 8);
    tooltip.style.left = left + 'px';
    tooltip.style.top = Math.max(8, top) + 'px';
  }
  function clear() {
    pinned = null;
    active = null;
    states.forEach(s => s.setAttribute('aria-pressed', 'false'));
    tooltip.hidden = true;
  }
  states.forEach(state => {
    listen(state, 'pointerenter', e => {
      if (e.pointerType === 'mouse' && !pinned) show(state, e);
    });
    listen(state, 'pointermove', e => {
      if (e.pointerType === 'mouse' && !pinned) show(state, e);
    });
    listen(state, 'pointerleave', () => { if (!pinned) { active = null; tooltip.hidden = true; } });
    listen(state, 'focus', () => { if (!pinned) show(state); });
    listen(state, 'blur', () => { if (!pinned) { active = null; tooltip.hidden = true; } });
    listen(state, 'pointerdown', e => { lastPointerType = e.pointerType; });
    listen(state, 'click', e => {
      const pointerType = ('pointerType' in e ? String(e.pointerType) : null) || lastPointerType;
      const touch = pointerType === 'touch' || (!pointerType && e.detail !== 0 && window.matchMedia('(hover: none) and (pointer: coarse)').matches);
      if (!touch) return;
      const wasPinned = pinned === state;
      clear();
      if (!wasPinned) {
        pinned = state;
        state.setAttribute('aria-pressed', 'true');
        show(state);
      }
    });
    listen(state, 'keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); lastPointerType = 'keyboard'; show(state); }
    });
  });
  listen(document, 'pointerdown', e => { if (!(e.target as Element).closest('.map-interactive path[data-state]')) clear(); });
  listen(document, 'keydown', e => { if (e.key === 'Escape') clear(); });
  listen(window, 'resize', () => { if (active) show(active); });

return ()=>controller.abort();},[]);return <div className="election-story" ref={root} dangerouslySetInnerHTML={{__html:electionContent}}/>}
