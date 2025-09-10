import { GridBrackground } from "./grid-background.js";
import { EquinoxLogo } from "./equinox-logo.js";

import "./style.css";

const app = document.querySelector("#app");
app.innerHTML = "";

const grid = GridBrackground();
const logo = EquinoxLogo();
app.appendChild(logo);
app.appendChild(grid);
