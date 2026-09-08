import * as T from 'three';
import {LAB_EXHIBITS,paintExhibit,type LabExhibit} from './lab-frames';

export type {LabExhibit};

export const LAB_BOUNDS={half:5.35,height:4.62,margin:.32};

function plaster(dark:boolean){
 const c=document.createElement('canvas');c.width=c.height=256;
 const x=c.getContext('2d')!;
 x.fillStyle=dark?'#0d2430':'#eef6f7';x.fillRect(0,0,256,256);
 for(let i=0;i<1400;i++){const n=Math.random();x.fillStyle=dark?`rgba(255,255,255,${n*.03})`:`rgba(80,110,120,${n*.045})`;x.fillRect(Math.random()*256,Math.random()*256,1.2,1.2);}
 const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(4,2);t.colorSpace=T.SRGBColorSpace;return t;
}

function tiles(dark:boolean){
 const c=document.createElement('canvas');c.width=c.height=128;
 const x=c.getContext('2d')!;
 x.fillStyle=dark?'#082028':'#d7eef2';x.fillRect(0,0,128,128);
 x.strokeStyle=dark?'#163948':'#b7d4db';x.lineWidth=5;x.strokeRect(2,2,124,124);
 const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(14,14);t.colorSpace=T.SRGBColorSpace;t.anisotropy=4;return t;
}

function frameMesh(exhibit:LabExhibit,dark:boolean){
 const group=new T.Group();
 const art=paintExhibit(exhibit.id);
 const map=new T.CanvasTexture(art);map.colorSpace=T.SRGBColorSpace;map.anisotropy=4;
 const w=1.05,h=1.32,d=.045;
 const wood=new T.MeshStandardMaterial({color:dark?0x8a6a3a:0xb0894f,roughness:.45,metalness:.18});
 const outer=new T.Mesh(new T.BoxGeometry(w+.12,h+.12,d),wood);
 const mat=new T.MeshStandardMaterial({color:dark?0x1b3844:0xf4ead7,roughness:.9});
 const mount=new T.Mesh(new T.BoxGeometry(w+.02,h+.02,.01),mat);mount.position.z=d*.52;
 const print=new T.Mesh(new T.PlaneGeometry(w-.08,h-.16),new T.MeshStandardMaterial({map,roughness:.7,metalness:0}));print.position.z=d*.58;
 const glass=new T.Mesh(new T.PlaneGeometry(w-.04,h-.1),new T.MeshPhysicalMaterial({color:0xd7f4ff,transparent:true,opacity:.12,roughness:.05,metalness:.1,transmission:.35,thickness:.01}));glass.position.z=d*.62;
 const plate=new T.Mesh(new T.BoxGeometry(.72,.1,.02),new T.MeshStandardMaterial({color:dark?0xc9a45a:0xe8d5a3,metalness:.4,roughness:.35}));plate.position.set(0,-(h/2)-.12,d*.4);
 const lamp=new T.Mesh(new T.BoxGeometry(.7,.04,.08),new T.MeshStandardMaterial({color:0xe8f4f7,emissive:0xcff7ff,emissiveIntensity:dark?.7:.45,metalness:.4,roughness:.3}));lamp.position.set(0,h/2+.1,.08);
 print.userData.exhibit=exhibit;glass.userData.exhibit=exhibit;outer.userData.exhibit=exhibit;
 group.add(outer,mount,print,glass,plate,lamp);
 group.userData.exhibit=exhibit;
 group.userData.maps=[map];
 group.userData.wood=wood;
 group.userData.mat=mat;
 return group;
}

export function createLabRoom(scene:T.Scene){
 const lab=new T.Group();scene.add(lab);
 const H=LAB_BOUNDS.half,Y=LAB_BOUNDS.height;
 const floorMap=tiles(false),wallMap=plaster(false);
 const floor=new T.Mesh(new T.PlaneGeometry(H*2,H*2),new T.MeshStandardMaterial({map:floorMap,roughness:.92,metalness:.04}));floor.rotation.x=-Math.PI/2;floor.position.y=-.021;lab.add(floor);
 const wallMat=new T.MeshStandardMaterial({map:wallMap,color:0xf4fbfc,roughness:.96,metalness:.02,side:T.FrontSide});
 const dadoMat=new T.MeshStandardMaterial({color:0xc5dde3,roughness:.7,metalness:.08});
 const makeWall=(w:number,h:number,pos:T.Vector3,rotY:number)=>{
  const wall=new T.Mesh(new T.PlaneGeometry(w,h),wallMat.clone());wall.position.copy(pos);wall.rotation.y=rotY;lab.add(wall);
  const dado=new T.Mesh(new T.PlaneGeometry(w,1.12),dadoMat.clone());dado.position.copy(pos);dado.position.y=.56;dado.rotation.y=rotY;dado.position.add(new T.Vector3(Math.sin(rotY)*.012,0,Math.cos(rotY)*.012));lab.add(dado);
  const rail=new T.Mesh(new T.BoxGeometry(w,.035,.04),new T.MeshStandardMaterial({color:0x9ecad6,roughness:.4,metalness:.25}));rail.position.copy(pos);rail.position.y=1.14;lab.add(rail);
  const base=new T.Mesh(new T.BoxGeometry(w,.08,.05),new T.MeshStandardMaterial({color:0x9ecad6,roughness:.5,metalness:.2}));base.position.copy(pos);base.position.y=.04;lab.add(base);
  return wall;
 };
 const back=makeWall(H*2,Y,new T.Vector3(0,Y/2,-H),0);
 const front=makeWall(H*2,Y,new T.Vector3(0,Y/2,H),Math.PI);
 const left=makeWall(H*2,Y,new T.Vector3(-H,Y/2,0),Math.PI/2);
 const right=makeWall(H*2,Y,new T.Vector3(H,Y/2,0),-Math.PI/2);
 const ceiling=new T.Mesh(new T.PlaneGeometry(H*2,H*2),new T.MeshStandardMaterial({color:0xffffff,roughness:1}));ceiling.rotation.x=Math.PI/2;ceiling.position.y=Y;lab.add(ceiling);
 const cabinet=new T.Mesh(new T.BoxGeometry(4.6,.96,.52),new T.MeshStandardMaterial({color:0xe8f4f7,roughness:.55,metalness:.18}));cabinet.position.set(0,.48,-H+.32);lab.add(cabinet);
 const counter=new T.Mesh(new T.BoxGeometry(4.7,.045,.56),new T.MeshStandardMaterial({color:0xd5eef3,roughness:.35,metalness:.28}));counter.position.set(0,.99,-H+.32);lab.add(counter);
 const doorGlass=new T.Mesh(new T.PlaneGeometry(1.7,2.4),new T.MeshPhysicalMaterial({color:0xbfeaf4,transparent:true,opacity:.22,roughness:.06,metalness:.08,transmission:.55,thickness:.02}));doorGlass.rotation.y=Math.PI;doorGlass.position.set(0,1.45,H-.02);lab.add(doorGlass);
 const doorFrame=new T.Mesh(new T.BoxGeometry(1.86,2.56,.06),new T.MeshStandardMaterial({color:0x8eb8c3,metalness:.35,roughness:.4}));doorFrame.position.set(0,1.45,H-.04);lab.add(doorFrame);
 const exam=new T.SpotLight(0xf8fdff,16,12,.4,.55,1.1);exam.position.set(0,Y-.3,.6);exam.target.position.set(0,.9,0);lab.add(exam,exam.target);
 const fillLamp=new T.PointLight(0xd7f6fb,3.6,10,.9);fillLamp.position.set(-1.8,Y-.5,1.6);lab.add(fillLamp);
 const makeLamp=(x:number,z:number)=>{const housing=new T.Mesh(new T.BoxGeometry(2.2,.06,.18),new T.MeshStandardMaterial({color:0xe2eef2,metalness:.45,roughness:.28,emissive:0xcff7ff,emissiveIntensity:.85}));housing.position.set(x,Y-.08,z);lab.add(housing);};
 makeLamp(-1.6,.9);makeLamp(1.6,.9);makeLamp(0,-1.2);
 const frames:T.Object3D[]=[];
 const pickables:T.Object3D[]=[];
 const place=(exhibit:LabExhibit)=>{
  const g=frameMesh(exhibit,false);
  const y=2.18,span=3.35,x=(exhibit.slot-1)*span;
  if(exhibit.wall==='back'){g.position.set(x,y,-H+.08);}
  else if(exhibit.wall==='left'){g.position.set(-H+.08,y,x);g.rotation.y=Math.PI/2;}
  else {g.position.set(H-.08,y,x);g.rotation.y=-Math.PI/2;}
  lab.add(g);frames.push(g);g.traverse(o=>{if(o instanceof T.Mesh&&o.userData.exhibit)pickables.push(o);});
 };
 LAB_EXHIBITS.forEach(place);
 const walls:T.Object3D[]=[back,front,left,right,floor,ceiling,doorGlass,doorFrame];
 const clampCamera=(camera:T.PerspectiveCamera,controls: {target:T.Vector3;update:()=>void},on:boolean)=>{
  if(!on)return;
  const m=LAB_BOUNDS.margin,lim=H-m;
  camera.position.x=T.MathUtils.clamp(camera.position.x,-lim,lim);
  camera.position.y=T.MathUtils.clamp(camera.position.y,m,Y-m);
  camera.position.z=T.MathUtils.clamp(camera.position.z,-lim,lim);
  controls.target.x=T.MathUtils.clamp(controls.target.x,-lim+.5,lim-.5);
  controls.target.y=T.MathUtils.clamp(controls.target.y,.2,Y-m-.4);
  controls.target.z=T.MathUtils.clamp(controls.target.z,-lim+.5,lim-.5);
  if(camera.position.distanceTo(controls.target)<.2){
   const dir=camera.position.clone().sub(controls.target).normalize();
   camera.position.copy(controls.target).addScaledVector(dir,.22);
  }
 };
 const applyTheme=(dark:boolean)=>{
  const nextFloor=tiles(dark),nextWall=plaster(dark);
  const floorMat=floor.material as T.MeshStandardMaterial;
  const oldFloor=floorMat.map,oldWall=(back.material as T.MeshStandardMaterial).map;
  floorMat.map=nextFloor;floorMat.needsUpdate=true;
  [back,front,left,right].forEach(w=>{const m=w.material as T.MeshStandardMaterial;m.map=nextWall;m.color.setHex(dark?0x0c2430:0xf4fbfc);m.needsUpdate=true;});
  (ceiling.material as T.MeshStandardMaterial).color.setHex(dark?0x0a1c24:0xffffff);
  (cabinet.material as T.MeshStandardMaterial).color.setHex(dark?0x123744:0xe8f4f7);
  (counter.material as T.MeshStandardMaterial).color.setHex(dark?0x1a4b5c:0xd5eef3);
  exam.intensity=dark?10:16;fillLamp.intensity=dark?2.2:3.6;
  frames.forEach(f=>{
   const wood=f.userData.wood as T.MeshStandardMaterial;wood?.color.setHex(dark?0x8a6a3a:0xb0894f);
   const mat=f.userData.mat as T.MeshStandardMaterial;mat?.color.setHex(dark?0x1b3844:0xf4ead7);
  });
  if(oldFloor&&oldFloor!==nextFloor)oldFloor.dispose();
  if(oldWall&&oldWall!==nextWall)oldWall.dispose();
 };
 applyTheme(document.documentElement.classList.contains('dark'));
 return {lab,frames,pickables,walls,clampCamera,applyTheme,exam,fillLamp,dispose(){
  frames.forEach(f=>{(f.userData.maps as T.Texture[]|undefined)?.forEach(t=>t.dispose());});
  (floor.material as T.MeshStandardMaterial).map?.dispose();
  (back.material as T.MeshStandardMaterial).map?.dispose();
 }};
}
