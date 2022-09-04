import ChessBoard from "./ChessBoard.js";

export default class Knight{
  constructor(position){    
    this.position = position;
    this.board = this.setup();    
  }

  knightMoves(from = this.position, to, history = []){
    if(!this.onBoard(to)){
      return false;
    }
        
    let moveSequence = [...history, from];
    const matchTo = ([x,y]) => {
      return  ([z, w]) => x === z && y === w;
    } 
    const connectedNodes = this.getConnections(from);
    const connectedToDestination = this.getConnections(to);
    if(connectedNodes.some(matchTo(to))){
      moveSequence.push(to);      
    }else{
      // check other paths

      /*  might be helpful to track square color to optimize search for
          shortest path because knights must alternate what color they're 
          on with each move... if the knight lands on the same color as it
          starts on, then that adds at least one move compared to the scenario
          where it changes color.
          i believe we can get color from the parity of the sum of the target
          square's coordinates. 
          (e.g. 1,3 sums to 4, and 4%2 = 0 so it's even, thus it's a white square).
      */
      connectedNodes.forEach(pos => {
        if(!history.some(matchTo(pos))){
          // moveSequence = this.knightMoves(pos, to, moveSequence);
          if(connectedToDestination.some(matchTo(pos))){
            moveSequence = this.knightMoves(pos, to, moveSequence);
          }
        }
      });
    }    
    return moveSequence;
  }

  getConnections(coords){
    return this.board.grid[coords[0]][coords[1]];
  }
  
  setup(){
    const board = new ChessBoard();
    for(let i = 0; i < 8; i++){
      for(let j = 0; j < 8; j++){        
        board.grid[i][j] = this.assignConnections([i,j]);
      }
    }
    return board;
  }

  assignConnections(pos){
    const candidates = [
       [pos[0]-1, pos[1]+2], 
       [pos[0]-1, pos[1]-2], 
       [pos[0]-2, pos[1]+1], 
       [pos[0]-2, pos[1]-1],
       [pos[0]+1, pos[1]+2],
       [pos[0]+1, pos[1]-2],
       [pos[0]+2, pos[1]+1],
       [pos[0]+2, pos[1]-1], 
      ];
    const connections = [];
    for(let i = 0; i < candidates.length; i++){
      if(this.onBoard(candidates[i])){
        connections.push(candidates[i]);
      }
    }
    return connections;    
  }

  onBoard([x, y]){
    if(x > 7 || x < 0){
      return false;
    }
    if(y > 7 || y < 0){
      return false;
    }
    return true;
  }
  
}