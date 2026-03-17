import { checkScore } from "./affichage";
export function init() {
  main = document.getElementById("main");
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
    options.forEach((option) => {
      div.innerHTML += `
      <label>
        <input type="checkbox" class="check-option">
        ${option}
      </label><br>`;
    });
  } else {
    options.forEach((option) => {
      div.innerHTML += `
      <label>
        <input type="radio" class="check-option" name="answerRadio">
        ${option}
      </label><br>`;
    });
  }

  div.innerHTML += `
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
    }
  });
}

// --- Comparaison de la réponse ---
function comparReponse(data, nbQuestion, checkOption, divID) {
  const correctIndex = extractCorrectIndex(data, nbQuestion);

  if (arraysEqual(correctIndex, checkOption)) {
    goodGirl("good-girl");
  } else {
    badGirl("good-girl", data, nbQuestion);
  }
  if (nbQuestion < data.length) {
    const btn = document.getElementById("nextQuestion");
    nextQuestion(data, nbQuestion, divID, btn);
  } else if (nbQuestion === data.length) {
    const btnScore = document.getElementById("nextQuestion");
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
function goodGirl(divID) {
  const div = document.getElementById(divID);
  div.innerHTML = `
    <p>Bonne fille</p>
    <button id="nextQuestion">Question suivante</button>
  `;
  goodAnswers++;
  console.log(goodAnswers);
}

// --- Mauvaise réponse affichage de la bonne reponses ---
function badGirl(divID, data, nbQuestion) {
  const div = document.getElementById(divID);
  const question = data[nbQuestion - 1];
  const correctAnswers = question.correctIndex
    .map((index) => question.options[index])
    .join(", ");

  div.innerHTML = `
    <p>Mauvaise fille</p>
     <p>La bonne réponse était : <strong>${correctAnswers}</strong></p>
    <button id="nextQuestion">Question suivante</button>
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
  <h3 id="congratMessage">Bravo pour avoir fini le test.</h3>
  <p id="scoreid"> Ton score est de : ${calcScore(data, goodAnswers)}</p>
  <p id="message">${checkScore(goodAnswers, data)}</p>
  <button id="restart">Recommencer le quiz</button>
  <button id="btnMenu">Retour au menu</button>
  `;

  restart(data);
  returnMenu();
}

// --- Bounton recommencer ---
function restart(data) {
  const btnRestart = document.getElementById("restart");
  btnRestart.addEventListener("click", () => {
    goodAnswers = 0;
    addQuestionHtml(data, 1, "main");
    btnValide(data, 1, "valide", "main");
  });
}

function returnMenu() {
  const btnMenu = document.getElementById("btnMenu");
  btnMenu.addEventListener("click", () => {
    init();
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
