
const getDetonationQueue = (tntType, detonationQueue, limit, stop = false) => {
  if (stop || detonationQueue.length >= limit) {


    return detonationQueue;
  }

  const tntSelector = tntType === "X" ? ".x" : tntType === "☠" ? ".skull" : ".tnt";
  const tntElements = Array.from(document.querySelectorAll(tntSelector));

  const tntPositions = tntElements.map((element) => {
    const [y, x] = element.style.gridArea.split("/").map(Number);
    return { x, y };
  });

  let newBoxes = [];

  detonationQueue.forEach((centre) => {
    const testArray = [
      { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
      { x: -1, y: 0 },                  { x: 1, y: 0 },
      { x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 },
    ].map(offset => ({ x: centre.x + offset.x, y: centre.y + offset.y }));

    const liveBoxes = testArray.filter((testPosition) =>
      tntPositions.some(
        (tntPosition) =>
          tntPosition.x === testPosition.x && tntPosition.y === testPosition.y
      ) &&
      !detonationQueue.some(
        (position) =>
          position.x === testPosition.x && position.y === testPosition.y
      )
    );

    if (liveBoxes.length === 0) {
      stop = true;
    } else {
      newBoxes.push(...liveBoxes);
    }
  });

  return getDetonationQueue(tntType, [...detonationQueue, ...newBoxes], limit, stop);
};

export default getDetonationQueue;
