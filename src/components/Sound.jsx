import { settings } from "../settings"
export const Sound=()=>{
    const{explosionEffect,startGameEffect,guardDie,playerDie}=settings
    return(
        <>
        <audio id="expEffect" src={explosionEffect}></audio>
        <audio id="startGameEffect" src={startGameEffect}></audio>
        <audio id="guardDie" src={guardDie}></audio>
        <audio id="playerDie" src={playerDie}></audio>
        </>
    )
}