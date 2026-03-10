import "./style.css";
import { addQuestionHtml, btnValide } from "./readJson.js";

// Charge un fichier
fetch("/quiz.json")
  // Trensforme le texte JSON en objet JS
  .then((response) => response.json())
  // Dévini la variable data comme étant l'objet JS
  .then((data) => {
    addQuestionHtml(data.questions, 1, "app");
    btnValide(data.questions, 1, "valide");
  })
  .catch((error) => console.error("Erreur:", error));
