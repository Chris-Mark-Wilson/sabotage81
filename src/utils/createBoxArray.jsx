import getRnd from "./getRnd"
const createBoxArray=(max)=>{ 
 
  
  
  let newBoxes=[]
   
    for(let i=0;i<max;i++){
      let x=0;
      let y=0;
      do{
      x=getRnd()
      y=getRnd()
      }
      while(newBoxes.some(box=>box.x===x && box.y===y))
      newBoxes.push({x,y})
    }    
   return newBoxes;
  
  


}
  
export default createBoxArray