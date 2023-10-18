import { useContext } from "react"
import { GameContext } from "../gameContext"

export const Bullet=({shot})=>{
    const {bullet}=useContext(GameContext)

    return(
        <div className="bullet" style={{gridColumn:shot.x,gridRow:shot.y}}>{bullet}</div>
    )
}