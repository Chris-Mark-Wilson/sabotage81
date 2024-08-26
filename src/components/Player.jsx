import movePlayer from "../utils/movePlayer";
import { useContext } from "react";
import { GameContext } from "../gameContext";

import { useEffect,useState } from "react";
import { getUniquePosition } from "../utils/getUniquePosition";
import { startGame } from "../utils/startGame";

export const Player = ({ inputRef,gameTimer }) => {
  const {
    freeze,
    endGame,
    guardPos,
    up,
    down,
    left,
    right,
    fire,
    pause,
    gameOver,
    player,
    setBombPos,
    bombSet,
    setBombSet,
    setBombText,
    setMyPos,
    boxes,
    myPos,
    count,
    gameTune,
    setGameOver,
    setFreeze, setHeaderText,
    setPause
  } = useContext(GameContext);
  const [keyState, setKeyState] = useState(null);

  
  const handleKeyDown = (e) => {
    if (gameOver) {
      if (e.key === "Enter") {
        startGame(
          setHeaderText,
          setGameOver,
          setFreeze,
          gameTune,
          setPause,
          pause,
          gameOver
        );
        return;
      }
    }
    if (!gameOver && !pause && player != "😵" && !endGame) {
      gameTune.current.play();
      if (e.key.toLowerCase() != fire)

        setKeyState(e); //sets the key state

   // movePlayer(setMyPos, boxes, myPos, e, up, down, left, right, fire);
     
      if (e.key.toLowerCase() === fire && !bombSet && !freeze) {
        setBombSet(true);
        setBombPos(myPos);
        setBombText({ text: count, colour: "black" });
      }
    }
  };

  const handleKeyUp = (e) => {
    console.log('keyup')
  setKeyState(null); //clears the key state
  };
  useEffect(() => {
    if (gameOver) {
      const g = false;
      const newPos = getUniquePosition(guardPos, boxes, myPos, g);
      setMyPos(newPos);
      setBombPos(newPos);
    }
  }, [gameOver, boxes]); //needs boxes to be set

  useEffect(() => {
    if(keyState){
    movePlayer(setMyPos, boxes, myPos, keyState, up, down, left, right, fire);
  }
},[gameTimer]); //needs gametimer to be set

  return (
    <div
      ref={inputRef}
      className={player != "s" ? "me" : "me-original"}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      style={{ gridColumn: myPos.x, gridRow: myPos.y }}
    >
      {player}
    </div>
  );
};
