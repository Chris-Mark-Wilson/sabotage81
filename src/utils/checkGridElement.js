 const checkGridElement=(x,y,boxes)=>{
   let flag=false
    boxes.forEach(box=>{
      if(box.props.x===x && box.props.y===y) {
         flag = true
      }
    })
    return flag
  }
  export default checkGridElement