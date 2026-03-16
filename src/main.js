import "./style.css";
import { addQuestionHtml, btnValide } from "./readJson.js";
const btn = document.getElementById("start-btn");
import {
  demarrerQuiz,
  questionSuivante,
  recommencerQuiz,
} from "./affichage.js";

fetch("/quiz.json")
  .then((response) => response.json())
  .then((data) => {
    btn.addEventListener("click", () => {
      addQuestionHtml(data.questions, 1, "main");
      btnValide(data.questions, 1, "valide", "main");
      demarrerQuiz();
    });
  })
  .catch((error) => console.error("Erreur :", error));
window.demarrerQuiz = demarrerQuiz;
window.questionSuivante = questionSuivante;
window.recommencerQuiz = recommencerQuiz;
