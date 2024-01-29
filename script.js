document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
  
    function checkWinner() {
      const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ];
  
      for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          gameActive = false;
          return gameBoard[a];
        }
      }
  
      return gameBoard.includes('') ? null : 'T'; // Tie
    }
  
    function handleClick(index) {
      if (!gameActive || gameBoard[index] !== '') return;
  
      gameBoard[index] = currentPlayer;
      renderBoard();
  
      const winner = checkWinner();
      if (winner) {
        if (winner === 'T') {
          status.textContent = "It's a tie!";
        } else {
          status.textContent = `Player ${winner} wins!`;
        }
        gameActive = false;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
      }
    }
  
    function renderBoard() {
      board.innerHTML = '';
      gameBoard.forEach((value, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = value;
        cell.addEventListener('click', () => handleClick(index));
        board.appendChild(cell);
      });
    }
  
    renderBoard();
  });
  