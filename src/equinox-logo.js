import styles from "./logo.module.css";

import svgContent from "./logo_equinox_2025.svg?raw";

export function EquinoxLogo() {
  const logo = document.createElement("div");
  logo.classList.add(styles.logo);
  logo.innerHTML = svgContent;
  return logo;
}
