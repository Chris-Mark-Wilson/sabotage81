import { settings } from "../settings";

import getRnd from "./getRnd"
const createBoxArray=(max)=>{ 
  let newBoxes=[]
    for(let i=0;i<max;i++){
      let x=0;
      let y=0;
      do{
      x=getRnd(settings.boardWidth)
      y=getRnd(settings.boardHeight)
      }
      while(newBoxes.some(box=>box.x===x && box.y===y))
      newBoxes.push({id:i,x,y})
    }    
   return newBoxes;
}
  
export default createBoxArray