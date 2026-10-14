// Solvento Solar Planner: vista 3D illustrativa del progetto (three.js, MIT, file locale vendor/three.min.js).
// Modello semplificato: un'unica falda piana con inclinazione inserita a mano. NON è un modello di progetto.
(function(){
'use strict';
const TXT={
it:{title:'Vista 3D',tilt:'Inclinazione falda',eave:'Lato di gronda (parte bassa)',down:'In basso',up:'In alto',left:'A sinistra',right:'A destra',height:'Altezza edificio (m)',save:'Salva immagine PNG',close:'Chiudi',reset:'Vista iniziale',hint:'Trascina per ruotare · due dita o rotellina per zoom · Shift+trascina o tre dita per spostare.',warn:'Vista illustrativa: falda unica, inclinazione e altezza inserite a mano. Le misure del disegno 2D sono considerate sulla superficie del tetto. Non è un progetto di ingegneria: struttura, fissaggi e distanze vanno verificati da un professionista.',noRoof:'Disegna prima il contorno del tetto.',error:'Impossibile aprire la vista 3D su questo dispositivo (WebGL non disponibile).'},
pt:{title:'Vista 3D',tilt:'Inclinação do telhado',eave:'Lado do beiral (parte baixa)',down:'Embaixo',up:'Em cima',left:'À esquerda',right:'À direita',height:'Altura do prédio (m)',save:'Salvar imagem PNG',close:'Fechar',reset:'Vista inicial',hint:'Arraste para girar · dois dedos ou rodinha para zoom · Shift+arrastar ou três dedos para mover.',warn:'Vista ilustrativa: uma só água, inclinação e altura digitadas à mão. As medidas do desenho 2D são consideradas sobre a superfície do telhado. Não é um projeto de engenharia: estrutura, fixação e distâncias devem ser verificadas por um profissional.',noRoof:'Desenhe antes o contorno do telhado.',error:'Não foi possível abrir a vista 3D neste aparelho (WebGL indisponível).'}};
let ui=null,state={tilt:20,eave:'down',height:6};
function rot(q,a){const c=Math.cos(a),n=Math.sin(a);return {x:q.x*c-q.y*n,y:q.x*n+q.y*c}} // inversa de rotPt do app
function el(tag,attrs,html){const e=document.createElement(tag);Object.assign(e,attrs||{});if(html!=null)e.innerHTML=html;return e}
function cellTexture(T,landscape){const c=document.createElement('canvas');c.width=landscape?512:320;c.height=landscape?320:512;const g=c.getContext('2d');
g.fillStyle='#c9d0d6';g.fillRect(0,0,c.width,c.height);const f=10;g.fillStyle='#14233a';g.fillRect(f,f,c.width-2*f,c.height-2*f);
const cols=landscape?10:6,rows=landscape?6:10,cw=(c.width-2*f)/cols,ch=(c.height-2*f)/rows;
for(let i=0;i<cols;i++)for(let j=0;j<rows;j++){const x=f+i*cw,y=f+j*ch,gr=g.createLinearGradient(x,y,x+cw,y+ch);gr.addColorStop(0,'#1d3557');gr.addColorStop(1,'#0f1f36');g.fillStyle=gr;g.fillRect(x+1.5,y+1.5,cw-3,ch-3);g.fillStyle='rgba(180,195,215,.35)';g.fillRect(x+cw/2-.5,y+2,1,ch-4)}
const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;t.anisotropy=4;return t}
function build(T,d){
const grp=new T.Group(),t=state.tilt*Math.PI/180,H=Math.max(1,state.height),a=d.gridA||0;
const dl={down:{x:0,y:-1},up:{x:0,y:1},left:{x:1,y:0},right:{x:-1,y:0}}[state.eave],dv=rot(dl,a);
const P=d.roof;let s0=Infinity;P.forEach(p=>{s0=Math.min(s0,p.x*dv.x+p.y*dv.y)});
const n=new T.Vector3(-dv.x*Math.sin(t),Math.cos(t),-dv.y*Math.sin(t));
const map=(p,off)=>{const s=p.x*dv.x+p.y*dv.y-s0,bx=p.x-s*dv.x+s*Math.cos(t)*dv.x,by=p.y-s*dv.y+s*Math.cos(t)*dv.y,v=new T.Vector3(bx,H+s*Math.sin(t),by);if(off)v.addScaledVector(n,off);return v};
const quad=(pts,mat,uv)=>{const g=new T.BufferGeometry(),pos=[],uvs=[],idx=[0,1,2,0,2,3];idx.forEach(i=>{pos.push(pts[i].x,pts[i].y,pts[i].z);if(uv)uvs.push(uv[i][0],uv[i][1])});g.setAttribute('position',new T.Float32BufferAttribute(pos,3));if(uv)g.setAttribute('uv',new T.Float32BufferAttribute(uvs,2));g.computeVertexNormals();const m=new T.Mesh(g,mat);m.castShadow=m.receiveShadow=true;return m};
// tetto
const shape=new T.Shape(P.map(p=>new T.Vector2(p.x,p.y))),sg=new T.ShapeGeometry(shape),pa=sg.attributes.position,uv=[];
for(let i=0;i<pa.count;i++){const p={x:pa.getX(i),y:pa.getY(i)},v=map(p);pa.setXYZ(i,v.x,v.y,v.z);if(d.img)uv.push(p.x/d.img.w,1-p.y/d.img.h)}
if(d.img)sg.setAttribute('uv',new T.Float32BufferAttribute(uv,2));sg.computeVertexNormals();
let roofMat;if(d.img){const tex=new T.Texture(d.img.el);tex.colorSpace=T.SRGBColorSpace;tex.needsUpdate=true;tex.anisotropy=4;roofMat=new T.MeshStandardMaterial({map:tex,roughness:.9,side:T.DoubleSide})}else roofMat=new T.MeshStandardMaterial({color:0xa4553a,roughness:.85,side:T.DoubleSide});
const roof=new T.Mesh(sg,roofMat);roof.receiveShadow=true;roof.castShadow=true;grp.add(roof);
// pareti e bordo del tetto
const wallMat=new T.MeshStandardMaterial({color:0xe8dfcf,roughness:.95,side:T.DoubleSide}),fasciaMat=new T.MeshStandardMaterial({color:0x6b4a3a,roughness:.8,side:T.DoubleSide});
for(let i=0;i<P.length;i++){const A=map(P[i]),B=map(P[(i+1)%P.length]);grp.add(quad([A.clone().setY(0),B.clone().setY(0),B,A],wallMat));grp.add(quad([A,B,map(P[(i+1)%P.length],-.18),map(P[i],-.18)],fasciaMat))}
// pannelli
const frameMat=new T.MeshStandardMaterial({color:0xb9c1c8,metalness:.6,roughness:.35,side:T.DoubleSide}),texP=cellTexture(T,false),texL=cellTexture(T,true);
const topP=new T.MeshStandardMaterial({map:texP,metalness:.25,roughness:.28,side:T.DoubleSide}),topL=new T.MeshStandardMaterial({map:texL,metalness:.25,roughness:.28,side:T.DoubleSide});
const lift=.12,th=.04;
d.panels.forEach(q=>{const loc=[{x:q.x,y:q.y},{x:q.x+q.w,y:q.y},{x:q.x+q.w,y:q.y+q.h},{x:q.x,y:q.y+q.h}],wpts=loc.map(c=>rot(c,q.a||0)),lo=wpts.map(c=>map(c,lift)),hi=wpts.map(c=>map(c,lift+th));
grp.add(quad(hi,q.w>=q.h?topL:topP,[[0,1],[1,1],[1,0],[0,0]]));for(let i=0;i<4;i++){const j=(i+1)%4;grp.add(quad([lo[i],lo[j],hi[j],hi[i]],frameMat))}});
// ostacoli (camini, lucernari): blocchi alti 0,9 m
const obsMat=new T.MeshStandardMaterial({color:0x8d8a86,roughness:.9,side:T.DoubleSide});
(d.obstacles||[]).forEach(o=>{const x0=Math.min(o.x,o.x+o.w),y0=Math.min(o.y,o.y+o.h),w=Math.abs(o.w),h=Math.abs(o.h);if(w<.01||h<.01)return;const b=[{x:x0,y:y0},{x:x0+w,y:y0},{x:x0+w,y:y0+h},{x:x0,y:y0+h}].map(c=>map(c)),top=b.map(v=>v.clone().setY(Math.max(...b.map(k=>k.y))+.9));grp.add(quad(top,obsMat));for(let i=0;i<4;i++){const j=(i+1)%4;grp.add(quad([b[i],b[j],top[j],top[i]],obsMat))}});
return grp}
function open(d,lang){const L=TXT[lang]||TXT.it;if(!d.roof||d.roof.length<3){alert(L.noRoof);return}
const T=window.THREE;close();
const wrap=el('div',{id:'view3d'});wrap.style.cssText='position:fixed;inset:0;z-index:1000;background:#cfe3f2;display:flex;flex-direction:column;font-family:system-ui,sans-serif;color:#17231e';
const bar=el('div');bar.style.cssText='display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center;padding:8px 12px;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.12)';
bar.innerHTML=`<strong style="font-size:18px;color:#174b3a">🧊 ${L.title}</strong>
<label style="display:flex;align-items:center;gap:6px">${L.tilt} <input id="v3tilt" type="range" min="0" max="60" step="1" value="${state.tilt}" style="width:120px"><b id="v3tiltV">${state.tilt}°</b></label>
<label style="display:flex;align-items:center;gap:6px">${L.eave} <select id="v3eave"><option value="down">${L.down}</option><option value="up">${L.up}</option><option value="left">${L.left}</option><option value="right">${L.right}</option></select></label>
<label style="display:flex;align-items:center;gap:6px">${L.height} <input id="v3h" type="number" min="1" max="60" step="0.5" value="${state.height}" style="width:70px"></label>
<span style="flex:1"></span><button id="v3reset">${L.reset}</button><button id="v3save" class="primary">${L.save}</button><button id="v3close">✕ ${L.close}</button>`;
const stage=el('div');stage.style.cssText='flex:1;position:relative;min-height:0;touch-action:none';
const foot=el('div');foot.style.cssText='padding:6px 12px;background:#fff;font-size:12px;line-height:1.35';foot.innerHTML=`<div>${L.hint}</div><div style="color:#8a4b12">${L.warn}</div>`;
wrap.append(bar,stage,foot);document.body.appendChild(wrap);bar.querySelector('#v3eave').value=state.eave;
let renderer;try{renderer=new T.WebGLRenderer({antialias:true,preserveDrawingBuffer:true})}catch(e){wrap.remove();alert(L.error);return}
renderer.setPixelRatio(Math.min(2,window.devicePixelRatio||1));renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.outputColorSpace=T.SRGBColorSpace;
stage.appendChild(renderer.domElement);renderer.domElement.style.cssText='display:block;width:100%;height:100%';
const scene=new T.Scene();scene.background=new T.Color(0xcfe3f2);
scene.add(new T.HemisphereLight(0xe6f1ff,0x5d6b4c,1.1));const sun=new T.DirectionalLight(0xfff4e0,2.4);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.bias=-.0004;scene.add(sun,sun.target);
const camera=new T.PerspectiveCamera(38,1,.1,2000);let model=null,ground=null;
const xs=d.roof.map(p=>p.x),ys=d.roof.map(p=>p.y),cx=(Math.min(...xs)+Math.max(...xs))/2,cz=(Math.min(...ys)+Math.max(...ys))/2,size=Math.max(Math.max(...xs)-Math.min(...xs),Math.max(...ys)-Math.min(...ys),5);
const orb={th:-.55,ph:1.05,r:size*2.1,tx:cx,ty:state.height*.7,tz:cz};const orb0={...orb};
function rebuild(){if(model){scene.remove(model);model.traverse(o=>{if(o.geometry)o.geometry.dispose()})}model=build(T,d);scene.add(model);
if(!ground){ground=new T.Mesh(new T.CircleGeometry(size*8,64),new T.MeshStandardMaterial({color:0x8fa874,roughness:1}));ground.rotation.x=-Math.PI/2;ground.position.set(cx,-.01,cz);ground.receiveShadow=true;scene.add(ground)}
const sc=sun.shadow.camera,e=size*1.4;sc.left=-e;sc.right=e;sc.top=e;sc.bottom=-e;sc.near=1;sc.far=size*8+100;sc.updateProjectionMatrix();sun.position.set(cx-size*.8,state.height+size*1.6,cz+size*1.2);sun.target.position.set(cx,0,cz);orb.ty=orb0.ty=state.height*.7;render()}
function render(){const w=stage.clientWidth||1,h=stage.clientHeight||1;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();
camera.position.set(orb.tx+orb.r*Math.sin(orb.ph)*Math.sin(orb.th),orb.ty+orb.r*Math.cos(orb.ph),orb.tz+orb.r*Math.sin(orb.ph)*Math.cos(orb.th));camera.lookAt(orb.tx,orb.ty,orb.tz);renderer.render(scene,camera)}
let raf=0;const req=()=>{if(!raf)raf=requestAnimationFrame(()=>{raf=0;render()})};
// orbita: 1 dito/mouse ruota, 2 dita zoom, 3 dita o Shift sposta
const pts=new Map();let last=null;const cv=renderer.domElement;
const pan=(dx,dy)=>{const k=orb.r*.0016,c=Math.cos(orb.th),s=Math.sin(orb.th);orb.tx-=(dx*c+dy*s)*k;orb.tz-=(-dx*s+dy*c)*k;req()};
cv.addEventListener('pointerdown',e=>{cv.setPointerCapture(e.pointerId);pts.set(e.pointerId,{x:e.clientX,y:e.clientY});last=null});
cv.addEventListener('pointermove',e=>{if(!pts.has(e.pointerId))return;const prev=pts.get(e.pointerId),cur={x:e.clientX,y:e.clientY};
if(pts.size===1){const dx=cur.x-prev.x,dy=cur.y-prev.y;if(e.shiftKey||e.buttons===2)pan(dx,dy);else{orb.th-=dx*.006;orb.ph=Math.max(.15,Math.min(1.5,orb.ph-dy*.006))}pts.set(e.pointerId,cur);req();return}
pts.set(e.pointerId,cur);const v=[...pts.values()],dist=Math.hypot(v[0].x-v[1].x,v[0].y-v[1].y),mx=v.reduce((s,p)=>s+p.x,0)/v.length,my=v.reduce((s,p)=>s+p.y,0)/v.length;
if(last){if(pts.size>=3)pan(mx-last.mx,my-last.my);else{orb.r=Math.max(size*.4,Math.min(size*10,orb.r*last.dist/(dist||1)))}}last={dist,mx,my};req()});
const up=e=>{pts.delete(e.pointerId);last=null};cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);cv.addEventListener('contextmenu',e=>e.preventDefault());
cv.addEventListener('wheel',e=>{e.preventDefault();orb.r=Math.max(size*.4,Math.min(size*10,orb.r*(e.deltaY>0?1.12:1/1.12)));req()},{passive:false});
bar.querySelector('#v3tilt').oninput=e=>{state.tilt=+e.target.value;bar.querySelector('#v3tiltV').textContent=state.tilt+'°';rebuild()};
bar.querySelector('#v3eave').onchange=e=>{state.eave=e.target.value;rebuild()};
bar.querySelector('#v3h').onchange=e=>{state.height=Math.max(1,Math.min(60,+e.target.value||6));rebuild()};
bar.querySelector('#v3reset').onclick=()=>{Object.assign(orb,orb0);req()};
bar.querySelector('#v3save').onclick=()=>{render();const a=document.createElement('a');a.download='solvento-3d.png';a.href=cv.toDataURL('image/png');document.body.appendChild(a);a.click();a.remove()};
bar.querySelector('#v3close').onclick=close;
const onResize=()=>req();window.addEventListener('resize',onResize);
ui={wrap,renderer,onResize};rebuild()}
function close(){if(!ui)return;window.removeEventListener('resize',ui.onResize);ui.renderer.dispose();ui.renderer.forceContextLoss&&ui.renderer.forceContextLoss();ui.wrap.remove();ui=null}
window.Solvento3D={open,close,setState:s=>Object.assign(state,s)};
})();
