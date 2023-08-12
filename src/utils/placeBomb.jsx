

const placeBomb = (e,myPos,boxes) => {
  if (e.key === " ") {
    console.log(myPos.x, myPos.y, "me");
    boxes.forEach((box) => {
      if (
        box.x > myPos.x - 2 &&
        box.x < myPos.x + 2 &&
        box.y > myPos.y - 2 &&
        box.y < myPos.y + 2
      ) {
        console.log(box.x, box.y, "<box");
      }
    });
    // console.log("Ticking....")
    //
 
  }
}
export default placeBomb
