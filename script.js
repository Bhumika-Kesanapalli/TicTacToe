let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

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

const cells = document.querySelectorAll('.cell');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('reset');

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', handleReset);

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkForWinner();
}

function checkForWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        messageElement.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        messageElement.textContent = 'Draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function handleReset() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => (cell.textContent = ''));
    messageElement.textContent = '';
}
