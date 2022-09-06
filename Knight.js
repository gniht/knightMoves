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

    let foundMove = false;
    
    if(connectedNodes.some(matchTo(to))){
      moveSequence.push(to);
      foundMove = true;      
    }else{      
      connectedNodes.forEach(pos => {
        if(connectedToDestination.some(matchTo(pos)) && !foundMove){
          moveSequence = this.knightMoves(pos, to, moveSequence);
          foundMove = true;            
        }        
      });
    }
    if(!foundMove){
      // 4th degree
      connectedNodes.forEach(pos => {
        this.getConnections(pos).forEach(node => {
          if(connectedToDestination.some(matchTo(node)) && !foundMove){
            moveSequence = this.knightMoves(pos, to, moveSequence);
            foundMove = true;
          }
        });
      });
    }
    if(!foundMove){      
      moveSequence = this.knightMoves(this.moveTowardFarAwaySquare(from, to, connectedNodes), to, moveSequence);
    }    
    return moveSequence;
  }

  moveTowardFarAwaySquare(from, to, candidates){
    let x = to[0] - from[0];
    let y = to[1] - from[1];    
    let shortestPathLength = Math.sqrt(x*x + y*y);
    let mostDirect = [x, y];
    
    candidates.forEach(pos => {
      let a = to[0] - pos[0];
      let b = to[1] - pos[1];
      let distance = Math.sqrt(a*a + b*b);
      if(distance < shortestPathLength){
        shortestPathLength = distance;
        mostDirect = pos;        
      }
    });
    return mostDirect;
  }

  

  getConnections(coords){
    // todo: generalize getConnections    
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
    // populates each target square on the board
    // with an array of connections
    
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