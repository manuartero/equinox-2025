// equinox-logo.js
import styles from "./logo.module.css";
import svgContent from "./logo_equinox_2025.svg?raw";

export function EquinoxLogo() {
  const logo = document.createElement("div");
  logo.classList.add(styles.logo);
  logo.innerHTML = svgContent;

  const svg = logo.querySelector("svg");
  let maxEnd = 0;

  if (svg) {
    const paths = svg.querySelectorAll("path");
    paths.forEach((path, i) => {
      path.style.opacity = "0";
      const delay = 300 + Math.random() * 1200 + i * 100;
      const duration = 400 + Math.random() * 1200;
      const end = delay + duration;
      if (end > maxEnd) maxEnd = end;

      setTimeout(() => {
        path.style.transition = `opacity ${duration}ms ease`;
        path.style.opacity = "1";
      }, delay);
    });
  }

  // Notifica fin de animación (+ pequeño buffer)
  const notify = () =>
    logo.dispatchEvent(new CustomEvent("equinox:logoReady", { bubbles: true }));

  setTimeout(notify, (maxEnd || 0) + 60);

  return logo;
}
