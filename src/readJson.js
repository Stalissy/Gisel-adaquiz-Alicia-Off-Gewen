// ============================================================
// readJson.js — Chargement et extraction des données JSON
// ============================================================

import { state, resetState } from "./state.js";

// --- Chargement du JSON et démarrage ---
export function start(json, btn) {
  fetch(`/${json}`)
    .then((response) => response.json())
    .then((data) => {
      btn.addEventListener("click", () => {
        // Import dynamique pour éviter la circularité
        import("./affichage.js").then(({ addQuestionHtml }) => {
          import("./quizLogic.js").then(({ btnValide }) => {
            resetState();
            state.currentData = data.questions;
            state.totalQuestions = data.questions.length;
            addQuestionHtml(state.currentData, 1, "main");
            btnValide(state.currentData, 1, "valide", "main");
          });
        });
      });
    })
    .catch((error) => console.error("Erreur lors du chargement du JSON :", error));
}

// --- Fonctions d'extraction ---
export function extractQuestion(data, nbQuestion) {
  return data[nbQuestion - 1].question;
}

export function extractOptions(data, nbQuestion) {
  return data[nbQuestion - 1].options;
}

export function extractCorrectIndex(data, nbQuestion) {
  return data[nbQuestion - 1].correctIndex;
}
