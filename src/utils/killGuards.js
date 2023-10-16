export const killGuards=(caughtGuardIds,setScore,setHeaderText,setGuardCaught,guardDeadEffect,guardPos,setGuardPos)=>{
    guardDeadEffect.current.play()
    const deadGuard="😵"

    setScore((score)=>score + (100 * caughtGuardIds.length));

    const text=`--GOT ${caughtGuardIds.length} GUARD${caughtGuardIds.length>1?"S":""}`
    setHeaderText(text);

console.log(caughtGuardIds,"ids")
console.log(guardPos,"guardPos")
const caughtGuardsArray=guardPos.filter(guard=>{
    return caughtGuardIds.includes(guard.id)
})//got copy all actual caught guard objects
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
    console.log(newArray)
    return newArray

})
// setGuardPos(guardPos=>{
//     const guardsArray=[...guardPos]

// })

console.log(caughtGuardsArray,"caught guards")

    setTimeout(() => {
      setHeaderText("--Sabotage--");
      setGuardCaught(false);
    }, 3000);
    // setGuardPos((guardPos) => {
    //   return getUniquePosition(boxes,myPos)
    // });
}