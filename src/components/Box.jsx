import { useContext } from "react"
import { GameContext } from "../gameContext"

export const Box=({box})=>{
  const{tnt}=useContext(GameContext)
    return(
              <div
                className={tnt==="X"?"x":tnt==="☠"?"skull":"tnt"}
                style={{ gridColumn: box.x, gridRow: box.y }}
            >
                {tnt}
              </div>
    )
}