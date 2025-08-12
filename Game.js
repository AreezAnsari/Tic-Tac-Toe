let box = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".reset-btn");
let msgcontainer = document.querySelector(".msg-container");
let newbtn = document.querySelector(".new-btn");
let msg = document.querySelector(".msg");

let isOTurn = true; // O starts
let movesO = []; // store {index, order}
let movesX = [];

const win = [
  [0, 1, 2], [0, 3, 6], [0, 4, 8],
  [1, 4, 7], [2, 5, 8], [2, 4, 6],
  [3, 4, 5], [6, 7, 8],
];

box.forEach((b, idx) => {
  resetbtn.classList.remove("hide");
  b.addEventListener("click", () => {
    if (b.innerText !== "") return;

    if (isOTurn) {
      addMove(movesO, "O", idx);
    } else {
      addMove(movesX, "X", idx);
    }

    checkWinner();
    isOTurn = !isOTurn;
  });
});

function addMove(movesArr, symbol, idx) {
  // Add move to array
  movesArr.push({ index: idx });

  // If more than 3 moves, remove oldest
  if (movesArr.length > 3) {
    let removed = movesArr.shift();
    box[removed.index].innerHTML = "";
    box[removed.index].disabled = false;
  }

  // Update numbering for current player
  movesArr.forEach((move, i) => {
    box[move.index].innerHTML = `${symbol}<sup>${i + 1}</sup>`;
    box[move.index].disabled = true;
  });
}

const resbtn = () => {
  isOTurn = true;
  movesO = [];
  movesX = [];
  enablebtn();
  msgcontainer.classList.add("hide");
  resetbtn.classList.remove("hide");
};

const disablebtn = () => {
  box.forEach(b => b.disabled = true);
};

const enablebtn = () => {
  box.forEach(b => {
    b.disabled = false;
    b.innerHTML = "";
  });
};

const checkWinner = () => {
  for (let pattern of win) {
    let p1 = box[pattern[0]].innerText.charAt(0);
    let p2 = box[pattern[1]].innerText.charAt(0);
    let p3 = box[pattern[2]].innerText.charAt(0);

    if (p1 !== "" && p1 === p2 && p2 === p3) {
      msg.innerText = `Congratulations! Player ${p1} wins 🎉`;
      msgcontainer.classList.remove("hide");
      resetbtn.classList.add("hide");
      disablebtn();
      return;
    }
  }
};

newbtn.addEventListener("click", resbtn);
resetbtn.addEventListener("click", resbtn);
