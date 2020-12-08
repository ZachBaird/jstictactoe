const Gameboard = (() => {
  const gameBoard = [null, null, null, null, null, null, null, null, null];
  const positions = Array.from(document.querySelectorAll('.position'));
  let isX = true;
  let turnCounter = 0;

  // Update's turn data, including: who's turn and which turn it is, and UI
  function updateTurn() {
    isX = !isX;
    turnCounter++;

    document.querySelector('.turn-notif').textContent = `It is ${isX ? 'X' : 'O'} turn:`;
  }

  // Add click event to play again button
  document.querySelector('.play-again').addEventListener('click', () => {
    configureBoard();
    gameBoard.forEach((pos, index) => gameBoard[index] = null);
    document.querySelector('.play-again').style.display = 'none';
    displayBoard();
  });

  // Adds click event handlers
  const configureBoard = () => {
    positions.forEach(pos => pos.addEventListener('click', playMove));
  };

  // Updates UI with game data
  // If a data position is null, an HTML nbsp is set instead
  const displayBoard = () => {
    positions.forEach(pos => {
      const gameData = gameBoard[getDataId(pos)];
      if (gameData) pos.textContent = gameData;
      else pos.innerHTML = '&nbsp;';
    });
  };

  const getDataId = (pos) => parseInt(pos.getAttribute('data-id'));

  // Manual check for winning combinations. Also ensures one of the positions isn't null
  const checkWinner = () => {
    if ((gameBoard[0] === gameBoard[1] && gameBoard[1] === gameBoard[2] && gameBoard[0]) ||
    (gameBoard[3] === gameBoard[4] && gameBoard[4] === gameBoard[5] && gameBoard[5]) ||
    (gameBoard[6] === gameBoard[7] && gameBoard[7] === gameBoard[8] && gameBoard[8]) ||
    (gameBoard[0] === gameBoard[3] && gameBoard[3] === gameBoard[6] && gameBoard[6]) ||
    (gameBoard[1] === gameBoard[4] && gameBoard[4] === gameBoard[7] && gameBoard[7]) ||
    (gameBoard[2] === gameBoard[5] && gameBoard[5] === gameBoard[8] && gameBoard[8]) ||
    (gameBoard[0] === gameBoard[4] && gameBoard[4] === gameBoard[8] && gameBoard[8]) ||
    (gameBoard[2] === gameBoard[4] && gameBoard[4] === gameBoard[6] && gameBoard[6])) {
      return {
        winnerExists: true,
        winner: isX ? 'X' : 'O',
      };
    } else {
      return {
        winnerExists: false
      };
    }
  };

  // Ends the game
  const endGame = () => {
    const { winnerExists, winner } = checkWinner();

    document.querySelector('.turn-notif').textContent = `Game over. ${winnerExists ? winner + ' has won!' : 'Tie' }`;
    document.querySelector('.play-again').style.display = 'block';
    positions.forEach(pos => pos.removeEventListener('click', playMove));
  };

  const playMove = (e) => {
    const pos = e.target;
    // If the position has already been played, just return
    if (gameBoard[getDataId(pos)]) return;

    // Flip the spot to the player
    if (isX) gameBoard[getDataId(pos)] = 'X';
    else gameBoard[getDataId(pos)] = 'O';

    // Update UI
    displayBoard();

    // Game-ending logic
    const { winnerExists } = checkWinner();
    if(turnCounter < 8 && !winnerExists) updateTurn();
    else endGame();
  };

  // Let's get it started~~~HOT
  displayBoard();
  configureBoard();
})();

