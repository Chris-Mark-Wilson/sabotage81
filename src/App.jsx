import {useState,useEffect } from 'react'
import './App.css'
import createBoxArray from './utils/createBoxArray'
import getRnd from "./utils/getRnd";
import { useRef } from 'react';
import movePlayer from './utils/movePlayer';


const App=()=>{
  const inputRef = useRef(null);
  const [myPos,setMyPos]=useState({})
  const[guardPos,setGuardPos]=useState({})
  const maxBoxes=300
  const [bombSet,setBombSet]=useState(false)
  const [boxes,setBoxes]=useState([])
  const [bombPos,setBombPos]=useState({})

  useEffect(() => {// just runs this once on page load
    createBoxArray(setBoxes,maxBoxes);
  }, []);

  useEffect(()=>{
      inputRef.current.focus();
  }, [])
  
    useEffect(()=>{
      do{
      let x=getRnd();
      let y=getRnd();
      setMyPos({x:x,y:y})
    }while(boxes.some(box=>myPos.x===box.x && myPos.y===box.y))
    // sets me and guard checking for overlay with a tnt, doesnt seem to work 100% of the time, sometimes we get a clash with my position being overlaid by a tnt..
    do{
          let x=getRnd();
          let y=getRnd();
          setGuardPos({x:x,y:y})
        }while(boxes.some(box=>guardPos.x===box.x&&guardPos.y===box.y))
        setBombPos({x:myPos.x,y:myPos.y})
      },[])
///////////////////////////////////////////////////////

const handleKeyDown=(e)=>{
  movePlayer(setMyPos,boxes,myPos,e)
  
  }
    
  //////////////////////////////////////////////////////////
  
  
 
  

  return (
<div className="game">
   <div className="main">
   {boxes.map((box,index)=>{
    return <div className='tnt' key={index} style={{gridColumn:box.x,gridRow:box.y}}>tnt</div>
   })}

   <div ref={inputRef} className='me' tabIndex={0} onKeyDown={handleKeyDown}style={{gridColumn:myPos.x,gridRow:myPos.y}}>S</div>

   <div className='guard' style={{gridColumn:guardPos.x,gridRow:guardPos.y}}>G</div>

              
        </div>
 </div>
   
  )
}
export default App
