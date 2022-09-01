import Knight from './Knight.js';

describe('a knight', () => {
  const knight = new Knight([0, 0]);

  it('moves only on the board', () => {
    expect(knight.knightMoves([1, 8])).toBe(false);
  });
  
});