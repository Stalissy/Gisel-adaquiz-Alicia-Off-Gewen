//j'ai modifié cette fonction à exporter pour le final screen//
/**
 *
 * @param {number} goodAnswers
 * @param {*} data
 * @returns
 */
export function checkScore(goodAnswers, data) {
  let score = (goodAnswers / data.length) * 100;
  if (score === 0) {
    return "Oups ! Tu n'as trouvé aucune bonne réponse 😱";
  } else if (score < 50) {
    return "Aïe, tu as beaucoup d'erreurs, tu devrais réessayer 😅";
  } else if (score >= 50 && score <= 79) {
    return "C'est pas mal, mais tu peux encore t'améliorer 💪";
  } else if (score >= 80 && score <= 99) {
    return "C'est bien, tu as fait peu d'erreurs 😉";
  } else if (score === 100) {
    return "Aucune erreur, c'est parfait 😎";
  }
}

export function startProgress(finishQuestion, total) {
  const bar = document.getElementById("bar");

  const percent = Math.round((finishQuestion / total) * 100);
  console.log(finishQuestion);

  bar.style.width = percent + "%";
  bar.textContent = percent + "% de progression";
}

export function addQuestionHtml(data, nbQuestion, divID) {}

// const question = extractQuestion(data, nbQuestion);
// const options = extractOptions(data, nbQuestion);

//déjà fait //

// let score = 0;
// let totalQuestions = 10;

// function updateScore() {
//   score++;
//   document.getElementById("scoreDisplay").innerHTML =
//     score + " / " + totalQuestions;
// }

// function recommencerQuiz() {
//   score = 0;
//   updateScore();

//   document.getElementById("message").innerHTML = "";
//   document.getElementById("result").innerHTML = "";
// }

// function questionSuivante() {
//   document.getElementById("result").innerHTML = "";

//   document.getElementById("next").style.display = "none";

//   // ici tu peux charger la prochaine question
//   console.log("Question suivante");
// }
