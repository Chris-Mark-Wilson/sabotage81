import getRnd from "./getRnd"
const createBoxArray=(setBoxes,max)=>{ 
    let newBoxes=[]
   
    for(let i=0;i<max;i++){
    let x=getRnd()
    let y=getRnd()
        if(newBoxes.some(box =>box.x===x && box.y===y)){
          i--;
         }else{
          newBoxes.push({x,y})
         }
     }
     setBoxes(newBoxes);
  }
  
export default createBoxArray