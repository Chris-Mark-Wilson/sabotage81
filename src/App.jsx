import { useState } from 'react'
import { useRef,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

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

// useEffect(()=>{
//   focusMe.current.focus();
// },[])
  
  
  const handleKeyDown=(e)=>{
  
    if(e.key==="q"){
     setMyY(myY-1)
    }
    
    if(e.key==="a"){
      setMyY(myY+1)
    }
   if(e.key==="p"){
    setMyX(myX+1)
   }
   if(e.key==="o"){
    setMyX(myX-1)
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


 const getRnd=()=>{
  return Math.floor(Math.random()*31)
 }
 

export default App
