let countries = [];
let currentCountry = null;
let score = 0;

async function loadCountries() {
  const response = await fetch('clue.json');
  countries = await response.json();

  loadRandomCountry();
}

function getRandomClues(clues) {
  const shuffled = [...clues].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

function updateScore() {
  document.getElementById('score').textContent =
    `Score: ${score}`;
}

function loadRandomCountry() {
  currentCountry =
    countries[Math.floor(Math.random() * countries.length)];

  const randomClues = getRandomClues(currentCountry.clues);

  const clueList = document.getElementById('clue-list');
  clueList.innerHTML = '';

  randomClues.forEach(clue => {
    const li = document.createElement('li');
    li.textContent = clue;
    clueList.appendChild(li);
  });

  document.getElementById('guess-input').value = '';
  document.getElementById('result').textContent = '';
}

function checkGuess() {
  const userGuess = document
    .getElementById('guess-input')
    .value
    .trim()
    .toLowerCase();

  const correctAnswer =
    currentCountry.country.toLowerCase();

  const result = document.getElementById('result');

  if (userGuess === correctAnswer) {
    score++;
    result.textContent = '✅ Correct!';
  } else {
    score--;
    result.textContent =
      `❌ Wrong! It was ${currentCountry.country}`;
  }

  updateScore();
}

document
  .getElementById('submit-btn')
  .addEventListener('click', checkGuess);

document
  .getElementById('next-btn')
  .addEventListener('click', loadRandomCountry);

  document.getElementById('guess-input').blur();
document.getElementById('guess-input').focus();

loadCountries();