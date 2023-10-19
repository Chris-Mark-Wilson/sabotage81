import { killedAllGuards } from "./killedAllGuards";

export const killGuards=(setFreeze,metric,boxes,myPos,setPause,guard,caughtGuardIds,setScore,setHeaderText,setGuardCaught,guardDeadEffect,guardPos,setGuardPos)=>{
    guardDeadEffect.current.play()
    const deadGuard="😵"
    const liveGuard=guard;

    setScore((score)=>score + (100 * caughtGuardIds.length*metric));

    const text=`--GOT ${caughtGuardIds.length} GUARD${caughtGuardIds.length>1?"S":""}`
    setHeaderText(text);


const caughtGuardsArray=guardPos.filter(guard=>{
    return caughtGuardIds.includes(guard.id)
})//got copy of all actual caught guard objects
caughtGuardsArray.forEach(guard=>{
    guard.img=deadGuard
})
setGuardPos(array=>{
    const newArray=[...array]
    newArray.forEach((guard,index)=>{
        if(caughtGuardIds.includes(guard.id)){
            newArray.splice(index,1,caughtGuardsArray.filter(caughtguard=>{
                return caughtguard.id===guard.id
            })[0])//kills the actual guard in guardPos array
        }
    })
    if(newArray.every(guard=>guard.img===deadGuard)){
        killedAllGuards(metric,boxes,myPos,setScore,setHeaderText,guardPos,setGuardPos,setPause,setFreeze)
        newArray.forEach(guard=>guard.img=liveGuard)
    }
 
    return newArray
})




    setTimeout(() => {
      setHeaderText("--Sabotage--");
      setGuardCaught(false);
    }, 3000);
    // setGuardPos((guardPos) => {
    //   return getUniquePosition(boxes,myPos)
    // });
}