// ============================================================
// affichage.js — Rendu HTML et gestion de l'interface
// ============================================================

import { state } from "./state.js";
import {
  start,
  extractQuestion,
  extractOptions,
  extractCorrectIndex,
} from "./readJson.js";
import { restart, returnMenu, calcScore } from "./quizLogic.js";

// --- Écran d'accueil / menu ---
export function init() {
  state.isInQuiz = false;
  const main = document.getElementById("main");
  main.innerHTML = `
    <section id="screen-start">
      <header>
        <h1>Quiz Queen</h1>
        <h2>Teste tes connaissances sur :</h2>
      </header>
      <div class="menu-buttons">
        <button id="btn-femme-scientifique">
          Les femmes scientifiques célèbres
        </button>
        <button id="btn-culture-transfem">La culture transfem</button>
      </div>
    </section>`;

  const btnFemmeScientifique = document.getElementById(
    "btn-femme-scientifique",
  );
  const btnCultureTransfem = document.getElementById("btn-culture-transfem");

  start("femme_scientifique.json", btnFemmeScientifique);
  start("culture_transfem.json", btnCultureTransfem);
  activeProgressBar();
}

// --- Affichage d'une question ---
export function addQuestionHtml(data, nbQuestion, divID) {
  const question = extractQuestion(data, nbQuestion);
  const options = extractOptions(data, nbQuestion);
  const correctIndex = extractCorrectIndex(data, nbQuestion);
  const div = document.getElementById(divID);
  const isMultiple = correctIndex.length > 1;
  const inputType = isMultiple ? "checkbox" : "radio";
  state.isInQuiz = true;
  activeProgressBar();

  div.classList.add("questions");
  div.innerHTML = `<h3>${question}</h3>`;

  let optionsHTML = `<div class="options-grid">`;
  options.forEach((option) => {
    optionsHTML += `
      <label class="option-answers">
        <input type="${inputType}" class="check-option"${!isMultiple ? ' name="answerRadio"' : ""}>
        ${option}
      </label>`;
  });
  optionsHTML += `</div>`;

  div.innerHTML += optionsHTML;
  div.innerHTML += `
    <div id="good-girl">
      <button id="valide" class="btn">Valider</button>
    </div>`;
}

// --- Affichage bonne réponse ---
export function goodGirl(divID) {
  const div = document.getElementById(divID);
  div.innerHTML = `
    <div id="answerMessage">
      <p>Bonne fille</p>
    </div>
    <button id="next-question">Question suivante</button>
  `;
  state.goodAnswers++;
}

// --- Affichage mauvaise réponse avec la correction ---
export function badGirl(divID, data, nbQuestion) {
  const div = document.getElementById(divID);
  const question = data[nbQuestion - 1];
  const correctAnswers = question.correctIndex
    .map((index) => question.options[index])
    .join(", ");
  div.innerHTML = `
    <div id="answerMessage">
      <p>Mauvaise fille</p>
      <p>La bonne réponse était :${correctAnswers}</p>
    </div>
    <button id="next-question">Question suivante</button>
  `;
}

// --- Mise à jour de la barre de progression ---
export function startProgress(finishQuestion, total) {
  const bar = document.getElementById("bar");
  const percent = Math.round((finishQuestion / total) * 100);
  bar.style.width = percent + "%";
  bar.textContent = percent + "% de progression";
}

// --- Message selon le score ---
export function checkScore(goodAnswers, data) {
  const score = (goodAnswers / data.length) * 100;
  if (score === 0) return "Oups ! Tu n'as trouvé aucune bonne réponse 😱";
  if (score < 50)
    return "Aïe, tu as beaucoup d'erreurs, tu devrais réessayer 😅";
  if (score <= 79) return "C'est pas mal, mais tu peux encore t'améliorer 💪";
  if (score <= 99) return "C'est bien, tu as fait peu d'erreurs 😉";
  return "Aucune erreur, c'est parfait 😎";
}

// --- Écran final avec score ---
export function finalScren(divID, data) {
  const div = document.getElementById(divID);
  div.innerHTML = `
    <h3 id="congrat-message">Bravo pour avoir fini le test.</h3>
    <p id="message">${checkScore(state.goodAnswers, data)}</p>
    <p id="score-id">Ton score est de : ${calcScore(data, state.goodAnswers)}</p>
    <button id="restart">Recommencer le quiz</button>
    <button id="btn-menu">Retour au menu</button>
  `;
  restart(data);
  returnMenu(data);
}

export function activeProgressBar() {
  const bar = document.getElementById("bar");
  const container = document.getElementById("container");

  if (state.isInQuiz) {
    bar.style.display = "block";
    container.style.display = "block";
    if (!bar.classList.contains("bar")) {
      bar.classList.add("bar");
    }
    if (!container.classList.contains("container")) {
      container.classList.add("container");
    }
  } else {
    bar.style.display = "none";
    container.style.display = "none";
    if (bar.classList.contains("bar")) {
      bar.classList.remove("bar");
    }
    if (container.classList.contains("container")) {
      container.classList.remove("container");
    }
  }
}
