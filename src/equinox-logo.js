import styles from "./logo.module.css";
import logoSrc from "./logo_equinox_2025.svg";

export function EquinoxLogo() {
  const logo = document.createElement("img");
  logo.src = logoSrc;
  logo.alt = "Equinox 2025 Logo";
  logo.className = styles.logo;
  return logo;
}
