(()=>{'use strict';
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('.cinematic-journey').forEach(section=>{
 const scenes=[...section.querySelectorAll('.cinematic-scene')],buttons=[...section.querySelectorAll('[data-cinema-step]')],count=section.querySelector('.cinematic-count');let current=-1,queued=false;
 const select=i=>{if(i===current)return;current=i;scenes.forEach((scene,n)=>{scene.classList.toggle('is-active',n===i);scene.setAttribute('aria-hidden',String(!reduced.matches&&n!==i))});buttons.forEach((b,n)=>b.setAttribute('aria-pressed',String(n===i)));count.textContent='0'+(i+1)+' / 04';};
 const update=()=>{queued=false;const range=section.offsetHeight-section.querySelector('.cinematic-pin').offsetHeight,progress=range>0?Math.max(0,Math.min(1,-section.getBoundingClientRect().top/range)):0;select(Math.min(3,Math.floor(progress*4)));};
 const schedule=()=>{if(!queued){queued=true;requestAnimationFrame(update)}};
 buttons.forEach((button,i)=>button.addEventListener('click',()=>{const top=scrollY+section.getBoundingClientRect().top,range=section.offsetHeight-section.querySelector('.cinematic-pin').offsetHeight;select(i);window.scrollTo({top:top+range*(i/4+.02),behavior:'instant'})}));
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);reduced.addEventListener('change',()=>{current=-1;update()});update();
});
document.querySelectorAll('.light-slider').forEach(input=>{const update=()=>{input.closest('.light-comparison').style.setProperty('--reveal',input.value+'%');input.setAttribute('aria-valuetext',input.value+'% '+input.dataset.firstLabel)};input.addEventListener('input',update);update()});
})();
(()=>{
const input=document.querySelector('#daylight-range');if(!input)return;
const section=input.closest('section'),scene=section.querySelector('.daylight-scene'),output=section.querySelector('#daylight-hour'),stops=[...section.querySelectorAll('[data-daylight]')];let frame=0;
const clamp=x=>Math.max(0,Math.min(1,x)),smooth=x=>{x=clamp(x);return x*x*(3-2*x)};
function render(value){const p=value/100;section.style.setProperty('--daylight-sunset',smooth(p*2));section.style.setProperty('--daylight-night',smooth((p-.5)*2));section.style.setProperty('--daylight-position',value+'%');const minutes=Math.round((p<=.5?540+p*1080:1080+(p-.5)*360)/5)*5,hour=String(Math.floor(minutes/60)).padStart(2,'0')+':'+String(minutes%60).padStart(2,'0'),name=p<.3?'Día':p<.72?'Atardecer':'Noche';output.replaceChildren(document.createTextNode(hour+' '));const small=document.createElement('small');small.textContent='/ '+name;output.append(small);input.setAttribute('aria-valuetext',hour+', '+name);scene.setAttribute('aria-label','Océano Atlántico: visualización de iluminación, '+name.toLowerCase());stops.forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.daylight)===(p<.3?0:p<.72?50:100))))}
input.addEventListener('input',()=>{cancelAnimationFrame(frame);render(Number(input.value))});
stops.forEach(b=>b.addEventListener('click',()=>{cancelAnimationFrame(frame);const from=Number(input.value),to=Number(b.dataset.daylight),start=performance.now(),duration=matchMedia('(prefers-reduced-motion: reduce)').matches?0:850;const tick=now=>{const t=duration?clamp((now-start)/duration):1;input.value=from+(to-from)*smooth(t);render(Number(input.value));if(t<1)frame=requestAnimationFrame(tick)};frame=requestAnimationFrame(tick)}));render(Number(input.value));
})();
