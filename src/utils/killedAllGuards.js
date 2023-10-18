import { getUniquePosition } from "./getUniquePosition"

export const killedAllGuards=(boxes,myPos,setScore,setHeaderText,guardPos,setGuardPos,setPause)=>{
    setFreeze(true)
    setHeaderText(`BONUS ${guardPos.length*200}`)
    setTimeout(()=>{
        setGuardPos(guards=>{
            const newGuards=[...guards]
            newGuards.forEach(guard=>{
                const g=true;
                const newLocation=getUniquePosition(guardPos,boxes,myPos,g)
                guard.x=newLocation.x;
                guard.y=newLocation.y;
                guard.xx=null;
                guard.yy=null;
            })
            return newGuards;
        })
        setScore(score=>score+guardPos.length*200)
        setFreeze(false)

    },3000)
return 
}