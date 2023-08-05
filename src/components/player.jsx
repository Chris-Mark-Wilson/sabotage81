import checkGridElement from '../utils/checkGridElement'
const Player=({inputRef,myX,myY,setMyX,setMyY,setBombX,setBombY,myText,boxes,bombSet,setBombSet})=>{
    
   


const handleKeyDown=(e)=>{
    if(e.key==="q"){
      const boxAbove=checkGridElement(myX,myY-1,boxes)
         if(!boxAbove){
    if(myY>0) {
      setMyY(myY-1)
        if(!bombSet){
          setBombY(myY-1)
          setBombX(myX)
        }
    }
    }
  }
  if(e.key==="a"){
    const boxBelow=checkGridElement(myX,myY+1,boxes)
    if(!boxBelow){
    if(myY<30) {
      setMyY(myY+1)
        if(!bombSet){
          setBombY(myY+1)
          setBombX(myX)
        }
      }
    }
  }
  if(e.key==="p"){
    const boxRight=checkGridElement(myX+1,myY,boxes)
    if(!boxRight){
    if(myX<30) {
      setMyX(myX+1)
        if(!bombSet){
          setBombX(myX+1)
          setBombY(myY)
        }
    }
  }
  }
  if(e.key==="o"){
    const boxLeft=checkGridElement(myX-1,myY,boxes)
    if(!boxLeft){
    if(myX>0) {
      setMyX(myX-1)
      if(!bombSet){
        setBombX(myX-1)
        setBombY(myY)
      }
    }
    }
  }
  if(e.key===" "){
    console.log("Ticking....")
      setBombSet(true);
    setCountdown()
  }
  }
  
return (
    <div ref= {inputRef} id="me" tabIndex={0} onKeyDown={handleKeyDown} style={{gridColumn:myX,gridRow:myY}}>{myText}</div>
)
}

export default Player;