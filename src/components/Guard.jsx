import getRnd from "../utils/getRnd";
import { useContext } from "react";
import { GameContext } from "../gameContext";
import { useEffect } from "react";
import moveGuard from "../utils/moveGuard";

export const Guard=()=>{
  const{guard,guardPos,setGuardPos,boxes,gameOver,waypoint,setWaypoint,earshotDistance,myPos,guardIntelligence,gameTimer,pause,guardCaught}=useContext(GameContext)

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
