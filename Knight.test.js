import Knight from './Knight.js';

describe('a knight', () => {
  const knight = new Knight([0, 0]);

  it('moves only on the board', () => {
    expect(knight.knightMoves([0, 0],[1, 8])).toBe(false);
  });

  it('properly sets up connections', () => {
    expect(knight.board.grid[0][0]).toEqual([ [1,2], [2,1] ]);
  });

  it('retrieves connections to a given node', () => {
    expect(knight.getConnections([0,0])).toEqual([ [1,2], [2,1] ]);
  });

  it('moves to connected nodes', () => {
    expect(knight.knightMoves([0, 0], [1, 2])).toEqual([[0, 0], [1, 2]]);
  });

  it('moves to nodes not immediately connected', () => {
    expect(knight.knightMoves([0, 0], [3, 3])).toEqual([[0,0], [1,2], [3,3]]);
  });

  it('finds path to far away nodes', () => {
    expect(knight.knightMoves([0, 0], [7, 6])).toEqual([[0, 0], [2, 1], [3, 3], [4, 5], [5, 7], [7, 6]]);
  });
  
});