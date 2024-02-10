const dealerEl = document.querySelector("#dealer-el");
const youEl = document.querySelector("#you-el");

const hitBtn = document.getElementById("hit");
const stayBtn = document.getElementById("stay");

const yourCards = document.querySelector("your-cards");

const message = document.getElementById("message");

let dealerSum = 0;
let yourSum = 0;

let dealerAceCount = 0;
let yourAceCount = 0;

let canHit = true;

let hidden;
let deck;

window.onload = function () {
  buildDeck();
  shuffleDeck();
  startGame();
};

function buildDeck() {
  let value = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];

  let type = ["C", "S", "D", "H"];
  deck = [];

  for (let i = 0; i < value.length; i++) {
    for (let j = 0; j < type.length; j++) {
      deck.push(value[i] + "-" + type[j]);
    }
  }
}

function shuffleDeck() {
  let temp;
  for (let i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random() * deck.length);
    temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  //console.log(deck);
}

function startGame() {
  hidden = deck.pop();
  dealerSum += getValue(hidden);
  dealerAceCount += checkAce(hidden);

  // computer cards init

  while (dealerSum < 17) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = `img/${card}.png`;
    dealerSum += getValue(card);
    dealerAceCount += checkAce(card);
    document.querySelector("#dealer-cards").append(cardImg);
  }

  // your cards init

  for (let i = 0; i < 2; i++) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = `img/${card}.png`;
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.querySelector("#your-cards").append(cardImg);
  }

  // console.log(yourSum);
  hitBtn.addEventListener("click", hit);
  stayBtn.addEventListener("click", stay);
}

function hit() {
  if (!canHit) {
    return;
  }
  let cardImg = document.createElement("img");
  let card = deck.pop();
  cardImg.src = `img/${card}.png`;
  yourSum += getValue(card);
  yourAceCount += checkAce(card);
  document.querySelector("#your-cards").append(cardImg);

  if (reduceAce(yourSum, yourAceCount) > 21) {
    canHit = false;
  }
}

function stay() {
  dealerSum = reduceAce(dealerSum, dealerAceCount);
  yourSum = reduceAce(yourSum, yourAceCount);

  canHit = false;

  document.getElementById("hidden").src = `img/${hidden}.png`;

  if (dealerSum > 21) {
    message.textContent = "You Win!";
  } else if (yourSum > 21) {
    message.textContent = "Dealer Wins!";
  } else if (yourSum == dealerSum) {
    message.textContent = "Its a Tie!";
  } else if (dealerSum > yourSum) {
    message.textContent = "Dealer Wins!";
  } else if (yourSum > dealerSum) {
    message.textContent = "You Win!";
  }

  if(dealerSum > 21 && yourSum > 21) {
    message.textContent = "Dealer Wins"
  }

  dealerEl.textContent = dealerSum;
  youEl.textContent = yourSum;
}

function getValue(card) {
  let data = card.split("-");
  let value = data[0];

  if (isNaN(value)) {
    if (value == "A") {
      return 11;
    }
    return 10;
  }
  return parseInt(value);
}

function checkAce(card) {
  if (card[0] == "A") {
    return 1;
  }
  return 0;
}

function reduceAce(playerSum, playerAceCount) {
  while (playerSum > 21 && playerAceCount > 0) {
    playerSum -= 10;
    playerAceCount -= 1;
  }
  return playerSum;
}
