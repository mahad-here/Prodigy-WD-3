// script.js
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
let currentPlayer = 'X';
let gameBoard = Array(9).fill(null);
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', onCellClick);
});

resetButton.addEventListener('click', resetGame);

function onCellClick(e) {
    const cellIndex = e.target.getAttribute('data-index');

    if (gameBoard[cellIndex] || !isGameActive) {
        return;
    }

    updateCell(e.target, cellIndex);
    checkForWinner();
}

function updateCell(cell, index) {
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkForWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer === 'X' ? 'O' : 'X'} wins!`;
        isGameActive = false;
        return;
    }

    if (!gameBoard.includes(null)) {
        statusText.textContent = 'Draw!';
        isGameActive = false;
        return;
    }
}

function resetGame() {
    gameBoard.fill(null);
    cells.forEach(cell => (cell.textContent = ''));
    currentPlayer = 'X';
    statusText.textContent = `${currentPlayer}'s turn`;
    isGameActive = true;
}
// script.js (additional code for AI)
function onCellClick(e) {
    const cellIndex = e.target.getAttribute('data-index');

    if (gameBoard[cellIndex] || !isGameActive) {
        return;
    }

    updateCell(e.target, cellIndex);
    checkForWinner();
    if (isGameActive) {
        aiMove();
        checkForWinner();
    }
}

function aiMove() {
    let emptyCells = [];
    gameBoard.forEach((cell, index) => {
        if (cell === null) {
            emptyCells.push(index);
        }
    });

    if (emptyCells.length > 0) {
        const aiChoice = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        gameBoard[aiChoice] = currentPlayer;
        cells[aiChoice].textContent = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `${currentPlayer}'s turn`;
    }
}
