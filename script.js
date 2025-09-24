// Theme toggle with persistence
const root = document.documentElement;
const modeToggle = document.getElementById('modeToggle');
const saved = localStorage.getItem('theme');
if (saved) document.documentElement.setAttribute('data-theme', saved);
modeToggle?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if (e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); }
  });
},{threshold:0.15});
revealEls.forEach(el=>io.observe(el));

// Counters
document.querySelectorAll('.metrics [data-count]').forEach(el=>{
  const target = parseFloat(el.dataset.count);
  const isFloat = !Number.isInteger(target);
  let start = 0; const duration = 900;
  const step = (ts, startTime)=>{
    if(!startTime) startTime = ts;
    const p = Math.min((ts - startTime)/duration, 1);
    const val = target * p;
    el.textContent = isFloat ? val.toFixed(1) : Math.round(val);
    if (p < 1) requestAnimationFrame((t)=>step(t, startTime));
  };
  requestAnimationFrame(step);
});

// Filters
const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('.card');
chips.forEach(chip=>{
  chip.addEventListener('click', ()=>{
    chips.forEach(c=>c.classList.remove('is-active'));
    chip.classList.add('is-active');
    const f = chip.dataset.filter;
    cards.forEach(card=>{
      const show = f === 'all' || card.dataset.tags.includes(f);
      card.style.display = show ? '' : 'none';
    });
  });
});

// Modals (native <dialog>)
document.querySelectorAll('[data-modal]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const id = btn.getAttribute('data-modal');
    const dlg = document.getElementById(id);
    if (dlg) dlg.showModal();
  });
});
document.querySelectorAll('[data-close]').forEach(btn=>{
  btn.addEventListener('click', ()=> btn.closest('dialog').close());
});
