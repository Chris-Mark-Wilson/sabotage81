const getRemainingBoxes = (explosion, boxes) => {
  return boxes.filter(
    (box) => !(box.x === explosion.x && box.y === explosion.y)
  );
};

export default getRemainingBoxes;
