class FAQManager {
  constructor() {
    this.faqData = null;
    this.init();
  }

  async init() {
    await this.loadFAQData();
    this.renderFAQ();
    this.setupEventListeners();
  }

  async loadFAQData() {
    try {
      const response = await fetch('/faqs.json');
      this.faqData = await response.json();
    } catch (error) {
      console.error('Error loading FAQ data:', error);
    }
  }

  renderFAQ() {
    const faqContainer = document.querySelector('.faq-container');
    if (!faqContainer || !this.faqData) return;

    faqContainer.innerHTML = '';

    this.faqData.faqs.forEach((section, sectionIndex) => {
      const sectionElement = this.createFAQSection(section, sectionIndex);
      faqContainer.appendChild(sectionElement);
    });
  }

  createFAQSection(section, sectionIndex) {
    const sectionDetails = document.createElement('details');
    sectionDetails.className = 'faq-section';
    sectionDetails.setAttribute('data-section', sectionIndex);

    const sectionSummary = document.createElement('summary');
    sectionSummary.className = 'faq-section-header';
    sectionSummary.innerHTML = `
      <h3 class="faq-section-title">${section.title}</h3>
      <span class="faq-section-icon">+</span>
    `;

    const questionsContainer = document.createElement('div');
    questionsContainer.className = 'faq-questions';

    section.questions.forEach((item, questionIndex) => {
      const questionElement = this.createFAQQuestion(item, sectionIndex, questionIndex);
      questionsContainer.appendChild(questionElement);
    });

    sectionDetails.appendChild(sectionSummary);
    sectionDetails.appendChild(questionsContainer);

    return sectionDetails;
  }

  createFAQQuestion(item, sectionIndex, questionIndex) {
    const questionDetails = document.createElement('details');
    questionDetails.className = 'faq-question';
    questionDetails.setAttribute('data-question', `${sectionIndex}-${questionIndex}`);

    const questionSummary = document.createElement('summary');
    questionSummary.className = 'faq-question-header';
    questionSummary.innerHTML = `
      <span class="faq-question-text">${item.question}</span>
      <span class="faq-question-icon">▼</span>
    `;

    const answerDiv = document.createElement('div');
    answerDiv.className = 'faq-answer';
    answerDiv.innerHTML = `
      <p class="faq-answer-text">${item.answer}</p>
    `;

    questionDetails.appendChild(questionSummary);
    questionDetails.appendChild(answerDiv);

    return questionDetails;
  }

  setupEventListeners() {
    // Section accordion behavior
    document.querySelectorAll('.faq-section').forEach((section) => {
      section.addEventListener('toggle', (e) => {
        if (section.open) {
          // Close all other sections when one opens
          document.querySelectorAll('.faq-section').forEach((otherSection) => {
            if (otherSection !== section && otherSection.open) {
              otherSection.open = false;
              // Close all questions in the closing section
              otherSection.querySelectorAll('.faq-question').forEach((question) => {
                question.open = false;
              });
            }
          });
        } else {
          // Close all questions when section closes
          section.querySelectorAll('.faq-question').forEach((question) => {
            question.open = false;
          });
        }
      });
    });

    // Question accordion behavior within each section
    document.querySelectorAll('.faq-question').forEach((question) => {
      question.addEventListener('toggle', (e) => {
        if (question.open) {
          const section = question.closest('.faq-section');
          // Close all other questions in the same section
          section.querySelectorAll('.faq-question').forEach((otherQuestion) => {
            if (otherQuestion !== question && otherQuestion.open) {
              otherQuestion.open = false;
            }
          });
        }
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new FAQManager();
});
