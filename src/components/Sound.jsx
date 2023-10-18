import { GameContext } from "../gameContext"
import { useContext } from "react"

import { settings } from "../settings"
export const Sound=()=>{
    const{ explosionSound,
        dieEffect,
        gameTune,
        guardDeadEffect,
        playerDeadEffect,pistol,pirate}=useContext(GameContext)

    const{initPistol,initPirate,initdieEffect,explosionEffect,startGameEffect,guardDie,playerDie}=settings
    return(
        <>
        <audio id="expEffect" src={explosionEffect} ref={explosionSound}></audio>
        <audio id="startGameEffect" src={startGameEffect} ref={gameTune}></audio>
        <audio id="guardDie" src={guardDie} ref={guardDeadEffect}></audio>
        <audio id="playerDie" src={playerDie} ref={playerDeadEffect}></audio>
        <audio id="initdieEffect" src={initdieEffect} ref={dieEffect}></audio>
        <audio id="initPistol" src={initPistol} ref={pistol}></audio>
        <audio id="initPirate" src={initPirate} ref={pirate}></audio>
        </>
    )
}