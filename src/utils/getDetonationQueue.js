const getDetonationQueue = (detonationQueue, limit, stop = false) => {
  
  //// FOR GODS SAKE DO NOT MESS WITH THIS FUNCTION YET!! ///////////

  // called from app line 78 ish
  //detonationQueue array initially set to bombPos
  //limit is number of tnt to add to queue to avoid wiping out
  //the entire screen in one shot, if limit not reached, no problem.
  //detonationQueue should be an array of co-ordinate objects
  //function returns the detonation queue to app
  if (
    stop ||
    detonationQueue.length >= limit //base case reached
  ) {
    console.log("Finished getting queue");

    return detonationQueue;
  }

  const tntElements = Array.from(document.getElementsByClassName("tnt"));
  //tnt elements = array of tnt divs existing on screen

  const tntPositions = tntElements.map((element) => {
    const obj = {};
    obj.x = +element.style.gridArea.split("/")[1];
    obj.y = +element.style.gridArea.split("/")[0];
    return obj;
  });
  //tnt positions = array of position objects {x,y}
  // corresponding to tnt divs on screen

  let newBoxes = []; // any found tnt boxes in range go in here

  detonationQueue.forEach((centre) => {
    // iterate through the queue

    let testArray = []; //8 grid co-ord objects {x,y} around current position

    testArray.push({ x: centre.x - 1, y: centre.y - 1 }); // top left
    testArray.push({ x: centre.x, y: centre.y - 1 }); // top mid
    testArray.push({ x: centre.x + 1, y: centre.y - 1 }); // top right
    testArray.push({ x: centre.x - 1, y: centre.y }); // left
    testArray.push({ x: centre.x + 1, y: centre.y }); //right
    testArray.push({ x: centre.x - 1, y: centre.y + 1 }); // bottom left
    testArray.push({ x: centre.x, y: centre.y + 1 }); // bottom mid
    testArray.push({ x: centre.x + 1, y: centre.y + 1 }); //bottom right

    //iterate through testArray, find any live tnt boxes
    const liveBoxes = testArray.filter((testPosition) => {
      return (
        tntPositions.some(
          (tntPosition) =>
            tntPosition.x === testPosition.x && tntPosition.y === testPosition.y
        ) &&
        !detonationQueue.some(
          (position) =>
            position.x === testPosition.x && position.y === testPosition.y
        )
      );
      // if tnt at testPosition, and isnt already in queue... add testPosition to liveBoxes
    });
    //liveBoxes = array of all the tnt position surrounding current position

    if (liveBoxes.length === 0) {
      stop = true; // stop flag for recursive call
    } else {
      newBoxes = [...newBoxes, ...liveBoxes];
    }
  }); // end detonationQueue.forEach()

  //add newBoxes to detonationQueue and return
  return getDetonationQueue([...detonationQueue, ...newBoxes], limit, stop); //recursive call
};

export default getDetonationQueue;
