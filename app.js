'use strict';
const config = window.ACADEMIA;
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let selectedGroup = 'rotina';
document.querySelectorAll('[data-name]').forEach(node => { node.textContent = config.nome; });
document.title = `${config.nome} | Academia em Santa Luz`;
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('address').textContent = config.endereco;
document.getElementById('hours').innerHTML = config.horarios.map(([day, hour]) => `<div class="hours-row"><span>${escapeHTML(day)}</span><strong>${escapeHTML(hour)}</strong></div>`).join('');
const contactDialog = document.getElementById('contact-dialog');
function contact(plan,unit) {
  const number = String(config.whatsapp || '').replace(/\D/g, '');
  if (number.length >= 10 && number.length <= 15) {
    const location=unit?` — unidade ${unit}`:'';
    const message = plan ? `Olá! Quero saber mais sobre o plano ${plan} da ${config.nome}${location}.` : `Olá! Gostaria de conhecer a ${config.nome}${location}.`;
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  } else contactDialog.showModal();
}
document.querySelectorAll('.whatsapp').forEach(button => button.addEventListener('click', () => contact(undefined,button.dataset.unit)));
function renderPlans() {
  document.getElementById('plan-grid').innerHTML = config.planos.map((plan,index)=>({...plan,index})).filter(plan=>plan.grupo===selectedGroup).map(plan => {
    const value = plan.valor;
    const hasPrice = typeof value === 'number' && Number.isFinite(value) && value >= 0;
    const price = hasPrice ? `<span class="currency">R$</span> ${value.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})}` : 'Valor a definir';
    return `<article class="plan ${plan.destaque ? 'recommended' : ''}">${plan.destaque ? '<span class="plan-badge">PARA MANTER O FOCO</span>' : ''}<h3>${escapeHTML(plan.nome)}</h3><p class="plan-intro">${escapeHTML(plan.frase)}</p><span class="plan-price">${price}</span><span class="plan-period">${escapeHTML(plan.periodo)}</span><ul>${plan.beneficios.map(item => `<li>${escapeHTML(item)}</li>`).join('')}</ul><button class="button ${plan.destaque ? '' : 'outline'}" data-plan="${plan.index}">Quero saber mais</button></article>`;
  }).join('');
  document.querySelectorAll('[data-plan]').forEach(button => button.addEventListener('click', () => contact(config.planos[Number(button.dataset.plan)].nome,'Centro')));
}
renderPlans();
document.querySelectorAll('[data-plan-group]').forEach(button => button.addEventListener('click', () => {
  selectedGroup = button.dataset.planGroup;
  document.querySelectorAll('[data-plan-group]').forEach(item => { const active = item === button; item.classList.toggle('active',active); item.setAttribute('aria-pressed',String(active)); });
  renderPlans();
}));
const varzea=config.varzea;
let varzeaGroup='rotina';
document.getElementById('varzea-address').textContent=varzea.endereco;
document.getElementById('varzea-reference').textContent=varzea.referencia;
document.getElementById('varzea-hours').innerHTML=varzea.horarios.map(([day,hour])=>`<div class="hours-row"><span>${escapeHTML(day)}</span><strong>${escapeHTML(hour)}</strong></div>`).join('');
function renderVarzeaPlans(){
  const plans=varzea.planos.map((plan,index)=>({...plan,index})).filter(plan=>plan.grupo===varzeaGroup);
  const grid=document.getElementById('varzea-plan-grid');
  grid.classList.toggle('two-plans',plans.length===2);
  grid.innerHTML=plans.map(plan=>`<article class="plan ${plan.destaque?'recommended':''}">${plan.destaque?'<span class="plan-badge">PARA MANTER O FOCO</span>':''}<p class="branch-card-unit">VÁRZEA DA PEDRA</p><h3>${escapeHTML(plan.nome)}</h3><span class="plan-price"><span class="currency">R$</span> ${plan.valor.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})}</span><span class="plan-period">${escapeHTML(plan.periodo)}</span><button class="button ${plan.destaque?'':'outline'}" data-varzea-plan="${plan.index}">Quero este plano</button></article>`).join('');
  grid.querySelectorAll('[data-varzea-plan]').forEach(button=>button.addEventListener('click',()=>contact(varzea.planos[Number(button.dataset.varzeaPlan)].nome,varzea.nome)));
}
renderVarzeaPlans();
document.querySelectorAll('[data-varzea-group]').forEach(button=>button.addEventListener('click',()=>{varzeaGroup=button.dataset.varzeaGroup;document.querySelectorAll('[data-varzea-group]').forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active));});renderVarzeaPlans();}));
const menu = document.getElementById('navigation');
const menuButton = document.getElementById('menu-button');
function closeMenu(){menu.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menu');}
menuButton.addEventListener('click', () => { const open = menu.classList.toggle('open'); menuButton.setAttribute('aria-expanded',String(open)); menuButton.setAttribute('aria-label',open ? 'Fechar menu' : 'Abrir menu'); });
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(tab) { tabs.forEach(item => {const active = item === tab;item.setAttribute('aria-selected',String(active));item.tabIndex=active?0:-1;document.getElementById(item.getAttribute('aria-controls')).hidden = !active;}); }
tabs.forEach((tab,index) => {tab.addEventListener('click',()=>selectTab(tab));tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(index+1)%tabs.length;if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;if(event.key==='Home')next=0;if(event.key==='End')next=tabs.length-1;if(next!==undefined){event.preventDefault();selectTab(tabs[next]);tabs[next].focus();}});});
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});});
document.getElementById('contact-plans').addEventListener('click',()=>{contactDialog.close();document.getElementById('planos').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});});
const lightbox=document.getElementById('gallery-dialog');
const lightboxImage=document.getElementById('lightbox-image');
const lightboxCaption=document.getElementById('lightbox-caption');
let galleryFilter='todos';
let galleryExpanded=false;
let lightboxPhotos=config.galeria;
let photoIndex=0;
function updateLightbox(){const photo=lightboxPhotos[photoIndex];lightboxImage.src=photo.src;lightboxImage.alt=photo.nome;lightboxCaption.textContent=photo.nome;document.getElementById('photo-counter').textContent=`${photoIndex+1} / ${lightboxPhotos.length}`;document.querySelector('.lightbox-controls').hidden=lightboxPhotos.length<2;}
function openPhotos(photos,index=0){lightboxPhotos=photos;photoIndex=index;updateLightbox();if(!lightbox.open)lightbox.showModal();}
function renderGallery(){
  const filtered=config.galeria.filter(photo=>galleryFilter==='todos'||photo.categoria===galleryFilter);
  const shown=galleryExpanded?filtered:filtered.slice(0,6);
  document.getElementById('photo-grid').innerHTML=shown.map((photo,index)=>`<button class="photo-tile" data-photo="${index}" aria-label="Ampliar foto: ${escapeHTML(photo.nome)}"><img src="${escapeHTML(photo.src)}" alt="${escapeHTML(photo.nome)} — Center Fitness" loading="lazy"><span>${escapeHTML(photo.nome)} <b>＋</b></span></button>`).join('');
  document.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>openPhotos(filtered,Number(button.dataset.photo))));
  document.getElementById('gallery-more').hidden=filtered.length<=6;
  document.getElementById('gallery-more').textContent=galleryExpanded?'Mostrar menos fotos':`Ver todas as ${filtered.length} fotos`;
}
renderGallery();
document.querySelectorAll('[data-gallery-filter]').forEach(button=>button.addEventListener('click',()=>{galleryFilter=button.dataset.galleryFilter;galleryExpanded=false;document.querySelectorAll('[data-gallery-filter]').forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active));});renderGallery();}));
document.getElementById('gallery-more').addEventListener('click',()=>{galleryExpanded=!galleryExpanded;renderGallery();if(!galleryExpanded)document.querySelector('.gallery-heading').scrollIntoView({block:'start'});});
document.getElementById('open-gallery').addEventListener('click',()=>openPhotos(config.galeria));
function stepPhoto(direction){photoIndex=(photoIndex+direction+lightboxPhotos.length)%lightboxPhotos.length;updateLightbox();}
document.getElementById('previous-photo').addEventListener('click',()=>stepPhoto(-1));
document.getElementById('next-photo').addEventListener('click',()=>stepPhoto(1));
lightbox.addEventListener('keydown',event=>{if(lightboxPhotos.length>1&&['ArrowLeft','ArrowRight'].includes(event.key)){event.preventDefault();stepPhoto(event.key==='ArrowLeft'?-1:1);}});
document.querySelectorAll('[data-material]').forEach(button=>button.addEventListener('click',()=>openPhotos([{src:`assets/${button.dataset.material}`,nome:button.dataset.caption}])));
if ('IntersectionObserver' in window) {const observer = new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){menu.querySelectorAll('a').forEach(link=>link.classList.toggle('current',link.hash===`#${entry.target.id}`));}});},{rootMargin:'-20% 0px -50% 0px'});document.querySelectorAll('main section[id]').forEach(section=>observer.observe(section));}
// Keep the opening focused on its main action and keep video controls clear.
if ('IntersectionObserver' in window) {
  const siteVideos = [...document.querySelectorAll('.video-frame video'), document.getElementById('inicio')].filter(Boolean);
  const floatingContact = document.querySelector('.floating-whatsapp');
  if (siteVideos.length && floatingContact) {
    const visibleVideos = new Set();
    const videoObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) visibleVideos.add(entry.target);
        else visibleVideos.delete(entry.target);
      });
      floatingContact.hidden = visibleVideos.size > 0;
    });
    siteVideos.forEach(video => videoObserver.observe(video));
  }
}
