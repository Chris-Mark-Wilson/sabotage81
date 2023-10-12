import { settings } from "../settings";

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
      myPos.y < settings.boardHeight &&
      !boxes.some((box) => {
        return box.x === myPos.x && box.y === myPos.y + 1;
      })
    ) {
      setMyPos({ x: myPos.x, y: myPos.y + 1 });
    }
  }

  if (e.key === "x") {
    if (
      myPos.x < settings.boardWidth &&
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
