class Settings {
    constructor() {
        this.backgroundColor = 'black';
        this.alienCount = 10;

        this.sprites = {
            player: {x : window.innerWidth/2-75, y : window.innerHeight -250, width: 150, height:150, spriteImage:"images/arcade-game.png"},
            background: {x: 0, y: 0, width: window.innerWidth, height: window.innerHeight, color: this.backgroundColor}
        }
    }
}