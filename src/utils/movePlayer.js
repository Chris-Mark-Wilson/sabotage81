import { settings } from "../settings";

const movePlayer = (setMyPos, boxes, myPos, e,up,down,left,right,fire) => {

  if (e.key.toLowerCase()=== up) {
    if (
      myPos.y > 0 &&
      !boxes.some((box) => {
        return box.x === myPos.x && box.y === myPos.y - 1;
      })
    ) {
      setMyPos({ x: myPos.x, y: myPos.y - 1 });
    }
  }

  if (e.key.toLowerCase() === down) {
    if (
      myPos.y < settings.boardHeight &&
      !boxes.some((box) => {
        return box.x === myPos.x && box.y === myPos.y + 1;
      })
    ) {
      setMyPos({ x: myPos.x, y: myPos.y + 1 });
    }
  }

  if (e.key.toLowerCase() === right) {
    if (
      myPos.x < settings.boardWidth &&
      !boxes.some((box) => {
        return box.x === myPos.x + 1 && box.y === myPos.y;
      })
    ) {
      setMyPos({ x: myPos.x + 1, y: myPos.y });
    }
  }

  if (e.key.toLowerCase() === left) {
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
