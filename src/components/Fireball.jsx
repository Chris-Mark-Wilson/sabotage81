import { useContext } from "react";
import { GameContext } from "../gameContext";
import checkBlastArea from "../utils/checkBlastArea";
import { useEffect } from "react";
import getRemainingBoxes from "../utils/getRemainingBoxes";
import { settings } from "../settings";
import { getUniquePosition } from "../utils/getUniquePosition";
import { killGuards } from "../utils/killGuards";

export const Fireball = () => {
  const{boardHeight,boardWidth}=settings;
  const {freeze,
    explosionGraphic,
    explosions,
    setExplosions,
    exp,
    pause,
    setPause,
    ignition,
    setExp,
    setScore,
    guardCaught,
    setGuardCaught,
    playerCaught,
    setPlayerCaught,
    setBoxes,
    setIgnition,
    myPos,
    setGuardPos,
    guardPos,
    boxes,
    score,
    setHeaderText,
    lives,
    setLives,
    setGameOver,
    explosionSound,
    guardDeadEffect,
    playerDeadEffect,
    guard,metric
  } = useContext(GameContext);

  useEffect(() => {
    if (!pause) {
      if (ignition) {
        if (explosions.length > 0) {
          setTimeout(() => {
            explosionSound.current.load();
            explosionSound.current.play();
          }, 10);
          setTimeout(() => {
            setExp(explosionGraphic);
            setScore((score) => score + 1*metric);

            const newExps = [...explosions];
            if (newExps.length > 0) {
              const blastCentre = newExps.shift();//delete last explosion centre
              //test caught in blast
              const gotCaughtArray = checkBlastArea(
                blastCentre,
                myPos,
                guardPos
              );

              if (gotCaughtArray != undefined) {
                //test for guards caught
                if (gotCaughtArray.some((item) => /\d/.test(item))) {
                  setGuardCaught(() => {
                    if (gotCaughtArray.includes("player"))
                      gotCaughtArray.shift();
                    return [...gotCaughtArray];
                  });
                  ///sets guardCaught to array of guard ids caught i blast and fires effect below
                }

                //test for player caught
                if (
                  checkBlastArea(blastCentre, myPos, guardPos).includes(
                    "player"
                  )&&!freeze
                ) {
               //if freeze is true player has been shot and the fireball would kill them twice if not frozen first
                  setPlayerCaught(true);
                  //fires effect below
                }
              }
            }

            //// removes one box at a time ///////
            setExplosions(() => [...newExps]);
            const remainingBoxes = getRemainingBoxes(explosions[0], boxes);
            setBoxes(remainingBoxes);
          }, 75);
        } else {
          //when no more explosions in detonation queue
          setIgnition(false);
          setExp("");
        }
      }
    }
  }, [ignition, explosions, pause]);

  useEffect(() => {
    if (guardCaught.length) {
//if any guards been caught in the array
      const caughtIds = new Set([...guardCaught]); //remove dupicates
      const caughtGuardIds = [...caughtIds]; //turn back into an array
      killGuards(metric,boxes,myPos,setPause,guard,caughtGuardIds,setScore,setHeaderText,setGuardCaught,guardDeadEffect,guardPos,setGuardPos);
    }
  }, [guardCaught]);

  useEffect(() => {
    if (playerCaught) {
      playerDeadEffect.current.play();
      setLives(lives - 1);
      if (lives === 0) setGameOver(true);
      setHeaderText("--You Are TOAST!--");
      setTimeout(() => {
        setHeaderText("--Sabotage--");
        setPlayerCaught(false);
      }, 3000);
    }
  }, [playerCaught]);

 if(explosions.length) return (
    
    <>
      {explosions[0].y>1&&explosions[0].x>1&&<div
        className="exp"
        style={{
          gridRow: explosions[0] && explosions[0].y - 1,
          gridColumn:
            explosions[0]  && explosions[0].x - 1,
        }}
      >
        {exp}
      </div>
}

      {explosions[0].y>1&&<div
        className="exp"
        style={{
          gridRow: explosions[0] &&  explosions[0].y - 1,
          gridColumn: explosions[0] && explosions[0].x,
        }}
      >
        {exp}
      </div>
}

      {explosions[0].y>1&&explosions[0].x<boardWidth-1&&<div
        className="exp"
        style={{
          gridRow:
            explosions[0] &&
            explosions[0].y - 1,
          gridColumn: explosions[0] && explosions[0].x + 1,
        }}
      >
        {exp}
      </div>
}

      {explosions[0].x>1&&<div
        className="exp"
        style={{
          gridRow: explosions[0] && explosions[0].y,
          gridColumn:
   explosions[0].x - 1,
        }}
      >
        {exp}
      </div>
}

      <div
        className="exp"
        style={{
          gridRow: explosions[0] && explosions[0].y,
          gridColumn: explosions[0] && explosions[0].x,
        }}
      >
        {exp}
      </div>

      {explosions[0].x<settings.boardWidth-1&&<div
        className="exp"
        style={{
          gridRow: explosions[0] && explosions[0].y,
          gridColumn:
            explosions[0] &&
            explosions[0].x + 1,
        }}
      >
        {exp}
      </div>
}

      {explosions[0].y<settings.boardHeight-1&&explosions[0].x>1&&<div
        className="exp"
        style={{
          gridRow:
            explosions[0] &&
            explosions[0].y + 1,
          gridColumn:
          explosions[0].x - 1,
        }}
      >
        {exp}
      </div>
}
      {explosions[0].y<settings.boardHeight-1&&<div
        className="exp"
        style={{
          gridRow:
            explosions[0] &&
         
            explosions[0].y + 1,
          gridColumn: explosions[0] && explosions[0].x,
        }}
      >
        {exp}
      </div>
      }

      {explosions[0].y<settings.boardHeight-1&&explosions[0].x<settings.boardWidth-1&&<div
        className="exp"
        style={{
          gridRow:
            explosions[0] &&
            explosions[0].y + 1,
          gridColumn:
            explosions[0] &&
            explosions[0].x + 1,
        }}
      >
        {exp}
      </div>
      }
 
    </>
  
  )
};

