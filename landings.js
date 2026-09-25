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
  let calendarCleanup=()=>{};
  let resizeLibrary;
  const getResizeLibrary=()=>{
    if(window.iFrameResize)return Promise.resolve();
    if(!resizeLibrary)resizeLibrary=new Promise((resolve,reject)=>{
      const script=document.createElement('script');
      script.src='https://static.zcal.co/embed/v1/embed.js';
      script.onload=resolve;
      script.onerror=()=>{resizeLibrary=null;script.remove();reject(new Error('Calendar embed unavailable'))};
      document.head.append(script);
    });
    return resizeLibrary;
  };
  const loadZcal=(retry=false)=>{
    const frame=document.querySelector('[data-zcal-frame]');
    const fallback=document.querySelector('.zcal-fallback');
    const invite=contactForm.dataset.zcalUrl.trim();
    if(!frame||!invite)return;
    const data=new FormData(contactForm);
    const url=new URL(invite);
    url.searchParams.set('name',data.get('nombre')||'');
    url.searchParams.set('email',data.get('email')||'');
    // Question order in Pierre's existing invitation: phone, project brief, files.
    url.searchParams.set('a0',data.get('telefono')||'');
    url.searchParams.set('a1',[
      'Inmobiliaria o proyecto: '+data.get('proyecto'),
      'Relación con el sector: '+data.get('relacion'),
      'Unidades: '+data.get('unidades'),
      'Tipo de desarrollo: '+data.get('desarrollo')
    ].join('\n'));
    const bookingUrl=url.toString();
    if(fallback){fallback.href=bookingUrl;fallback.hidden=false}
    // Keep the selected slot unless the visitor changes their brief or retries.
    if(!retry&&frame.dataset.bookingUrl===bookingUrl)return;
    calendarCleanup();
    url.searchParams.set('embed','1');
    url.searchParams.set('embedType','inline');
    url.searchParams.set('embedVersion','1.0.2');
    url.searchParams.set('embedDomain',location.hostname);
    const iframe=document.createElement('iframe');
    iframe.id='rvisioon-zcal-calendar';
    iframe.tabIndex=-1;iframe.setAttribute('aria-hidden','true');
    iframe.title='Calendario para reservar una presentación con Rvisioon';
    iframe.src=url.toString();
    iframe.loading='eager';
    iframe.referrerPolicy='strict-origin-when-cross-origin';
    const notice=document.createElement('div');
    notice.className='calendar-notice';
    const message=document.createElement('p');
    message.setAttribute('role','status');
    message.textContent='Cargando los horarios disponibles…';
    const direct=document.createElement('a');
    direct.className='cta';direct.href=bookingUrl;direct.target='_blank';direct.rel='noopener';
    direct.textContent='Abrir agenda de Pierre ↗';
    const retryButton=document.createElement('button');
    retryButton.type='button';retryButton.className='calendar-retry';retryButton.hidden=true;
    retryButton.textContent='Reintentar aquí';
    retryButton.addEventListener('click',()=>loadZcal(true));
    notice.append(message,direct,retryButton);
    frame.classList.remove('calendar-ready');
    frame.replaceChildren(notice,iframe);
    frame.dataset.bookingUrl=bookingUrl;
    let active=true;
    const unavailable=()=>{
      if(!active||frame.classList.contains('calendar-ready'))return;
      message.textContent='La agenda no pudo mostrarse dentro de esta página. Puedes abrirla directamente con tus datos ya completados.';
      retryButton.hidden=false;
    };
    const timeout=setTimeout(unavailable,12000);
    const ready=()=>{
      if(!active)return;
      clearTimeout(timeout);
      frame.classList.add('calendar-ready');
      iframe.removeAttribute('tabindex');iframe.removeAttribute('aria-hidden');
      message.textContent='Elige tu horario. Si lo prefieres, también puedes abrir la agenda por separado.';
      retryButton.hidden=true;
    };
    // A load event also fires for blocked frames. Wait for the official embed handshake.
    getResizeLibrary().then(()=>{
      if(!active)return;
      window.iFrameResize({checkOrigin:['https://zcal.co'],minHeight:544,
        heightCalculationMethod:'taggedElement',scrolling:false,
        onInit:ready,onResized:ready},iframe);
    }).catch(unavailable);
    calendarCleanup=()=>{
      active=false;clearTimeout(timeout);
      iframe.iFrameResizer?.removeListeners();
    };
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
