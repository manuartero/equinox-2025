import styles from "./agenda.module.css";

const AGENDA= [
  {
    date: "2025-09-25",
    label: "Jueves 25 de Septiembre",
    items: [
      { title: "Welcome", start: "12:00", end: "12:30" },
      { title: "Trivial Time", start: "15:00", end: "16:00" },
      { title: "Ping Pong Championship", start: "19:00", end: "20:00" },
      { title: "Dinner Pizza", start: "20:00", end: "21:00" }
    ]
  },
  {
    date: "2025-09-26",
    label: "Viernes 26 de Septiembre",
    items: [
      { title: "Limit to Submit Projects", start: "13:00", end: "13:30" },
      { title: "Final Presentation", start: "13:30", end: "14:00" }
    ]
  }
]

export function Agenda() {
  const container = document.createElement("div");
  container.className = styles.agendaContainer;

  AGENDA.forEach((day) => {
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
