const panel = document.querySelector('.hero-visual');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
panel.addEventListener('pointermove', event => {
  if (reducedMotion.matches) return;
  const bounds = panel.getBoundingClientRect();
  panel.style.setProperty('--x', (event.clientX - bounds.left) / bounds.width * 100 + '%');
  panel.style.setProperty('--y', (event.clientY - bounds.top) / bounds.height * 100 + '%');
});

const filter = document.querySelector('#vitrine');
function updateStore() {
  const cards = [...document.querySelectorAll('.project-grid .project')];
  for (const card of cards) {
    card.hidden = filter.value === 'public' && !card.matches('.public-project') ||
      filter.value === 'systems' && !card.matches('.featured,.commission-project,.dark-project');
  }
  document.querySelector('#total').value = cards.filter(card => !card.hidden).length + ' projetos';
}
filter.addEventListener('change', updateStore);
updateStore();

const track = document.querySelector('.note-track');
function movePost(direction) {
  const step = track.children[1].offsetLeft - track.children[0].offsetLeft;
  const end = track.scrollWidth - track.clientWidth;
  let left = track.scrollLeft + direction * step;
  if (direction > 0 && track.scrollLeft >= end - 2) left = 0;
  if (direction < 0 && track.scrollLeft < 2) left = end;
  track.scrollTo({left, behavior: reducedMotion.matches ? 'instant' : 'smooth'});
}
document.querySelector('#prevNote').onclick = () => movePost(-1);
document.querySelector('#nextNote').onclick = () => movePost(1);
