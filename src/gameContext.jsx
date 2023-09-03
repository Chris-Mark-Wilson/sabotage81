import { createContext } from "react";
import { settings } from "./settings";
import { useState } from "react";
import getRnd from "./utils/getRnd";
import { useRef } from "react"

export const GameContext=createContext()

export const GameProvider=({children})=>{
  const explosionSound=useRef();
  const gameTune=useRef();
  const guardDeadEffect=useRef();

  const playerDeadEffect=useRef();
    const {timer,playerGraphic,guardGraphic}=settings;

  const [pause, setPause] = useState(false);
  const [headerText, setHeaderText] = useState("--Start Game--");
  const [myPos, setMyPos] = useState({});
  const [guardPos, setGuardPos] = useState({});
  const [count, setCount] = useState(timer);
  const [bombText, setBombText] = useState({
    text: "",
    colour: " rgb(184, 185, 141)",
  });
  const [bombSet, setBombSet] = useState(false);
  const [boxes, setBoxes] = useState([]);
  const [bombPos, setBombPos] = useState({});
  const [explosions, setExplosions] = useState([]);
  const [ignition, setIgnition] = useState(false);
  const [gameOver, setGameOver] = useState(true);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [exp, setExp] = useState(" "); //explosion graphic
  const [player, setPlayer] = useState(playerGraphic);
const[guard,setGuard]=useState(guardGraphic)
  const [gameTimer, setGameTimer] = useState(0);
  const [waypoint, setWaypoint] = useState({ x: getRnd(), y: getRnd() });
  const [guardCaught, setGuardCaught] = useState(false);
  const [playerCaught, setPlayerCaught] = useState(false);

    return(
        <GameContext.Provider value={{
            pause,setPause,
            headerText,setHeaderText,
            myPos,setMyPos,
            guardPos,setGuardPos,
            count,setCount,
            bombText,setBombText,
            bombSet,setBombSet,
            boxes,setBoxes,
            bombPos,setBombPos,
            explosions,setExplosions,
            ignition,setIgnition,
            gameOver,setGameOver,
            lives,setLives,
            score,setScore,
            exp,setExp,
            player,setPlayer,
            guard,setGuard,
            gameTimer,setGameTimer,
           waypoint,setWaypoint,
           guardCaught,setGuardCaught,
           playerCaught,setPlayerCaught,
           explosionSound,
           gameTune,
           guardDeadEffect,
           playerDeadEffect
        }}>
            {children}
        </GameContext.Provider>
    )
}