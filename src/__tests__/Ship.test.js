import { Ship } from '../Ship.js';

describe("Ship Class Test", () => {
    const ship = new Ship(5);
    test('have length of 5', () => {
        expect(ship.length).toBe(5);
    });

    test('be hit once', () => {
        ship.hit();
        expect(ship.hits).toBe(1);
    });

    test('be hit twice', () => {
        ship.hit();
        expect(ship.hits).toBe(2);
    });

    test('be not sunk', () => {
        expect(ship.isSunk()).toBe(false);
    });

    test('be hit 5 times', () => {
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.hits).toBe(5);
    });

    test('be sunk', () => {
        expect(ship.isSunk()).toBe(true);
    });


    test('hit to throw error', () => {
        expect(() => ship.hit()).toThrow();
    });

});