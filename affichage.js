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
