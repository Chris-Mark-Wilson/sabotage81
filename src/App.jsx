import { useState } from 'react'
import { useRef,useEffect,createElement } from 'react'

import './App.css'


const getRnd=()=>{
  return Math.floor(Math.random()*31)
 }

const getGridElement=(x,y,boxes)=>{
    for(let i=0;i<boxes.length;i++){
      if(boxes[i][0]===x && boxes[i][1]===y) return true
    }
     return false;
}
/////////////////////////////////////////////////////////////////////
const App=()=>{
  let [myX,setMyX]=useState(getRnd())
  let [myY,setMyY]=useState(getRnd())
  let [guardX,setGuardX]=useState(getRnd())
  let [guardY,setGuardY]=useState(getRnd())
  let [bombX,setBombX]=useState(myX)
  let [bombY,setBombY]=useState(myY)
  let [count,setCount]=useState(10)
  let [bombSet,setBombSet]=useState(false);
  let [stop,setStop]=useState(false)
  let [score,setScore]=useState(0)
  const inputRef=useRef(null) // used to set focus on player at start
  useEffect(() => {
    inputRef.current.focus();
}, []);

  // state for array of uxb boxes
  let [boxes,setBoxes]=useState(()=>{
    let boxes=[]
    let max=300
    for(let i=0;i<max;i++){
      let x=Math.floor(Math.random()*31)
      let y=Math.floor(Math.random()*31)
    //check for duplication/overlay 
    boxes.push([x,y])
    for (let o=0;o<boxes.length-1;o++){
        if(boxes[o][0]===x && boxes[o][1]===y){
          boxes.pop()
          i--;
         }
       }
     }
     return boxes;
  },[])

////////////////////////////////////////////////////
  const handleKeyDown=(e)=>{
          if(e.key==="q"){
          const boxAbove=getGridElement(myX,myY-1,boxes)
          if(!boxAbove){
          if(myY>0) {
            setMyY(myY-1)
              if(!bombSet)setBombY(bombY-1)
          }
          }
        }
        if(e.key==="a"){
          const boxBelow=getGridElement(myX,myY+1,boxes)
          if(!boxBelow){
          if(myY<30) {
            setMyY(myY+1)
              if(!bombSet)setBombY(bombY+1)
          }
          }
        }
        if(e.key==="p"){
          const boxRight=getGridElement(myX+1,myY,boxes)
          if(!boxRight){
          if(myX<30) {
            setMyX(myX+1)
              if(!bombSet)setBombX(bombX+1)
          }
          }
        }
        if(e.key==="o"){
          const boxLeft=getGridElement(myX-1,myY,boxes)
          if(!boxLeft){
          if(myX>0) {
            setMyX(myX-1)
            if(!bombSet)setBombX(bombX-1)
          }
          }
        }
        if(e.key===" "){
          console.log(boxes.length,"<-boxes length on fire")
     setBombSet(true);
          setCountdown()
        }
}

///////////////////////////////////////////////////////////////////
const setCountdown=()=>{
  if(count>=1) setTimeout(tickdown,1000)
}

const tickdown=()=>{
    if(count===1)boomTime([[bombX,bombY]]);
    count--;
    const bomb=document.getElementById("bomb")
    bomb.textContent=count;
    setCountdown()
}

const stopCount=()=>{
  setBombSet(false);
}

////////////////BAAAAAANNNNNGGGG//////////////////////////////

const boomTime=(bangArray)=>{
  stopCount()
  console.log("Bang!")

  if(bangArray.length===0){
console.log("finished")
console.log("score=",score)
let m=document.getElementById("me")
let x=m.style.gridColumn
let y=m.style.gridRow
setMyY(y)
setMyX(x)
let b=document.getElementById("me")
x=b.style.gridColumn
y=b.style.gridRow
setBombX(x)
setBombY(y)

console.log("me->",myX,",",myY)
console.log("bomb->",bombX,",",bombY)

return
  }

 console.log(bangArray[0][0],"bangarray00")
 console.log(boxes.length,"<-boxes length start")
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


    testArray.forEach(position=>{
          boxes.forEach((box,index)=>{  //test for uxb and remove
                if(box[0]===position[0] && box[1]===position[1]){
                  bangArray.push(position);
                  setBoxes(removeBox(index))
                }
          })
    })

    bangArray.shift();  //remove this position 
    

    if(bangArray.length>50)stop=true;
    
    boomTime(bangArray) // recursive call
  }
}

//////////////////////////////////////

const removeBox=(index)=>{
  let stash=[]
  console.log(index,"<-index")
  for(let i=0;i<index;i++){
    let shifted=boxes.shift()
     // remove the front of the 'queue' and 'stash'
    stash.push(shifted)
  }
  boxes.shift() //remove the box to blow up
  setScore(score+=1)
  // put the stash back
  for(let i=stash.length-1;i>=0;i--){
    boxes.unshift(stash[i])
  }
 
  return boxes
}

/////////////////////////////////////////////////////////////////////
  return (
    <>
      
      <div id="main">
    {boxes.map((box,index)=>{
      return <div className="tnt" style={{gridColumn:box[0],gridRow:box[1]}} key={index}>X</div>
    })}
    <div id="bomb" style={{gridColumn:bombX,gridRow:bombY,visibility:false}}>10</div>
    <div ref= {inputRef} id="me" tabIndex={0} onKeyDown={handleKeyDown} style={{gridColumn:myX,gridRow:myY}}>S</div>
    <div id="guard"  style={{gridColumn:guardX,gridRow:guardY}}>G</div>
    
       </div>
    </>
  )
}

export default App
