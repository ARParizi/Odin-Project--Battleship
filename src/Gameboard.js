export class Gameboard {
    constructor() {
        this.#ships = [];
        this.#hits = [];
        this.#misses = [];
        this.#shipPositions = [];
    }
    #ships;
    #hits;
    #misses;
    #shipPositions;
    
    numShips() {
        return this.#ships.length;
    }

    placeShipCheck(pos, dir, length) {
        let error = '';
        let possible = true;

        if(dir !== 'down' && dir !== 'right') {
            error    = 'Place Ship Direction Undefined';
            possible = false;
        }

        else if(pos[0] < 0 || pos[0] > 9) {
            error    = 'Place Ship Position X Out of Bounds';
            possible = false;
        }

        else if(pos[1] < 0 || pos[1] > 9) {
            error    = 'Place Ship Position Y Out of Bounds';
            possible = false;
        }

        else if(dir === 'right' && pos[0] + length - 1 > 9) {
            error    = 'Place Ship End Position X Out of Bounds';
            possible = false;
        }

        else if(dir === 'down' && pos[1] + length - 1 > 9) {
            error    = 'Place Ship End Position Y Out of Bounds';
            possible = false;
        }

        else {
            let shipCollision = false;

            const rect1 = this.#createSmallCollisionRect(pos, dir, length)

            this.#ships.forEach((ship) => {
                const rect2 = this.#createBigCollisionRect(ship.pos, ship.dir, ship.length);
                shipCollision = shipCollision || this.#detectCollision(rect1, rect2);
            });

            if(shipCollision) {
                error  = 'Place Ship Collision with Other Ships';
                possible = false;
            }
        }
        return { possible, error };
    }
    
    #createSmallCollisionRect(pos, dir, length){
        let x_low, x_high, y_low, y_high;

        if(dir === 'right') {
            y_low  = pos[1];
            y_high = pos[1];
            x_low  = pos[0];
            x_high = pos[0] + length - 1;
        } 
        else if (dir === 'down') {
            x_low  = pos[0];
            x_high = pos[0];
            y_low  = pos[1];
            y_high = pos[1] + length - 1;
        }
        else
            throw new Error('Invalid direction in createSmallCollisionRect')

        return {
            x_low,
            x_high,
            y_low,
            y_high
        }
    }
    
    #createBigCollisionRect(pos, dir, length){
        let x_low, x_high, y_low, y_high;

        if(dir === 'right') {
            y_low  = pos[1] - 1;
            y_high = pos[1] + 1;
            x_low  = pos[0] - 1;
            x_high = pos[0] + length;
        } 
        else if (dir === 'down') {
            x_low  = pos[0] - 1;
            x_high = pos[0] + 1;
            y_low  = pos[1] - 1;
            y_high = pos[1] + length;
        }
        else
            throw new Error('Invalid direction in createBigCollisionRect')

        return {
            x_low,
            x_high,
            y_low,
            y_high
        }
        
    }

    #detectCollision(rect1, rect2) {
        const outLeft   = rect1.x_high < rect2.x_low;
        const outRight  = rect1.x_low  > rect2.x_high;
        const outTop    = rect1.y_high < rect2.y_low;
        const outBottom = rect1.y_low  > rect2.y_high;

        return !(outLeft || outRight || outTop || outBottom);
    }

    placeShip(pos, dir, ship) {
        if(this.placeShipCheck(pos, dir, ship.length).possible === false)
            return

        for (let i = 0; i < ship.length; i++) {
            if (dir === 'right') {
                this.#shipPositions.push([pos[0] + i, pos[1]]);
            }
            else if (dir === 'down') {
                this.#shipPositions.push([pos[0], pos[1] + i]);
            }
        }

        this.#ships.push({
            pos,
            dir,
            length: ship.length,
            hit: () => ship.hit(),
            isSunk: () => ship.isSunk()
        })
    }

    receiveAttack(pos) {
        const foundInMisses = this.#findArrayInArray(this.#misses, pos);
        const foundInHits   = this.#findArrayInArray(this.#hits,   pos);

        if(foundInHits || foundInMisses)
            throw new Error('Attack already registered');

        let hit  = 0;
        
        this.#ships.forEach((ship) => {
            let isHit = false;
            if(ship.dir === 'right') {
                if(ship.pos[1] === pos[1]) {
                    if(ship.pos[0] <= pos[0] && pos[0] <= ship.pos[0] + ship.length - 1) {
                        isHit = true;
                    }
                }
            } else {
                if(ship.pos[0] === pos[0]) {
                    if(ship.pos[1] <= pos[1] && pos[1] <= ship.pos[1] + ship.length - 1) {
                        isHit = true;
                    }
                }
            }

            if(isHit === true)
            {
                hit++;
                ship.hit();
            }
        });

        if(hit === 1)
            this.#hits.push(pos.slice());
        else if (hit === 0)
            this.#misses.push(pos.slice());
        else
            throw new Error('too many hits in receiveAttack function')
    }

    getHits() {
        return this.#hits.slice();
    }

    getMisses() {
        return this.#misses.slice();
    }

    getShipPositions() {
        return this.#shipPositions.slice();
    }

    allShipsSank() {
        let numSank = 0;
        this.#ships.forEach((ship) => {
            if(ship.isSunk()) {
                numSank++;
            }
        });

        return numSank === this.numShips();
    }

    #findArrayInArray(array, findPos) {
        const found = array.find(item =>
            Array.isArray(item) &&
            item.length === findPos.length &&
            item.every((val, i) => val === findPos[i])
        );

        if(found !== undefined)
            return true;
        return false;
    }
}