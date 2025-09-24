document.addEventListener('DOMContentLoaded', function() {
  const timeChangedElement = document.querySelector('.time-changed');
  const agendaSection = document.querySelector('#agenda');

  if (timeChangedElement && agendaSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            timeChangedElement.classList.remove('time-changed');
          }, 4000);
          observer.unobserve(agendaSection);
        }
      });
    }, {
      threshold: 0.3
    });

    observer.observe(agendaSection);
  }
});
