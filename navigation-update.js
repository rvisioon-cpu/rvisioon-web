(()=>{'use strict';const header=document.querySelector('body>header');if(!header)return;const size=()=>document.documentElement.style.setProperty('--site-header-height',Math.ceil(header.getBoundingClientRect().height)+'px');new ResizeObserver(size).observe(header);size();})();
(()=>{
 const footer=document.querySelector('.site-footer');
 if(footer)new IntersectionObserver(entries=>{
   document.body.classList.toggle('footer-in-view',entries[0].isIntersecting);
 },{rootMargin:'0px 0px 24px 0px',threshold:0}).observe(footer);
 const intro=document.querySelector('.brand-intro');
 if(!intro||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 document.body.classList.add('nav-intro-wait');
 let done=false;
 const reveal=()=>{if(done)return;done=true;observer.disconnect();setTimeout(()=>document.body.classList.remove('nav-intro-wait'),250)};
 const observer=new MutationObserver(()=>{if(!intro.isConnected)reveal()});
 observer.observe(document.body,{childList:true});
 intro.addEventListener('animationend',event=>{if(event.target===intro&&['intro-finish','intro-away'].includes(event.animationName)){intro.remove();reveal()}});
 setTimeout(()=>{if(!done){intro.remove();reveal()}},3500);
})();
