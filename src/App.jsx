import { useId, useState } from 'react'
import { useRef,useEffect,createElement } from 'react'
import { createRoot } from 'react-dom/client';
import './App.css'
import { render } from 'react-dom'

const getRnd=()=>{
  return Math.floor(Math.random()*31)
 }

const checkGridElement=(x,y,boxes)=>{
    for(let i=0;i<boxes.length;i++){
      if(boxes[i][0]===x && boxes[i][1]===y) return true
    }
     return false;
}
const createBoxArray=(max)=>{ 
  let boxes=[]
 
  for(let i=0;i<max;i++){
    let x=Math.floor(Math.random()*31)
    let y=Math.floor(Math.random()*31)
  //check for duplication/overlay 
  boxes.push([x,y,"tnt"])
  for (let o=0;o<boxes.length-1;o++){
      if(boxes[o][0]===x && boxes[o][1]===y){
        boxes.pop()
        i--;
       }
     }
   }
   return boxes;
}
/////////////////////////////////////////////////////////////////////
const App=()=>{
  let [myX,setMyX]=useState(getRnd())
  let [myY,setMyY]=useState(getRnd())
  let [guardX,setGuardX]=useState(getRnd())
  let [guardY,setGuardY]=useState(getRnd())
  let [bombX,setBombX]=useState(myX)
  let [bombY,setBombY]=useState(myY)
  let [count,setCount]=useState(5)
  let [bombSet,setBombSet]=useState(false);
  let [stop,setStop]=useState(false)
  let [score,setScore]=useState(0)
  const inputRef=useRef(null) // used to set focus on player at start
  useEffect(() => {
    inputRef.current.focus();
}, []);

  // state for array of uxb boxes
  let [boxes,setBoxes]=useState(createBoxArray(300))

////////////////////////////////////////////////////
  const handleKeyDown=(e)=>{
          if(e.key==="q"){
          const boxAbove=checkGridElement(myX,myY-1,boxes)
          if(!boxAbove){
          if(myY>0) {
            setMyY(myY-1)
              if(!bombSet){
                setBombY(myY-1)
                setBombX(myX)
              }
          }
          }
        }
        if(e.key==="a"){
          const boxBelow=checkGridElement(myX,myY+1,boxes)
          if(!boxBelow){
          if(myY<30) {
            setMyY(myY+1)
              if(!bombSet){
                setBombY(myY+1)
                setBombX(myX)
              }
          }
          }
        }
        if(e.key==="p"){
          const boxRight=checkGridElement(myX+1,myY,boxes)
          if(!boxRight){
          if(myX<30) {
            setMyX(myX+1)
              if(!bombSet){
                setBombX(myX+1)
                setBombY(myY)
              }
          }
          }
        }
        if(e.key==="o"){
          const boxLeft=checkGridElement(myX-1,myY,boxes)
          if(!boxLeft){
          if(myX>0) {
            setMyX(myX-1)
            if(!bombSet){
              setBombX(myX-1)
              setBombY(myY)
            }
          }
          }
        }
        if(e.key===" "){
          console.group("Ticking....")
            setBombSet(true);
          setCountdown()
        }
}

///////////////////////////////////////////////////////////////////
const setCountdown=()=>{
  if(count>=1) setTimeout(tickdown,1000)
}

const tickdown=()=>{
  
    if(count===1)boomTime([[bombX,bombY]]);
    count--;
    const bomb=document.getElementById("bomb")
    bomb.textContent=count;
    setCountdown()
}

const stopCount=()=>{
  setBombSet(false);
}

////////////////BAAAAAANNNNNGGGG//////////////////////////////

const boomTime=(bangArray)=>{
 
  ///recursive base case
  if(bangArray.length===0){
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

    const elementArray=Array.from(document.getElementsByClassName("tnt"))
    testArray.forEach(position=>{ // position is an array [x,y]
      elementArray.forEach((element,index)=>{
        let y=+element.style.gridArea.split("/")[0]
       let x=+element.style.gridArea.split("/")[1]
        //grid area is [y,x]... weird but hey ho...
        //prolly the 'mericans again...
       // we now have the gridref of the tnt element
        if(x===position[0] && y===position[1]){
          //we have a match!
          const bang=(element,index)=>{
            element.style.textContent="💥"
            console.log(element.style.textContent,element.style.gridColumn,element.style.gridRow)
            ///error --> at this point the box at 'index' has already been deleted from the array.. it logs these AFTER the explosions, in fact AFTER the recursive function has finished... so theres something async I havent accounted for..
            //this setBoxes below thinks 'index' is the boxes array?
            setBoxes((index)=>{
              // console.log(index)
              // console.log(boxes[index])
              // boxes[index][2]="💥"
              return boxes;
            })
          }
          bang(element,index)
          
        }
      })
    })

    testArray.forEach(position=>{
          boxes.forEach((box,index)=>{  //test for uxb and remove
                if(box[0]===position[0] && box[1]===position[1]){
                  bangArray.push(position);
                 setBoxes(removeBox(index))
                //  setBoxes(boxes)
                }
          })
    })

    bangArray.shift();  //remove this position 
    

    if(bangArray.length>50)setStop(true);
  }
    
    boomTime(bangArray) // recursive call
}

//////////////////////////////////////
// this function isnt actually using state or setState but still removes the boxes? what is going on?
const removeBox=(index)=>{
  let stash=[]
 
  for(let i=0;i<index;i++){
    let shifted=boxes.shift()
     // remove the front of the 'queue' and 'stash'
    stash.push(shifted)
  }
  boxes.shift() //remove the box to blow
  setScore(score+=1)
  for(let i=stash.length-1;i>=0;i--){
    boxes.unshift(stash[i])
  }
 
  return boxes
}

/////////////////////////////////////////////////////////////////////
  return (
    <>
      
      <div id="main">
    {boxes.map((box,index)=>{
      return <div className="tnt" id="tnt" style={{gridColumn:box[0],gridRow:box[1]}} key={index}>{box[2]}</div>
    })}
    <div id="bomb" style={{gridColumn:bombX,gridRow:bombY,     }}>5</div>
    <div ref= {inputRef} id="me" tabIndex={0} onKeyDown={handleKeyDown} style={{gridColumn:myX,gridRow:myY}}>S</div>
    <div id="guard"  style={{gridColumn:guardX,gridRow:guardY}}>G</div>
    
       </div>
    </>
  )
}

export default App
