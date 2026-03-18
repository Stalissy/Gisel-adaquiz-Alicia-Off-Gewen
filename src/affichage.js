import { start } from "./readJson.js";

export let data = [];

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
      <label class=option-answers>
        <input type="checkbox" class="check-option">
        ${option}
      </label>`;
    });
    div.innerHTML += `</div>`;
  } else {
    div.innerHTML += `<div class="options-grid">`;
    options.forEach((option) => {
      div.innerHTML += `
      <label class=option-answers>
        <input type="radio" class="check-option" name="answerRadio">
        ${option}
      </label>`;
    });
    div.innerHTML += `</div>`;
  }

  div.innerHTML += `
    <div id="good-girl">
      <button id="valide" class="btn">Valider</button>
    </div>`;
}

// --- Affichage bonne réponse ---
export function goodGirl(divID) {
  const div = document.getElementById(divID);
  div.innerHTML = `
    <p>Bonne fille</p>
    <button id="next-question">Question suivante</button>
  `;
  goodAnswers++;
  // console.log(goodAnswers);
}

// --- Mauvaise réponse affichage de la bonne reponses ---
export function badGirl(divID, data, nbQuestion) {
  const div = document.getElementById(divID);
  const question = data[nbQuestion - 1];
  const correctAnswers = question.correctIndex
    .map((index) => question.options[index])
    .join(", ");

  div.innerHTML = `
    <p>Mauvaise fille</p>
     <p>La bonne réponse était : <strong>${correctAnswers}</strong></p>
    <button id="next-question">Question suivante</button>
  `;
}

export function startProgress(finishQuestion, total) {
  const bar = document.getElementById("bar");

  const percent = Math.round((finishQuestion / total) * 100);
  console.log(finishQuestion);

  bar.style.width = percent + "%";
  bar.textContent = percent + "% de progression";
}

export function checkScore(goodAnswers, data) {
  let score = (goodAnswers / data.length) * 100;
  switch (true) {
    case score === 0:
      return "Oups ! Tu n'as trouvé aucune bonne réponse 😱";
    case score < 50:
      return "Aïe, tu as beaucoup d'erreurs, tu devrais réessayer 😅";
    case score >= 50 && score <= 79:
      return "C'est pas mal, mais tu peux encore t'améliorer 💪";
    case score >= 80 && score <= 99:
      return "C'est bien, tu as fait peu d'erreurs 😉";
    case score === 100:
      return "Aucune erreur, c'est parfait 😎";
  }
}

export function finalScren(divID, data) {
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
