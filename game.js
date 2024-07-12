let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset");
let newGameButton = document.querySelector("#New-button");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.remove("show");
  msgContainer.classList.add("hide");
};

const disableBoxes = () => {
  boxes.forEach((box) => {
    box.style.pointerEvents = "none";
  });
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.style.pointerEvents = "auto";
    box.innerText = "";
  });
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  msgContainer.classList.add("show");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val !== "" && pos1val === pos2val && pos2val === pos3val) {
      showWinner(pos1val);
      return;
    }
  }
  
  if ([...boxes].every(box => box.innerText !== "")) {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
    msgContainer.classList.add("show");
    disableBoxes();
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText === "") {
      box.innerText = turnO ? "O" : "X";
      turnO = !turnO;
      checkWinner();
    }
  });
});

newGameButton.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);