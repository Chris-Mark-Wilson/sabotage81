import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
 const boxes=[]
 
 for(let i=0;i<100;i++){
  //TODO- these need all to be unique co-ords...
   let x=Math.floor(Math.random()*44)
   let y=Math.floor(Math.random()*44)
   boxes.push([x,y])
  }
 
 

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
