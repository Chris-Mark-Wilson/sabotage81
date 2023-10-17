import getRnd from "./getRnd";
import { settings } from "../settings";


const canMoveUp = ({ boxes, guard_id }) => {
  if (
    guard_id.y > 0 &&
    !boxes.some((box) => {
      return box.x === guard_id.x && box.y === guard_id.y - 1;
    })
  ) {
    return { x: guard_id.x, y: guard_id.y - 1 };
  } else return undefined;
};

const canMoveDown = ({ boxes, guard_id }) => {
  if (
    guard_id.y < settings.boardHeight &&
    !boxes.some((box) => {
      return box.x === guard_id.x && box.y === guard_id.y + 1;
    })
  ) {
    return { x: guard_id.x, y: guard_id.y + 1 };
  } else return undefined;
};

const canMoveLeft = ({ boxes, guard_id }) => {
  if (
    guard_id.x > 0 &&
    !boxes.some((box) => {
      return box.x === guard_id.x - 1 && box.y === guard_id.y;
    })
  ) {
    return { x: guard_id.x - 1, y: guard_id.y };
  } else return undefined;
};

const canMoveRight = ({ boxes, guard_id }) => {
  if (
    guard_id.x < settings.boardWidth &&
    !boxes.some((box) => {
      return box.x === guard_id.x + 1 && box.y === guard_id.y;
    })
  ) {
    return { x: guard_id.x + 1, y: guard_id.y };
  } else return undefined;
};

const getNewWaypoint = ( guard_id) => {
 
      guard_id.xx= getRnd(settings.boardWidth)
      guard_id.yy= getRnd(settings.boardHeight)
      return guard_id;


};

//////////MAIN FUNCTION///////////////

const moveGuard = ({ boxes, myPos, guard_id,earshotDistance }) => {
//return without moving if dead in a blast
if(guard_id.img==="😵") return guard_id
if(!guard_id.xx)guard_id=getNewWaypoint(guard_id)
  //guard_id is an actual guard object

  // AI here //
  //move up,down,left or right returns true if ok, or false if blocked
  // waypoint - random point for guard to head towards;

  let earshot = false;
  if (
    Math.abs(guard_id.x - myPos.x) <= earshotDistance &&
    Math.abs(guard_id.y - myPos.y) <= earshotDistance
  ) {
    earshot = true;
  }
  if (guard_id.x === guard_id.xx && guard_id.y === guard_id.yy) {
    guard_id=getNewWaypoint(guard_id);
  } 
  //within earshot or not?
  let target = {}; // point for guard to had towards
  earshot ? (target = myPos) : (target = { x: guard_id.xx, y: guard_id.yy });
  // if close head towards player, or waypoint if not..

  const params = { boxes: boxes, guard_id: guard_id };

  if (guard_id.x > target.x) {
    const move = canMoveLeft(params);
    if (move) {
      return {x:move.x,y:move.y,xx:guard_id.xx,yy:guard_id.yy};
    } else {
      getNewWaypoint(guard_id);
      (target = { x: guard_id.xx, y: guard_id.yy })
    }
  }

  if (guard_id.x < target.x) {
  const move = canMoveRight(params);
    if (move) {
      return {x:move.x,y:move.y,xx:guard_id.xx,yy:guard_id.yy};
    } else {
      getNewWaypoint(guard_id);
      (target = { x: guard_id.xx, y: guard_id.yy })
    }
 }

  if (guard_id.y < target.y) {
    const move = canMoveDown(params);
    if (move) {
      return {x:move.x,y:move.y,xx:guard_id.xx,yy:guard_id.yy};
    } else {
      getNewWaypoint(guard_id);
      (target = { x: guard_id.xx, y: guard_id.yy })
    }
}

  if (guard_id.y > target.y) {
    const move = canMoveUp(params);
    if (move) {
      return {x:move.x,y:move.y,xx:guard_id.xx,yy:guard_id.yy};
    } else {
      getNewWaypoint(guard_id);
      (target = { x: guard_id.xx, y: guard_id.yy })
    }
}

return guard_id;
//all else fails and the guard is trapped
};
export default moveGuard;
