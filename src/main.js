import "./style.css";
import gridStyles from "./grid.module.css";

function GridContainer() {
  const section = document.createElement("section");
  section.className = gridStyles.grid;
  return section;
}

document.body.appendChild(GridContainer());
