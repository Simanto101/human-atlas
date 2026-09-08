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

function paper(ctx:CanvasRenderingContext2D,w:number,h:number,title:string,system:string){
 ctx.fillStyle='#fbf6ec';ctx.fillRect(0,0,w,h);
 ctx.fillStyle='#efe4d0';ctx.fillRect(28,28,w-56,h-56);
 ctx.strokeStyle='#c9ad86';ctx.lineWidth=10;ctx.strokeRect(44,44,w-88,h-88);
 ctx.fillStyle='#6b4f32';ctx.textAlign='center';
 ctx.font='700 54px Figtree,serif';ctx.fillText(title.toUpperCase(),w/2,h-92);
 ctx.font='600 26px Figtree,sans-serif';ctx.fillStyle='#8a6a45';ctx.fillText(system.toUpperCase(),w/2,h-52);
}

function stroke(ctx:CanvasRenderingContext2D,color='#4a2f22',width=8){
 ctx.strokeStyle=color;ctx.lineWidth=width;ctx.lineJoin='round';ctx.lineCap='round';
}

export function paintExhibit(exhibit:LabExhibit){
 const c=document.createElement('canvas');c.width=768;c.height=1024;
 const ctx=c.getContext('2d')!;paper(ctx,768,1024,exhibit.name,exhibit.system);stroke(ctx);
 const id=exhibit.id;
 if(id==='frame-brain'){
  ctx.fillStyle='#e8c49a';
  ctx.beginPath();ctx.ellipse(384,430,230,210,-.08,0,Math.PI*2);ctx.fill();stroke(ctx,'#5a3a28',9);ctx.stroke();
  ctx.beginPath();ctx.moveTo(180,400);
  for(let x=180;x<590;x+=28)ctx.quadraticCurveTo(x+14,388+((x>>4)%2?36:-32),x+28,404);
  ctx.stroke();
  ctx.beginPath();ctx.moveTo(210,470);
  for(let x=210;x<560;x+=32)ctx.quadraticCurveTo(x+16,458+((x>>5)%2?28:-24),x+32,474);
  ctx.stroke();
  ctx.fillStyle='#d4a57a';
  ctx.beginPath();ctx.ellipse(384,650,118,72,0,0,Math.PI*2);ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.moveTo(384,710);ctx.quadraticCurveTo(406,790,392,850);ctx.stroke();
 }else if(id==='frame-heart'){
  ctx.fillStyle='#c45a54';
  ctx.beginPath();ctx.moveTo(384,760);ctx.bezierCurveTo(90,540,140,250,384,360);ctx.bezierCurveTo(628,250,678,540,384,760);ctx.fill();stroke(ctx,'#6a2c28',10);ctx.stroke();
  stroke(ctx,'#f3d7d2',7);
  ctx.beginPath();ctx.moveTo(384,370);ctx.lineTo(384,730);ctx.moveTo(220,500);ctx.lineTo(548,500);ctx.stroke();
  stroke(ctx,'#6a2c28',10);
  ctx.beginPath();ctx.moveTo(384,250);ctx.bezierCurveTo(404,170,454,150,470,90);ctx.moveTo(430,250);ctx.bezierCurveTo(460,180,510,160,530,110);ctx.stroke();
 }else if(id==='frame-lungs'){
  ctx.fillStyle='#d88993';
  ctx.beginPath();ctx.moveTo(350,240);ctx.bezierCurveTo(70,250,90,780,340,820);ctx.lineTo(350,240);ctx.fill();stroke(ctx,'#6a3540',9);ctx.stroke();
  ctx.beginPath();ctx.moveTo(418,240);ctx.bezierCurveTo(698,250,678,780,428,820);ctx.lineTo(418,240);ctx.fill();ctx.stroke();
  stroke(ctx,'#6a3540',10);
  ctx.beginPath();ctx.moveTo(384,140);ctx.lineTo(384,280);ctx.moveTo(384,280);ctx.lineTo(300,360);ctx.moveTo(384,280);ctx.lineTo(468,360);ctx.stroke();
  stroke(ctx,'#8a4a54',6);
  ctx.beginPath();ctx.moveTo(300,430);ctx.lineTo(250,520);ctx.moveTo(300,430);ctx.lineTo(330,540);ctx.moveTo(468,430);ctx.lineTo(518,520);ctx.moveTo(468,430);ctx.lineTo(438,540);ctx.stroke();
 }else if(id==='frame-eye'){
  ctx.fillStyle='#f7ead6';
  ctx.beginPath();ctx.ellipse(384,460,270,170,0,0,Math.PI*2);ctx.fill();stroke(ctx,'#5a3a28',10);ctx.stroke();
  ctx.fillStyle='#4f90a8';
  ctx.beginPath();ctx.arc(384,460,128,0,Math.PI*2);ctx.fill();ctx.stroke();
  ctx.fillStyle='#1b2730';
  ctx.beginPath();ctx.arc(384,460,58,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#ffffff';ctx.beginPath();ctx.arc(350,430,18,0,Math.PI*2);ctx.fill();
  stroke(ctx,'#5a3a28',10);
  ctx.beginPath();ctx.moveTo(114,460);ctx.quadraticCurveTo(40,460,24,410);ctx.stroke();
  ctx.beginPath();ctx.arc(654,460,28,0,Math.PI*2);ctx.stroke();
 }else if(id==='frame-kidney'){
  ctx.fillStyle='#d48974';
  ctx.beginPath();ctx.ellipse(360,470,170,250,-.18,0,Math.PI*2);ctx.fill();stroke(ctx,'#6a3a2c',10);ctx.stroke();
  ctx.fillStyle='#c46d58';
  ctx.beginPath();ctx.ellipse(376,470,96,168,-.18,0,Math.PI*2);ctx.fill();ctx.stroke();
  stroke(ctx,'#6a3a2c',7);
  for(let i=0;i<6;i++){ctx.beginPath();ctx.moveTo(350,300+i*52);ctx.lineTo(430,328+i*46);ctx.stroke();}
  stroke(ctx,'#6a3a2c',10);
  ctx.beginPath();ctx.moveTo(500,470);ctx.quadraticCurveTo(590,520,610,680);ctx.stroke();
 }else if(id==='frame-liver'){
  ctx.fillStyle='#c48a55';
  ctx.beginPath();ctx.moveTo(120,360);ctx.bezierCurveTo(100,180,650,150,650,360);ctx.bezierCurveTo(660,540,540,680,360,680);ctx.bezierCurveTo(150,680,110,520,120,360);ctx.fill();stroke(ctx,'#6a4528',10);ctx.stroke();
  ctx.beginPath();ctx.moveTo(360,210);ctx.quadraticCurveTo(380,430,350,660);ctx.stroke();
 }else if(id==='frame-stomach'){
  ctx.fillStyle='#d6a070';
  ctx.beginPath();ctx.moveTo(300,180);ctx.bezierCurveTo(110,240,90,560,280,640);ctx.bezierCurveTo(540,720,610,430,450,300);ctx.bezierCurveTo(370,230,370,190,300,180);ctx.fill();stroke(ctx,'#6a4528',10);ctx.stroke();
  ctx.beginPath();ctx.moveTo(300,180);ctx.lineTo(300,90);ctx.moveTo(500,640);ctx.quadraticCurveTo(560,740,460,810);ctx.stroke();
 }else if(id==='frame-kidney-nephron'){
  ctx.fillStyle='#e8b9a6';
  ctx.beginPath();ctx.arc(300,300,90,0,Math.PI*2);ctx.fill();stroke(ctx,'#6a3a2c',10);ctx.stroke();
  ctx.beginPath();ctx.arc(300,300,42,0,Math.PI*2);ctx.stroke();
  stroke(ctx,'#6a3a2c',9);
  ctx.beginPath();ctx.moveTo(384,318);ctx.bezierCurveTo(560,230,610,470,450,510);ctx.bezierCurveTo(300,550,560,680,370,760);ctx.stroke();
  ctx.beginPath();ctx.moveTo(210,250);ctx.quadraticCurveTo(140,220,90,250);ctx.moveTo(210,350);ctx.quadraticCurveTo(140,380,90,350);ctx.stroke();
 }else{
  stroke(ctx,'#5a3a28',10);
  ctx.beginPath();ctx.ellipse(384,470,120,120,0,0,Math.PI*2);ctx.stroke();
  ctx.beginPath();ctx.arc(384,470,48,0,Math.PI*2);ctx.stroke();
  let a=0;for(let i=0;i<3;i++){ctx.beginPath();ctx.ellipse(384,470,150,42,a,0,Math.PI*2);ctx.stroke();a+=Math.PI/3;}
  ctx.beginPath();ctx.moveTo(504,470);ctx.lineTo(640,470);ctx.stroke();
 }
 return c;
}
