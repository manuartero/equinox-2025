import styles from "./register.module.css";

export function Register() {
  const form = document.createElement("form");
  form.className = styles.registerWrap;
  form.noValidate = true;

  const field = (label, type, name, placeholder, extraClass = "") => {
    const wrap = document.createElement("label");
    wrap.className = `${styles.field} ${extraClass}`;
    wrap.innerHTML = `
      <span class="${styles.label}">${label}</span>
      <input class="${styles.input}" type="${type}" name="${name}"
             autocomplete="${name}" placeholder="${placeholder}" />
    `;
    return wrap;
  };

  // ⬇️ Añadimos styles.full también al Nombre
  form.appendChild(field("Nombre", "text", "name", "Tu nombre", styles.full));
  form.appendChild(
    field("Email", "email", "email", "tu@correo.com", styles.full)
  );

  return form;
}
