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
    const letterOrder = ['E', 'Q', 'U', 'I', 'N', 'O', 'X'];
    
    letterOrder.forEach((letterId, letterIndex) => {
      const letterGroup = svg.querySelector(`#${letterId}`);
      if (!letterGroup) return;
      
      const paths = letterGroup.querySelectorAll("path");
      
      paths.forEach((path, pathIndex) => {
        const pathLength = path.getTotalLength();
        
        path.style.strokeDasharray = pathLength;
        path.style.strokeDashoffset = pathLength;
        
        const letterDelay = letterIndex * 500;
        const pathDelay = pathIndex * 100;
        const totalDelay = 300 + letterDelay + pathDelay;
        
        const duration = 800;
        const end = totalDelay + duration;

        if (end > maxEnd) {
          maxEnd = end;
        }
        
        setTimeout(() => {
          path.style.transition = `stroke-dashoffset ${duration}ms ease-out`;
          path.style.strokeDashoffset = "0";
        }, totalDelay);
      });
    });
  }

  // Notifica fin de animación (+ pequeño buffer)
  const notify = () =>
    logo.dispatchEvent(new CustomEvent("equinox:logoReady", { bubbles: true }));

  setTimeout(notify, (maxEnd || 0) + 60);

  return logo;
}
