import { useContext } from "react";
import { GameContext } from "../gameContext";
import { useEffect } from "react";
import getDetonationQueue from "../utils/getDetonationQueue";
import { settings } from "../settings";

export const Bomb=({bombPos,bombText})=>{

    const{limit,timer,setBombText,count,setCount,explosions,setExplosions,bombSet,setBombSet,setBombPos,pause,setIgnition,myPos}=useContext(GameContext)



    useEffect(() => {
        if (!pause) {
          if (bombSet) {
            setBombText({ text: count, colour: "black" });
            setTimeout(() => {
              setCount(count - 1);
              if (count === 0) {
                //sends bombPos as index 1 in detonationQueue
                let detonationQueue = [bombPos];
                detonationQueue = getDetonationQueue(detonationQueue, limit);
                console.log(detonationQueue, "queue");
                // detonationQueue.forEach((positionObject, index) => {
                //   positionObject.id = index + 1;
                // });
                setExplosions((explosions) => {
                  return [...detonationQueue];
                }); // sets visual explosion on screen
                // play sound effect
                setIgnition(true); // sets ignition flag to fire ignition useEffect
                setBombSet(false); // ends functionality, returns to game
                setCount(timer); //initial countdown value
                setBombPos({ x: myPos.x, y: myPos.y }); //gives bomb back to player
                setBombText({ text: "", colour: "rgb(184, 185, 141) " });
                //hides bomb
              }
            }, 1000); // 1 second countdown
          }
        }
      }, [count, bombSet, explosions, pause]);

    return (
        <div
        className="bomb"
        id="bomb"
        style={{
          gridColumn: bombPos.x,
          gridRow: bombPos.y,
          visibility: false,
          backgroundColor: bombText.colour,
        }}
      >
        {bombText.text}
      </div>    )
}