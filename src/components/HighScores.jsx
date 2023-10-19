import { getHighScores } from "../utils/firebaseApi"
import { useContext } from "react"
import { GameContext } from "../gameContext"
import { useEffect } from "react"
import { createHiScoreArray } from "../utils/createHiScoreArray"
import { useState } from "react"
import { goAgain } from "../utils/goAgain"
import { getUniquePosition } from "../utils/getUniquePosition"

export const HighScores=()=>{
const {setHiScores,setHeaderText,setScore,setLives,setGameOver,setEndGame,setFreeze,setMyPos,setGuardPos,guardPos,boxes,myPos,guard}=useContext(GameContext)// switch true or false
const [scores,setScores]=useState([])
useEffect(()=>{
getHighScores()
.then(scoresObject=>{
    console.log(scoresObject)
    const newScoresArray=createHiScoreArray(scoresObject)
    setScores(()=>[...newScoresArray])
    console.log(newScoresArray)
})
},[])
const handleClick=()=>{
    goAgain(setHeaderText,setScore,setLives,setGameOver,setEndGame,setFreeze,getUniquePosition,setMyPos,setGuardPos,guardPos,boxes,myPos,guard)
    setHiScores(false)
}

    return(
        <>
        <h1 className="title flash">SABOTAGE ALL TIME GREATS</h1>
        <section className="hi-score-table">  
             {scores.map(score=>{
            return(<>
                <section className="zx scoreline" key={score.id}><div>{score.name}</div><div>{score.score}</div></section></>
            )
        })}
        </section>
        <p className="zx">REFRESH PAGE FOR START SCREEN</p>
        <button className="zx" onClick={handleClick}>TRY AGAIN</button>
        </>
    )

}