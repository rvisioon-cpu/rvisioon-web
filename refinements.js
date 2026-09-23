(()=>{
const intro=document.querySelector('.brand-intro');
if(location.hash&&location.hash!=='#inicio')intro.remove();else intro.addEventListener('animationend',e=>{if(e.animationName==='intro-finish')intro.remove()});
const track=document.querySelector('#project-track'),prev=document.querySelector('#project-prev'),next=document.querySelector('#project-next');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const sync=()=>{prev.disabled=track.scrollLeft<3;next.disabled=track.scrollLeft>=track.scrollWidth-track.clientWidth-3};
const scrollScene=document.querySelector('.project-scroll');
const passiveMode=()=>reduced.matches||matchMedia('(max-width:760px)').matches||document.body.classList.contains('paused');
const speed=2.4;
const range=()=>overflow()/speed;
const overflow=()=>Math.max(0,track.scrollWidth-track.clientWidth);
function layout(){scrollScene.style.height=passiveMode()?'auto':`${scrollScene.querySelector(".project-pin").offsetHeight+range()}px`;sync()}
function progress(){if(passiveMode())return;const r=scrollScene.getBoundingClientRect();track.scrollLeft=Math.max(0,Math.min(overflow(),(24-r.top)*speed));sync()}
function move(direction){const card=track.querySelector('.project'),distance=direction*(card.getBoundingClientRect().width+16);if(passiveMode()){track.scrollBy({left:distance,behavior:'instant'})}else{const start=scrollY+scrollScene.getBoundingClientRect().top-24;window.scrollTo({top:start+Math.max(0,Math.min(overflow(),track.scrollLeft+distance))/speed,behavior:'smooth'})}}
prev.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));track.addEventListener('scroll',sync,{passive:true});window.addEventListener('resize',()=>{layout();progress()});new ResizeObserver(()=>{layout();progress()}).observe(scrollScene.querySelector('.project-pin'));track.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1)}});
let ticking=false;window.addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(()=>{progress();ticking=false})}},{passive:true});new MutationObserver(()=>{layout();progress()}).observe(document.body,{attributes:true,attributeFilter:['class']});reduced.addEventListener('change',()=>{layout();progress()});layout();progress();
const logos=document.querySelector('.logos');Array.from(logos.children).forEach(logo=>{const duplicate=logo.cloneNode(true);duplicate.setAttribute('aria-hidden','true');duplicate.alt='';logos.appendChild(duplicate)});
})();


