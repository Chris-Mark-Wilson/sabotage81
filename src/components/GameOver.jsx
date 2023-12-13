import { useContext } from "react";
import { GameContext } from "../gameContext";
import { getUniquePosition } from "../utils/getUniquePosition";
import { useState } from "react";
import { getHighScores,uploadHighScores } from "../utils/firebaseApi";
import { goAgain } from "../utils/goAgain";

export const GameOver = () => {
  const [name,setName]=useState("");
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
    setHiScores
  } = useContext(GameContext);

  const handleEnterName = () => {
  

   const hiName = name;
   setName("");
   return getHighScores()
     .then((scores) => {
       //scores is the scores object returned from firebase
       //literally just key value pairs name:score
       scores[hiName] = score;
    
       uploadHighScores(scores).then(() => {
        

         setHiScores(true);
       });
     })
     .catch((err) => console.log(err,"err in catch"));


  }
  
  const handleClick = (e) => {
   goAgain(setHeaderText,setScore,setLives,setGameOver,setEndGame,setFreeze,getUniquePosition,setMyPos,setGuardPos,guardPos,boxes,myPos,guard)
  };
  return (
    <section className="game-over">
      <h1 className="title">GAME OVER</h1>
      <p className="zx">UNLUCKY SABOTEUR!</p>

   
     

      <p className="zx">YOUR SCORE:{score.toFixed(0)}</p>

 <section className="settingsButtons">
      <button className="zx" onClick={handleClick}>
      RETRY? 
      </button>
      {score>0&&<><input className="zx" type="text" size="10" maxLength={10} placeholder="ENTER NAME" value={name} onChange={(e)=>setName(e.target.value.toUpperCase())} /> 
      <button className="zx"onClick={handleEnterName}>SUBMIT</button></>}
      </section>
      <p className="zx">REFRESH PAGE FOR START SCREEN</p>

    </section>
  );
};
