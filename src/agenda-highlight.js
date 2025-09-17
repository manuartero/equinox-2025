/** @type {NodeJS.Timeout} */
var agendaInterval;

function updateAgendaHighlights() {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  document.querySelectorAll('.agenda .highlight').forEach((el) => el.classList.remove('highlight'));
  document.querySelectorAll('.agenda .agenda-column').forEach((column) => {
    const day = column.dataset.day;
    if (!day) return;
    const today = now.toISOString().split('T')[0];
    if (day !== today) return;
    column.querySelectorAll('.time').forEach((timeElement) => {
      const startTimeParts = timeElement.dataset.startTime.split(':');
      const timeInMinutes = parseInt(startTimeParts[0], 10) * 60 + parseInt(startTimeParts[1], 10);
      const endTimeData = timeElement.dataset.endTime;
      let endTimeInMinutes;
      if (endTimeData) {
        const endTimeParts = endTimeData.split(':');
        endTimeInMinutes = parseInt(endTimeParts[0], 10) * 60 + parseInt(endTimeParts[1], 10);
      } else {
        endTimeInMinutes = timeInMinutes + 30; // Default duration of 30 minutes if not specified
      }

      if (currentTime >= timeInMinutes && currentTime < endTimeInMinutes) {
        timeElement.parentElement?.classList.add('highlight');
      } else {
        timeElement.parentElement?.classList.remove('highlight');
      }
    });
  });
}

export function registerAgendaHighlight() {
  updateAgendaHighlights();
  agendaInterval = setInterval(() => {
    updateAgendaHighlights();
  }, 60_000);
}

export function unregisterAgendaHighlight() {
  if (agendaInterval) {
    clearInterval(agendaInterval);
  }
}

window.addEventListener('load', registerAgendaHighlight);
window.addEventListener('beforeunload', unregisterAgendaHighlight);
