import getRnd from "./getRnd";

const canMoveUp = ({boxes, guardPos, setGuardPos}) => {
  if (
    guardPos.y > 0 &&
    !boxes.some((box) => {
      return box.x === guardPos.x && box.y === guardPos.y - 1;
    })
  ) {
    setGuardPos({ x: guardPos.x, y: guardPos.y - 1 });
    return true;
  } else return false;
};

const canMoveDown = ({boxes, guardPos, setGuardPos}) => {
  if (
    guardPos.y < 30 &&
    !boxes.some((box) => {
      return box.x === guardPos.x && box.y === guardPos.y + 1;
    })
  ) {
    setGuardPos({ x: guardPos.x, y: guardPos.y + 1 });
    return true;
  } else return false;
};

const canMoveLeft = ({boxes, guardPos, setGuardPos}) => {
  if (
    guardPos.x > 0 &&
    !boxes.some((box) => {
      return box.x === guardPos.x - 1 && box.y === guardPos.y;
    })
  ) {
    setGuardPos({ x: guardPos.x - 1, y: guardPos.y });
    return true;
  } else return false;
};

const canMoveRight = ({boxes, guardPos, setGuardPos}) => {
  if (
    guardPos.x < 30 &&
    !boxes.some((box) => {
      return box.x === guardPos.x + 1 && box.y === guardPos.y;
    })
  ) {
    setGuardPos({ x: guardPos.x + 1, y: guardPos.y });
    return true;
  } else return false;
};

const getNewWaypoint=(setWaypoint)=>{
    setWaypoint((waypoint)=>{
        const newWaypoint=waypoint;
        newWaypoint.x=getRnd();
        newWaypoint.y=getRnd();
        return newWaypoint
       })
}

//////////MAIN FUNCTION///////////////

const moveGuard = ({
  waypoint,
  setWaypoint,
  earshotDistance,
  boxes,
  myPos,
  guardPos,
  setGuardPos,
  intelligence}
) => {
  // AI here //
  //move up,down,left or right returns true if ok, or false if blocked
  // waypoint - random point for guard to head towards;

  let earshot = false;
  if (
    Math.abs(guardPos.x - myPos.x) <= earshotDistance &&
    Math.abs(guardPos.y - myPos.y) <= earshotDistance
  ){
  earshot = true;
  }
  if(guardPos.x===waypoint.x&&guardPos.y===waypoint.y){
    getNewWaypoint(setWaypoint)
  }//stops guard freezing
  //within earshot or not?
  let target = {}; // point for guard to had towards
  earshot ? (target = myPos) : (target = waypoint);
  // if close head towards player, or waypoint if not..
const params={boxes:boxes,guardPos:guardPos,setGuardPos:setGuardPos}

  if(guardPos.x>target.x){
    if(canMoveLeft(params)){
        return
    }else{
       getNewWaypoint(setWaypoint)
    }
  }

  if(guardPos.x<target.x){
    if(canMoveRight(params)){
        return
    }else{
       getNewWaypoint(setWaypoint)
    }
  }

  if(guardPos.y<target.y){
    if(canMoveDown(params)){
        return
    }else{
     getNewWaypoint(setWaypoint)
    }
  }

  if(guardPos.y>target.y){
    if(canMoveUp(params)){
        return
    }else{
     getNewWaypoint(setWaypoint)
    }
  }


};
export default moveGuard;
