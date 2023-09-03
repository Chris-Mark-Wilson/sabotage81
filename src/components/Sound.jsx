import { GameContext } from "../gameContext"
import { useContext } from "react"

import { settings } from "../settings"
export const Sound=()=>{
    const{ explosionSound,
        gameTune,
        guardDeadEffect,
        playerDeadEffect}=useContext(GameContext)

    const{explosionEffect,startGameEffect,guardDie,playerDie}=settings
    return(
        <>
        <audio id="expEffect" src={explosionEffect} ref={explosionSound}></audio>
        <audio id="startGameEffect" src={startGameEffect} ref={gameTune}></audio>
        <audio id="guardDie" src={guardDie} ref={guardDeadEffect}></audio>
        <audio id="playerDie" src={playerDie} ref={playerDeadEffect}></audio>
        </>
    )
}