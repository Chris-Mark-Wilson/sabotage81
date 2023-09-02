import { useContext } from "react"
import { GameContext } from "../gameContext"


export const Header=()=>{
    const{score,headerText,setHeaderText,gameOver,pause,setGameOver,lives}=useContext(GameContext)

    const handleStartGame = (e) => {
        if (gameOver) {
          setHeaderText("--Sabotage--");
          document.getElementById("startGameEffect").play();
          setGameOver(false);
          return;
        }
        if (!pause) {
          setHeaderText("--Continue--");
          document.getElementById("startGameEffect").pause();
          setPause(true);
        } else {
          setHeaderText("--Sabotage--");
          setPause(false);
          document.getElementById("startGameEffect").play();
        }
      };


    return(
        <header className="header" onClick={handleStartGame}>
        <span className="score">Score: {score * 10}</span>
        <span className="title">{headerText}-</span>
        <span className="lives">
          Lives: {lives === 3 ? "😎😎😎" : lives === 2 ? "😎😎" : "😎"}
        </span>
      </header>
    )
}