import { checkScore, startProgress } from "./affichage";

let finishQuestion = 0;

export function init() {
  let main = document.getElementById("main");
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
}

export function start(json, btn) {
  finishQuestion = 0;
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

// --- Fonctions d'extraction ---
function extractQuestion(data, nbQuestion) {
  return data[nbQuestion - 1].question;
}

function extractOptions(data, nbQuestion) {
  return data[nbQuestion - 1].options;
}

function extractCorrectIndex(data, nbQuestion) {
  return data[nbQuestion - 1].correctIndex;
}

// --- Affichage de la question ---
export function addQuestionHtml(data, nbQuestion, divID) {
  const question = extractQuestion(data, nbQuestion);
  const options = extractOptions(data, nbQuestion);

  const div = document.getElementById(divID);
  div.classList.add("questions");
  div.innerHTML = `<h3>${question}</h3>`;
  if (1 < extractCorrectIndex(data, nbQuestion).length) {
    div.innerHTML += `<div class="options-grid">`;
    options.forEach((option) => {
      div.innerHTML += `
      <label class="option-answers">
        <input type="checkbox" class="check-option">
        ${option}
      </label>`;
    });
    div.innerHTML += `</div>`;
  } else {
    div.innerHTML += `<div class="options-grid">`;
    options.forEach((option) => {
      div.innerHTML += `
      <label class="option-answers">
        <input type="radio" class="check-option" name="answerRadio">
        ${option}
      </label>`;
    });
    div.innerHTML += `</div>`;
  }

  div.innerHTML += `
   <div id="feedback-zone"></div>
    <div id="good-girl">
      <button id="valide" class="btn">Valider</button>
    </div>`;
}

// --- Gestion du bouton de validation ---
export function btnValide(data, nbQuestion, btnID, divID) {
  const btn = document.getElementById(btnID);

  btn.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll(".check-option");
    const checkOption = [];

    checkboxes.forEach((checkbox, index) => {
      if (checkbox.checked) checkOption.push(index);
    });

    if (checkOption.length > 0) {
      comparReponse(data, nbQuestion, checkOption, divID);

      finishQuestion += 1;
      startProgress(finishQuestion, data.length);
    }
  });
}

// --- Comparaison de la réponse ---
function comparReponse(data, nbQuestion, checkOption, divID) {
  const correctIndex = extractCorrectIndex(data, nbQuestion);

  if (arraysEqual(correctIndex, checkOption)) {
    goodGirl();
  } else {
    badGirl(data, nbQuestion);
  }
  if (nbQuestion < data.length) {
    const btn = document.getElementById("next-question");
    nextQuestion(data, nbQuestion, divID, btn);
  } else if (nbQuestion === data.length) {
    const btnScore = document.getElementById("next-question");
    btnScore.textContent = "Voir mon score";
    btnScore.addEventListener("click", () => {
      finalScren(divID, data);
    });
  }
}

// --- Vérification d'égalité de tableaux ---
/**
 * vérif
 * @param {*} a
 * @param {*} b
 * @returns
 */
function arraysEqual(a, b) {
  return a.length === b.length && a.every((val, i) => val === b[i]);
}

// --- Affichage bonne réponse ---
function goodGirl() {
  document.getElementById("feedback-zone").innerHTML = `
    <p>Bonne fille ✓</p>
  `;
  document.getElementById("good-girl").innerHTML = `
    <button id="next-question">Question suivante</button>
  `;
  goodAnswers++;
}
// affichage mauvaise reponses//
function badGirl(data, nbQuestion) {
  const question = data[nbQuestion - 1];
  const correctAnswers = question.correctIndex
    .map((index) => question.options[index])
    .join(", ");

  document.getElementById("feedback-zone").innerHTML = `
    <p>Mauvaise fille ✗</p>
    <p>La bonne réponse était : ${correctAnswers}</p>
  `;
  document.getElementById("good-girl").innerHTML = `
    <button id="next-question">Question suivante</button>
  `;
}

// --- Passage à la question suivante ---
function nextQuestion(data, nbQuestion, divID, btn) {
  btn.addEventListener("click", () => {
    addQuestionHtml(data, nbQuestion + 1, divID);
    btnValide(data, nbQuestion + 1, "valide", divID);
  });
}

function finalScren(divID, data) {
  const div = document.getElementById(divID);

  div.innerHTML = `
  <h3 id="congrat-message">Bravo pour avoir fini le test.</h3>
  <p id="score-id"> Ton score est de : ${calcScore(data, goodAnswers)}</p>
  <p id="message">${checkScore(goodAnswers, data)}</p>
  <button id="restart">Recommencer le quiz</button>
  <button id="btn-menu">Retour au menu</button>
  `;

  restart(data);
  returnMenu(data);
}

// --- Bounton recommencer ---
function restart(data) {
  const btnRestart = document.getElementById("restart");
  btnRestart.addEventListener("click", () => {
    finishQuestion = 0;
    goodAnswers = 0;
    startProgress(finishQuestion, data.length);
    addQuestionHtml(data, 1, "main");
    btnValide(data, 1, "valide", "main");
  });
}

function returnMenu(data) {
  const btnMenu = document.getElementById("btn-menu");
  btnMenu.addEventListener("click", () => {
    finishQuestion = 0;
    init();
    startProgress(0, data.length);
  });
}

export let goodAnswers = 0;
/**
 * Score
 * @param {*} data
 * @param {number} bonneReponses number of good answers
 * @returns
 */
export function calcScore(data, bonneReponses) {
  let nbsQuestion = data.length;
  let score = `${bonneReponses} / ${nbsQuestion}`;
  return score;
}
console.log(startProgress);
