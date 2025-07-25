let box = document.querySelectorAll(".box");
let button = document.querySelector("button");
let container = document.querySelector(".container");
let msgcontainer = document.querySelector(".msg-container");
let newbtn = document.querySelector(".new-btn");
let resetbtn = document.querySelector(".reset-btn");
let msg = document.querySelector(".msg");
let head = document.querySelector("h1");

// let X=prompt("Enter your name for X");
// let O=prompt("Enter your name for O");

let isOTurn = true; // boolean

const win = [
  //   0,1,2 pattern[0,1,2]-----
  [0, 1, 2], //win[0]
  [0, 3, 6], //win[1]
  [0, 4, 8], //win[2]
  [1, 4, 7], //win[3]
  [2, 5, 8], //win[4]
  [2, 4, 6], //win[5]
  [3, 4, 5], //win[6]
  [6, 7, 8], //win[7]
];

box.forEach((box) => {
  resetbtn.classList.remove("hide");
  box.addEventListener("click", () => {
    if (box.innerText !== "") return;

    if (isOTurn) {
      box.innerText = "O";
    } else {
      box.innerText = "X";
    }

    box.disabled = true;
    isOTurn = !isOTurn; // Toggle turn

    checkWinner();
  });
});

const resbtn = () => {
  isOTurn = true;
  enablebtn();
  msgcontainer.classList.add("hide");
  resetbtn.classList.remove("hide");
};

const disablebtn = () => {
  for (let boxes of box) {
    boxes.disabled = true;
  }
};

const enablebtn = () => {
  for (let boxes of box) {
    boxes.disabled = false;
    boxes.innerText = "";
  }
};

const checkWinner = () => {
  for (let pattern of win) {
    let post1 = box[pattern[0]].innerText;
    let post2 = box[pattern[1]].innerText;
    let post3 = box[pattern[2]].innerText;

    if (
      post1 == "X" ||
      (post1 == "O" && post2 == "X") ||
      (post2 == "O" && post3 == "X") ||
      post3 == "O"
    ) {
      if (post1 === post2 && post2 === post3 && post1 !== "") {
        msg.innerText = `Congratulations! player ${post1} wins`;
        msgcontainer.classList.remove("hide");
        resetbtn.classList.add("hide");
        disablebtn();
      }
    }
  }
};

newbtn.addEventListener("click", resbtn);
resetbtn.addEventListener("click", resbtn);