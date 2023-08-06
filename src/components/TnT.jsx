import getRnd from "../utils/getRnd"
import { useState } from "react"

const Tnt=({index})=>{
//index passed in from createBoxArray() on startup


 const blowup=()=>{
    // pass score in to play with it;
    // needs full array(boxes)
    //
    // const [x,setX]=useState(getRnd())
  }
  const [x,setX]=useState(getRnd())
  const [y,setY]=useState(getRnd())
  const[text,setText]=useState("tnt")

  const blurb=1;
    return(
  <div className="tnt"  key ={index} style={{gridColumn:x,gridRow:y}}>{text}</div>
    )
  }
  export default Tnt