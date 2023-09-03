import { useContext } from "react"
import { GameContext } from "../gameContext"



export const Header=()=>{
    const{score,headerText,setHeaderText,gameOver,pause,setPause,setGameOver,lives,gameTune}=useContext
    (GameContext)

    const handleStartGame = (e) => {
        if (gameOver) {
          setHeaderText("--Sabotage--");
       
        console.dir(gameTune)
        gameTune.current.play()
          setGameOver(false);
          return;
        }
        if (!pause) {
          setHeaderText("--Continue--");
 
        gameTune.current.pause()
          setPause(true);
        } else {
          setHeaderText("--Sabotage--");
          setPause(false);
   
        gameTune.current.play()
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