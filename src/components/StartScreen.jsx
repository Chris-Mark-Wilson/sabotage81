import { useContext } from "react";
import { GameContext } from "../gameContext";
import { useState } from "react";
import { useEffect } from "react";
import getRnd from "../utils/getRnd";
import { settings } from "../settings";
import "../startScreen.css";

export const StartScreen = () => {
  const {
    newGame,
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
  } = useContext(GameContext);
  const [start, setStart] = useState(false);
  const [settings, setSettings] = useState(false);
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
        });
      }
      setGuardPos(guardArray);
      setGodSpeed(500-godSpeed)
      setNewGame(false);
    }
  }, [start]);      <section className="sliders">
  <p className="zx">GUARD SPEED?</p>
  <input
    type="range"
    id="speed"
    name="speed"
    min="5"
    max="500"
    value={godSpeed}
    onChange={(e) => setGodSpeed(e.target.value)}
  />
  <p className="zx">{(100/500*godSpeed).toFixed(0)} KPH</p>
</section>

  return (
    <>
      {!settings && (
        <section>
          <h1 className="title" style={{ fontSize: "60px" }}>
            SABOTAGE
          </h1>
          <p className="zx">BASED ON AN ORIGINAL ZX81 GAME BY DON PREISTLEY</p>
          <p className="zx">
            THE OBJECT IS TO CREATE AS MUCH HAVOC WITHIN THE MUNITIONS YARD AS
            POSSIBLE
          </p>
          <p className="zx">
            YOU HAVE UNLIMITED EXPLOSIVE CHARGES, BUT THE YARD IS PATROLLED BY
            GUARDS
          </p>
          <p className="zx">TRY NOT TO GET CAUGHT!</p>
          <br/>
          <p className="zx" >KEYS ARE: Z-LEFT, X-RIGHT, K-UP, M-DOWN AND L-PLACE CHARGE</p>
          <br/>
          <hr />
          <br />
          <br />
          <section className="settingsButtons">
            <button className="zx" onClick={() => setSettings(true)}>
              SETTINGS
            </button>
            <button className="zx" onClick={() => setStart(true)}>
              START GAME
            </button>
          </section>
        </section>
      )}
      {settings && (
        <section className="settingsPage">

          <section className="sliders">
            <p className="zx">HOW MANY GUARDS?</p>
            <input
              type="range"
              id="guards"
              name="guards"
              min="0"
              max="20"
              value={numGuards}
              onChange={(e) => setNumGuards(e.target.value)}
            />
            <p className="zx">{numGuards}</p>
          </section>

                      
          <section className="sliders">
            <p className="zx">HOW MANY EXPLOSIVES?</p>
            <input
              type="range"
              id="explosives"
              name="explosives"
              min="10"
              max="300"
              value={maxBoxes}
              onChange={(e) => setMaxBoxes(e.target.value)}
            />
            <p className="zx">{maxBoxes}</p>
          </section>

          <section className="sliders">
            <p className="zx">GUARD SPEED?</p>
            <input
              type="range"
              id="speed"
              name="speed"
              min="5"
              max="500"
              value={godSpeed}
              onChange={(e) => setGodSpeed(e.target.value)}
            />
            <p className="zx">{(100/500*godSpeed).toFixed(0)} KPH</p>
          </section>

          <section className="sliders">
            <p className="zx">GUARD SENSE?</p>
            <input
              type="range"
              id="sense"
              name="sense"
              min="0"
              max="32"
              value={earshotDistance}
              onChange={(e) => setEarShotDistance(e.target.value)}
            />
            <p className="zx">{(100/32*earshotDistance).toFixed(0)}%</p>
          </section>

          <button className="zx" onClick={() => setSettings(false)}>
            RETURN
          </button>
        </section>
      )}
    </>
  );
};
