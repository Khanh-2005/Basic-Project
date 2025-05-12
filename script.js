const board = document.getElementById('board');
const size = 15;

function createBoard() {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            board.appendChild(cell);
        }
    }
}

createBoard();

const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';

function getPlayerName() {
    const player1Name = document.getElementById('player1-name').value || 'Người chơi 1';
    const player2Name = document.getElementById('player2-name').value || 'Người chơi 2';
    return currentPlayer === 'X' ? player1Name : player2Name;
}

function alertWinner(winner) {
    const resultPopup = document.getElementById('result');
    const winnerText = document.getElementById('winner-text');
    const playerName = getPlayerName();
    winnerText.textContent = playerName + ' thắng!';
    resultPopup.style.display = 'flex';
}

function resetBoard() {
    const resultPopup = document.getElementById('result');
    resultPopup.style.display = 'none';

    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = "X";
}

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if(!cell.textContent) {
            cell.textContent = currentPlayer;
            if(checkWinner(cell)) {
                alertWinner(currentPlayer);
            }
            else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    });
});

function checkWinner(ClickedCell) {
    const row = parseInt(ClickedCell.dataset.row);
    const col = parseInt(ClickedCell.dataset.col);
    return(
        checkDirection(row, col, 0, 1) || // Horizontal
        checkDirection(row, col, 1, 0) || // Vertical
        checkDirection(row, col, 1, 1) || // Diagonal /
        checkDirection(row, col, 1, -1) // Diagonal \
    );
}

function checkDirection(row, col, dirRow, dirCol) {
    let count = 0;
    const player = currentPlayer;
    
    // Check forward
    for(let i = 0; i < 5; i++) {
        const r = row + i * dirRow;
        const c = col + i * dirCol;
        if(
            r < 0 || r >= size ||
            c < 0 || c >= size ||
            cells[r * size + c].textContent !== player
        ) {
            break;
        }
        count++;
    }
    
    // Check backward
    for(let i = 1; i < 5; i++) {
        const r = row - i * dirRow;
        const c = col - i * dirCol;
        if(
            r < 0 || r >= size ||
            c < 0 || c >= size ||
            cells[r * size + c].textContent !== player
        ) {
            break;
        }
        count++;
    }
    
    return count >= 5;
}
