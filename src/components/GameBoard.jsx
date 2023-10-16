import { Bomb } from "./Bomb";
import { Player } from "./Player";
import {Guard} from "./Guard";
import { Fireball } from "./Fireball";
import { Box } from "./Box";
import { useRef } from "react";
import { useContext } from "react";
import { GameContext } from "../gameContext";
import createBoxArray from "../utils/createBoxArray";
import { settings } from "../settings";
import { useEffect } from "react";


export const GameBoard=()=>{
  const{boardWidth,boardHeight}=settings;
    const emptyBoard=[]
    for(let x=1;x<=boardWidth;x++){
      for(let y=1;y<boardHeight;y++){
        emptyBoard.push({
          x:x,
          y:y
        })
      }
    }
    const emptySpace=" ";
    const {maxBoxes,godSpeed,gameOver,pause,setBoxes,boxes,gameTimer,setGameTimer,guardPos,bombPos,bombText}=useContext(GameContext)

    const inputRef = useRef(null);
    useEffect(() => {
      inputRef.current.focus();
    }, [gameOver, pause]);

    useEffect(() => {
        setBoxes(createBoxArray(maxBoxes));
    
      }, []);

  useEffect(() => {
    if (gameTimer > 99) {
      setGameTimer(0);
    } else
      setTimeout(() => {
        setGameTimer(gameTimer + 1);
      }, godSpeed);
    // move guard depends on the speed of this timer....
  }, [guardPos, gameTimer]);


    return(
        <main className="main">
          {emptyBoard.map((space,index)=>{
            return <div key={index} style={{gridRow:space.y,gridColumn:space.x}} className="empty">tnt</div>
          })}
        {boxes.map((box) => {
          return <Box key={box.id} box={box} />;
        })}
        <Bomb bombPos={bombPos} bombText={bombText} />
        <Player inputRef={inputRef} />
        {guardPos.map(guard_id=>{
                return(
                   < Guard key={guard_id.id} guard_id={guard_id}/>
                )
        })}
    
        <Fireball />
      </main>
    )
}