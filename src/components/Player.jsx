import movePlayer from "../utils/movePlayer";
import { useContext } from "react";
import { GameContext } from "../gameContext";

import { useEffect } from "react";
import { getUniquePosition } from "../utils/getUniquePosition";


 
export const Player=({inputRef})=>{

    const {pause,gameOver,player,setBombPos,setBombSet,setBombText,setMyPos,boxes,myPos,count,gameTune}=useContext(GameContext)
    const handleKeyDown = (e) => {
        // if (e.key === " ") {
      
        // gameTune.current.play()
        //   handleStartGame();
        // }
        if (!gameOver && !pause) {
    
        gameTune.current.play();
          if (e.key != "l") movePlayer(setMyPos, boxes, myPos, e);
          if (e.key === "l") {
            setBombSet(true); 
            setBombPos(myPos);
            setBombText({ text: count, colour: "black" });  
          }
        }
      };
      useEffect(()=>{
      if (gameOver) {
      const newPos=getUniquePosition(boxes,myPos)
        setMyPos(newPos);
        setBombPos(newPos);
    }
},[gameOver,boxes])//needs boxes to be set


    return (
        <div
        ref={inputRef}
        className="me"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        style={{ gridColumn: myPos.x, gridRow: myPos.y }}
      >
        {player}
      </div>
    )
}