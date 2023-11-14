// ChatGPT assisted with the implementation of 'cards.sort(() => Math.random() - 0.5);' and the 'matched' feature.
// I knew what was needed but wasn't sure how to implement it. Everything else I (Viktor Wiman) did myself with a few peaks
// at official documentation. The images for the cards were generated using chatGPT and edited with Adobe Express.
// The code comments were added by ChatGPT after the code was written.
import { cards } from "./cards.js";
// Select the game element from the document.
const gameEl = document.getElementById("game");
// Create a reload button.
const reload = document.createElement("button");
// Initialize game variables.
let victoryPoints = 0;
let lastCard = null;
let match = false;
let lastCardEl;
let lastIndex;
let lastNum;
let newCard;
let newCardEl;
let newNum;
let newIndex;
let lastZ = 0;

// Randomize the order of the cards.
cards.sort(() => Math.random() - 0.5);

// Set the attributes of the restart button.
reload.style.display = "block"
reload.style.position = "sticky"
reload.style.bottom = "140px"
reload.style.left = "calc(50% - 40px)";
reload.setAttribute("type", "button")
reload.setAttribute("class", "reloadButton")
reload.innerText = "RESTART"

// Initialize each card's state.
cards.forEach((card) => {
  card.showing = false;
  card.matched = false;
});

// Function to create a card element.
function createCard(card, index) {
  let cardImage = document.createElement("img");
  cardImage.setAttribute("class", "cardClass");
  cardImage.setAttribute("src", "images/back/backside.png");
  cardImage.setAttribute("draggable", "false");
  cardImage.setAttribute("id", index);

  // Event listener for card clicks.
  cardImage.addEventListener("click", function () {
    // Ignore click if the card is already matched.
    if (card.matched) {
      return;
    }
    // Logic to handle card flipping and matching.
    let { num } = card;
    newCard = card;
    newCardEl = cardImage;
    newNum = num;
    newIndex = index;
    // Handle card comparison and flipping.
    if (newNum != lastNum && lastCard != null) {
      match = false;
      lastCard.showing = false;
      isShowing(lastCard, lastCardEl);
      newCard.showing = true;
      isShowing(newCard, newCardEl);
    } else if (
      newNum == lastNum &&
      newCard.showing == false &&
      lastCard != newCard
    ) {
      match = true;
      setTimeout(() => {
        console.log("Delayed for 1 second.");
      }, 1000);
      newCard.showing = true;
      isShowing(newCard, newCardEl);
    } else {
      newCard.showing = true;
      isShowing(newCard, newCardEl);
    }

    lastCard = newCard;
    lastCardEl = newCardEl;
    lastNum = newNum;
    // If a match is found, update the game state.
    if (match === true) {
      matchTrue(lastIndex, newIndex);
      victoryPoints++;
      console.log(victoryPoints);
      // Check for game victory condition.
      if (victoryPoints === 6) {
        reload.style.marginTop = "70px"
        reload.style.backgroundColor = "#37B478"
        reload.style.color = "#f5f5f5"
        document.querySelector(".winBox").innerHTML =
          '<h2 class="winText center customFont">You did it!<h2>';
      }
      // Reset variables for the next turn.
      lastCard = null;
      lastNum = "";
      lastCardEl = "";
      lastIndex = "";
      match = false;
    } else {
      lastIndex = newIndex;
      newCard.showing = false;
    }
  });
  // Add the card element to the game.
  gameEl.appendChild(cardImage);
}

// Create card elements for each card in the deck.
cards.forEach((card, i) => {
  createCard(card, i);
  i++;
});

// Add the reload element to the game and set up its event listener.
gameEl.appendChild(reload);
reload.addEventListener("click", function () {
  location.reload();
});

// Function to toggle card images based on whether they are showing.
function isShowing(c, ci) {
  // Update the card's image source based on its showing state.
  if (c.showing === true) {
    ci.setAttribute("src", `images/${c.file}`);
  } else {
    ci.setAttribute("src", "images/back/backside.png");
  }
}

// Function to handle the visual effect when a match is found.
function matchTrue(li, ni) {
  lastZ += 100;
  let lasti = document.getElementById(`${li}`);
  let newi = document.getElementById(`${ni}`);
  // Apply transformations and styles to the matched cards.
  newi.style.transform = "scale(40%)";
  lasti.style.transform = "scale(40%)";
  newi.style.transform = "translate(-50 %, -50 %)";
  lasti.style.transform = "translate(-50 %, -50 %)";
  newi.style.display = "block";
  lasti.style.display = "block";
newi.style.position = "absolute";
  lasti.style.position = "absolute";
  newi.style.left = "calc(50% - 80px)";
  lasti.style.left = "calc(50% - 80px)";
  newi.style.top = "68px";
  lasti.style.top = "68px";
  lasti.style.zIndex = lastZ.toString();
  newi.style.zIndex = lastZ.toString();
  newi.style.border = "solid 3px #37B478";
  lasti.style.border = "solid 3px #37B478";
  newi.style.borderRadius = "5px";
  lasti.style.borderRadius = "5px";
  newi.style.transition =
    "border 0.3s, border-radius 0.3s, transform ease-in-out 1s";
  lasti.style.transition =
    "border 0.3s, border-radius 0.3s, transform ease-in-out 1s";

  cards[li].matched = true;
  cards[ni].matched = true;
}
