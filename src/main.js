import { Agenda } from "./agenda.js";
import ctaStyles from "./cta-row.module.css";
import { EquinoxLogo } from "./equinox-logo.js";
import { Register } from "./register.js";
import { GridBrackground } from "./grid-background.js";
import { TronButton } from "./tron-button.js";

import "./style.css";

const app = document.querySelector("#app");
app.innerHTML = "";

/* ----- estructura: logo + contenido central + botones ----- */
const stage = document.createElement("div");
stage.className = "equi-stage";

const hero = document.createElement("div");
hero.className = "equi-hero";

const contentSlot = document.createElement("div");
contentSlot.className = "equi-content-slot";

const ctaRow = document.createElement("div");
ctaRow.className = `${ctaStyles.row} equi-ctas`;

const logo = EquinoxLogo();
hero.appendChild(logo);

const grid = GridBrackground();

stage.appendChild(hero);
stage.appendChild(contentSlot);
stage.appendChild(ctaRow);
app.appendChild(stage);
app.appendChild(grid);

/* ----- utilidades ----- */
let hasOpened = false;
let btnRegistro, btnAgenda;

function setActive(btn) {
  [btnRegistro, btnAgenda].forEach((b) => b && (b.dataset.active = ""));
  if (btn) btn.dataset.active = "1"; // TronButton: estilo activo = hover + texto blanco
}

function showView(view) {
  contentSlot.innerHTML = "";
  const el = view === "agenda" ? Agenda() : Register();
  contentSlot.appendChild(el);
  contentSlot.classList.add("equi-content-slot--show");
  requestAnimationFrame(() =>
    contentSlot.classList.remove("equi-content-slot--show")
  );
}

/* ----- flujo: tras la animación del logo ----- */
logo.addEventListener("equinox:logoReady", () => {
  // Botón Registro
  btnRegistro = TronButton({ text: "Registro" });
  btnRegistro.classList.add(ctaStyles.animate);
  btnRegistro.dataset.cta = "registro";
  ctaRow.appendChild(btnRegistro);

  btnRegistro.addEventListener("click", (ev) => {
    ev.preventDefault();

    if (!hasOpened) {
      // Abrimos “escenario”: logo arriba, botones abajo, hueco central
      stage.classList.add("equi-stage--open");
      hero.classList.add("equi-hero--shrink");
      ctaRow.classList.add("equi-ctas--drop");

      // Creamos el segundo botón (Agenda)
      btnAgenda = TronButton({ text: "Agenda" });
      btnAgenda.dataset.cta = "secundario";
      btnAgenda.classList.add(ctaStyles.animate, ctaStyles.enterFromRight);
      ctaRow.appendChild(btnAgenda);
      requestAnimationFrame(() =>
        btnAgenda.classList.remove(ctaStyles.enterFromRight)
      );

      btnAgenda.addEventListener("click", (e) => {
        e.preventDefault();
        showView("agenda");
        setActive(btnAgenda);
      });

      hasOpened = true;
    }

    // Mostrar Register y dejar Registro activo
    showView("register");
    setActive(btnRegistro);
  });
});
