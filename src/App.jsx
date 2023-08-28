import { useState, useEffect } from "react";
import "./App.css";
import createBoxArray from "./utils/createBoxArray";
import getRnd from "./utils/getRnd";
import { useRef } from "react";
import movePlayer from "./utils/movePlayer";
import getDetonationQueue from "./utils/getDetonationQueue";
import getRemainingBoxes from "./utils/getRemainingBoxes.jsx"

const App = () => {
  /////STATIC VARIABLES //////////////////////
  const maxBoxes = 300; // how many initial tnt boxes
  const timer = 3;
  const limit = 50;
  const inputRef = useRef(null);
  const playerGraphic="😎"
  const guardGraphic="👺"
  const explosionEffect="src/assets/hq-explosion-6288.mp3"
  const startGameEffect="src/assets/wrong-place-129242.mp3"
  /////////////////////////////////////////////////
  ///////////START STATE//////////////////////
  ///////////////////////////////////////////////
  const[pause,setPause]=useState(false)
  const[headerText,setHeaderText]=useState("--Start Game--")
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
  const [exp, setExp] = useState(" "); //💥
  const [player, setPlayer] =(playerGraphic);
  const [guard, setGuard] = (guardGraphic);
///////////////////////////////////////////////////
/////SET UP TNT BOXES //////////////////////
  useEffect(() => {
    setBoxes(createBoxArray(maxBoxes));
  }, []);
////////////////////////////////////////////////////
////POSITION PLAYER AND GUARD///////////
  useEffect(() => {
     if (gameOver) {
      let x = 0;
      let y = 0;
      do {
        x = getRnd();
        y = getRnd();
      } while (boxes.some((box) => x === box.x && y === box.y));
      setMyPos({ x, y });
      setBombPos({ x, y }); 
          do {
        x = getRnd();
        y = getRnd();
      } while (
        boxes.some(
          (box) =>
            (x === box.x && y === box.y) || (x === myPos.x && y === myPos.y)
        )
      );
      setGuardPos({ x, y });
    }
  }, [gameOver]); 
  ///////////////////////////////////////////////////////////////
  //////SET FOCUS ON PLAYER//////////////////////////////
  useEffect(() => {
    inputRef.current.focus();
  }, [gameOver,pause]);
  ///////////////////////////////////////////////////////////////////
  /////////////////////////////// SET BOMB //////////////////////
  useEffect(() => {
    if(!pause){
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
  }
  }, [count, bombSet, explosions,pause]);
/////////////////////////////////////////////////////////////
/////RUN EXPLOSION EFFECTS/////////////////////////
/////////////////////////////////////////////////////////////
  useEffect(() => {
    if(!pause){
    if (ignition) {
      if (explosions.length > 0) {
        document.getElementById("expEffect").load();
        document.getElementById("expEffect").play();
        setTimeout(() => {
          setExp("💥");
          setScore((score)=>{
            return score+1;
          });
    
          const newExps = [...explosions];
          if (newExps.length > 0) {
            newExps.shift();
          }
      
          setExplosions(() => [...newExps]);
          const remainingBoxes=getRemainingBoxes(explosions,boxes)
          setBoxes(remainingBoxes)
        }, 100);
      } else {
        setIgnition(false);
        setExp(" ");
      }
    }
  }
  }, [ignition, explosions,pause]);
    ///////////////////////////////////////////////////////
  ////////// HANDLE KEY PRESS//////////////////////
    ///////////////////////////////////////////////////////
  const handleKeyDown = (e) => {
    if(e.key===" ") {
      document.getElementById("startGameEffect").play()
      handleStartGame();
    }
    if(!gameOver && !pause){
      document.getElementById("startGameEffect").play()
    if (e.key != "l") movePlayer(setMyPos, boxes, myPos, e);
    if (e.key === "l") {
 
      setBombSet(true); // document.getElementById('audio').play()
      setBombPos(myPos);
      setBombText({ text: count, colour: "black" });
  
    }
  }
  };
  //////////////////////////////////////////////////////////////
//////////////HANDLE HEADER CLICK//////////////////////
    //////////////////////////////////////////////////////////////
const handleStartGame=(e)=>{
  if(gameOver){
  setHeaderText("--Sabotage--")
  document.getElementById("startGameEffect").play();
  setGameOver(false)
  return;
  }
  if(!pause){
    setHeaderText("--Continue--")
    document.getElementById("startGameEffect").pause();
    setPause(true)
  }else{
    setHeaderText("--Sabotage--")
    setPause(false)
    document.getElementById("startGameEffect").play()
  }
}
  ////////////////////////////////////////////////////////////
  ////////RETURN PLAYING AREA/APP///////////////////
  ///////////////////////////////////////////////////////////
  return (
    <>
      <section className="game">
        <header className="header" onClick={handleStartGame}>
          <span className="score">Score: {score * 10}</span>
          <span className="title">{headerText}-</span>
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
              gridRowStart: explosions[0]?explosions[0].y : 10,
              gridColumnStart: explosions[0]?explosions[0].x - 1: 10
              // gridRowEnd: explosions[0]?explosions[0].y  : 10,
              // gridColumnEnd: explosions[0]?explosions[0].x  :10,
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
          id="expEffect"
          src={explosionEffect}
        ></audio>
           <audio
          id="startGameEffect"
          src={startGameEffect}
        ></audio>

        {/* end main */}
      </section>
      {/* end game */}
    </>
  );
};
export default App;
