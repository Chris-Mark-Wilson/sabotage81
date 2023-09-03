import { settings } from "../settings";
import { useContext } from "react";
import { GameContext } from "../gameContext";
import { useEffect } from "react";
import moveGuard from "../utils/moveGuard";
import { getUniquePosition } from "../utils/getUniquePosition";

export const Guard=()=>{
  const{guard,guardPos,setGuardPos,boxes,gameOver,waypoint,setWaypoint,myPos,guardIntelligence,gameTimer,pause,guardCaught}=useContext(GameContext)
  const {earshotDistance}=settings

  const guardParams = {
    waypoint: waypoint,
    setWaypoint: setWaypoint,
    earshotDistance: earshotDistance,
    boxes: boxes,
    myPos: myPos,
    guardPos: guardPos,
    setGuardPos: setGuardPos,
    guardIntelligence: guardIntelligence,
  };
  useEffect(() => {
    if (!pause && !gameOver && !guardCaught) {
      moveGuard(guardParams);
    }
  }, [gameTimer, pause, gameOver, guardCaught]);



  useEffect(()=>{
    if(gameOver){
      const newPos=getUniquePosition(boxes,myPos)
      setGuardPos(newPos);
 
    }
  },[gameOver,boxes])//needs boxes to be set

    return   (
    <div
    className="guard"
    style={{ gridColumn: guardPos.x, gridRow: guardPos.y }}
  >
    {guard}
  </div>
    )
} 
