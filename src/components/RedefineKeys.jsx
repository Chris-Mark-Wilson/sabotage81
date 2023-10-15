import { useContext } from "react";
import { GameContext } from "../gameContext";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

export const RedefineKeys = ({ setKeys }) => {
  const {
    up,
    setUp,
    down,
    setDown,
    left,
    setLeft,
    right,
    setRight,
    fire,
    setFire,
  } = useContext(GameContext);
  const [done, setDone] = useState(false);
  const [keyNum, setKeyNum] = useState(1);
  const upRef = useRef(null);
  const downRef=useRef(null)
  const leftRef=useRef(null)
  const rightRef=useRef(null)
  const fireRef=useRef(null)


  useEffect(() => {
    switch (keyNum){
    case 1: upRef.current.focus();
    break;
    case 2: downRef.current.focus();
    break;
    case 3: leftRef.current.focus();
    break;
    case 4:rightRef.current.focus();
    break;
    case 5:fireRef.current.focus();
    break;
    default:
        break;
    }
  }, [keyNum]);

  const handleKeyDown = (e) => {

    if (keyNum === 1) {
      if(e.key===" ") setUp("SPACE")
      else setUp(e.key.toLowerCase())
      upRef.current.className = "zx-done";
      setTimeout(() => {
        setKeyNum(2);
        if(e.key===" ") setUp(" ");
      }, 1500);
    }
    if (keyNum === 2) {
        if(e.key===" ") setDown("SPACE")
        else setDown(e.key.toLowerCase())
        downRef.current.className = "zx-done";
        setTimeout(() => {
          setKeyNum(3);
          if(e.key===" ") setDown(" ");
        }, 1500);
      }
      if (keyNum === 3) {
        if(e.key===" ") setLeft("SPACE")
        else setLeft(e.key.toLowerCase())
        leftRef.current.className = "zx-done";
        setTimeout(() => {
          setKeyNum(4);
          if(e.key===" ") setLeft(" ");
        }, 1500);
      }
      if (keyNum === 4) {
        if(e.key===" ") setLeft("SPACE")
        else setRight(e.key.toLowerCase())
        rightRef.current.className = "zx-done";
        setTimeout(() => {
          setKeyNum(5);
          if(e.key===" ") setRight(" ");
        }, 1500);
      }
      if (keyNum === 5) {
        if(e.key===" ") setFire("SPACE")
        else setFire(e.key.toLowerCase())
        fireRef.current.className = "zx-done";
        setTimeout(() => {
          setKeyNum(6);
          if(e.key===" ") setFire(" ");
        }, 1500);
      }
  };
  return (
   <>
      {keyNum === 1 && (
        <section className="key">
          <p className="zx">PRESS A KEY FOR UP </p>
          <div
            className="zx-flash"
            ref={upRef}
            tabIndex="0"
            onKeyDown={handleKeyDown}
          >
            {up.toUpperCase()}
          </div>
        </section>
      )}
        {keyNum === 2 && (
        <section className="key">
          <p className="zx">PRESS A KEY FOR DOWN </p>
          <div
            className="zx-flash"
            ref={downRef}
            tabIndex="0"
            onKeyDown={handleKeyDown}
          >
            {down.toUpperCase()}
          </div>
        </section>
      )}
          {keyNum === 3 && (
        <section className="key">
          <p className="zx">PRESS A KEY FOR LEFT </p>
          <div
            className="zx-flash"
            ref={leftRef}
            tabIndex="0"
            onKeyDown={handleKeyDown}
          >
            {left.toUpperCase()}
          </div>
        </section>
      )}
          {keyNum === 4 && (
        <section className="key">
          <p className="zx">PRESS A KEY FOR RIGHT </p>
          <div
            className="zx-flash"
            ref={rightRef}
            tabIndex="0"
            onKeyDown={handleKeyDown}
          >
            {right.toUpperCase()}
          </div>
        </section>
      )}
          {keyNum === 5 && (
        <section className="key">
          <p className="zx">PRESS A KEY TO PLACE CHARGE </p>
          <div
            className="zx-flash"
            ref={fireRef}
            tabIndex="0"
            onKeyDown={handleKeyDown}
          >
            {fire.toUpperCase()}
          </div>
        </section>
      )}

      {keyNum===6 && (
        <section className="settingsButtons">
        <button className="zx"  onClick={() => setKeys(false)}>
          RETURN
        </button>
        <button className="zx"  onClick={() => setKeyNum(1)}>
          START AGAIN
        </button>
        </section>
      )}
    </>
  );
};
