// import './styles.css';

console.log("Hello World from the Battleship project.");

// if (process.env.NODE_ENV === 'production')
//     console.log("We're in production mode!");
// else
//     console.log("We're in development mode.");

import { BoardUI } from './BoardUI.js';
import { Gameboard } from './Gameboard.js';
import { Lock } from './Lock.js';
import { ComputerPlayer } from './ComputerPlayer.js';

// Create Player Object
const playerGameboard = new Gameboard();
const playerBoardUI   = new BoardUI(document.querySelector('#player-board'), playerGameboard);
playerBoardUI.renderPlayerBoard();

// Create Lock
const lock = new Lock();

const directionButton = document.querySelector('#direction-button');
const statusDiv = document.querySelector('#status-div');
let eventHandler = null;

// Place ship of length 5
let release = null;
await placeShipUI(5);
// Place ship of length 4
await placeShipUI(4);
// Place ship of length 3A
await placeShipUI(3);
// Place ship of length 3B
await placeShipUI(3);
// Place ship of length 2
await placeShipUI(2);

// Create and Render Opponent Board
release = await lock.acquire();
const opponentGameboard = new Gameboard();
const opponentBoardUI   = new BoardUI(document.querySelector('#opponent-board'), opponentGameboard);
document.querySelector('#direction-button-container').style.display = 'none';
document.querySelector('#board-container').style.justifyContent = 'space-around';
opponentBoardUI.renderOpponentBoard();

// Computer place its ships
const computer = new ComputerPlayer(opponentGameboard, playerGameboard);
computer.placeShips();

let winner = '';
while(true) {
    // Place attack on opponent
    statusDiv.innerHTML = '<p>Place your attack on the board to the right</p>';
    opponentBoardUI.placeAttackEventListeners(release);
    release = await lock.acquire();
    
    // Check if player won
    if(opponentGameboard.allShipsSank()) {
        winner = 'You';
        break;
    }

    // Receive attack
    computer.placeAttack();
    playerBoardUI.renderPlayerBoard();

    // Check if computer won
    if(playerGameboard.allShipsSank()) {
        winner = 'Computer';
        break;
    }
}
statusDiv.textContent = `${winner} won! Refresh the page or press F5 to play again.`
statusDiv.style.fontSize = 'xx-large';
/* End */

async function placeShipUI(length) {
    release = await lock.acquire();
    statusDiv.innerHTML = `<p>Place ship of length ${length}.</p><p>Press the button to toggle between Horizontal and Vertical Direction</p>`;

    if(directionButton.textContent === 'Horizontal')
        playerBoardUI.placeShipEventListeners('down', length, release);
    else
        playerBoardUI.placeShipEventListeners('right', length, release);

    if(eventHandler)
        directionButton.removeEventListener('click', eventHandler);
    eventHandler = () => playerBoardUI.directionButtonClicked(directionButton, length, release);
    directionButton.addEventListener('click', eventHandler);
}