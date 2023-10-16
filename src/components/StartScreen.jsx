import { useContext } from "react";
import { GameContext } from "../gameContext";
import { useState } from "react";
import { useEffect } from "react";
import getRnd from "../utils/getRnd";
import { Instructions } from "./InstructionsPage";
import { Settings } from "./SettingsPage";
import { RedefineKeys } from "./RedefineKeys";
import "../startScreen.css";

export const StartScreen = () => {
  const {
    setNewGame,
    numGuards,
    setNumGuards,
    setGuardPos,
    godSpeed,
    setGodSpeed,
    earshotDistance,
    setEarShotDistance,
    maxBoxes,
    setMaxBoxes,
    count,
    setCount,
    player,
    setPlayer,
    guard,
    setGuard,
    explosionGraphic,
    setExplosionGraphic,
    tnt,
    setTnt,
  } = useContext(GameContext);
  const [start, setStart] = useState(false);
  const [settings, setSettings] = useState(false);
  const [keys,setKeys]=useState(false)

  useEffect(() => {
    if (start) {
      let guardArray = [];
      for (let i = 0; i <= numGuards - 1; i++) {
        guardArray.push({
          id: i,
          x: 0,
          y: 0,
          xx: getRnd(settings.boardWidth),
          yy: getRnd(settings.boardHeight),
          img:guard
        });
      }
      setGuardPos(guardArray);
      setGodSpeed(500 - godSpeed);
      setNewGame(false);
    }
  }, [start]);

  return (
    <>
      {!settings && !keys && (
        <Instructions setSettings={setSettings} setStart={setStart} setKeys={setKeys}/>
      )}
      {settings && !keys &&(
           <Settings setSettings={setSettings}/>
      )}
      {!settings && keys && (
<RedefineKeys setKeys={setKeys}/>
      )}
    </>
  );
};
