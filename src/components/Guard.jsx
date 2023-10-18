
import { useContext } from "react";
import { GameContext } from "../gameContext";
import { useEffect } from "react";
import moveGuard from "../utils/moveGuard";
import { getUniquePosition } from "../utils/getUniquePosition";

export const Guard=({guard_id})=>{
  const{bullet,setBullet,lives,setLives,bulletH,bulletV,setBulletArray,earshotDistance,guardPos,setGuardPos,boxes,gameOver,myPos,setMyPos,gameTimer,pause,guardCaught,guard,setCount,setBombSet,setBombPos,freeze,setFreeze,setPlayer,player,dieEffect}=useContext(GameContext)


  const guardParams = {
    guardPos:guardPos,
    dieEffect:dieEffect,
    setMyPos:setMyPos,
    player:player,
    setPlayer:setPlayer,
    setFreeze:setFreeze,
    setBombPos:setBombPos,
   setCount:setCount,
   setBombSet:setBombSet,
    bullet:bullet,
    setBullet:setBullet,
    lives:lives,
    setLives:setLives,
    bulletH:bulletH,
    bulletV:bulletV,
    setBulletArray:setBulletArray,
    boxes: boxes,
    myPos: myPos,
    guard_id: guard_id,
    earshotDistance:earshotDistance
    //guard_id is an actual guard object

  };
  useEffect(() => {
    if (!pause && !gameOver && !guardCaught&&!freeze) {
 
    const newPos=moveGuard(guardParams);

    setGuardPos(array=>{
      const newArray=[...array]
      newArray.splice(guard_id.id,1,
        {id:guard_id.id,
          x:newPos.x,
          y:newPos.y,
          xx:newPos.xx,
          yy:newPos.yy,
        img:guard_id.img})
         
      return newArray
    })


    }
  }, [gameTimer, pause, gameOver, guardCaught,freeze]);



  useEffect(()=>{
    if(gameOver&&myPos.x!=undefined){
      let g=true;
      const newPos=getUniquePosition(guardPos,boxes,myPos,g)
      setGuardPos(array=>{
        const newArray=[...array]
        newArray.splice(guard_id.id,1,{id:guard_id.id,x:newPos.x,y:newPos.y,xx:guard_id.xx,yy:guard_id.yy,
        img:guard_id.img})
        return newArray
      });
    }
  },[gameOver,boxes,myPos])//needs boxes to be set

    return   (
    <div
    className={guard!="*"?"guard":"me-original"}
    style={{ gridColumn: guard_id.x, gridRow: guard_id.y }}
  >
    {guard_id.img}
  </div>
    )
} 
