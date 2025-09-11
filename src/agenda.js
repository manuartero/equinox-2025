import styles from "./agenda.module.css";

export function Agenda() {
  // Load agenda.json from public folder using XMLHttpRequest
  const container = document.createElement("div");
  container.className = styles.agendaContainer;

  const request = new XMLHttpRequest();
  request.open("GET", "/agenda.json", false); // synchronous
  request.send(null);
  let agenda = [];
  if (request.status === 200) {
    agenda = JSON.parse(request.responseText);
  }

  agenda.forEach((day) => {
    const col = document.createElement("div");
    col.className = styles.agendaColumn;

    const title = document.createElement("div");
    title.className = styles.agendaTitle;
    title.textContent = day.label;
    col.appendChild(title);

    day.items.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = styles.agendaItem;
      itemDiv.textContent = item.title;
      if (item.start && item.end) {
        const timeDiv = document.createElement("div");
        timeDiv.className = styles.agendaTime;
        timeDiv.textContent = `${item.start} ~ ${item.end}`;
        itemDiv.appendChild(timeDiv);
      }
      col.appendChild(itemDiv);
    });

    container.appendChild(col);
  });

  return container;
}
