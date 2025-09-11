import { GridBrackground } from "./grid-background.js";
import { EquinoxLogo } from "./equinox-logo.js";
import { StickyTags } from "./sticky-tag.js";

import "./style.css";

const app = document.querySelector("#app");
app.innerHTML = "";

const tags = StickyTags();
const logo = EquinoxLogo();
const grid = GridBrackground();

app.appendChild(tags);
app.appendChild(logo);
app.appendChild(grid);
