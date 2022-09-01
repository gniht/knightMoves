import ChessBoard from "./ChessBoard.js";

export default class Knight{
  constructor(position){    
    this.position = position;
  }

  knightMoves(destination){
    if(destination[0] > 7 || destination[0] < 0){
      return false;
    }
    if(destination[1] > 7 || destination[1] < 0){
      return false;
    }
    return true;
  }  
  
}