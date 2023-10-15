import { useContext } from "react"
import { GameContext } from "../gameContext"
import { useState } from "react"

export const Settings =({setSettings})=>{
    const {tnt,setTnt,explosionGraphic,setExplosionGraphic,guard,setGuard,player,setPlayer,count,setCount,earshotDistance,setEarShotDistance,godSpeed,setGodSpeed,maxBoxes,setMaxBoxes,numGuards,setNumGuards}=useContext(GameContext)
    const playerSelect = [
        "🤖",
        "😎",
        "🤠",
        "🥸",
        "🎃",
        "🥷",
        "s",
        "🐸",
        "🐵",
        "🐭",
      ];
      const guardSelect = [
        "👿",
        "💀",
        "🤡",
        "👻",
        "👾",
        "👮",
        "🐱",
        "*",
        "👹",
        "💂",
      ];
      const expSelect = ["💥", "🌼", "🕸", "☣", "⛔", "✴", "✳", "🔆", "✖", "🔴"];
      const tntSelect = ["X", "☢️", "🟥", "☠", "🍄", "🍒", "🍗", "🧀", "🎈", "🧨"];
      const [tntNum, setTntNum] = useState(0);
      const [playerNum, setPlayerNum] = useState(1);
      const [guardNum, setGuardNum] = useState(5);
      const [expNum, setExpNum] = useState(0);

    return(    
    <>
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
            <p className="zx">{((100 / 500) * godSpeed).toFixed(0)} KPH</p>
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
            <p className="zx">
              {(((100 / 500) * godSpeed) / 2).toFixed(0)} KPH
            </p>
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
            <p className="zx">{((100 / 32) * earshotDistance).toFixed(0)}%</p>
          </section>

          <section className="sliders">
            <p className="zx">CHARGE COUNTDOWN?</p>
            <input
              type="range"
              id="count"
              name="count"
              min="0"
              max="10"
              value={count}
              onChange={(e) => setCount(e.target.value)}
            />
            <p className="zx">{count}</p>
          </section>

          <section className="sliders">
            <p className="zx">PLAYER GRAPHIC</p>
            <input
              type="range"
              id="player"
              name="player"
              min="0"
              max="9"
              value={playerNum}
              onChange={(e) => {
                setPlayer(playerSelect[e.target.value]);
                setPlayerNum(e.target.value);
              }}
            />

            <p className="zx">
              <span className="graphic">{player}</span>
            </p>
          </section>
          <section className="sliders">
            <p className="zx">GUARD GRAPHIC</p>
            <input
              type="range"
              id="guard"
              name="guard"
              min="0"
              max="9"
              value={guardNum}
              onChange={(e) => {
                setGuard(guardSelect[e.target.value]);
                setGuardNum(e.target.value);
              }}
            />
            <p className="zx">
              <span className="graphic">{guard}</span>
            </p>
          </section>

          <section className="sliders">
            <p className="zx">EXPOSION GRAPHIC</p>
            <input
              type="range"
              id="explosions"
              name="explosions"
              min="0"
              max="9"
              value={expNum}
              onChange={(e) => {
                setExplosionGraphic(expSelect[e.target.value]);
                setExpNum(e.target.value);
              }}
            />
            <p className="zx">
              <span className="graphic">{explosionGraphic}</span>
            </p>
          </section>

          <section className="sliders">
            <p className="zx">BOX GRAPHIC</p>
            <input
              type="range"
              id="boxes"
              name="boxes"
              min="0"
              max="9"
              value={tntNum}
              onChange={(e) => {
                setTnt(tntSelect[e.target.value]);
                setTntNum(e.target.value);
              }}
            />
            <p className="zx">
              <span className="graphic">{tnt}</span>
            </p>
          </section>
        </section>
        <button className="zx" onClick={() => setSettings(false)}>
            RETURN
          </button>
        </>
)

}