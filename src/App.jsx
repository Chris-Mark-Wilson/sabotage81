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

  useEffect(()=>{

    setBoxes( createBoxArray(maxBoxes))
  },[])


  useEffect( () => {// just runs this once on page load
  let count=0;
      let x=0;
      let y=0;
      do{
        count++;
      x=getRnd();
      y=getRnd();
      console.log(count,"<number of tries to get a unique position for player")
   
    }while(boxes.some(box=>{// this isnt even iterating through boxes on first render???
     
      return x===box.x && y===box.y}))// <<<THIS is not working??? it doesnt know what boxes is, so will always return false..
    setMyPos({x:x,y:y})// question is WHY doesnt it know what boxes is? or more to the point it doesnt know what box.x is, it knows boxes is an array, but it thinks its empty at thi point.
    console.log(x,y,",x,y postion to set myPos")
    console.log(myPos.x,myPos.y,",myPos inside of use effect, AFTER being set")
  // THIS FUNCTION is not doing what its supposed to do because it doesnt know what boxes[any].x or boxes[any].y are.. comes back undefined??
  //what is going on??

    // sets me and guard checking for overlay with a tnt, doesnt seem to work 100% of the time, sometimes we get a clash with my position being overlaid by a tnt..
    do{
           x=getRnd();
           y=getRnd();
          }while(boxes.some(box=>x===box.x && y===box.y))
          setGuardPos({x,y})
  }, [boxes]);// right.. I fucking fixed it by setting the dependeny to boxes so when useEffect createBoxes()  fires it runs this use effect.. fucking react man..

  useEffect(()=>{
      inputRef.current.focus();
  }, [])
  
    
      ///////////////////////////////////////////////////////
      // setBombPos({x:myPos.x,y:myPos.y})

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
