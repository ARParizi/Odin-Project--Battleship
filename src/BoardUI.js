export class BoardUI {
    constructor(boardDOM, gameboardObj) {
        this.board = boardDOM;
        this.gameboardObj = gameboardObj;
    }

    renderGrid(){
        this.board.innerHTML = '';

        for (let y = 0; y < 10; y++) {
            const divY = document.createElement('div');
            divY.className = `y${y}`;
            for (let x = 0; x < 10; x++) {
                const divX = document.createElement('div');
                divX.className = `x${x}`;
                divX.innerText =`x${x} y${y}`;
                divY.appendChild(divX);
            }
            this.board.appendChild(divY);
        }
    }

    renderMisses() {
        this.gameboardObj.getMisses().forEach(element => {
            const missSquare = this.board.querySelector(`.y${element[1]} > .x${element[0]}`);
            missSquare.classList.add('miss-square');
        });
    }

    renderHits() {
        this.gameboardObj.getHits().forEach(element => {
            const x = element[0];
            const y = element[1];
            const hitSquare = this.board.querySelector(`.y${y} > .x${x}`);
            if(hitSquare.classList.contains('ship-square'))
                hitSquare.classList.remove('ship-square');
            hitSquare.classList.add('hit-square');
        });
    }

    renderExclusions() {
        this.gameboardObj.getHits().forEach(element => {
            const x = element[0];
            const y = element[1];
            if(x - 1 >= 0 && y - 1 >= 0)
                this.board.querySelector(`.y${y - 1} > .x${x - 1}`).classList.add('miss-square');

            if(x + 1 <= 9 && y - 1 >= 0)
                this.board.querySelector(`.y${y - 1} > .x${x + 1}`).classList.add('miss-square');

            if(x - 1 >= 0 && y + 1 <= 9)
                this.board.querySelector(`.y${y + 1} > .x${x - 1}`).classList.add('miss-square');

            if(x + 1 <= 9 && y + 1 <= 9)
                this.board.querySelector(`.y${y + 1} > .x${x + 1}`).classList.add('miss-square');
        });
    }

    renderShips() {
        this.gameboardObj.getShipPositions().forEach(element => {
            const x = element[0];
            const y = element[1];
            const shipSquare = this.board.querySelector(`.y${y} > .x${x}`);
            shipSquare.classList.add('ship-square');
        });    
    }

    populatePlayerBoard() {
        this.renderGrid();
        this.renderShips();
        this.renderMisses();
        this.renderHits();
    }

    populateOpponentBoard() {
        this.renderGrid();
        this.renderMisses();
        this.renderHits();
        this.renderExclusions();
    }
}