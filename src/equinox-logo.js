import svgContent from "./logo_equinox_2025.svg?raw";

import styles from "./logo.module.css";

export function EquinoxLogo() {
  const logo = document.createElement("div");
  logo.classList.add(styles.logo);
  logo.innerHTML = svgContent;
  return logo;
}
