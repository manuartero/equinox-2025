import styles from "./sticky-tag.module.css";

function Tag({ text, accent = false, onClick }) {
  const tag = document.createElement("div");
  tag.className = styles.stickyTag + (accent ? " " + styles.accent : "");
  tag.textContent = text;
  tag.setAttribute("data-text", text);
  tag.onclick = onClick;
  return tag;
}

export function StickyTags({ showRegistro, showAgenda }) {
  const tags = document.createElement("div");
  tags.className = styles.stickyTags;

  const registroTag = Tag({ text: "Registro", onClick: showRegistro });
  const agendaTag = Tag({ text: "Agenda", onClick: showAgenda });

  tags.appendChild(registroTag);
  tags.appendChild(agendaTag);

  return tags;
}
