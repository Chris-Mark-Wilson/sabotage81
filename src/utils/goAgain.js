

export const goAgain=(setHeaderText,setScore,setLives,setGameOver,setEndGame,setFreeze,getUniquePosition,setMyPos,setGuardPos,guardPos,boxes,myPos,guard,setPlayer,playerGraphic)=>{
    setHeaderText("--Press Enter to start--");
    setScore(0);
  setLives(3);

  setPlayer(playerGraphic)
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
          img: guard
        });
      }); // reset all guards
      return newArray;
    });
}