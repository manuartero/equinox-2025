// local testing
const now = new Date();

// Fake current date for testing
// data-day="2025-09-25">
// data-start-time="17:30">17:30</p>
// const now = new Date('2025-09-25T17:30:00');

function parseTimeToMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

function getEndTimeInMinutes(timeElement, startTimeInMinutes) {
  const endTimeData = timeElement.dataset.endTime;
  if (endTimeData) {
    return parseTimeToMinutes(endTimeData);
  }
  return startTimeInMinutes + 30; // Default duration
}

function isCurrentSlot(currentTime, startTime, endTime) {
  return currentTime >= startTime && currentTime < endTime;
}

function highlightAgendaSlot(timeElement, highlight) {
  if (highlight) {
    timeElement.parentElement?.classList.add('highlight');
  } else {
    timeElement.parentElement?.classList.remove('highlight');
  }
}

function activateAgendaHighlighting() {
  const interval = setInterval(() => {
    const currentTime = now.getHours() * 60 + now.getMinutes();
    document.querySelectorAll('.agenda .highlight').forEach((el) => el.classList.remove('highlight'));
    document.querySelectorAll('.agenda .agenda-column').forEach((column) => {
      const day = column.dataset.day;
      if (!day) return;

      const today = now.toISOString().split('T')[0];
      if (day !== today) return;

      column.querySelectorAll('.time').forEach((timeElement) => {
        const startTime = parseTimeToMinutes(timeElement.dataset.startTime);
        const endTime = getEndTimeInMinutes(timeElement, startTime);

        const highlight = isCurrentSlot(currentTime, startTime, endTime);

        highlightAgendaSlot(timeElement, highlight);
      });
    });
  }, 60_000);

  window.addEventListener('beforeunload', () => clearInterval(interval));
  return interval;
}

activateAgendaHighlighting();
