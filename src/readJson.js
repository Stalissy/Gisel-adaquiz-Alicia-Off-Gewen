import { addQuestionHtml } from "./affichage.js";
import { btnValide } from "./quizLogic.js";

export function start(json, btn) {
  finishQuestion = 0;
  fetch(`/${json}`)
    .then((response) => response.json())
    .then((data) => {
      btn.addEventListener("click", () => {
        data = data.questions;
        addQuestionHtml(data, 1, "main");
        btnValide(data, 1, "valide", "main");
      });
    })
    .catch((error) => console.error("Erreur :", error));
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
