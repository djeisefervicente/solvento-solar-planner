// Verifica rápida antes de publicar: todos os botões principais estão visíveis
// no computador e no celular, também com o telhado em modo "Rettangolo".
// Uso: node tests/check-buttons.js http://localhost:8766/
const {chromium}=require('playwright');
const EXPECTED=['step1Btn','step2Btn','step3Btn','rulerBtn','exampleScaleBtn','eraseBtn','clearAllBtn','undoBtn','view3dBtn','orientPBtn','orientLBtn','zoomInBtn','zoomOutBtn','zoomFitBtn','toolPanelsBtn','toolObsBtn','autoBtn','pngBtn','pdfBtn'];
(async()=>{const b=await chromium.launch();let fail=0;
for(const [w,h] of [[1366,800],[412,900]])for(const mode of ['rect','poly']){
 const p=await b.newPage({viewport:{width:w,height:h}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(process.argv[2]||'http://localhost:8766/');await p.waitForTimeout(800);
 await p.evaluate(m=>{const s=document.getElementById('roofMode');s.value=m;s.onchange()},mode);
 const hidden=await p.evaluate(ids=>ids.filter(id=>{const e=document.getElementById(id);return !e||!e.offsetParent}),EXPECTED);
 const ok=!hidden.length&&!errs.length;if(!ok)fail++;
 console.log(ok?'OK  ':'ERRO',w+'px',mode,hidden.length?'faltando: '+hidden.join(', '):'',errs.join(' | '));await p.close()}
await b.close();process.exit(fail?1:0)})();
