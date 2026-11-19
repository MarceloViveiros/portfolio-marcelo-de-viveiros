document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const dialog = document.getElementById('contactDialog');
document.getElementById('openContact').addEventListener('click', () => dialog.showModal());

document.getElementById('sendWhatsapp').addEventListener('click', (event) => {
  event.preventDefault();
  const type = document.getElementById('projectType').value;
  const goal = document.getElementById('projectGoal').value.trim() || 'Quero conversar para organizar melhor a ideia.';
  const name = document.getElementById('clientName').value.trim() || 'Visitante do portfólio';
  const message = `Olá, Marcelo! Meu nome é ${name}. Estou pensando em criar: ${type}.\n\nO que preciso: ${goal}\n\nPodemos conversar sobre o projeto?`;
  const whatsappUrl = `https://wa.me/5532991108603?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  document.getElementById('formStatus').textContent = 'Abrindo a conversa no WhatsApp…';
});

