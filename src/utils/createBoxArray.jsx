import TnT from '../components/TnT'
const createBoxArray=(max)=>{ 
    let boxes=[]
   
    for(let i=0;i<max;i++){
      let x=Math.floor(Math.random()*31)
      let y=Math.floor(Math.random()*31)
    //check for duplication/overlay 
    boxes.push( <TnT key={i} x={x} y={y} text={"tnt"}/>)
    for (let o=0;o<boxes.length-1;o++){
        if(boxes[o][0]===x && boxes[o][1]===y){
          boxes.pop()
          i--;
         }
       }
     }
     return boxes;
  }
  
export default createBoxArray