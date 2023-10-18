import { useContext } from "react";
import { GameContext } from "../gameContext";
import { getUniquePosition } from "../utils/getUniquePosition";

export const GameOver = () => {
  const {
    setHeaderText,
    setEndGame,
    score,
    setGameOver,
    setScore,
    setLives,
    setFreeze,
    myPos,
    setMyPos,
    boxes,
    guardPos,
    setGuardPos,
    guard,
  } = useContext(GameContext);
  
  const handleClick = (e) => {
    setHeaderText("--Click to start game--");
    setScore(0);
    setLives(3);

    setGameOver(true); //stops game ready for click to start
    setEndGame(false); //removes game over page
    setFreeze(false); //unfreezes guards
    let g = false; //for setting new player position
    let newPos = getUniquePosition(guardPos, boxes, myPos, g);
    setMyPos(newPos);

    setGuardPos((array) => {
      const newArray = [...array];
      g = true;
      newArray.forEach((newGuard) => {
        newPos = getUniquePosition(guardPos, boxes, myPos, g);
        newArray.splice(newGuard.id, 1, {
          id: newGuard.id,
          x: newPos.x,
          y: newPos.y,
          xx: newGuard.xx,
          yy: newGuard.yy,
          img: guard,
        });
      }); // reset all guards
      return newArray;
    });
  };
  return (
    <section className="game-over">
      <h1 className="title">GAME OVER</h1>
      <p className="zx">UNLUCKY SABOTEUR!</p>
      <p className="zx">YOUR SCORE:{score.toFixed(0)}</p>
      <button className="zx" onClick={handleClick}>
        CLICK TO TRY AGAIN?
      </button>
      <p className="zx">REFRESH PAGE FOR START SCREEN</p>
      <p className="zx">HIGH SCORE TABLE COMING SOON,</p>
      <p className="zx">WHEN I'VE SQUISHED ALL THE BUGS</p>
      <p className="zx">AND SET A DIFFICULTY SCORE METRIC</p>
    </section>
  );
};
