class ScrollIndicator {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (scrollIndicator) {
      scrollIndicator.addEventListener('click', this.smoothScrollToContent);

      scrollIndicator.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.smoothScrollToContent();
        }
      });

      scrollIndicator.setAttribute('tabindex', '0');
      scrollIndicator.setAttribute('role', 'button');
      scrollIndicator.setAttribute('aria-label', 'Scroll to content');
    }
  }

  smoothScrollToContent() {
    const agendaSection = document.querySelector('#agenda');

    if (agendaSection) {
      agendaSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ScrollIndicator();
});
