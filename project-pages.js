(()=>{'use strict';
const menu=document.querySelector('.project-menu');
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
})();
