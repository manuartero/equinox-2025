import styles from "./grid.module.css";

export function GridBrackground() {
  const section = document.createElement("section");
  section.className = styles.grid;
  return section;
}
