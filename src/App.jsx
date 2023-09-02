import { useState, useEffect, useRef } from "react";
import "./App.css";
import createBoxArray from "./utils/createBoxArray";
import getRnd from "./utils/getRnd";

import getDetonationQueue from "./utils/getDetonationQueue";
import getRemainingBoxes from "./utils/getRemainingBoxes.jsx";
import moveGuard from "./utils/moveGuard";
import checkBlastArea from "./utils/checkBlastArea";
import Guard from "./components/Guard.jsx";
import { settings } from "./settings";
import { Bomb } from "./components/Bomb";
import { Player } from "./components/Player";
import { GameContext } from "./gameContext";
import { useContext } from "react";
import { Box } from "./components/Box";

const App = () => {
  /////STATIC VARIABLES //////////////////////
  const {
    maxBoxes,
    timer,
    limit,
    playerGraphic,
    guardGraphic,
    explosionGraphic,
    explosionEffect,
    startGameEffect,
    guardDie,
    playerDie,
    guardIntelligence,
    godSpeed,
    earshotDistance,
  } = settings;

  const {
    setBombPos,
    setGuardPos,
    count,
    bombSet,
    explosions,
    ignition,
    guardCaught,
    guardPos,
    gameTimer,
    waypoint,
    setWaypoint,
    boxes,
    myPos,
    score,
    headerText,
    lives,
    bombPos,
    bombText,
    exp,
    gameOver,
    pause,
    setBoxes,
    setHeaderText,
    setGameTimer,
    setGameOver,
    setBombText,
  } = useContext(GameContext);

  //////SET FOCUS ON PLAYER//////////////////////////////
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, [gameOver, pause]);
  ///////////////////////////////////////////////////
  /////SET UP TNT BOXES //////////////////////
  //////////////////////////////////////////////////
  useEffect(() => {
    setBoxes(createBoxArray(maxBoxes));
  }, []);

  ///////////////////////////////////////////////////////////////////
  /////////////////////////////// SET BOMB //////////////////////
  ///////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (!pause) {
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
  }, [count, bombSet, explosions, pause]);
  /////////////////////////////////////////////////////////////
  /////RUN EXPLOSION EFFECTS/////////////////////////
  /////////////////////////////////////////////////////////////
  useEffect(() => {
    if (!pause) {
      if (ignition) {
        if (explosions.length > 0) {
          setTimeout(() => {
            document.getElementById("expEffect").load();
            document.getElementById("expEffect").play();
          }, 10);
          setTimeout(() => {
            setExp(explosionGraphic);
            setScore((score) => score + 1);

            const newExps = [...explosions];
            if (newExps.length > 0) {
              const blastCentre = newExps.shift();
              //test caught in blast
              if (checkBlastArea(blastCentre, myPos, guardPos) === "guard") {
                console.log("Got the guard!");
                setGuardCaught(true);
              }
              if (checkBlastArea(blastCentre, myPos, guardPos) === "player") {
                console.log("You are toast...");
                setPLayerCaught(true);
              }
            }
            //// removes one box at a time ///////
            setExplosions(() => [...newExps]);
            const remainingBoxes = getRemainingBoxes(explosions[0], boxes);
            setBoxes(remainingBoxes);
          }, 100);
        } else {
          setIgnition(false);
          setExp(" ");
        }
      }
    }
  }, [ignition, explosions, pause]);
  /////////////////////////////////////////////////////
  ////// CAUGHT IN BLAST ////////////////////////
  ///////////////////////////////////////////////////
  useEffect(() => {
    if (guardCaught) {
      document.getElementById("guardDie").play();
      setScore(score + 100);
      setHeaderText("--GOT THE GUARD!--");
      setTimeout(() => {
        setHeaderText("--Sabotage--");
        setGuardCaught(false);
      }, 3000);
      setGuardPos((guardPos) => {
        return { x: getRnd(), y: getRnd() };
      });
    }
  }, [guardCaught]);
  ////////////////////////////////////////////////////////
  ////// INC TIMER ////////////////////////////////
  ////////////////////////////////////////////////////////
  useEffect(() => {
    if (gameTimer > 99) {
      setGameTimer(0);
    } else
      setTimeout(() => {
        setGameTimer(gameTimer + 1);
      }, godSpeed);
    // move guard depends on the speed of this timer....
  }, [guardPos, gameTimer]);

  ////////////////////////////////////////////////////////
  ////// MOVE GUARD ////////////////////////////////
  ////////////////////////////////////////////////////////
  const guardParams = {
    waypoint: waypoint,
    setWaypoint: setWaypoint,
    earshotDistance: earshotDistance,
    boxes: boxes,
    myPos: myPos,
    guardPos: guardPos,
    setGuardPos: setGuardPos,
    guardIntelligence: guardIntelligence,
  };
  useEffect(() => {
    if (!pause && !gameOver && !guardCaught) {
      moveGuard(guardParams);
    }
  }, [gameTimer, pause, gameOver, guardCaught]);
  ///////////////////////////////////////////////////////
  ////////// HANDLE KEY PRESS ////////////////////
  //////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////
  //////////////HANDLE HEADER CLICK//////////////////////
  //////////////////////////////////////////////////////////////
  const handleStartGame = (e) => {
    if (gameOver) {
      setHeaderText("--Sabotage--");
      document.getElementById("startGameEffect").play();
      setGameOver(false);
      return;
    }
    if (!pause) {
      setHeaderText("--Continue--");
      document.getElementById("startGameEffect").pause();
      setPause(true);
    } else {
      setHeaderText("--Sabotage--");
      setPause(false);
      document.getElementById("startGameEffect").play();
    }
  };
  ////////////////////////////////////////////////////////////
  ////////RETURN PLAYING AREA/APP///////////////////
  ///////////////////////////////////////////////////////////
  return (
    <>
      <section className="container">
        <header className="header" onClick={handleStartGame}>
          <span className="score">Score: {score * 10}</span>
          <span className="title">{headerText}-</span>
          <span className="lives">
            Lives: {lives === 3 ? "😎😎😎" : lives === 2 ? "😎😎" : "😎"}
          </span>
        </header>
        <main className="main">
          {boxes.map((box) => {
            return <Box box={box}/>;
          })}

          <Bomb bombPos={bombPos} bombText={bombText} />
          <Player inputRef={inputRef} />

          <Guard />

          <section
            className="fireball"
            style={{
              gridRowStart: explosions[0] ? explosions[0].y : 10,
              gridColumnStart: explosions[0] ? explosions[0].x - 1 : 10,
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
        <audio id="expEffect" src={explosionEffect}></audio>
        <audio id="startGameEffect" src={startGameEffect}></audio>
        <audio id="guardDie" src={guardDie}></audio>
        <audio id="playerDie" src={playerDie}></audio>

        {/* end main */}
      </section>
      {/* end container*/}
    </>
  );
};
export default App;
