import movePlayer from "../utils/movePlayer";
import { useContext } from "react";
import { GameContext } from "../gameContext";
import getRnd from "../utils/getRnd";
import { useEffect } from "react";

 
export const Player=({inputRef})=>{

    const {pause,gameOver,player,setBombPos,setBombSet,setBombText,setMyPos,boxes,myPos,count}=useContext(GameContext)
    const handleKeyDown = (e) => {
        if (e.key === " ") {
          document.getElementById("startGameEffect").play();
          handleStartGame();
        }
        if (!gameOver && !pause) {
          document.getElementById("startGameEffect").play();
          if (e.key != "l") movePlayer(setMyPos, boxes, myPos, e);
          if (e.key === "l") {
            setBombSet(true); // document.getElementById('audio').play()
            setBombPos(myPos);
            setBombText({ text: count, colour: "black" });  
          }
        }
      };
      useEffect(()=>{
      if (gameOver) {
        let x = 0;
        let y = 0;
        do {
          x = getRnd();
          y = getRnd();
        } while (boxes.some((box) => x === box.x && y === box.y));
        setMyPos({ x, y });
        setBombPos({ x, y });
    }
},[gameOver])


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