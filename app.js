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
  let player1 = (function () {
    let moves = ["X", "O"];
    let name = "Player";
    let move = moves[Math.floor(Math.random() * 2)];
    function play() {
      player2.availableMoves = 1;
      return move;
    }
    return { name, move, play };
  })();
})();
