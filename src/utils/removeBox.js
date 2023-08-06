const removeBox=(index)=>{
    let stash=[]
   
    for(let i=0;i<index;i++){
      let shifted=boxes.shift()
       // remove the front of the 'queue' and 'stash'
      stash.push(shifted)
    }
    const bang=(boxes)=>{
      
  //  boxes[0].props.text="💥"
  
    }
    setTimeout(bang(boxes),50)
  
     boxes.shift() //remove the box to blow
    //  boxes.unshift(<Exp key={index} x={boxes[0].props.x} y={boxes[0].props.y} text={"💥"}/>)//replace with <Exp/>
    setScore(score+=1)
    for(let i=stash.length-1;i>=0;i--){
      boxes.unshift(stash[i])
    }
   // and return the entire array to the setBoxes function from where it was called..
    return [...boxes]
  }

  export default removeBox