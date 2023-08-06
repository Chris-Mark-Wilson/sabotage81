

const movePlayer=(setMyPos,boxes,myPos,e)=>{
    if(e.key==="q"){
if(myPos.y>0 && !boxes.some(box  =>{
    return   (box.x===myPos.x && box.y===myPos.y-1)}
  )){
   setMyPos({x:myPos.x,y:myPos.y-1})
 }
}

if(e.key==="a"){
 if(myPos.y<30 && !boxes.some(box  =>{
  return (box.x===myPos.x && box.y===myPos.y+1)}
     )){
      setMyPos({x:myPos.x,y:myPos.y+1})
     }
}

if(e.key==="p"){
 if(myPos.x<30 && !boxes.some(box  =>{
 return  (box.x===myPos.x+1 && box.y===myPos.y)}
   )){
     setMyPos({x:myPos.x+1,y:myPos.y})
     }
   }
   
   if(e.key==="o"){
  if(myPos.x>0 && !boxes.some(box  =>{
   return (box.x===myPos.x-1 && box.y===myPos.y)}
    )){
      setMyPos({x:myPos.x-1,y:myPos.y})
     }

    }
      // if(e.key===" "){
    //   console.log("Ticking....")
    //     setBombSet(true);
    //   setCountdown()
    // }
}

    export default movePlayer