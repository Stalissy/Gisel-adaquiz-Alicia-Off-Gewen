import "./style.css";
import { start } from "./readJson.js";

const btnFemmeScientifique = document.getElementById("btn-femme-scientifique");
const btnCultureTransfem = document.getElementById("btn-culture-transfem");

start("femme_scientifique.json", btnFemmeScientifique);
start("culture_transfem.json", btnCultureTransfem);
