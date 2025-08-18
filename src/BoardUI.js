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
             // divX.innerText =`x${x} y${y}`;
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
        this.gameboardObj.getExclusions().forEach(element => {
            const x = element[0];
            const y = element[1];
            const shipSquare = this.board.querySelector(`.y${y} > .x${x}`);
            shipSquare.classList.add('exclusion-square');
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

    renderPlayerBoard() {
        this.renderGrid();
        this.renderShips();
        this.renderMisses();
        this.renderHits();
    }

    renderOpponentBoard() {
        this.renderGrid();
        this.renderMisses();
        this.renderHits();
        this.renderExclusions();
    }

    placeShipEventListeners(dir, length, release) {
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                const square = this.board.querySelector(`.y${y} > .x${x}`);
                if(this.gameboardObj.placeShipCheck([x, y], dir, length).possible === false)
                {
                    square.addEventListener('mouseover', () => this.#placeShipMouseHoverEvent(false, x, y, dir, length));
                    square.addEventListener('mouseout',  () => this.#placeShipMouseOutEvent  (false, x, y, dir, length));
                } else {
                    square.addEventListener('mouseover', () => this.#placeShipMouseHoverEvent(true, x, y, dir, length));
                    square.addEventListener('mouseout',  () => this.#placeShipMouseOutEvent  (true, x, y, dir, length));
                    square.addEventListener('click',     () => this.#placeShipMouseClickEvent(x, y, dir, length, release));
                }
            }
        }
    }

    #placeShipMouseHoverEvent(valid, x, y, dir, length) {
        if(valid === false) {
            for (let i = 0; i < length; i++) {
                if(dir === 'right' && x + i < 10) {
                    this.board.querySelector(`.y${y} > .x${x + i}`).classList.add('ship-place-invalid-hover');
                }
                else if(dir === 'down' && y + i < 10) {
                    this.board.querySelector(`.y${y + i} > .x${x}`).classList.add('ship-place-invalid-hover');
                }
            }
        }
        else if(valid) {
            for (let i = 0; i < length; i++) {
                if(dir === 'right') {
                    this.board.querySelector(`.y${y} > .x${x + i}`).classList.add('ship-place-valid-hover');
                }
                else if(dir === 'down') {
                    this.board.querySelector(`.y${y + i} > .x${x}`).classList.add('ship-place-valid-hover');
                }
            }
        }
    }

    #placeShipMouseOutEvent(valid, x, y, dir, length) {
        if(valid === false) {
            for (let i = 0; i < length; i++) {
                if(dir === 'right' && x + i < 10) {
                    this.board.querySelector(`.y${y} > .x${x + i}`).classList.remove('ship-place-invalid-hover');
                }
                else if(dir === 'down' && y + i < 10) {
                    this.board.querySelector(`.y${y + i} > .x${x}`).classList.remove('ship-place-invalid-hover');
                }
            }
        }
        else if(valid) {
            for (let i = 0; i < length; i++) {
                if(dir === 'right') {
                    this.board.querySelector(`.y${y} > .x${x + i}`).classList.remove('ship-place-valid-hover');
                }
                else if(dir === 'down') {
                    this.board.querySelector(`.y${y + i} > .x${x}`).classList.remove('ship-place-valid-hover');
                }
            }
        }
    }

    #placeShipMouseClickEvent(x, y, dir, length, release) {
        this.gameboardObj.placeShip([x, y], dir, length);
        this.renderPlayerBoard();
        release();
    }

    placeAttackEventListeners(release) {
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                const square = this.board.querySelector(`.y${y} > .x${x}`);
                if(this.gameboardObj.attackValid([x, y]))
                {
                    square.addEventListener('mouseover', () => this.#placeAttackMouseHoverEvent(x, y));
                    square.addEventListener('mouseout',  () => this.#placeAttackMouseOutEvent  (x, y));
                    square.addEventListener('click',     () => this.#placeAttackMouseClickEvent(x, y, release));
                }
            }
        }
    }

    #placeAttackMouseClickEvent(x, y, release) {
        this.gameboardObj.receiveAttack([x, y]);
        this.renderOpponentBoard();
        release();
    }

    #placeAttackMouseHoverEvent(x, y) {
        const square = this.board.querySelector(`.y${y} > .x${x}`);
        square.classList.add('attack-hover');
    }

    #placeAttackMouseOutEvent(x, y) {
        const square = this.board.querySelector(`.y${y} > .x${x}`);
        square.classList.remove('attack-hover');
    }

    directionButtonClicked(button, length, release) {
        this.renderPlayerBoard();
        if(button.textContent === 'Horizontal') {
            button.textContent = 'Vertical';
            this.placeShipEventListeners('right', length, release);
        } 
        else if(button.textContent === 'Vertical') {
            button.textContent = 'Horizontal';
            this.placeShipEventListeners('down', length, release);
        }
        else
            throw new Error('Error in directionButtonClicked');
    }
}