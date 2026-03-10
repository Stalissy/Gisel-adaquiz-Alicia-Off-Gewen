function extractQuestion(data, nbQuestion) {
  const question = data[nbQuestion - 1].question;
  return question;
}

function extractOptions(data, nbQuestion) {
  const options = data[nbQuestion - 1].options;
  return options;
}

function extractCorrectIndex(data, nbQuestion) {
  const correctIndex = data[nbQuestion - 1].correctIndex;
  return correctIndex;
}

export function addQuestionHtml(data, nbQuestion, divID) {
  const question = extractQuestion(data, nbQuestion);
  const options = extractOptions(data, nbQuestion);

  const div = document.getElementById(divID);
  div.innerHTML = `<h3>${question}</h3>`;

  let i = 0;
  options.forEach((option) => {
    div.innerHTML += `<label><input type="checkbox" class="check-option">${option}</label><br>`;
    i++;
  });

  div.innerHTML += `<div id="nom"><button id="valide">Validée</button></div>`;
}

export function btnValide(data, nbQuestion, btnID, divID) {
  const btn = document.getElementById(btnID);

  btn.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll(".check-option");
    const checkOption = [];

    checkboxes.forEach((checkbox, index) => {
      if (checkbox.checked) {
        checkOption.push(index);
      }
    });
    comparReponse(data, nbQuestion, checkOption, divID);
  });
}

function comparReponse(data, nbQuestion, checkOption, divID) {
  const correctIndex = extractCorrectIndex(data, nbQuestion);
  if (arraysEqual(correctIndex, checkOption)) {
    goodGirl("nom");
  } else {
    badGirl("nom");
  }
  nextQuestion(data, nbQuestion, divID);
}

function arraysEqual(a, b) {
  return a.length === b.length && a.every((val, i) => val === b[i]);
}

function goodGirl(divID) {
  const div = document.getElementById(divID);
  div.innerHTML = `
    <p>Bonne Fille</p>
    <button id="nextQuestion">Question Suivante</button>
  `;
}

function badGirl(divID) {
  const div = document.getElementById(divID);
  div.innerHTML = `
    <p>Mauvaise Fille</p>
    <button id="nextQuestion">Question Suivante</button>`;
}

function nextQuestion(data, nbQuestion, divID) {
  const btn = document.getElementById("nextQuestion");

  btn.addEventListener("click", () => {
    addQuestionHtml(data, nbQuestion + 1, "app");
    btnValide(data, nbQuestion + 1, "valide", divID);
  });
}
