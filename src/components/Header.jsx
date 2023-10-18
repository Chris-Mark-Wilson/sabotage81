import { useContext } from "react"
import { GameContext } from "../gameContext"



export const Header=()=>{
    const{setFreeze,score,headerText,setHeaderText,gameOver,pause,setPause,setGameOver,lives,gameTune}=useContext
    (GameContext)

    const handleStartGame = (e) => {
        if (gameOver) {
          setHeaderText("--Sabotage--");
       
    
        gameTune.current.play()
          setGameOver(false);
      
          return;
        }
        if (!pause) {
          setHeaderText("--Continue--");
 setFreeze(true)
        gameTune.current.pause()
          setPause(true);
        } else {
          setHeaderText("--Sabotage--");
          setPause(false);
          setTimeout(()=>{
            setFreeze(true)
          },1000)
        gameTune.current.play()
        }
      };


    return(
        <header className="header" onClick={handleStartGame}>
        <span className="score">SCORE: {score}</span>
        <span className="title">{headerText}-</span>
        <span className="lives">
          LIVES: {lives === 3 ? "😎😎😎" : lives === 2 ? "😐😐" : "😬"}
        </span>
      </header>
    )
}