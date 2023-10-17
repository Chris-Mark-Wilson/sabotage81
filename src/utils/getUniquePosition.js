import { settings } from "../settings";
import getRnd from "./getRnd";


export const getUniquePosition=(boxes,myPos,g)=>{

  //if g=true then we are looking to spawn a guard, if not we are spawning the player
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
 if(g===true&&myPos.x!=undefined&&Math.abs(myPos.x-x)<5&&Math.abs(myPos.y-y)<5) {

  return getUniquePosition(boxes,myPos,g)//make sure guards are not with 5 grid spaces of player when spawned

 }

    return{x,y}
}