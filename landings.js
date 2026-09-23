const stage=document.querySelector('#explore-image');
document.querySelectorAll('[data-image]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-image]').forEach(b=>{b.classList.toggle('chosen',b===button);b.setAttribute('aria-pressed',String(b===button))});stage.src='assets/'+button.dataset.image;stage.alt=button.dataset.caption;document.querySelector('#explore-caption').textContent=button.dataset.caption}));
const contactForm=document.querySelector('#project-brief');
if(contactForm){
  const steps=[...contactForm.querySelectorAll('[data-step]')];
  const progress=[...document.querySelectorAll('[data-progress]')];
  const showStep=index=>{
    steps.forEach((step,i)=>{const active=i===index;step.hidden=!active;step.classList.toggle('is-active',active)});
    progress.forEach((item,i)=>{item.classList.toggle('is-current',i===index);item.classList.toggle('is-done',i<index)});
    document.querySelector('.contact-form-card')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
    if(index===2)loadZcal();
  };
  const loadZcal=()=>{
    const frame=document.querySelector('[data-zcal-frame]');
    const fallback=document.querySelector('.zcal-fallback');
    const invite=contactForm.dataset.zcalUrl.trim();
    if(!frame||!invite||frame.dataset.loaded==='true')return;
    const data=new FormData(contactForm);
    const url=new URL(invite);
    url.searchParams.set('name',data.get('nombre')||'');
    url.searchParams.set('email',data.get('email')||'');
    url.searchParams.set('smsPhone',data.get('telefono')||'');
    url.searchParams.set('a0',data.get('relacion')||'');
    url.searchParams.set('a1',data.get('unidades')||'');
    url.searchParams.set('a2',data.get('desarrollo')||'');
    const iframe=document.createElement('iframe');
    iframe.title='Calendario para reservar una presentación con Rvisioon';
    iframe.src=url.toString();
    iframe.loading='lazy';
    iframe.allow='payment';
    frame.replaceChildren(iframe);
    frame.dataset.loaded='true';
    if(fallback){fallback.href=url.toString();fallback.hidden=false}
  };
  contactForm.querySelectorAll('[data-next]').forEach(button=>button.addEventListener('click',()=>{
    const index=steps.indexOf(button.closest('[data-step]'));
    const fields=[...steps[index].querySelectorAll('input,select,textarea')];
    for(const field of fields){if(!field.checkValidity()){field.reportValidity();field.focus();return}}
    showStep(Math.min(index+1,steps.length-1));
  }));
  contactForm.querySelectorAll('[data-back]').forEach(button=>button.addEventListener('click',()=>showStep(Math.max(0,steps.indexOf(button.closest('[data-step]'))-1))));
  contactForm.addEventListener('submit',event=>event.preventDefault());
}
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('arrived');reveal.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll('.section-intro,.disciplines article,.case,.meeting article,.connection-map,.landing-close h2').forEach(el=>reveal.observe(el));}

document.querySelectorAll('[data-project-filter]').forEach(button=>button.addEventListener('click',()=>{const type=button.dataset.projectFilter;document.querySelectorAll('[data-project-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.querySelectorAll('[data-project-type]').forEach(card=>card.hidden=type!=='todos'&&card.dataset.projectType!==type);document.querySelector('#project-filter-status').textContent=type==='todos'?'Mostrando todos los proyectos.':`Mostrando proyectos ${type==='vertical'?'verticales':'horizontales'}.`;}));
