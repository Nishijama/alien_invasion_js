window.addEventListener('keydown', ({key}) => {
    console.log(key);
    switch(key) {
        case "a": ship.controls.left.pressed = true; break;
        case "d": ship.controls.right.pressed = true; break;
        case " ": ship.controls.fire.pressed = true; break;
    }
})
window.addEventListener('keyup', ({key}) => {
    switch(key) {
        case "a": ship.controls.left.pressed = false; break;
        case "d": ship.controls.right.pressed = false; break;
        case " ": ship.controls.fire.pressed = false; break;
    }
})


function getIntervals(width, count) {
    let intervals = []
    let step = width/count
    let a = 0;
    while (a < width) {
        intervals.push(a)
        a += step;
    }
    console.log(intervals);
    return intervals;
}