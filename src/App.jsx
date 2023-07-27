import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
 const boxes=[[]]
 let max=300
 for(let i=0;i<max;i++){
  //TODO- these need all to be unique co-ords...
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
 console.log(boxes)
 

  return (
    <>
      
      <div id="main">
    {boxes.map((box,index)=>{
      return <div className="tnt" style={{gridColumn:box[0],gridRow:box[1]}} key={index}>X</div>
    })}
       </div>
    </>
  )
}

export default App
