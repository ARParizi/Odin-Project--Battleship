export class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
    }
    hit = () => {
        if(this.length > this.hits)
            this.hits++;
        else
            throw new Error('Ship hits greater than length');
    }
    isSunk = () => this.hits === this.length;
}