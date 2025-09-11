import styles from "./sticky-tag.module.css";

function Tag({ text, accent = false }) {
  const tag = document.createElement("div");
  tag.className = styles.stickyTag + (accent ? " " + styles.accent : "");
  tag.textContent = text;
  tag.setAttribute("data-text", text);
  return tag;
}

export function StickyTags() {
  const tags = document.createElement("div");
  tags.className = styles.stickyTags;

  const registroTag = Tag({ text: "Registro" });
  const agendaTag = Tag({ text: "Agenda" });

  tags.appendChild(registroTag);
  tags.appendChild(agendaTag);

  return tags;
}
