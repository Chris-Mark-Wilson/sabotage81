
import getRnd from "./getRnd";


export const getUniquePosition=(boxes,myPos)=>{
    let x=0;
    let y=0;
    do {
      x = getRnd();
      y = getRnd();
    } while (
      boxes.some(
        (box) =>
          (x === box.x && y === box.y) || (x === myPos.x && y === myPos.y)
      )
    );
 
    return{x,y}
}