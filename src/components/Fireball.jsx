import { useContext } from "react"
import { GameContext } from "../gameContext"
import checkBlastArea from "../utils/checkBlastArea"
import { useEffect } from "react"
import getRemainingBoxes from "../utils/getRemainingBoxes"
import { settings } from "../settings"

export const Fireball=()=>{
    const{explosions,setExplosions,exp,pause,ignition,setExp,setScore,setGuardCaught,setPlayerCaught,setBoxes,setIgnition,myPos,guardPos,boxes}=useContext(GameContext)
    const {explosionGraphic}=settings

    useEffect(() => {
        if (!pause) {
          if (ignition) {
            if (explosions.length > 0) {
              setTimeout(() => {
                document.getElementById("expEffect").load();
                document.getElementById("expEffect").play();
              }, 10);
              setTimeout(() => {
                setExp(explosionGraphic);
                setScore((score) => score + 1);
    
                const newExps = [...explosions];
                if (newExps.length > 0) {
                  const blastCentre = newExps.shift();
                  //test caught in blast
                  if (checkBlastArea(blastCentre, myPos, guardPos) === "guard") {
                    console.log("Got the guard!");
                    setGuardCaught(true);
                  }
                  if (checkBlastArea(blastCentre, myPos, guardPos) === "player") {
                    console.log("You are toast...");
                    setPlayerCaught(true);
                  }
                }
                //// removes one box at a time ///////
                setExplosions(() => [...newExps]);
                const remainingBoxes = getRemainingBoxes(explosions[0], boxes);
                setBoxes(remainingBoxes);
              }, 100);
            } else {
              setIgnition(false);
              setExp(" ");
            }
          }
        }
      }, [ignition, explosions, pause]);




    return (
        <section
        className="fireball"
        style={{
          gridRowStart: explosions[0] ? explosions[0].y : 10,
          gridColumnStart: explosions[0] ? explosions[0].x - 1 : 10,
          // gridRowEnd: explosions[0]?explosions[0].y  : 10,
          // gridColumnEnd: explosions[0]?explosions[0].x  :10,
        }}
      >
        <section>
          <p>{exp}</p>
          <p>{exp}</p>
          <p>{exp}</p>
        </section>
        <section>
          <p>{exp}</p>
          <p>{exp}</p>
          <p>{exp}</p>
        </section>
        <section>
          <p>{exp}</p>
          <p>{exp}</p>
          <p>{exp}</p>
        </section>
      </section>
    )
}