(()=>{'use strict';
const menu=document.querySelector('.showroom-menu');
if(menu){
 const close=()=>menu.open=false;
 document.addEventListener('click',e=>{if(!menu.contains(e.target))close()});
 menu.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.open){e.stopPropagation();close();menu.querySelector('summary').focus()}});
 menu.addEventListener('focusout',e=>{if(e.relatedTarget&&!menu.contains(e.relatedTarget))close()});
 document.querySelector('#menu-toggle')?.addEventListener('click',close);
 menu.querySelectorAll('a').forEach(a=>{if(a.getAttribute('href')===location.pathname.split('/').pop()){a.setAttribute('aria-current','page');menu.classList.add('current-category')}});
}
const source=document.querySelector('#category-scenes');
if(source){const scenes=JSON.parse(source.textContent),image=document.querySelector('#category-image'),panel=document.querySelector('#category-panel');
 document.querySelectorAll('[data-category-scene]').forEach(b=>b.addEventListener('click',()=>{
  const scene=scenes[Number(b.dataset.categoryScene)];
  document.querySelectorAll('[data-category-scene]').forEach(other=>other.setAttribute('aria-pressed',String(other===b)));
  image.src='assets/'+scene[1];image.alt=scene[4];panel.querySelector('h3').textContent=scene[2];panel.querySelector('p').textContent=scene[3];document.querySelector('#category-caption').textContent=scene[4];
  const figure=image.closest('figure');figure.classList.remove('scene-changed');void figure.offsetWidth;figure.classList.add('scene-changed');
 }));
}
const featureSource=document.querySelector('#showroom-features-data');
if(featureSource){
 const features=JSON.parse(featureSource.textContent),image=document.querySelector('#showroom-feature-image'),panel=document.querySelector('#showroom-feature-copy'),label=document.querySelector('#showroom-feature-label'),menu=document.querySelector('.showroom-feature-menu'),frame=document.querySelector('.showroom-feature-view');
 menu?.querySelectorAll('[data-showroom-feature]').forEach(button=>button.addEventListener('click',()=>{
  const feature=features[Number(button.dataset.showroomFeature)];
  menu.querySelectorAll('[data-showroom-feature]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  image.src='assets/'+feature[0];image.alt=feature[4];image.style.objectPosition=feature[5]||'center';image.style.transform='scale('+(feature[6]||1)+')';panel.querySelector('h3').textContent=feature[1];panel.querySelector('p').textContent=feature[2];label.textContent=feature[3];
  frame.classList.remove('feature-switched');void frame.offsetWidth;frame.classList.add('feature-switched');
 }));
}
const demoStage=document.querySelector('.showroom-demo-stage');
let demoLoadTimer;
const loadShowroom=(src)=>{
 const frame=demoStage?.querySelector('iframe'),poster=demoStage?.querySelector('.showroom-demo-poster'),status=poster?.querySelector('.showroom-demo-status'),trigger=poster?.querySelector('[data-showroom-demo-load]');
 if(!frame||!src)return;
 clearTimeout(demoLoadTimer);frame.hidden=false;poster.hidden=false;frame.dataset.ready='false';frame.dataset.loaded='true';frame.src=src;
 if(status){status.hidden=false;status.textContent='Conectando con el showroom…'}
 if(trigger){trigger.disabled=true;trigger.firstChild.textContent='Cargando recorrido…'}
 demoLoadTimer=setTimeout(()=>{if(frame.dataset.ready!=='true'){if(status)status.textContent='El recorrido está tardando en conectar. Puedes volver a intentarlo.';if(trigger){trigger.disabled=false;trigger.firstChild.textContent='Intentar de nuevo '}}},16000);
};
if(demoStage){
 const trigger=demoStage.querySelector('[data-showroom-demo-load]');
 const frame=demoStage.querySelector('iframe');
 const poster=demoStage.querySelector('.showroom-demo-poster');
 frame?.addEventListener('load',()=>{frame.dataset.ready='true';clearTimeout(demoLoadTimer);if(poster)poster.hidden=true});
 trigger?.addEventListener('click',()=>{if(trigger.disabled)return;loadShowroom(frame.dataset.src)});
}
document.querySelectorAll('.showroom-studio').forEach(studio=>{
 const tabs=[...studio.querySelectorAll('[role="tab"]')];
 const select=tab=>{tabs.forEach(t=>{const active=t===tab;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!active;});};
 tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>select(tab));tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(i+1)%tabs.length;if(e.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();select(tabs[next]);tabs[next].focus();}});});
});
})();
