import { useContext } from "react"
import { GameContext } from "../gameContext"
import { Header } from "./Header"
import { Sound } from "../components/Sound";
import { useEffect } from "react";
import getRnd from "../utils/getRnd";
import { settings } from "../settings";

export const StartScreen=()=>{

const {newGame,setNewGame,numGuards,setNumGuards,setGuardPos,godSpeed,setGodSpeed,earShotDistance,setEarShotDistance,maxBoxes,setMaxBoxes,count,setCount,player,setPlayer,guard,setGuard,explosionGraphic,setExplosionGraphic}=useContext(GameContext)
useEffect(()=>{
    let guardArray=[]
    for( let i=0;i<=numGuards;i++){
      guardArray.push({id:i,x:0,y:0,xx:getRnd(settings.boardWidth),yy:getRnd(settings.boardHeight)})
    }
    setGuardPos(guardArray)
    setNewGame(false)
},[])

    return (
        <section className="title">
<p>SABOTAGE!</p>
        </section>
       
        
    )

}