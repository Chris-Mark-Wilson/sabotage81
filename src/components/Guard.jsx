import getRnd from "../utils/getRnd";
import { useContext } from "react";
import { GameContext } from "../gameContext";
import { useEffect } from "react";


const Guard=()=>{
  const{guard,guardPos,setGuardPos,boxes,gameOver}=useContext(GameContext)
  
  useEffect(()=>{
    if(gameOver){
      let x=0;
      let y=0;
      do {
        x = getRnd();
        y = getRnd();
      } while (
        boxes.some(
          (box) =>
            (x === box.x && y === box.y) || (x === myPos.x && y === myPos.y)
        )
      );
      setGuardPos({ x, y });
    }
  },[gameOver])

    return   (
    <div
    className="guard"
    style={{ gridColumn: guardPos.x, gridRow: guardPos.y }}
  >
    {guard}
  </div>
    )
} 
export default Guard