export const shootPlayer=(setBullet,myPos,guard_id,direction,bulletH,bulletV,setBulletArray)=>{
    //bullet array needs x,y,id
    if(direction==="up"){
        setBullet(bulletV)
        shootUp(setBulletArray,myPos,guard_id)
    }
    if(direction==="down"){
        setBullet(bulletV)
        shootDown(setBulletArray,myPos,guard_id)
    }
    if(direction==="left"){
        setBullet(bulletH)
        shootLeft(setBulletArray,myPos,guard_id)
    }
    if(direction==="right"){
        setBullet(bulletH)
        shootRight(setBulletArray,myPos,guard_id)
    }
}
// next functions create an array of bullets from guard to player
const shootUp=(setBulletArray,myPos,guard_id)=>{
    setBulletArray((array)=>{
        let tempArray=[...array]
        for(let i=guard_id.y-1;i>myPos.y;i--){
            tempArray.push({id:i,x:myPos.x,y:i})
        }
        return tempArray;
    })
}
const shootDown=(setBulletArray,myPos,guard_id)=>{
    setBulletArray((array)=>{
        let tempArray=[...array]
        for(let i=guard_id.y+1;i<myPos.y;i++){
            tempArray.push({id:i,x:myPos.x,y:i})
        }
        return tempArray;
    })
}
const shootLeft=(setBulletArray,myPos,guard_id)=>{
    setBulletArray((array)=>{
        let tempArray=[...array]
        for(let i=guard_id.x-1;i>myPos.x;i--){
            tempArray.push({id:i,y:myPos.y,x:i})
        }
        return tempArray;
    })
}
const shootRight=(setBulletArray,myPos,guard_id)=>{
    setBulletArray((array)=>{
        let tempArray=[...array]
        for(let i=guard_id.x+1;i<myPos.x;i++){
            tempArray.push({id:i,y:myPos.y,x:i})
        }
        return tempArray;
    })
}