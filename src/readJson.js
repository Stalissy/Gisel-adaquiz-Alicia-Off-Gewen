export function extractQuestion(data, nbQuestion) {
  const question = data[nbQuestion - 1].question;
  return question;
}

export function extractOptions(data, nbQuestion) {
  const options = data[nbQuestion - 1].options;
  return options;
}

export function extractCorrectIndex(data, nbQuestion) {
  const correctIndex = data[nbQuestion - 1].correctIndex;
  return correctIndex;
}

export function addQuestionHtml(data, nbQuestion, divID) {
  console.log(data);
  const question = extractQuestion(data, nbQuestion);
  const options = extractOptions(data, nbQuestion);
  const correctIndex = extractCorrectIndex(data, nbQuestion);

  const div = document.getElementById(divID);
  div.innerHTML = `<h3>${question}</h3>`;

  let i = 0;
  options.forEach((option) => {
    div.innerHTML += `<label><input type="checkbox" class="check-option">${option}</label><br>`;
    i++;
  });

  div.innerHTML += `<button id="valide">Validée</button>`;
}

export function btnValide(btnID) {
  const btn = document.getElementById(btnID);

  btn.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll(".check-option");
    const checkOption = [];

    checkboxes.forEach((checkbox, index) => {
      if (checkbox.checked) {
        checkOption.push(index);
      }
    });

    console.log(checkOption);
  });
}
