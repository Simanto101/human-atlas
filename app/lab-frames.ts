export type LabExhibit={id:string;name:string;system:string;description:string;wall:'back'|'left'|'right';slot:number};

export const LAB_EXHIBITS:LabExhibit[]=[
 {id:'frame-brain',name:'Brain',system:'Nervous system',wall:'back',slot:0,description:'The cerebrum, cerebellum, and brainstem work together for thought, movement, balance, and automatic control. Cortical folds increase surface area; the brainstem links the brain to the spinal cord.'},
 {id:'frame-heart',name:'Heart',system:'Heart',wall:'back',slot:1,description:'A four-chamber pump. Right chambers send blood to the lungs; left chambers send oxygenated blood to the body. Valves keep flow one-way through the pulmonary and systemic circuits.'},
 {id:'frame-lungs',name:'Lungs',system:'Respiratory',wall:'back',slot:2,description:'Paired organs where oxygen and carbon dioxide exchange with blood. Air travels trachea to bronchi to alveoli. The right lung has three lobes; the left has two, leaving room for the heart.'},
 {id:'frame-eye',name:'Eye',system:'Sensory organs',wall:'left',slot:0,description:'Light enters through the cornea and pupil, is focused by the lens, and lands on the retina. Photoreceptors convert it to signals that leave via the optic nerve.'},
 {id:'frame-kidney',name:'Kidney',system:'Urinary',wall:'left',slot:1,description:'Bean-shaped filters beside the spine. Cortex and medulla contain nephrons that clean blood and balance fluid. Urine collects in the pelvis and leaves through a ureter.'},
 {id:'frame-liver',name:'Liver',system:'Digestive',wall:'left',slot:2,description:'The largest internal organ, mostly in the right upper abdomen. It processes nutrients, makes bile and blood proteins, and helps clear waste from circulation.'},
 {id:'frame-stomach',name:'Stomach',system:'Digestive',wall:'right',slot:0,description:'A J-shaped muscular chamber that stores food, mixes it with acid and enzymes, and releases chyme into the duodenum in controlled amounts.'},
 {id:'frame-kidney-nephron',name:'Nephron',system:'Urinary',wall:'right',slot:1,description:'The kidney working unit. A glomerulus filters blood; tubules reclaim water and salts. Thousands of nephrons produce urine while keeping the internal environment stable.'},
 {id:'frame-ear',name:'Inner ear',system:'Sensory organs',wall:'right',slot:2,description:'The cochlea turns vibration into hearing signals. Nearby semicircular canals sense head rotation and help keep balance, working with vision and body position.'},
];

function paper(ctx:CanvasRenderingContext2D,w:number,h:number){
 ctx.fillStyle='#f6efe2';ctx.fillRect(0,0,w,h);
 ctx.strokeStyle='#e4d5bc';ctx.lineWidth=18;ctx.strokeRect(9,9,w-18,h-18);
 ctx.fillStyle='#6b4f32';ctx.font='600 22px Figtree,serif';ctx.textAlign='center';
}

function ink(ctx:CanvasRenderingContext2D,stroke='#5c3d2e',fill='#c97864'){
 ctx.strokeStyle=stroke;ctx.fillStyle=fill;ctx.lineWidth=3;ctx.lineJoin='round';ctx.lineCap='round';
}

export function paintExhibit(id:string){
 const c=document.createElement('canvas');c.width=512;c.height=640;
 const ctx=c.getContext('2d')!;paper(ctx,512,640);ink(ctx);
 if(id==='frame-brain'){
  ctx.beginPath();ctx.ellipse(256,250,148,128,0,0,Math.PI*2);ctx.fillStyle='#e7c9a4';ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.moveTo(130,240);for(let x=130;x<390;x+=18)ctx.quadraticCurveTo(x+8,230+((x>>3)%2?18:-16),x+18,242);ctx.stroke();
  ctx.beginPath();ctx.ellipse(256,400,78,48,0,0,Math.PI*2);ctx.fillStyle='#d9b48c';ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.moveTo(256,430);ctx.quadraticCurveTo(270,490,262,530);ctx.stroke();
  ctx.fillStyle='#6b4f32';ctx.fillText('BRAIN',256,590);
 }else if(id==='frame-heart'){
  ctx.beginPath();ctx.moveTo(256,470);ctx.bezierCurveTo(80,330,110,160,256,230);ctx.bezierCurveTo(402,160,432,330,256,470);ctx.fillStyle='#c96b63';ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.moveTo(256,230);ctx.lineTo(256,455);ctx.moveTo(150,300);ctx.lineTo(360,300);ctx.stroke();
  ctx.beginPath();ctx.moveTo(256,170);ctx.bezierCurveTo(270,120,300,110,310,70);ctx.stroke();
  ctx.fillStyle='#6b4f32';ctx.fillText('HEART',256,590);
 }else if(id==='frame-lungs'){
  ctx.beginPath();ctx.moveTo(240,170);ctx.bezierCurveTo(40,180,70,500,230,520);ctx.lineTo(240,170);ctx.fillStyle='#d7a3ab';ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.moveTo(272,170);ctx.bezierCurveTo(472,180,442,500,282,520);ctx.lineTo(272,170);ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.moveTo(256,120);ctx.lineTo(256,210);ctx.moveTo(256,210);ctx.lineTo(200,250);ctx.moveTo(256,210);ctx.lineTo(312,250);ctx.stroke();
  ctx.fillStyle='#6b4f32';ctx.fillText('LUNGS',256,590);
 }else if(id==='frame-eye'){
  ctx.beginPath();ctx.ellipse(256,300,170,110,0,0,Math.PI*2);ctx.fillStyle='#f3e7d4';ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.arc(256,300,78,0,Math.PI*2);ctx.fillStyle='#6fa3b3';ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.arc(256,300,34,0,Math.PI*2);ctx.fillStyle='#24323a';ctx.fill();
  ctx.beginPath();ctx.moveTo(86,300);ctx.quadraticCurveTo(40,300,28,270);ctx.stroke();
  ctx.beginPath();ctx.arc(426,300,18,0,Math.PI*2);ctx.stroke();
  ctx.fillStyle='#6b4f32';ctx.fillText('EYE',256,590);
 }else if(id==='frame-kidney'){
  ctx.beginPath();ctx.ellipse(256,300,110,170,-.2,0,Math.PI*2);ctx.fillStyle='#d59b86';ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.ellipse(268,300,62,110,-.2,0,Math.PI*2);ctx.fillStyle='#c07a66';ctx.fill();ctx.stroke();
  for(let i=0;i<5;i++){ctx.beginPath();ctx.moveTo(250,210+i*36);ctx.lineTo(300,230+i*32);ctx.stroke();}
  ctx.beginPath();ctx.moveTo(330,300);ctx.quadraticCurveTo(390,330,400,430);ctx.stroke();
  ctx.fillStyle='#6b4f32';ctx.fillText('KIDNEY',256,590);
 }else if(id==='frame-liver'){
  ctx.beginPath();ctx.moveTo(90,240);ctx.bezierCurveTo(80,140,430,120,430,250);ctx.bezierCurveTo(440,360,360,430,250,430);ctx.bezierCurveTo(120,430,90,340,90,240);ctx.fillStyle='#c49a6c';ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.moveTo(250,160);ctx.quadraticCurveTo(260,280,240,420);ctx.stroke();
  ctx.fillStyle='#6b4f32';ctx.fillText('LIVER',256,590);
 }else if(id==='frame-stomach'){
  ctx.beginPath();ctx.moveTo(210,140);ctx.bezierCurveTo(90,180,80,360,200,400);ctx.bezierCurveTo(360,450,400,280,300,210);ctx.bezierCurveTo(250,170,250,150,210,140);ctx.fillStyle='#d2a07a';ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.moveTo(210,140);ctx.lineTo(210,90);ctx.moveTo(330,400);ctx.quadraticCurveTo(360,460,300,500);ctx.stroke();
  ctx.fillStyle='#6b4f32';ctx.fillText('STOMACH',256,590);
 }else if(id==='frame-kidney-nephron'){
  ctx.beginPath();ctx.arc(210,220,48,0,Math.PI*2);ctx.fillStyle='#e2b7a4';ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.arc(210,220,22,0,Math.PI*2);ctx.stroke();
  ctx.beginPath();ctx.moveTo(255,230);ctx.bezierCurveTo(360,180,390,320,300,340);ctx.bezierCurveTo(220,360,360,430,250,470);ctx.stroke();
  ctx.fillStyle='#6b4f32';ctx.fillText('NEPHRON',256,590);
 }else{
  ctx.beginPath();ctx.ellipse(256,300,70,70,0,0,Math.PI*2);ctx.stroke();
  ctx.beginPath();ctx.arc(256,300,28,0,Math.PI*2);ctx.stroke();
  let a=0;for(let i=0;i<3;i++){ctx.beginPath();ctx.ellipse(256,300,90,26,a,0,Math.PI*2);ctx.stroke();a+=Math.PI/3;}
  ctx.beginPath();ctx.moveTo(326,300);ctx.lineTo(400,300);ctx.stroke();
  ctx.fillStyle='#6b4f32';ctx.fillText('INNER EAR',256,590);
 }
 return c;
}
