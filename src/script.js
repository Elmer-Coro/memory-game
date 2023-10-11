let cards = [
  "🍎",
  "🍎",
  "🍌",
  "🍌",
  "🍒",
  "🍒",
  "🍇",
  "🍇",
  "🥝",
  "🥝",
  "🍓",
  "🍓",
  "🍍",
  "🍍",
  "🥑",
  "🥑",
];

let flippedCards = [];
const winMessage = document.querySelector(".win-message");
const resetButton = document.querySelector(".reset-button");

function checkWin() {
  const matchedCards = document.querySelectorAll(".card.matched");
  if (matchedCards.length === cards.length) {
    winMessage.classList.remove("hidden");
    resetButton.style.display = "block";
  }
}

function createCard(card) {
  const div = document.createElement("div");
  div.classList.add("card");
  div.dataset.card = card;
  div.textContent = "❓";
  div.addEventListener("click", handleCardClick);
  return div;
}

function handleCardClick() {
  const card = this;
  card.textContent = card.dataset.card;

  flippedCards.push(card);

  if (flippedCards.length === 2) {
    const [card1, card2] = flippedCards;
    if (card1.dataset.card === card2.dataset.card) {
      setTimeout(() => {
        card1.classList.add("matched");
        card2.classList.add("matched");
        flippedCards = [];
        checkWin();
      }, 200);
    } else {
      setTimeout(() => {
        card1.textContent = "❓";
        card2.textContent = "❓";
        flippedCards = [];
      }, 200);
    }
    checkWin();
  }
}

const memoryGame = document.querySelector(".memory-game");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Llama a esta función antes de agregar las cartas al tablero
cards = shuffle(cards);

cards.forEach((card) => {
  const newCard = createCard(card);
  memoryGame.appendChild(newCard);
  checkWin();
});

resetButton.addEventListener("click", () => {
  document.querySelectorAll(".card").forEach((card) => {
    card.textContent = "❓";
    card.classList.remove("matched");
  });

  winMessage.classList.add("hidden");
  resetButton.style.display = "none";
  flippedCards = [];
});
