'use strict'; // Use strict mode

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, activePlayer, currentScore, playing;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();
const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active'); // Toggle the active class
  player1El.classList.toggle('player--active'); // Toggle the active class
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    // Roll the dice
    const dice = Math.trunc(Math.random() * 6) + 1; // Generate a random number between 1 and 6
    // Display the dice
    diceEl.src = `dice-${dice}.png`; // Set the dice image to the dice number
    diceEl.classList.remove('hidden');
    // Check if the dice is 1
    if (dice !== 1) {
      // Add the dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // Set the current score to the dice number
    } else {
      // Switch players
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore; // Add the current score to the active player score
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer]; // Set the score to the active player score

    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.querySelector('.player--1').classList.add('winner');
      diceEl.classList.add('hidden'); // Hide the dice
    } else {
      switchPlayer(); // Switch players
    }
  }
});

btnNew.addEventListener('click', init);
