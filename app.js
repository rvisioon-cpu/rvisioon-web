const menu=document.querySelector('#menu-toggle'),nav=document.querySelector('#nav');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');nav.classList.remove('open')}));document.addEventListener('keydown',e=>{if(e.key==='Escape'){menu.setAttribute('aria-expanded','false');nav.classList.remove('open')}});
const scenes={building:['showroom-proyecto.webp','Vista general del showroom de Océano Atlántico','Vista del proyecto'],floor:['showroom-planta.webp','Selector de plantas del showroom de Océano Atlántico','Plantas y departamentos'],unit:['showroom-recorrido.webp','Recorrido virtual de un departamento de Océano Atlántico','Recorrido virtual']};
const sceneFrame=document.querySelector('.show-image'),sceneImg=document.querySelector('#scene');
const sceneButtons=[...document.querySelectorAll('[data-scene]')];
const sceneReady=Object.fromEntries(Object.entries(scenes).map(([key,value])=>{
 const image=new Image();image.src='assets/'+value[0];
 return [key,image.decode().catch(()=>{})];
}));
let sceneRequest=0,sceneAnimations=[],sceneGhost;
sceneButtons.forEach(button=>button.addEventListener('click',async()=>{
 const key=button.dataset.scene,request=++sceneRequest;
 if(!sceneFrame||!sceneImg)return;
 await sceneReady[key];
 if(request!==sceneRequest||sceneFrame.dataset.device===key)return;
 sceneAnimations.forEach(animation=>animation.cancel());
 sceneGhost?.remove();
 const device=sceneImg.parentElement;
 const oldImage=sceneImg.cloneNode();
 oldImage.removeAttribute('id');oldImage.alt='';oldImage.setAttribute('aria-hidden','true');
 oldImage.className='scene-outgoing';
 Object.assign(oldImage.style,{position:'absolute',left:sceneImg.offsetLeft+'px',top:sceneImg.offsetTop+'px',width:sceneImg.clientWidth+'px',height:sceneImg.clientHeight+'px',margin:'0',pointerEvents:'none',zIndex:'2'});
 sceneFrame.dataset.device=key;
 sceneImg.src='assets/'+scenes[key][0];sceneImg.alt=scenes[key][1];
 document.querySelector('#scene-label').textContent='Océano Atlántico · '+scenes[key][2];
 sceneButtons.forEach(other=>{other.classList.toggle('active',other===button);other.setAttribute('aria-pressed',String(other===button))});
 if(matchMedia('(prefers-reduced-motion: reduce)').matches||document.body.classList.contains('paused'))return;
 device.append(oldImage);sceneGhost=oldImage;
 const timing={duration:520,easing:'cubic-bezier(.22,.61,.36,1)'};
 sceneAnimations=[
  oldImage.animate([{opacity:1},{opacity:0}],timing),
  sceneImg.animate([{opacity:0},{opacity:1}],timing),
  device.animate([{transform:'rotateY(0deg) translateY(0)'},{transform:'rotateY(-4deg) translateY(-4px)',offset:.4},{transform:'rotateY(0deg) translateY(0)'}],{...timing,duration:640})
 ];
 sceneAnimations[0].finished.then(()=>oldImage.remove()).catch(()=>oldImage.remove());
}));
const video=document.querySelector('video'),motion=document.querySelector('#motion'),reduced=matchMedia('(prefers-reduced-motion: reduce)');function setPaused(paused){document.body.classList.toggle('paused',paused);if(motion){motion.setAttribute('aria-pressed',String(paused));motion.textContent=paused?'Activar movimiento ▷':'Pausar movimiento Ⅱ';}if(paused)video.pause();else video.play().catch(()=>{video.style.display="none"})}setPaused(reduced.matches);reduced.addEventListener('change',e=>setPaused(e.matches));motion?.addEventListener('click',()=>setPaused(!document.body.classList.contains('paused')));


