import { GridBrackground } from "./grid-background.js";
import { EquinoxLogo } from "./equinox-logo.js";
import { StickyTags } from "./sticky-tag.js";
import { Agenda } from "./agenda.js";

import "./style.css";

const app = document.querySelector("#app");
app.innerHTML = "";

const showAgenda = (ev) => {};
const showRegistro = (ev) => {};

const agenda = Agenda();
const tags = StickyTags({ showAgenda, showRegistro });
const logo = EquinoxLogo();
const grid = GridBrackground();

app.appendChild(tags);
app.appendChild(logo);
app.appendChild(grid);
app.appendChild(agenda);
