export const killGuards=(caughtGuardIds,setScore,setHeaderText,setGuardCaught,guardDeadEffect)=>{
    guardDeadEffect.current.play()

    setScore((score)=>score + (100 * caughtGuardIds.length));

    const text=`--GOT ${caughtGuardIds.length} GUARD${caughtGuardIds.length>1?"S":""}`
    setHeaderText(text);

    setTimeout(() => {
      setHeaderText("--Sabotage--");
      setGuardCaught(false);
    }, 3000);
    // setGuardPos((guardPos) => {
    //   return getUniquePosition(boxes,myPos)
    // });
}