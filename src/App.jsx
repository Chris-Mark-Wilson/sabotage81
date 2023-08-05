import {useState } from 'react'
import './App.css'
import Sabotage from './components/sabotage'
import Exp from './components/exp'

const App=()=>{
  
  
 
  let [count,setCount]=useState(5)
  const [bombSet,setBombSet]=useState(false);
  const [stop,setStop]=useState(false)
  let [score,setScore]=useState(0)
 

 
const setCountdown=()=>{
  if(count>=1) setTimeout(tickdown,1000)
}

const tickdown=()=>{
  
    if(count===1){
     
      boomTime([[bombX,bombY]])
    };
    count--;
    const bomb=document.getElementById("bomb")
    bomb.textContent=count;
    setCountdown()
}


////////////////BAAAAAANNNNNGGGG//////////////////////////////

const boomTime=(bangArray)=>{

 
  ///recursive base case
  if(bangArray.length===0){//bang array.length===0 or stop
    boxes.forEach(box=>{
      console.log(box.props.text,box.props.x,box.props.y)
     })
    setBombSet(false);
console.log("Boom!")
console.log("score=",score)
// let e=document.getElementById("bomb")
// let x=e.style.gridColumn
// let y=e.style.gridRow
// render(e)
// setBombX(()=>bombX=x)
// setBombY(()=>bombY=y)
// setMyX(()=>myX=x)
// setMyY(()=>myY=y)
//  I fixed this problem by changing How it handles
// moving around the screen 'carrying' the bomb
console.log(myX,myY,"my x,y state")
console.log(bombX,bombY,"bomb x,y state")
let e=document.getElementById("me")
console.log(e.style.gridColumn,",",e.style.gridRow,"<-my actual x,y")
e=document.getElementById("bomb")
console.log(e.style.gridColumn,",",e.style.gridRow,"<-bomb actual x,y")
return
  }

 
  if(!stop){
    let testArray=[];
    testArray.push([bangArray[0][0]-1,bangArray[0][1]-1]) // top left
    testArray.push([bangArray[0][0],bangArray[0][1]-1]) // top mid
    testArray.push([bangArray[0][0]+1,bangArray[0][1]-1]) // top right
    testArray.push([bangArray[0][0]-1,bangArray[0][1]]) // left
    testArray.push([bangArray[0][0]+1,bangArray[0][1]]) //right
    testArray.push([bangArray[0][0]-1,bangArray[0][1]+1]) // bottom left
    testArray.push([bangArray[0][0],bangArray[0][1]+1]) // bottom mid
    testArray.push([bangArray[0][0]+1,bangArray[0][1]+1]) //bottom right

    //// explosion graphic generation

    // const elementArray=Array.from(document.getElementsByClassName("tnt"))
    // testArray.forEach(position=>{ // position is an array [x,y]
    //   elementArray.forEach((element,index)=>{
    //     let y=+element.style.gridArea.split("/")[0]
    //    let x=+element.style.gridArea.split("/")[1]
    //     //grid area is [y,x]... weird but hey ho...
    //     //prolly the 'mericans again...
    //    // we now have the gridref of the tnt element
    //     if(x===position[0] && y===position[1]){
    //       //we have a match!
    //       const bang=(element,index)=>{
    //         element.style.textContent="💥"
    //         console.log(element.style.textContent,element.style.gridColumn,element.style.gridRow)
          
    //         setBoxes(()=>{
    //           console.log(index)
            
             
    //          // something odd going on now
    //         })
    //       }
    //       bang(element,index) })
    // })

//////// remove box from array //////////////////
    testArray.forEach(position=>{
          boxes.forEach((box,index)=>{  //test for uxb and remove
            
                if(box.props.x===position[0] && box.props.y===position[1]){
                  bangArray.push(position);
                 setBoxes(removeBox(index))
                //  setBoxes(boxes)
                if(bangArray.length>50)setStop(true);
                }
          })
    })

    bangArray.shift();  //remove this position 
    

  }
    
    boomTime(bangArray) // recursive call
}

//////////////////////////////////////
//called by setBoxes()
/*so what this is SUPPOSED to do is take off the front of the array up to the index of the box we need to blow up, then replace it with a completely new element i.e. <Exp/>
but for some weird reason it doesnt work?*/
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
   boxes.unshift(<Exp key={index} x={boxes[0].props.x} y={boxes[0].props.y} text={"💥"}/>)//replace with <Exp/>
  setScore(score+=1)
  for(let i=stash.length-1;i>=0;i--){
    boxes.unshift(stash[i])
  }
 // and return the entire array to the setBoxes function from where it was called..
  return [...boxes]
}

/////////////////////////////////////////////////////////////////////
  return (
    <>
      
    <Sabotage score={score}setScore={setScore}/>

   
   
    
      
    </>
  )
}
export default App
