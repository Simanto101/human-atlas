import {useRef} from 'react';

type Props={value:number;onChange:(n:number)=>void;'aria-labelledby'?:string};

const P0={x:12,y:12},P1={x:100,y:36},P2={x:188,y:12};

function bez(t:number){
 const u=1-t;
 return {x:u*u*P0.x+2*u*t*P1.x+t*t*P2.x,y:u*u*P0.y+2*u*t*P1.y+t*t*P2.y};
}

export default function ExplodeSlider({value,onChange,...rest}:Props){
 const svg=useRef<SVGSVGElement>(null);
 const t=Math.min(1,Math.max(0,value));
 const p=bez(t);
 const setFromEvent=(e:React.PointerEvent)=>{
  const el=svg.current;if(!el)return;
  const r=el.getBoundingClientRect();
  onChange(Math.min(1,Math.max(0,(e.clientX-r.left)/r.width)));
 };
 return <div className="explode-curve">
  <svg ref={svg} viewBox="0 0 200 44" role="slider" tabIndex={0} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(t*100)} aria-labelledby={rest['aria-labelledby']}
   onPointerDown={e=>{e.currentTarget.setPointerCapture(e.pointerId);setFromEvent(e);}}
   onPointerMove={e=>{if(e.buttons)setFromEvent(e);}}
   onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowUp')onChange(Math.min(1,t+.02));if(e.key==='ArrowLeft'||e.key==='ArrowDown')onChange(Math.max(0,t-.02));}}>
   <path d="M12 12 Q 100 36 188 12" fill="none" stroke="currentColor" strokeOpacity=".22" strokeWidth="6" strokeLinecap="round"/>
   <path d={`M12 12 Q ${12+88*t} ${12+24*t} ${p.x} ${p.y}`} fill="none" stroke="var(--primary)" strokeWidth="6" strokeLinecap="round"/>
   <circle cx={p.x} cy={p.y} r="8" fill="var(--primary)" stroke="var(--card)" strokeWidth="3"/>
  </svg>
 </div>;
}
