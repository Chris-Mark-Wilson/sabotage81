const movePlayer = (setMyPos, boxes, myPos, e) => {

  if (e.key === "k") {
    if (
      myPos.y > 0 &&
      !boxes.some((box) => {
        return box.x === myPos.x && box.y === myPos.y - 1;
      })
    ) {
      setMyPos({ x: myPos.x, y: myPos.y - 1 });
    }
  }

  if (e.key === "m") {
    if (
      myPos.y < 30 &&
      !boxes.some((box) => {
        return box.x === myPos.x && box.y === myPos.y + 1;
      })
    ) {
      setMyPos({ x: myPos.x, y: myPos.y + 1 });
    }
  }

  if (e.key === "x") {
    if (
      myPos.x < 30 &&
      !boxes.some((box) => {
        return box.x === myPos.x + 1 && box.y === myPos.y;
      })
    ) {
      setMyPos({ x: myPos.x + 1, y: myPos.y });
    }
  }

  if (e.key === "z") {
    if (
      myPos.x > 0 &&
      !boxes.some((box) => {
        return box.x === myPos.x - 1 && box.y === myPos.y;
      })
    ) {
      setMyPos({ x: myPos.x - 1, y: myPos.y });
    }
  }
};

export default movePlayer;
