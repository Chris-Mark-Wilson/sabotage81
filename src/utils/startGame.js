


export const startGame = (
  setHeaderText,
  setGameOver,
  setFreeze,
  gameTune,
  setPause,
  pause,gameOver
) => {
  
  if (gameOver) {
    setHeaderText("--Sabotage--");

    gameTune.current.play();
    setGameOver(false);
    setFreeze(false);
    setFreeze(true); //toggle freeze timeout
    return;
  }
  if (!pause) {
    setHeaderText("--Continue--");

    gameTune.current.pause();
    setPause(true);
  } else {
    setHeaderText("--Sabotage--");
    setPause(false);
    setTimeout(() => {
      setFreeze(false);
      setFreeze(true);
    }, 1000);
    gameTune.current.play();
  }
};
