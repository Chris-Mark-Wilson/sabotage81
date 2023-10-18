import movePlayer from "../utils/movePlayer";
import { useContext } from "react";
import { GameContext } from "../gameContext";

import { useEffect } from "react";
import { getUniquePosition } from "../utils/getUniquePosition";


 
export const Player=({inputRef})=>{

    const {endGame,guardPos,up,down,left,right,fire,pause,gameOver,player,setBombPos,bombSet,setBombSet,setBombText,setMyPos,boxes,myPos,count,gameTune}=useContext(GameContext)
    const handleKeyDown = (e) => {
        // if (e.key === " ") {
      
        // gameTune.current.play()
        //   handleStartGame();
        // }
        if (!gameOver && !pause&&player!="😵"&&!endGame) {
    
        gameTune.current.play();
          if (e.key.toLowerCase() != fire) movePlayer(setMyPos, boxes, myPos, e,up,down,left,right,fire);
          if (e.key.toLowerCase() === fire&&!bombSet) {
            setBombSet(true); 
            setBombPos(myPos);
            setBombText({ text: count, colour: "black" });  
          }
        }
      };
      useEffect(()=>{
      if (gameOver) {
        const g=false;
      const newPos=getUniquePosition(guardPos,boxes,myPos,g)
        setMyPos(newPos);
        setBombPos(newPos);
    }
},[gameOver,boxes])//needs boxes to be set


    return (
        <div
        ref={inputRef}
        className={player!="s"?"me":"me-original"}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        style={{ gridColumn: myPos.x, gridRow: myPos.y }}
      >
        {player}
      </div>
    )
}