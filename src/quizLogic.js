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
export function comparReponse(data, nbQuestion, checkOption, divID) {
  const correctIndex = extractCorrectIndex(data, nbQuestion);

  if (arraysEqual(correctIndex, checkOption)) {
    goodGirl("good-girl");
  } else {
    badGirl("good-girl", data, nbQuestion);
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
export function arraysEqual(a, b) {
  return a.length === b.length && a.every((val, i) => val === b[i]);
}

// --- Passage à la question suivante ---
export function nextQuestion(data, nbQuestion, divID, btn) {
  btn.addEventListener("click", () => {
    addQuestionHtml(data, nbQuestion + 1, divID);
    btnValide(data, nbQuestion + 1, "valide", divID);
  });
}

// --- Bounton recommencer ---
export function restart(data) {
  const btnRestart = document.getElementById("restart");
  btnRestart.addEventListener("click", () => {
    finishQuestion = 0;
    goodAnswers = 0;
    startProgress(finishQuestion, data.length);
    addQuestionHtml(data, 1, "main");
    btnValide(data, 1, "valide", "main");
  });
}

export function returnMenu(data) {
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
