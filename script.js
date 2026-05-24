let countries = [];
let currentCountry = null;
let score = 0;

/* Load country data */
async function loadCountries() {
  const response = await fetch('clue.json');
  countries = await response.json();

  loadRandomCountry();
}

/* Shuffle array */
function shuffle(array) {
  return [...array].sort(
    () => Math.random() - 0.5
  );
}

/* Random 3 clues */
function getRandomClues(clues) {
  return shuffle(clues).slice(0, 3);
}

/* Update score */
function updateScore() {
  document.getElementById(
    'score'
  ).textContent =
    `🏆 Score: ${score}`;
}

/* Generate 4 options */
function getOptions(correctCountry) {

  const wrongCountries =
    countries
      .filter(
        country =>
          country.country !==
          correctCountry
      )
      .map(country =>
        country.country
      );

  const randomWrong =
    shuffle(wrongCountries)
      .slice(0, 3);

  return shuffle([
    correctCountry,
    ...randomWrong
  ]);
}

/* Load random country */
function loadRandomCountry() {

  currentCountry =
    countries[
      Math.floor(
        Math.random() *
        countries.length
      )
    ];

  /* Show clues */
  const clueList =
    document.getElementById(
      'clue-list'
    );

  clueList.innerHTML = '';

  const randomClues =
    getRandomClues(
      currentCountry.clues
    );

  randomClues.forEach(clue => {

    const li =
      document.createElement(
        'li'
      );

    li.textContent = clue;

    clueList.appendChild(li);
  });

  /* Generate answer options */
  createOptions();

  /* Clear result */
  document.getElementById(
    'result'
  ).textContent = '';
}

/* Create option buttons */
function createOptions() {

  const container =
    document.getElementById(
      'options-container'
    );

  container.innerHTML = '';

  const options =
    getOptions(
      currentCountry.country
    );

  options.forEach(option => {

    const button =
      document.createElement(
        'button'
      );

    button.classList.add(
      'option-btn'
    );

    button.textContent =
      option;

    button.addEventListener(
      'click',
      () =>
        checkAnswer(
          option,
          button
        )
    );

    container.appendChild(
      button
    );
  });
}

/* Check selected answer */
function checkAnswer(
  selected,
  clickedButton
) {

  const result =
    document.getElementById(
      'result'
    );

  const buttons =
    document.querySelectorAll(
      '.option-btn'
    );

  /* Disable buttons */
  buttons.forEach(btn => {
    btn.disabled = true;
  });

  /* Correct answer */
  if (
    selected ===
    currentCountry.country
  ) {

    score++;

    clickedButton.classList.add(
      'correct-option'
    );

    result.textContent =
      '✅ Correct!';

  } else {

    score--;

    clickedButton.classList.add(
      'wrong-option'
    );

    /* Highlight correct answer */
    buttons.forEach(btn => {

      if (
        btn.textContent ===
        currentCountry.country
      ) {

        btn.classList.add(
          'correct-option'
        );
      }
    });

    result.textContent =
      `❌ Wrong! It was ${currentCountry.country}`;
  }

  updateScore();

  /* Auto next question */
  setTimeout(() => {
    loadRandomCountry();
  }, 1500);
}

/* Start game */
loadCountries();