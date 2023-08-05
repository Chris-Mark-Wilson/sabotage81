import Tnt from '../components/TnT'
const createBoxArray=(max)=>{ 
    let boxes=[]
   
    for(let i=0;i<max;i++){
      
    //check for duplication/overlay 
    boxes.push( <Tnt index={i} key={i}/>)
    for (let o=0;o<boxes.length-1;o++){
     
        // if(boxes[o]===x && boxes[o]===y){
        //   boxes.pop()
        //   i--;
        //  }
       }
     }
    
     return boxes;
  }
  
export default createBoxArray