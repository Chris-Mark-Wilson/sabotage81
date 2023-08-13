import { useState, useEffect } from "react";
import "./App.css";
import createBoxArray from "./utils/createBoxArray";
import getRnd from "./utils/getRnd";
import { useRef } from "react";
import movePlayer from "./utils/movePlayer";
import placeBomb from "./utils/placeBomb";
import getDetonationQueue from "./utils/getDetonationQueue";

const App = () => {
  const maxBoxes = 300; // how many initial tnt boxes
  const timer = 3;
  const limit = 50;
  const inputRef = useRef(null);
  const [myPos, setMyPos] = useState({});
  const [guardPos, setGuardPos] = useState({});
  const [count, setCount] = useState(timer);
  const [bombText, setBombText] = useState({ text: "", colour: "white" });
  const [bombSet, setBombSet] = useState(false);
  const [boxes, setBoxes] = useState([]);
  const [bombPos, setBombPos] = useState({});
  const [detQueue, setDetQueue] = useState([]);
  const [explosions, setExplosions] = useState([]);
  const [ignition, setIgnition] = useState(false);
  useEffect(() => {
    setBoxes(createBoxArray(maxBoxes));
  }, []);

  useEffect(() => {
    // just runs this once on page load
    let count = 0;
    let x = 0;
    let y = 0;
    do {
      count++;
      x = getRnd();
      y = getRnd();
    } while (
      boxes.some((box) => {
        return x === box.x && y === box.y;
      })
    );
    setMyPos({ x: x, y: y });
    setBombPos({ x: x, y: y }); // carry the bomb with me until bombSet is true

    // sets me and guard checking for overlay with a tnt, doesnt seem to work 100% of the time, sometimes we get a clash with my position being overlaid by a tnt..
    do {
      x = getRnd();
      y = getRnd();
    } while (
      boxes.some((box) => x === box.x && y === box.y) &&
      x != myPos.x &&
      y != myPos.y
    );
    setGuardPos({ x, y }); // random, not over a box or on me... can be adjusted to make him spawn further away if required
  }, [boxes]); // right..  fixed it by setting the dependeny to boxes so when useEffect createBoxes()  fires it runs this use effect.. effin react man jeez..

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  ///////////////////////////////////////////////////////
  // setBombPos({x:myPos.x,y:myPos.y})

  const handleKeyDown = (e) => {
    if (e.key != " ") movePlayer(setMyPos, boxes, myPos, e);
    if (e.key === " ") {
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
          console.log(detonationQueue, "queue in app");
          setExplosions(detonationQueue);
          document.getElementById("audio").play();
          setIgnition(true)
          console.log("ignition")
          setBombSet(false); // ends functionality, returns to game

          // document.getElementById('audio').play()

          setCount(timer); //initial countdown value
          setBombPos({ x: myPos.x, y: myPos.y }); //gives bomb back to player
          setBombText({ text: "", colour: "white" }); //hides bomb
        }
      }, 1000);
    }
  }, [count, bombSet]);

  useEffect(() => {
    if(ignition){
    setTimeout(() => {
      setExplosions([]);
      setIgnition(false)
      console.log("clear explosions");
    }, 3000);
  }
  }, [ignition]);
  ////////////////////////////////////////////////////////////
  return (
    <>
      <div className="game">
        <div className="main">
          {boxes.map((box, index) => {
            return (
              <div
                className="tnt"
                key={index}
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
            😎
          </div>
          slow-spring-board.mp3
          <div
            className="guard"
            style={{ gridColumn: guardPos.x, gridRow: guardPos.y }}
          >
            👺
          </div>
          {explosions.map((explosion, index) => {
            return (
              <div
                className="explosion"
                key={index}
                style={{ gridColumn: explosion.x, gridRow: explosion.y }}
              >
                "💥"
              </div>
            );
          })}
          <audio
            id="audio"
            src={"../src/assets/hq-explosion-6288.mp3"}
            style={{ colour: "black" }}
          >
            what
          </audio>
        </div>
        {/* end main */}
      </div>
      {/* end game */}
    </>
  );
};
export default App;
{
  /* <source src="../src/assets/hq-explosion-6288.mp3" type="audio/mp3"></source></audio> */
}
