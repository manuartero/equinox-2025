import svgContent from "./logo_equinox_2025.svg?raw";

import styles from "./logo.module.css";

export function EquinoxLogo() {
  const logo = document.createElement("div");
  logo.classList.add(styles.logo);
  logo.innerHTML = svgContent;

  // Animate each path
  const svg = logo.querySelector("svg");
  if (svg) {
    const paths = svg.querySelectorAll("path");
    paths.forEach((path, i) => {
      // Initial state: hidden
      path.style.opacity = "0";
      // Randomize delay and duration
      const delay = 300 + Math.random() * 1200 + i * 100;
      const duration = 400 + Math.random() * 1200;
      setTimeout(() => {
        path.style.transition = `opacity ${duration}ms ease`;
        path.style.opacity = "1";
      }, delay);
    });
  }
  return logo;
}
