(function () {
  // moves
  let moves = [[], [], [], [], [], [], [], [], []];
  let wM = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  //   DOM
  const buttons = document.querySelectorAll(".cell");
  const h2 = document.getElementById("result");
  const playerMoveDiv = document.getElementById("playerMove");
  const cpuMoveDiv = document.getElementById("cpuMove");
  const board = document.querySelector(".board");

  const boardObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      const cells = document.querySelectorAll(".cell");
      let width = Math.floor(entry.contentRect.width);
      cells.forEach((cell) =>
        cell.setAttribute("style", `font-size: ${width / 4}px`)
      );
    });
  });

  boardObserver.observe(board);

  const player = (function () {
    const moves = ["X", "O"];
    const move = moves[Math.floor(Math.random() * moves.length)];
    const name = "Player";
    function returnMove() {
      return move;
    }

    return { returnMove, move, name };
  })();

  const cpu = (function () {
    const move = player.returnMove() === "X" ? "O" : "X";
    const name = "Super Computer";
    function attack() {
      let cpuMove = move;
      for (let i = 0; i < wM.length; i++) {
        let doIAttack = 0;
        let arr = [];
        for (let j = 0; j < wM[i].length; j++) {
          if (moves[wM[i][j]][0] === cpuMove) doIAttack++;
          if (moves[wM[i][j]][0] === undefined) arr.push(wM[i][j]);
        }
        if (doIAttack === 2 && arr.length > 0) return arr[0];
        if (!defend() && doIAttack === 1 && arr.length === 2)
          return arr[Math.floor(Math.random() * arr.length)];
      }
    }
    function defend() {
      let playerMove = player.move;
      for (let a = 0; a < wM.length; a++) {
        let doIDefend = 0;
        let arr = [];
        for (let b = 0; b < wM[a].length; b++) {
          if (moves[wM[a][b]][0] === playerMove) doIDefend++;
          if (moves[wM[a][b]][0] === undefined) arr.push(wM[a][b]);
        }
        if (doIDefend === 2 && arr.length > 0) return arr[0];
      }
    }
    function returnMove() {
      let free = getFreeMoves();
      let attackMove = attack();
      let defendMove = defend();
      console.log(attackMove + " " + defendMove);
      if (attackMove !== undefined) {
        moves[attackMove][0] = move;
        render();
        return;
      } else if (defendMove !== undefined) {
        moves[defendMove][0] = move;
        render();
        return;
      } else if (free.length > 0) {
        if (moves[4][0] === undefined) moves[4][0] = move;
        else {
          let rng = Math.floor(Math.random() * free.length);
          moves[free[rng]][0] = move;
        }
        render();
        return;
      }
    }

    return { returnMove, move, name };
  })();

  function render() {
    moves.forEach((move) => {
      let id = moves.indexOf(move);
      let cell = document.getElementById(id);
      cell.textContent = move[0];
    });
  }
  function getFreeMoves() {
    let free = [];
    moves.forEach((move) => {
      if (move[0] === undefined) free.push(moves.indexOf(move));
    });
    return free;
  }

  function checkWinningPositions() {
    let playerMove = player.move;
    let cpuMove = cpu.move;
    let freeMoves = getFreeMoves();
    // if (!freeMoves)
    for (let i = 0; i < wM.length; i++) {
      let cpuCount = 0;
      let playerCount = 0;
      for (let j = 0; j < wM[i].length; j++) {
        if (moves[wM[i][j]][0] === playerMove) playerCount++;
        if (moves[wM[i][j]][0] === cpuMove) cpuCount++;
      }
      if (playerCount === 3) return player;
      if (cpuCount === 3) return cpu;
    }
    if (freeMoves.length === 0) return "It's a tie!";
  }

  function endGame() {
    let winnerName = checkWinningPositions();
    h2.textContent =
      winnerName === "It's a tie!" ? winnerName : `${winnerName.name} won!`;
    buttons.forEach((btn) => btn.removeEventListener("click", play));
    buttons.forEach((btn) => btn.addEventListener("click", reset));
  }

  function reset() {
    h2.textContent = "";
    moves = [[], [], [], [], [], [], [], [], []];
    render();
    buttons.forEach((btn) => btn.removeEventListener("click", reset));
    playerMoveDiv.textContent = `You: ${player.move}`;
    cpuMoveDiv.textContent = `CPU: ${cpu.move}`;
    addEventListeners();
  }
  function addEventListeners() {
    buttons.forEach((btn) => btn.addEventListener("click", play));
  }

  function removePlay() {
    moves.forEach((move) => {
      if (move[0] !== undefined) {
        let id = moves.indexOf(move);
        document.getElementById(id).removeEventListener("click", play);
      }
    });
  }

  function play(e) {
    let cell = e.target.id;

    if (moves[cell][0] === undefined) {
      moves[cell][0] = player.returnMove();
      removePlay(cell);
    }
    render();
    if (checkWinningPositions()) {
      endGame();
      return;
    }
    cpu.returnMove();
    if (checkWinningPositions()) {
      endGame();
      return;
    }
    removePlay();
  }

  reset();
  addEventListeners();
})();
