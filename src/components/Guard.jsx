import { settings } from "../settings";
import { useContext } from "react";
import { GameContext } from "../gameContext";
import { useEffect } from "react";
import moveGuard from "../utils/moveGuard";
import { getUniquePosition } from "../utils/getUniquePosition";

export const Guard=({guard_id})=>{
  const{guardPos,setGuardPos,boxes,gameOver,myPos,gameTimer,pause,guardCaught,guard}=useContext(GameContext)


  const guardParams = {

    boxes: boxes,
    myPos: myPos,
    guard_id: guard_id,

  };
  useEffect(() => {
    if (!pause && !gameOver && !guardCaught) {
 
    const newPos=moveGuard(guardParams);

    setGuardPos(array=>{
      const newArray=[...array]
      newArray.splice(guard_id.id,1,
        {id:guard_id.id,
          x:newPos.x,
          y:newPos.y,
          xx:newPos.xx,
          yy:newPos.yy})
         
      return newArray
    })


    }
  }, [gameTimer, pause, gameOver, guardCaught]);



  useEffect(()=>{
    if(gameOver){
      const newPos=getUniquePosition(boxes,myPos)
      setGuardPos(array=>{
        const newArray=[...array]
        newArray.splice(guard_id.id,1,{id:guard_id.id,x:newPos.x,y:newPos.y,xx:guard_id.xx,yy:guard_id.yy})
        return newArray
      });
    }
  },[gameOver,boxes])//needs boxes to be set

    return   (
    <div
    className="guard"
    style={{ gridColumn: guard_id.x, gridRow: guard_id.y }}
  >
    {guard}
  </div>
    )
} 
