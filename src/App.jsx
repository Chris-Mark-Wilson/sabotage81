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

const App=()=>{
  const [myX,setMyX]=useState(getRnd())
  const [myY,setMyY]=useState(getRnd())
  const [guardX,setGuardX]=useState(getRnd())
  const [guardY,setGuardY]=useState(getRnd())
  const [bombX,setBombX]=useState(myX)
  const[bombY,setBombY]=useState(myY)
  let     [count,setCount]=useState(9)
let [bombSet,setBombSet]=useState(false);
  const inputRef=useRef(null) // used to set focus on player at start
  useEffect(() => {
    inputRef.current.focus();
}, []);

  // state for array of uxb boxes
  const [boxes,setBoxes]=useState(()=>{
    let boxes=[]
    let max=300
    for(let i=0;i<max;i++){
      let x=Math.floor(Math.random()*31)
      let y=Math.floor(Math.random()*31)
    //check for duplication/overlay 
    for (let o=0;o<boxes.length;o++){
        if(boxes[o][0]===x && boxes[o][1]===y){
          max++;
          continue;
         }
       }
       boxes.push([x,y])
     }
     return boxes;
  })
  
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
     setBombSet(true);
          setCountdown()
        }
}

const setCountdown=()=>{
 
  if(count>=0) setTimeout(tickdown,1000)
}
const tickdown=()=>{
if(count===0)boomTime();
count--;
const bomb=document.getElementById("bomb")
bomb.textContent=count;
setCountdown()
}
const boomTime=()=>{
  stopCount()
  console.log("Bang!")
}
const stopCount=()=>{
setBombSet(false);
}

  return (
    <>
      
      <div id="main">
    {boxes.map((box,index)=>{
      return <div className="tnt" style={{gridColumn:box[0],gridRow:box[1]}} key={index}>X</div>
    })}
    <div id="bomb" style={{gridColumn:bombX,gridRow:bombY,visibility:false}}>.</div>
    <div ref= {inputRef} id="me" tabIndex={0} onKeyDown={handleKeyDown} style={{gridColumn:myX,gridRow:myY}}>S</div>
    <div id="guard"  style={{gridColumn:guardX,gridRow:guardY}}>G</div>
    
       </div>
    </>
  )
}

export default App
