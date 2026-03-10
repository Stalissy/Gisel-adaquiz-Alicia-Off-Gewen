import "./style.css";
import { addQuestionHtml, btnValide } from "./readJson.js";

fetch("/quiz.json")
  .then((response) => response.json())
  .then((data) => {
    addQuestionHtml(data.questions, 1, "app");
    btnValide(data.questions, 1, "valide");
  })
  .catch((error) => console.error("Erreur:", error));
