import ChessBoard from "./ChessBoard.js";

export default class Knight{
  constructor(position){    
    this.position = position;
    this.board = this.setup();    
  }

  knightMoves(to, from = this.position){
    if(!this.onBoard(to)){
      return false;
    }    
    const moveSequence = [from];


    return moveSequence;
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