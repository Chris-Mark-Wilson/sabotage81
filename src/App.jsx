import { useState, useEffect } from "react";
import "./App.css";
import createBoxArray from "./utils/createBoxArray";
import getRnd from "./utils/getRnd";
import { useRef } from "react";
import movePlayer from "./utils/movePlayer";
import placeBomb from "./utils/placeBomb";
import getDetonationQueue from "./utils/getDetonationQueue";
import getRemainingBoxes from "./utils/getRemainingBoxes";


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
  const [explosions, setExplosions] = useState([]);
  const [ignition, setIgnition] = useState(false);
  const[gameOver,setGameOver]=useState(true)
  const[score,setScore]=useState(0)
  useEffect(() => {
    setBoxes(createBoxArray(maxBoxes));
  }, []);

  useEffect(() => {
    // just runs this once on page load
  if(gameOver){
    let x = 0;
    let y = 0;
    do {
     
      x = getRnd();
      y = getRnd();
    } while (
      boxes.some(box=> 
         x === box.x && y === box.y
      )
    );
    setMyPos({ x, y });
    setBombPos({ x, y }); // carry the bomb with me until bombSet is true

    // sets me and guard checking for overlay with a tnt, doesnt seem to work 100% of the time, sometimes we get a clash with my position being overlaid by a tnt..
    do {
      x = getRnd();
      y = getRnd();
    } while (
      boxes.some(box =>(x === box.x && y === box.y) ||
      (x === myPos.x &&
      y === myPos.y)
    ));
    console.log(x,y,"Guard pos")
    setGuardPos({ x,y }) // random, not over a box or on me... can be adjusted to make him spawn further away if required
    setGameOver(false)
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
          setExplosions(detonationQueue);// sets visual explosion on screen
          document.getElementById("audio").play(); // play sound effect
          setIgnition(true); // sets ignition flag to fire ignition useEffect
          setBombSet(false); // ends functionality, returns to game
          setCount(timer); //initial countdown value
          setBombPos({ x: myPos.x, y: myPos.y }); //gives bomb back to player
          setBombText({ text: "", colour: "white" }); //hides bomb
        }
      }, 1000);// 1 second countdown
    }
  }, [count, bombSet]);

  useEffect(() => {
    if(ignition){
    setTimeout(() => {
      setScore(score+explosions.length)
      const remainingBoxes=getRemainingBoxes(explosions,boxes)
      setBoxes(remainingBoxes)
      setExplosions([]);
      setIgnition(false)
      console.log(score," <--score");
    }, 3000);
  }
  }, [ignition]);
  ////////////////////////////////////////////////////////////
  return (
    <>
      <div className="game">
        Score:{score} Sabotage
        <div className="main">
          {boxes.map((box, index) => {
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
            😎
          </div>
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
        </div>
          <audio
            id="audio"
            src={"../src/assets/hq-explosion-6288.mp3"}
            style={{ colour: "black" }}
          >
          </audio>

        {/* end main */}
      </div>
      {/* end game */}
    </>
  );
};
export default App;