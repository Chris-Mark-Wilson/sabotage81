 const checkGridElement=(x,y,boxes)=>{
   let flag=false
  const tntArray=Array.from(document.getElementsByClassName("tnt"))

  tntArray.forEach(box=>{
    const X=+box.style.gridArea.split("/")[1];
    const Y=+box.style.gridArea.split("/")[0]
   
    if(x===X && y===Y){
      flag=true
    }
  })
  
    return flag
  }
  export default checkGridElement