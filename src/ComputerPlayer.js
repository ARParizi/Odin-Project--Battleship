export class ComputerPlayer {
    constructor(gameBoard, playerGameBoard) {
        this.gameBoard = gameBoard;
        this.playerGameBoard = playerGameBoard;
    }

    placeShips() {
        this.placeShip(5);
        this.placeShip(4);
        this.placeShip(3);
        this.placeShip(3);
        this.placeShip(2);
    }

    placeAttack() {
        while(true) {
            // Generate Random Coordinates
            const pos = [];
            pos.push(Math.floor(10 * Math.random()));
            pos.push(Math.floor(10 * Math.random()));

            // Check if valid
            if(this.playerGameBoard.attackValid(pos)) { 
                this.playerGameBoard.receiveAttack(pos);
                return;
            }
        }
    }

    placeShip(length) {
        while(true) {
            // Generate Random Coordinates
            const pos = [];
            pos.push(Math.floor(10 * Math.random()));
            pos.push(Math.floor(10 * Math.random()));

            // Generate Random Direction
            let dir = '';
            if(Math.random() < 0.5) {
                dir = 'right';
            }
            else {
                dir = 'down';
            }

            // Check if valid
            if(this.gameBoard.placeShipCheck(pos, dir, length).possible){
                this.gameBoard.placeShip(pos, dir, length);
                return ;
            }
        }
    }
}