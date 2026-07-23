/* Loader */
  window.addEventListener('load', () => {
    const fill = document.getElementById('loaderFill');
    requestAnimationFrame(() => { fill.style.transition = 'width 900ms cubic-bezier(.2,.8,.2,1)'; fill.style.width = '100%'; });
    setTimeout(() => document.getElementById('loader').classList.add('hide'), 1000);
  });

  /* Custom cursor */
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  const spotlight = document.getElementById('spotlight');
  let mx=0,my=0, rx=0, ry=0;
  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    spotlight.style.setProperty('--mx', mx + 'px');
    spotlight.style.setProperty('--my', my + 'px');
  });
  function animRing(){
    rx += (mx-rx)*0.16; ry += (my-ry)*0.16;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(animRing);
  }
  animRing();
  document.querySelectorAll('a, button, [data-magnetic]').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('active'));
    el.addEventListener('mouseleave', () => ring.classList.remove('active'));
  });

  /* Magnetic buttons */
  document.querySelectorAll('[data-magnetic]').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const relX = e.clientX - r.left - r.width/2;
      const relY = e.clientY - r.top - r.height/2;
      el.style.transform = `translate(${relX*0.25}px, ${relY*0.25}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });

  /* Tilt effect on project cards */
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(800px) rotateX(${py * -6}deg) rotateY(${px * 8}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  /* Scroll progress */
  const progress = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progress.style.width = pct + '%';
    document.getElementById('back-top').classList.toggle('show', h.scrollTop > 600);
  });

  /* Back to top */
  document.getElementById('back-top').addEventListener('click', () => {
    window.scrollTo({top:0, behavior:'smooth'});
  });

  /* Section dot indicator */
  const dots = document.querySelectorAll('#sectionDots span');
  const sections = [...dots].map(d => document.getElementById(d.dataset.target));
  const dotObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const idx = sections.indexOf(entry.target);
      if(entry.isIntersecting && idx !== -1){
        dots.forEach(d => d.classList.remove('active'));
        dots[idx].classList.add('active');
      }
    });
  }, {threshold:0.5});
  sections.forEach(s => s && dotObserver.observe(s));
  dots.forEach(d => d.addEventListener('click', () => {
    document.getElementById(d.dataset.target).scrollIntoView({behavior:'smooth'});
  }));

  /* Reveal on scroll */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('visible'); });
  }, {threshold:0.15});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));