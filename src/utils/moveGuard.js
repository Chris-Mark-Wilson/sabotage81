import getRnd from "./getRnd";
import { settings } from "../settings";
import { playerSeen } from "./playerSeen";
import { shootPlayer } from "./shootPlayer";
import { getUniquePosition } from "./getUniquePosition";


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

const moveGuard = ({setBullet,setLives, bulletH,bulletV,setBulletArray,boxes, myPos, setMyPos,guard_id,earshotDistance,setCount,setBombSet,setBombPos ,freeze,setFreeze,setPlayer,player,pirate,pistol,guardPos}) => {
//return without moving if dead in a blast
if(guard_id.img==="😵"|| freeze) return guard_id
if(!guard_id.xx)guard_id=getNewWaypoint(guard_id)
  //guard_id is an actual guard object
let direction=false;
if(direction=playerSeen(myPos,guard_id,boxes,earshotDistance))
{
  setFreeze(true)
  const playerStore=player;

  pirate.current.play();
  pistol.current.play();
  setPlayer("😵")
  setCount(0);//sets bomb count to 0 for chain reaction
  setBombPos(myPos)//makes sure bomb is at player location
  setBombSet(true)//sets of chain reaction when shot
  shootPlayer(setBullet,myPos,guard_id,direction,bulletH,bulletV,setBulletArray)//draws bullet trace in direction of guard 
  setTimeout(()=>{

    const g=false;
    const newPos=getUniquePosition(guardPos,boxes,myPos,g)//
    setMyPos(newPos)//sets player elsewhere on board away from guards
    setBulletArray([])//removes bullet trace from screen
setPlayer(playerStore)//restores player graphic
setFreeze(false)//unfreezes guards
setLives((lives=>lives-1))//removes 1 life
  },5000)
  return guard_id;// guard doesnt continue to move after firing
  

}
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
