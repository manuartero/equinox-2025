import styles from "./tron-button.module.css";

/**
 * TronButton
 * @param {Object} opts
 * @param {string} opts.text        Texto del botón.
 * @param {Function} [opts.onClick] Handler de click (usa <button>).
 * @param {string} [opts.href]      Si lo pasas, usa <a> con ese href.
 * @param {"sm"|"md"|"lg"} [opts.size="md"] Tamaño.
 * @param {string} [opts.color]     Si quieres sobrescribir el azul (hex/rgb).
 */
export function TronButton({
  text = "Entrar",
  onClick,
  href,
  size = "md",
  color,
} = {}) {
  const el = href
    ? document.createElement("a")
    : document.createElement("button");

  // clase base + tamaño
  el.className = [styles.tron, styles[size] || styles.md].join(" ");

  // accesibilidad y semántica
  if (href) {
    el.href = href;
    el.role = "button";
  } else {
    el.type = "button";
  }

  // permitir color custom sin tocar el CSS
  if (color) {
    el.style.setProperty("--tron", color);
    // si pasas un rgb/rgba o hex, intentamos derivar rgb para el glow
    const toRgb = (c) => {
      if (!c) return null;
      const ctx = document.createElement("canvas").getContext("2d");
      ctx.fillStyle = c; // el canvas convierte a rgba
      const m = ctx.fillStyle.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
      return m ? `${m[1]}, ${m[2]}, ${m[3]}` : null;
    };
    const rgb = toRgb(color);
    if (rgb) el.style.setProperty("--tron-rgb", rgb);
  }

  // 4 bordes animados
  el.appendChild(document.createElement("span"));
  el.appendChild(document.createElement("span"));
  el.appendChild(document.createElement("span"));
  el.appendChild(document.createElement("span"));

  // texto
  el.appendChild(document.createTextNode(text));

  if (typeof onClick === "function") {
    el.addEventListener("click", onClick);
  }

  return el;
}
