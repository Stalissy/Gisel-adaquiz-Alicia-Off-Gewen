function verifierScore() {
  let score = document.getElementById("score").value;
  let message = document.getElementById("message");
  scoreText.innerHTML = "Ton score est de " + score + "%";
  if (score >= 0) {
    message.innerHTML = "Oups ! Tu n'as trouvé aucune bonne réponse 😱";
  } else if (score < 50) {
    message.innerHTML =
      "Aïe, tu as beaucoup d'erreurs, tu devrais réessayer 😅";
  } else if (score >= 50 && score <= 79) {
    message.innerHTML = "C'est pas mal, mais tu peux encore t'améliorer 💪";
  } else if (score >= 80 && score <= 99) {
    message.innerHTML = "C'est bien, tu as fait peu d'erreurs 😉";
  } else if (score == 100) {
    message.innerHTML = "Aucune erreur, c'est parfait 😎";
  }
}

let score = 0;
let totalQuestions = 10;

function updateScore() {
  score++;
  document.getElementById("scoreDisplay").innerHTML =
    score + " / " + totalQuestions;
}

function recommencerQuiz() {
  score = 0;
  updateScore();

  document.getElementById("message").innerHTML = "";
  document.getElementById("result").innerHTML = "";

  function questionSuivante() {
    document.getElementById("result").innerHTML = "";

    document.getElementById("next").style.display = "none";

    // ici tu peux charger la prochaine question
    console.log("Question suivante");
  }
}

export function showScreen(id) {
  const screens = document.querySelectorAll("main section");

  screens.forEach((screen) => {
    screen.style.display = "none";
  });

  const screenToShow = document.getElementById(id);
  if (screenToShow) {
    screenToShow.style.display = "block";
  }
}

import { showScreen } from "navigation.js";

const startButton = document.querySelector("#screen-start button");

startButton.addEventListener("click", () => {
  showScreen("screen-question");
});

function demarrerQuiz() {
  document.getElementById("screen-start").style.display = "none";
  document.getElementById("screen-question").style.display = "block";
}

window.demarrerQuiz = demarrerQuiz;

let timer;
let timeLeft = 60; // 10 secondes par question

function loadQuestion() {
  // reset du timer
  clearInterval(timer);
  timeLeft = 60;

  // afficher le temps si tu as un élément HTML
  document.getElementById("timer").innerText = timeLeft;

  // lancer le minuteur
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      questionSuivante(); // passe à la question suivante
    }
  }, 1000);
}
