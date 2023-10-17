import { settings } from "../settings";

export const playerSeen = (myPos, guard_id, boxes, earshotDistance) => {
  if (lookUp(myPos, guard_id, boxes, earshotDistance)) return "up";
  if (lookDown(myPos, guard_id, boxes, earshotDistance, settings))
    return "down";
  if (lookLeft(myPos, guard_id, boxes, earshotDistance)) return "left";
  if (lookRight(myPos, guard_id, boxes, earshotDistance, settings))
    return "right";
  return false;
};

const lookUp = (myPos, guard_id, boxes, earshotDistance) => {
  for (let i = guard_id.y; i > guard_id.y - earshotDistance * 2 && i > 0; i--) {
    if (boxes.some((box) => box.x === guard_id.x && box.y === i)) return false; //box in way
    if (myPos.x === guard_id.x && myPos.y === i) {
      return true; //player seen
    }
  }
  return false; //edge of screen
};

const lookDown = (myPos, guard_id, boxes, earshotDistance, settings) => {
  const { boardHeight } = settings;
  for (
    let i = guard_id.y;
    i < guard_id.y + earshotDistance * 2 && i < boardHeight;
    i++
  ) {
    if (boxes.some((box) => box.x === guard_id.x && box.y === i)) return false; //box in way
    if (myPos.x === guard_id.x && myPos.y === i) {
      return true; //player seen
    }
  }
  return false;
};

const lookLeft = (myPos, guard_id, boxes, earshotDistance) => {
  for (let i = guard_id.x; i > guard_id.x - earshotDistance * 2 && i > 0; i--) {
    if (boxes.some((box) => box.y === guard_id.y && box.x === i)) return false; //box in way
    if (myPos.y === guard_id.y && myPos.x === i) {
      return true; //player seen
    }
  }
  return false;
};

const lookRight = (myPos, guard_id, boxes, earshotDistance, settings) => {
  const { boardWidth } = settings;
  for (
    let i = guard_id.x;
    i < guard_id.x + earshotDistance * 2 && i < boardWidth;
    i++
  ) {
    if (boxes.some((box) => box.y === guard_id.y && box.x === i)) return false; //box in way
    if (myPos.y === guard_id.y && myPos.x === i) {
      return true; //player seen
    }
  }
  return false;
};
