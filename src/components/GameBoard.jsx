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
    const {maxBoxes,godSpeed}=settings
    const {gameOver,pause,setBoxes,boxes,gameTimer,setGameTimer,guardPos,bombPos,bombText}=useContext(GameContext)

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
        {boxes.map((box) => {
          return <Box key={box.id} box={box} />;
        })}
        <Bomb bombPos={bombPos} bombText={bombText} />
        <Player inputRef={inputRef} />
        <Guard />
        <Fireball />
      </main>
    )
}