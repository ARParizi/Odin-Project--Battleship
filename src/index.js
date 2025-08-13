// import './styles.css';

console.log("Hello World from the Battleship project.");

// if (process.env.NODE_ENV === 'production')
//     console.log("We're in production mode!");
// else
//     console.log("We're in development mode.");

import { BoardUI } from './BoardUI.js';
import { Gameboard } from './Gameboard.js';
import { Ship } from './Ship.js';

const playerBoardDOM  = document.querySelector('#player-board');
const playerGameboard = new Gameboard();
const playerBoardUI   = new BoardUI(playerBoardDOM, playerGameboard);

/*
playerGameboard.receiveAttack([0, 0]);
playerGameboard.receiveAttack([0, 2]);
playerGameboard.receiveAttack([4, 3]);
playerGameboard.receiveAttack([6, 4]);
playerGameboard.receiveAttack([9, 9]);

playerBoardUI.renderGrid();
playerBoardUI.renderShips();
playerBoardUI.renderMisses();
playerBoardUI.renderHits();
playerBoardUI.renderExclusions();
*/

playerGameboard.placeShip([9, 8], 'down', new Ship(2));
playerGameboard.placeShip([4, 2], 'down', new Ship(3));
playerGameboard.placeShip([6, 4], 'right', new Ship(4));


playerBoardUI.populatePlayerBoard();
playerBoardUI.placeShipEventListeners('down', 4);