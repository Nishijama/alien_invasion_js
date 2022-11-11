let settings = new Settings();



let canvas = document.querySelector('#game-canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})
let ctx = canvas.getContext("2d");


let background = new Sprite(settings.sprites.background)
let ship = new Ship(settings.sprites.player)
let bullets = []
let aliens = []

for (let i=0; i<settings.alienCount; i++) {
    aliens.push(new Alien({x: getIntervals(window.innerWidth, 10)[i], y: 10, width: 150, height:150, spriteImage: "images/ufo.png"}))
}



function animate() {
    window.requestAnimationFrame(animate)
    background.draw();
    ship.update()

    for (let alien of aliens) {
        alien.draw()
    }

    // fire
    if (ship.controls.fire.pressed === true) {
        ship.controls.fire.pressed = false;
        let bullet1 = new Bullet({x: ship.x + 8, y: ship.y, color: 'red', width: 10, height: 30})
        let bullet2 = new Bullet({x: ship.x + 130, y: ship.y, color: 'blue', width: 10, height: 30})
        bullets.push(bullet1, bullet2)
    }
    for (let bullet of bullets) {
        bullet.update()
        if (bullet.y < 0) {
            bullets.slice(bullets.indexOf(bullet), 1);
        }
    }
}

animate();