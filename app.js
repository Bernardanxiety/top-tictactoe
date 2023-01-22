(function () {
  let moves = [[], [], [], [], [], [], [], [], []];
  let winningMoves = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let buttons = document.querySelectorAll(".cell");

  function addEventListeners() {
    buttons.forEach((button) => button.addEventListener("click", gowno));
  }
  function addMove(e) {
    let index = e.target.id;
    if (moves[index][0] === undefined) {
      moves[index][0] = "X";
    }
  }
  function render() {
    moves.forEach((move) => {
      if (move[0] !== undefined) {
        let index = moves.indexOf(move);
        const cell = document.getElementById(index);
        cell.textContent = move[0];
      }
    });
  }
  function checkWinner() {
    winningMoves.forEach((winningMove) => {
      let a = moves[winningMove[0]][0];
      let b = moves[winningMove[1]][0];
      let c = moves[winningMove[2]][0];
      if (a === "X" && b === "X" && c === "X") {
        console.log(winningMove);
      }
    });
  }
  function gowno(e) {
    addMove(e);
    render();
    checkWinner();
  }
  addEventListeners();
})();
