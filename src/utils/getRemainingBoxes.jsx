const getRemainingBoxes=(explosions,boxes)=>{
  
return boxes.filter(box=>!explosions.some(explosion=>box.x===explosion.x&&box.y===explosion.y))

}

export default getRemainingBoxes;