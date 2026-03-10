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

  // Ajoute la question
  div.innerHTML = `<h3>${question}</h3>`;

  // Ajoute les réponse possible
  options.forEach((option, i) => {
    div.innerHTML += `<label><input type="checkbox" class="check-option">${option}</label><br>`;
  });

  // Ajoute le bouton de validation
  div.innerHTML += `
    <div id="good-girl">
      <button id="valide" class="btn">Validée</button>
    </div>`;
}

// --- Gestion du bouton de validation ---
export function btnValide(data, nbQuestion, btnID, divID) {
  const btn = document.getElementById(btnID);

  btn.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll(".check-option");
    const checkOption = [];
    // Enregiste les réponse soumise pour les comparée plus tard
    checkboxes.forEach((checkbox, index) => {
      if (checkbox.checked) checkOption.push(index);
    });

    // Vérifie si l'utilisateur à les bonne réponse
    comparReponse(data, nbQuestion, checkOption, divID);
  });
}

// --- Comparaison de la réponse ---
function comparReponse(data, nbQuestion, checkOption, divID) {
  const correctIndex = extractCorrectIndex(data, nbQuestion);

  if (arraysEqual(correctIndex, checkOption)) {
    goodGirl("good-girl");
  } else {
    badGirl("good-girl");
  }

  nextQuestion(data, nbQuestion, divID);
}

// --- Vérification d'égalité de tableaux ---
function arraysEqual(a, b) {
  return a.length === b.length && a.every((val, i) => val === b[i]);
}

// --- Affichage en cas de bonne réponse ---
function goodGirl(divID, data, nbQuestion) {
  const div = document.getElementById(divID);
  // Ajoute le texte disant si tu à réson et le bouton "question suvante"
  div.innerHTML = `
    <p>Bonne Fille</p>
    <button id="nextQuestion">Question Suivante</button>
  `;
}

function badGirl(divID, data, nbQuestion) {
  const div = document.getElementById(divID);
  div.innerHTML = `
    <p>Mauvaise Fille</p>
    <button id="nextQuestion">Question Suivante</button>
  `;
}

// --- Passage à la question suivante ---
function nextQuestion(data, nbQuestion, divID) {
  const btn = document.getElementById("nextQuestion");

  btn.addEventListener("click", () => {
    addQuestionHtml(data, nbQuestion + 1, "app");
    btnValide(data, nbQuestion + 1, "valide", divID);
  });
}
