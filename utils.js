function getIntervals(width, count) {
  let intervals = [];
  let margin = 100;
  let step = (width - 2 * margin) / count;
  let a = margin;

  while (a < width - margin) {
    intervals.push(a);
    a += step;
  }
  return intervals;
}

function collisionDetection(obj1, obj2) {
  if (obj1.exists && obj2.exists) {
    if (
      // horizontal collision
      ((obj1.x >= obj2.x && obj1.x <= obj2.x + obj2.width) ||
        (obj1.x + obj1.width >= obj2.x &&
          obj1.x + obj1.width <= obj2.x + obj2.width)) &&
      // vertical collision
      obj1.y <= obj2.y + obj2.height &&
      obj1.y > obj2.y
    ) {
      // console.log(`${obj1.constructor.name} collided with ${obj2.constructor.name}`);
      return true;
    }
  }
}
