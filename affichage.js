function verifierScore() {
  let score = parseInt(document.getElementById("score").value);
  let message = document.getElementById("message");
  let scoreText = document.getElementById("scoreText");
  scoreText.innerHTML = "Ton score est de " + score + "%";
  if (score === 0) {
    message.innerHTML = "Oups ! Tu n'as trouvé aucune bonne réponse 😱";
  } else if (score < 50) {
    message.innerHTML =
      "Aïe, tu as beaucoup d'erreurs, tu devrais réessayer 😅";
  } else if (score <= 79) {
    message.innerHTML = "C'est pas mal, mais tu peux encore t'améliorer 💪";
  } else if (score <= 99) {
    message.innerHTML = "C'est bien, tu as fait peu d'erreurs 😉";
  } else if (score === 100) {
    message.innerHTML = "Aucune erreur, c'est parfait 😎";
  }
}
console.log(verifierScore);

let score = parseInt(document.getElementById("score").value);

function updateScore() {
  score++;
  document.getElementById("scoreDisplay").innerHTML =
    score + " / " + totalQuestions;
}

export function recommencerQuiz() {
  score = 0;
  updateScore();

  document.getElementById("message").innerHTML = "";
  document.getElementById("result").innerHTML = "";
  console.log(recommencerQuiz);
}
export function questionSuivante() {
  document.getElementById("result").innerHTML = "";

  document.getElementById("next").style.display = "none";

  // ici tu peux charger la prochaine question
  console.log(questionSuivante);
}

function showScreen(id) {
  const screens = document.querySelectorAll("main section");

  screens.forEach((screen) => {
    screen.style.display = "none";
  });

  const screenToShow = document.getElementById(id);
  if (screenToShow) {
    screenToShow.style.display = "block";
  }
}

export function demarrerQuiz() {
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
console.log(loadQuestion);
