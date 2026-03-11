import "./style.css";
import { addQuestionHtml, btnValide } from "./readJson.js";

const btnFemmeScientifique = document.getElementById("btn-femme-scientifique");
const btnCultureTransfem = document.getElementById("btn-culture-transfem");

start("femme_scientifique.json", btnFemmeScientifique);
start("culture_transfem.json", btnCultureTransfem);

function start(json, btn) {
  fetch(`/${json}`)
    .then((response) => response.json())
    .then((data) => {
      btn.addEventListener("click", () => {
        addQuestionHtml(data.questions, 1, "main");
        btnValide(data.questions, 1, "valide", "main");
      });
    })
    .catch((error) => console.error("Erreur :", error));
}
