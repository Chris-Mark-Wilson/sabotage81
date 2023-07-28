import { useState } from 'react'
import { useRef,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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

function App() {
  const [myX,setMyX]=useState(getRnd())
  const [myY,setMyY]=useState(getRnd())
  const [guardX,setGuardX]=useState(getRnd())
  const [guardY,setGuardY]=useState(getRnd())
  const inputRef=useRef(null)
  useEffect(() => {
    inputRef.current.focus();
}, []);

  const [boxes,setBoxes]=useState(()=>{
    let boxes=[]
    let max=300
    for(let i=0;i<max;i++){
    
      let x=Math.floor(Math.random()*31)
      let y=Math.floor(Math.random()*31)
     
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
      if(myY>0) setMyY(myY-1)
    }
  }
    
    if(e.key==="a"){
      const boxBelow=getGridElement(myX,myY+1,boxes)
      if(!boxBelow){
      if(myY<30) setMyY(myY+1)
    }
  }
  
   if(e.key==="p"){
    const boxRight=getGridElement(myX+1,myY,boxes)
    if(!boxRight){
    if(myX<30) setMyX(myX+1)
   }
  }

  if(e.key==="o"){
     const boxLeft=getGridElement(myX-1,myY,boxes)
     if(!boxLeft){
    if(myX>0) setMyX(myX-1)
   }
  }
}

  return (
    <>
      
      <div id="main">
    {boxes.map((box,index)=>{
      return <div className="tnt" style={{gridColumn:box[0],gridRow:box[1]}} key={index}>X</div>
    })}
    <div ref= {inputRef} id="me" tabIndex={0} onKeyDown={handleKeyDown} style={{gridColumn:myX,gridRow:myY}}>S</div>
    <div id="guard"  style={{gridColumn:guardX,gridRow:guardY}}>G</div>
       </div>
    </>
  )
}


 
 

export default App
