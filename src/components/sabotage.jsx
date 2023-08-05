
//////////////////////////////////
//      Main game area            //
/////////////////////////////////

import createBoxArray from '../utils/createBoxArray';
import Bomb from './bomb'
import Player from './player'
import Guard from './guard'
import getRnd from '../utils/getRnd';
import { useState,useRef,useEffect } from 'react';

const Sabotage = ({score,setScore}) =>{

  const [myX,setMyX]=useState(getRnd())
  const [myY,setMyY]=useState(getRnd())
  const [myText,setMyText]=useState("S")
  const [guardX,setGuardX]=useState(getRnd())
  const [guardY,setGuardY]=useState(getRnd())
  const [guardText,setGuardText]=useState("G")
  const [bombX,setBombX]=useState(myX)
  const [bombY,setBombY]=useState(myY)
  const [bombText,setBombText]=useState("5")
  const[bombSet,setBombSet]=useState(false)
  const inputRef=useRef(null) // used to set focus on player at start
    useEffect(() => {
      inputRef.current.focus();
  }, []);
    const maxTnt=300;
    let [boxes,setBoxes]=useState(createBoxArray(maxTnt))
      useEffect(()=>{
          setBoxes(boxes)
        },[score])


    return (
        <div id="main">
        {boxes.map((box,index)=>{
              return box;
    })}
        <Bomb bombX={bombX} bombY={bombY} bombText={bombText}/>
        <Player inputRef={inputRef} myX={myX} myY={myY}setMyX={setMyX} setMyY={setMyY} setBombX={setBombX} setBombY={setBombY} myText={myText} boxes={boxes}bombSet={bombSet} setBombSet={setBombSet}/>
        <Guard guardX={guardX} guardY={guardY} guardText={guardText}/>
        </div>
    )
}
export default Sabotage

//30x30 game board
