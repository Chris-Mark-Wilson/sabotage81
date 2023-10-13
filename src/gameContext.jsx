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
  const {initialExplosionGraphic,bombTimer,playerGraphic,initialLimit,guardGraphic,difficulty,gameSpeed,shotDistance,maximumBoxes}=settings;

  const [pause, setPause] = useState(false);
  const [headerText, setHeaderText] = useState("--Start Game--");
  const [myPos, setMyPos] = useState({});
  const [guardPos, setGuardPos] = useState([]);
  const [count, setCount] = useState(bombTimer);
  const[timer,setTimer]=useState(bombTimer)
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
  const [waypoint, setWaypoint] = useState({ x: getRnd(settings.boardWidth), y: getRnd(settings.boardHeight) });
  const [guardCaught, setGuardCaught] = useState(false);
  const [playerCaught, setPlayerCaught] = useState(false);
  const [newGame,setNewGame]=useState(true)
  const[godSpeed,setGodSpeed]=useState(gameSpeed)
  const [numGuards,setNumGuards]=useState(difficulty)
  const[earshotDistance,setEarShotDistance]=useState(shotDistance)
  const[maxBoxes,setMaxBoxes]=useState(maximumBoxes)
  const[explosionGraphic,setExplosionGraphic]=useState(initialExplosionGraphic)
  const[limit,setLimit]=useState(initialLimit)



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
           playerDeadEffect,
           newGame,setNewGame,
           numGuards,setNumGuards,
           godSpeed,setGodSpeed,
           earshotDistance,setEarShotDistance,
           maxBoxes,setMaxBoxes,
           timer,setTimer,
           explosionGraphic,setExplosionGraphic,
           limit,setLimit
          

        }}>
            {children}
        </GameContext.Provider>
    )
}