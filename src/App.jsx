import { useState, useEffect } from "react";
import "./App.css";
import createBoxArray from "./utils/createBoxArray";
import getRnd from "./utils/getRnd";
import { useRef } from "react";
import movePlayer from "./utils/movePlayer";
import placeBomb from "./utils/placeBomb";
import getDetonationQueue from "./utils/getDetonationQueue";
import getRemainingBoxes from "./utils/getRemainingBoxes.jsx"

const App = () => {
  const maxBoxes = 300; // how many initial tnt boxes
  const timer = 3;
  const limit = 50;
  const inputRef = useRef(null);
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
  const [explosions, setExplosions] = useState([{ x: 10, y: 10 }]);
  const [ignition, setIgnition] = useState(false);
  const [gameOver, setGameOver] = useState(true);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [exp, setExp] = useState(""); //💥
  const [player, setPlayer] = "😎";
  const [guard, setGuard] = "👺";

  useEffect(() => {
    setBoxes(createBoxArray(maxBoxes));
  }, []);

  ////set up fireball

  useEffect(() => {
    // just runs this once on page load
    if (gameOver) {
      let x = 0;
      let y = 0;
      do {
        x = getRnd();
        y = getRnd();
      } while (boxes.some((box) => x === box.x && y === box.y));
      setMyPos({ x, y });
      setBombPos({ x, y }); // carry the bomb with me until bombSet is true

      // sets me and guard checking for overlay with a tnt, doesnt seem to work 100% of the time, sometimes we get a clash with my position being overlaid by a tnt..
      do {
        x = getRnd();
        y = getRnd();
      } while (
        boxes.some(
          (box) =>
            (x === box.x && y === box.y) || (x === myPos.x && y === myPos.y)
        )
      );
      console.log(x, y, "Guard pos");
      setGuardPos({ x, y }); // random, not over a box or on me... can be adjusted to make him spawn further away if required
      setGameOver(false);
    }
  }, [boxes]); // right..  fixed it by setting the dependeny to boxes so when useEffect createBoxes()  fires it runs this use effect.. effin react man jeez..

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  ///////////////////////////////////////////////////////
  // setBombPos({x:myPos.x,y:myPos.y})

  const handleKeyDown = (e) => {
    if (e.key != "l") movePlayer(setMyPos, boxes, myPos, e);
    if (e.key === "l") {
      placeBomb(myPos, boxes);
      setBombSet(true); // document.getElementById('audio').play()
      setBombPos(myPos);
      setBombText({ text: count, colour: "black" });
      console.log("bombset");
    }
  };
  /////////////////////////////// SET BOMB ///////////////////////////
  useEffect(() => {
    if (bombSet) {
      setBombText({ text: count, colour: "black" });
      setTimeout(() => {
        setCount(count - 1);
        if (count === 0) {
          //sends bombPos as index 1 in detonationQueue
          let detonationQueue = [bombPos];
          detonationQueue = getDetonationQueue(detonationQueue, limit);
          console.log(detonationQueue, "queue");
          // detonationQueue.forEach((positionObject, index) => {
          //   positionObject.id = index + 1;
          // });
          setExplosions((explosions) => {
            return [...detonationQueue];
          }); // sets visual explosion on screen
          // play sound effect
          setIgnition(true); // sets ignition flag to fire ignition useEffect
          setBombSet(false); // ends functionality, returns to game
          setCount(timer); //initial countdown value
          setBombPos({ x: myPos.x, y: myPos.y }); //gives bomb back to player
          setBombText({ text: "", colour: "rgb(184, 185, 141) " });
          //hides bomb
        }
      }, 1000); // 1 second countdown
    }
  }, [count, bombSet, explosions]);

  useEffect(() => {
    if (ignition) {
      if (explosions.length > 1) {
        setTimeout(() => {
          setExp("💥");
          document.getElementById("audio").play();
          setScore(score + 10);
          console.log(explosions, "exps before set");
          const newExps = [...explosions];
          if (newExps.length > 1) {
            newExps.shift();
          }
      
          setExplosions(() => [...newExps]);
          const remainingBoxes=getRemainingBoxes(explosions,boxes)
          setBoxes(remainingBoxes)
        
        }, 100);
      } else {
        setIgnition(false);
        setExp("");
    
      }
    }
  }, [ignition, explosions]);
  // useEffect(() => {
  //   if (ignition) {
  //     setTimeout(() => {
  //       setScore(score + explosions.length);
  //       const remainingBoxes = getRemainingBoxes(explosions, boxes);
  //       setBoxes(remainingBoxes);
  //       setExplosions([]);
  //       setIgnition(false);
  //       console.log(score, " <--score");
  //     }, 3000);
  //   }
  // }, [ignition,explosions]);
  ////////////////////////////////////////////////////////////
  return (
    <>
      <section className="game">
        <header className="header">
          <span className="score">Score: {score * 10}</span>
          <span className="title">--Sabotage--</span>
          <span className="lives">
            Lives: {lives === 3 ? "😎😎😎" : lives === 2 ? "😎😎" : "😎"}
          </span>
        </header>
        <main className="main">
          {boxes.map((box) => {
            return (
              <div
                className="tnt"
                key={box.id}
                style={{ gridColumn: box.x, gridRow: box.y }}
              >
                tnt
              </div>
            );
          })}
          <div
            className="bomb"
            id="bomb"
            style={{
              gridColumn: bombPos.x,
              gridRow: bombPos.y,
              visibility: false,
              backgroundColor: bombText.colour,
            }}
          >
            {bombText.text}
          </div>
          <div
            ref={inputRef}
            className="me"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            style={{ gridColumn: myPos.x, gridRow: myPos.y }}
          >
            {player}
          </div>
          <div
            className="guard"
            style={{ gridColumn: guardPos.x, gridRow: guardPos.y }}
          >
            {guard}
          </div>

          <section
            className="fireball"
            style={{
              gridRowStart: explosions[0].y,
              gridColumnStart: explosions[0].x - 1,
              gridRowEnd: explosions[0].y + 2,
              gridColumnEnd: explosions[0].x + 2,
            }}
          >
            <section>
              <p>{exp}</p>
              <p>{exp}</p>
              <p>{exp}</p>
            </section>
            <section>
              <p>{exp}</p>
              <p>{exp}</p>
              <p>{exp}</p>
            </section>
            <section>
              <p>{exp}</p>
              <p>{exp}</p>
              <p>{exp}</p>
            </section>
          </section>
        </main>
        <audio
          id="audio"
          src={"src/assets/Rifle-Burst-Fire-A-www.fesliyanstudios.com.mp3"}
        ></audio>

        {/* end main */}
      </section>
      {/* end game */}
    </>
  );
};
export default App;
