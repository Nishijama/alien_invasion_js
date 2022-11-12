class Settings {
    constructor() {
        this.alienCount = 10;
        this.starNumber = 100;
        this.sprites = {
            player: {x : window.innerWidth/2-75, y : window.innerHeight, width: window.innerWidth/20, height:window.innerWidth/20, spriteImage:"images/arcade-game.png"},
            background: {x: 0, y: 0, width: window.innerWidth, height: window.innerHeight, color: 'black'}
        }
    }
}