import { settings } from "../settings";
import getRnd from "./getRnd";


export const getUniquePosition=(boxes,myPos)=>{
    let x=0;
    let y=0;
    do {
      x = getRnd(settings.boardWidth);
      y = getRnd(settings.boardHeight);
    } while (
      boxes.some(
        (box) =>
          (x === box.x && y === box.y) || (x === myPos.x && y === myPos.y)
      )
    );
 
    return{x,y}
}