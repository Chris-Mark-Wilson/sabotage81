const checkBlastArea = (pos, myPos, guardPos) => {
  //guardPos is an array of all guards => {id,x,y,xx,yy}
  //pos is position of tnt box being checked,blast centre
  //mypos is player position

  const findArray = [
    { x: pos.x - 1, y: pos.y - 1 },
    { x: pos.x - 1, y: pos.y },
    { x: pos.x + 1, y: pos.y - 1 },
    { x: pos.x - 1, y: pos.y },
    { x: pos.x + 1, y: pos.y },
    { x: pos.x - 1, y: pos.y + 1 },
    { x: pos.x, y: pos.y + 1 },
    { x: pos.x + 1, y: pos.y + 1 },
  ];

  let caughtArray = [];

  if (findArray.some((pos) => myPos.x === pos.x && myPos.y === pos.y))
    caughtArray.push("player");

findArray.forEach(position=>{
    guardPos.forEach(guard=>{
        if(position.x===guard.x&&position.y===guard.y){
            caughtArray.push(guard.id)
        }
    })
})
// returns an array of anything caught in blast
//e.g. ["player",0,2,3] - guard ids...
console.log(caughtArray,"caught array")
  if (caughtArray.length) {
    return caughtArray;
  } else return undefined;
};

export default checkBlastArea;
