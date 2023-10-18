import { GameContext } from "../gameContext"
import { useContext } from "react"

import { settings } from "../settings"
export const Sound=()=>{
    const{ explosionSound,
        dieEffect,
        gameTune,
        guardDeadEffect,
        playerDeadEffect}=useContext(GameContext)

    const{initdieEffect,explosionEffect,startGameEffect,guardDie,playerDie}=settings
    return(
        <>
        <audio id="expEffect" src={explosionEffect} ref={explosionSound}></audio>
        <audio id="startGameEffect" src={startGameEffect} ref={gameTune}></audio>
        <audio id="guardDie" src={guardDie} ref={guardDeadEffect}></audio>
        <audio id="playerDie" src={playerDie} ref={playerDeadEffect}></audio>
        <audio id="initdieEffect" src={initdieEffect} ref={dieEffect}></audio>
        </>
    )
}