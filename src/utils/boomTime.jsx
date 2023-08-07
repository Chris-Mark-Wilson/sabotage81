const boomTime=(bangArray)=>{

 
  ///recursive base case
  if(bangArray.length===0){//bang array.length===0 or stop
    boxes.forEach(box=>{
      console.log(box.props.text,box.props.x,box.props.y)
     })
    setBombSet(false);
console.log("Boom!")
console.log("score=",score)

console.log(myX,myY,"my x,y state")
console.log(bombX,bombY,"bomb x,y state")
let e=document.getElementById("me")
console.log(e.style.gridColumn,",",e.style.gridRow,"<-my actual x,y")
e=document.getElementById("bomb")
console.log(e.style.gridColumn,",",e.style.gridRow,"<-bomb actual x,y")
return
  }

 
  if(!stop){
    let testArray=[];
    testArray.push([bangArray[0][0]-1,bangArray[0][1]-1]) // top left
    testArray.push([bangArray[0][0],bangArray[0][1]-1]) // top mid
    testArray.push([bangArray[0][0]+1,bangArray[0][1]-1]) // top right
    testArray.push([bangArray[0][0]-1,bangArray[0][1]]) // left
    testArray.push([bangArray[0][0]+1,bangArray[0][1]]) //right
    testArray.push([bangArray[0][0]-1,bangArray[0][1]+1]) // bottom left
    testArray.push([bangArray[0][0],bangArray[0][1]+1]) // bottom mid
    testArray.push([bangArray[0][0]+1,bangArray[0][1]+1]) //bottom right

    
//////// remove box from array //////////////////
    testArray.forEach(position=>{
          boxes.forEach((box,index)=>{  //test for uxb and remove
            
                if(box.props.x===position[0] && box.props.y===position[1]){
                  bangArray.push(position);
                 setBoxes(removeBox(index))
                //  setBoxes(boxes)
                if(bangArray.length>50)setStop(true);
                }
          })
    })

    bangArray.shift();  //remove this position 
    

  }
    
    boomTime(bangArray) // recursive call
}
export default boomTime