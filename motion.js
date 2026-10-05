'use strict';
(() => {
  const settings = window.ACADEMIA.abertura || {};
  const enabled = window.ACADEMIA.animacoes !== false;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const mobileVideo = window.matchMedia('(max-width: 640px)');
  const hero = document.getElementById('inicio');
  const backdrop = hero.querySelector('.hero-image');
  const video = document.getElementById('hero-background-video');
  const control = document.getElementById('hero-motion-control');
  const progress = document.querySelector('.reading-progress');
  const header = document.querySelector('.header');
  let userPaused = false;
  let heroVisible = true;
  let framePending = false;
  let activeCard = null;
  let pointerFrame = 0;
  let pointerState = null;
  const canAnimate = () => enabled && !reduced.matches;

  hero.style.setProperty('--hero-position', settings.posicao || '68% center');
  hero.style.setProperty('--hero-intensity', Math.max(0,Math.min(1,Number(settings.intensidade ?? .9))));
  video.muted = true;
  function loadBackdrop() {
    const poster = (mobileVideo.matches && settings.imagemCelular) || settings.imagemReserva || 'assets/academia-panorama.webp';
    backdrop.style.backgroundImage = `url("${poster}")`;
    video.poster = poster;
    const source = (mobileVideo.matches && settings.videoCelular) || settings.video;
    if (source) video.querySelector('source').src = source;
    video.load();
  }
  mobileVideo.addEventListener('change', loadBackdrop);
  loadBackdrop();

  function showControl() {
    control.textContent = userPaused || video.paused ? 'Ativar animação' : 'Pausar animação';
    control.setAttribute('aria-pressed', String(userPaused || video.paused));
  }
  function updatePlayback() {
    if (canAnimate() && !userPaused && heroVisible && !document.hidden) {
      video.play().then(showControl).catch(showControl);
    } else { video.pause(); showControl(); }
  }
  video.addEventListener('loadeddata', () => {backdrop.classList.add('has-video');control.hidden = false; updatePlayback();});
  video.addEventListener('error', () => {video.hidden = true; control.hidden = true;});
  control.addEventListener('click', () => {
    userPaused = !video.paused;
    // A person can explicitly play the background even with reduced motion enabled.
    if (!userPaused && !canAnimate()) video.play().then(showControl).catch(showControl);
    else updatePlayback();
  });
  document.addEventListener('visibilitychange', updatePlayback);
  if ('IntersectionObserver' in window) {
    const heroObserver = new IntersectionObserver(entries => {
      heroVisible = entries[0].isIntersecting;
      updatePlayback();
    });
    heroObserver.observe(hero);
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {threshold:.08,rootMargin:'0px 0px -25px 0px'});
    document.querySelectorAll('.section-heading,.gallery-main,.feature-stack article,.gallery-heading,.photo-grid,.plan-grid,.benefits-banner,.video-tour,.story-visual,.story-copy,.branch-overview,.branch-materials,.visit-grid,.community-copy,.community-poster,.faqs details,.final-cta .wrap').forEach((element,index) => {
      element.classList.add('motion-reveal');
      element.style.setProperty('--reveal-delay', `${(index % 3) * 70}ms`);
      revealObserver.observe(element);
    });
  }
  function updateScroll() {
    framePending = false;
    const travel = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${travel > 0 ? Math.min(1,window.scrollY/travel) : 0})`;
    header.classList.toggle('is-scrolled',window.scrollY > 30);
  }
  const queueScroll = () => {if(!framePending){framePending=true;requestAnimationFrame(updateScroll);}};
  window.addEventListener('scroll', queueScroll, {passive:true});
  window.addEventListener('resize', queueScroll, {passive:true});
  function resetCard() {
    if(activeCard){activeCard.style.setProperty('--tilt-x','0deg');activeCard.style.setProperty('--tilt-y','0deg');activeCard=null;}
  }
  document.querySelector('main').addEventListener('pointermove', event => {
    if(!canAnimate() || !finePointer.matches) return;
    const card = event.target.closest('.plan,.photo-tile,.branch-poster,.benefit-provider,.hours-card,.branch-location,.location-card,.community-poster');
    pointerState={card,x:event.clientX,y:event.clientY,inHero:hero.contains(event.target)};
    if(pointerFrame) return;
    pointerFrame=requestAnimationFrame(() => {
      pointerFrame=0;
      const state=pointerState;
      if(activeCard!==state.card) resetCard();
      if(state.card){
        activeCard=state.card;
        const rect=state.card.getBoundingClientRect();
        const x=Math.max(0,Math.min(1,(state.x-rect.left)/rect.width));
        const y=Math.max(0,Math.min(1,(state.y-rect.top)/rect.height));
        state.card.style.setProperty('--card-x',`${x*100}%`);
        state.card.style.setProperty('--card-y',`${y*100}%`);
        state.card.style.setProperty('--tilt-x',`${(0.5-y)*4}deg`);
        state.card.style.setProperty('--tilt-y',`${(x-0.5)*4}deg`);
      }
      if(state.inHero){const rect=hero.getBoundingClientRect();hero.style.setProperty('--spot-x',`${(state.x-rect.left)/rect.width*100}%`);hero.style.setProperty('--spot-y',`${(state.y-rect.top)/rect.height*100}%`);}
    });
  },{passive:true});
  document.querySelector('main').addEventListener('pointerleave',resetCard);
  document.querySelector('main').addEventListener('pointerout',event => {if(activeCard && !activeCard.contains(event.relatedTarget)) resetCard();});
  function setMotion() {document.body.classList.toggle('motion-enabled',canAnimate());document.body.classList.toggle('motion-disabled',!canAnimate());resetCard();updatePlayback();updateScroll();}
  reduced.addEventListener('change',setMotion);
  setMotion();
})();
