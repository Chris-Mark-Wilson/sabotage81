import { useContext } from "react";
import { GameContext } from "../gameContext";

import { startGame } from "../utils/startGame";

export const Header = () => {
  const {
    score,
    headerText,
    lives,
  } = useContext(GameContext);



  return (
    <header className="header" >
      <span className="score">SCORE: {score.toFixed(0)}</span>
      <span className="title">{headerText}-</span>
      <span className="lives">
        LIVES: {lives === 3 ? "😎😎😎" : lives === 2 ? "😐😐" : "😬"}
      </span>
    </header>
  );
};
