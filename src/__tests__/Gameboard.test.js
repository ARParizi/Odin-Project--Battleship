import { Gameboard } from '../Gameboard.js';

describe("Gameboard Place Ship Test", () => {
    const board = new Gameboard();
    test('init to 0 ships', () => {
        expect(board.numShips()).toBe(0);
    });

    test('Place Ship Invalid Direction 1', () => {
        const result = board.placeShipCheck([0,0], 'up', 2);
        expect(result.possible).toBe(false);
        expect(result.error).toBe('Place Ship Direction Undefined');
    });

    test('Place Ship Invalid Direction 2', () => {
        const result = board.placeShipCheck([0,0], 'left', 2);
        expect(result.possible).toBe(false);
        expect(result.error).toBe('Place Ship Direction Undefined');
    });

    test('Place Ship Start X too low', () => {
        const result = board.placeShipCheck([-1,0], 'right', 2);
        expect(result.possible).toBe(false);
        expect(result.error).toBe('Place Ship Position X Out of Bounds');
    });

    test('Place Ship Start X too high', () => {
        const result = board.placeShipCheck([10,0], 'right', 2);
        expect(result.possible).toBe(false);
        expect(result.error).toBe('Place Ship Position X Out of Bounds');
    });

    test('Place Ship End X too high', () => {
        const result = board.placeShipCheck([8,0], 'right', 3);
        expect(result.possible).toBe(false);
        expect(result.error).toBe('Place Ship End Position X Out of Bounds');
    });

    test('Place Ship Start Y too low', () => {
        const result = board.placeShipCheck([0, -1], 'right', 2);
        expect(result.possible).toBe(false);
        expect(result.error).toBe('Place Ship Position Y Out of Bounds');
    });

    test('Place Ship Start Y too high', () => {
        const result = board.placeShipCheck([0, 10], 'right', 2);
        expect(result.possible).toBe(false);
        expect(result.error).toBe('Place Ship Position Y Out of Bounds');
    });

    test('Place Ship End Y too high', () => {
        const result = board.placeShipCheck([0, 8], 'down', 3);
        expect(result.possible).toBe(false);
        expect(result.error).toBe('Place Ship End Position Y Out of Bounds');
    });

    test('Valid Place Ship 1', () => {
        const result = board.placeShipCheck([0, 2], 'right', 2);
        expect(result.possible).toBe(true);
    });

    test('Valid Place Ship 2', () => {
        const result = board.placeShipCheck([0, 8], 'down', 2);
        expect(result.possible).toBe(true);
    });

    test('Place Ship @ (5, 4), dir: down, length: 3', () => {
        board.placeShip([5, 4], 'down', 3);
        expect(board.numShips()).toBe(1);
    });

    test('Valid Place Ship 3', () => {
        const result = board.placeShipCheck([2, 1], 'right', 3);
        expect(result.possible).toBe(true);
    });

    test('Valid Place Ship 4', () => {
        const result = board.placeShipCheck([0, 4], 'right', 3);
        expect(result.possible).toBe(true);
    });

    test('Valid Place Ship 5', () => {
        const result = board.placeShipCheck([7, 4], 'right', 3);
        expect(result.possible).toBe(true);
    });

    test('Valid Place Ship 6', () => {
        const result = board.placeShipCheck([7, 4], 'down', 3);
        expect(result.possible).toBe(true);
    });

    test('Valid Place Ship 7', () => {
        const result = board.placeShipCheck([4, 8], 'right', 3);
        expect(result.possible).toBe(true);
    });

    test('Valid Place Ship 8', () => {
        const result = board.placeShipCheck([3, 5], 'right', 1);
        expect(result.possible).toBe(true);
    });

    test('Invalid Place Ship 1', () => {
        const result = board.placeShipCheck([3, 5], 'right', 2);
        expect(result.possible).toBe(false);
        expect(result.error).toBe('Place Ship Collision with Other Ships');
    });

    test('Invalid Place Ship 2', () => {
        const result = board.placeShipCheck([3, 5], 'right', 5);
        expect(result.possible).toBe(false);
        expect(result.error).toBe('Place Ship Collision with Other Ships');
    });

    test('Valid Place Ship 9', () => {
        const result = board.placeShipCheck([5, 0], 'down', 3);
        expect(result.possible).toBe(true);
    });

    test('Invalid Place Ship 3', () => {
        const result = board.placeShipCheck([5, 0], 'down', 4);
        expect(result.possible).toBe(false);
        expect(result.error).toBe('Place Ship Collision with Other Ships');
    });

    test('Place Ship @ (2, 4), dir: right, length: 2', () => {
        board.placeShip([2, 4], 'right', 2);
        expect(board.numShips()).toBe(2);
    });

    test('Invalid Place Ship 4', () => {
        const result = board.placeShipCheck([3, 2], 'down', 2);
        expect(result.possible).toBe(false);
        expect(result.error).toBe('Place Ship Collision with Other Ships');
    });
});

describe("Gameboard Test Hit, Miss & Sink the Ships", () => {
    const board = new Gameboard();
    test('init to 0 ships', () => {
        expect(board.numShips()).toBe(0);
    });

    test('Place Ship @ (2, 4), dir: right, length: 2', () => {
        board.placeShip([2, 4], 'right', 2);
        expect(board.numShips()).toBe(1);
    });

    test('Place a Hit', () => {
        let hitArray = board.getHits();
        expect(hitArray.length).toBe(0);
        board.receiveAttack([2, 4]);
        hitArray = board.getHits();
        expect(hitArray.length).toBe(1);
        expect(hitArray[0][0]).toBe(2);
        expect(hitArray[0][1]).toBe(4);
    });

    test('Place a Miss', () => {
        let missArray = board.getMisses();
        expect(missArray.length).toBe(0);
        board.receiveAttack([2, 3]);
        let hitArray = board.getHits();
        expect(hitArray.length).toBe(1);
        missArray = board.getMisses();
        expect(missArray.length).toBe(1);
        expect(missArray[0][0]).toBe(2);
        expect(missArray[0][1]).toBe(3);
    });

    test('Sink All Ships', () => {
        board.receiveAttack([3, 4]);
        let hitArray = board.getHits();
        expect(hitArray.length).toBe(2);
        expect(hitArray[1][0]).toBe(3);
        expect(hitArray[1][1]).toBe(4);
        expect(board.allShipsSank()).toBe(true);
    });

    test('Place repetitive attacks to return check false', () => {
        expect(board.attackValid([2, 3])).toBe(false);
    });
});