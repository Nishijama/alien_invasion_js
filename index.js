let settings = new Settings();

let canvas = document.querySelector("#game-canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  console.log("resized");
});
let ctx = canvas.getContext("2d");
let background = new Background(settings.sprites.background);
let menuModal = document.getElementById("menu-modal");
let gameOverModal = document.getElementById("game-over-modal");
let scoreUI = document.querySelector("#score");
let abductionsUI = document.querySelector("#abductions");

animateBackground();

displayMenu();

// MENU

function checkIfMobile() {
  return window.innerWidth <= 800 && window.innerHeight <= 600;
}

function animateBackground() {
  window.requestAnimationFrame(animateBackground);
  background.update();
}

function displayMenu(newScore = undefined) {
  scoreUI.style.display = "none";
  abductionsUI.style.display = "none";
  menuModal.style.display = "flex";
  if (!checkIfMobile()) {
    document.getElementById("play-button").addEventListener("click", () => {
      menuModal.style.display = "none";
      play();
      console.log(newScore);
    });
  } else {
    alert("sorry, this game does not work on mobile devices :(");
  }
}

function displayGameOverMenu(newScore = undefined) {
  scoreUI.style.display = "none";
  abductionsUI.style.display = "none";
  gameOverModal.style.display = "flex";
  document.getElementById("GO-player-score").innerText = newScore;

  document
    .getElementById("back-to-menu-button")
    .addEventListener("click", () => {
      gameOverModal.style.display = "none";
      return displayMenu(newScore);
    });
  document.getElementById("try-again-button").addEventListener("click", () => {
    gameOverModal.style.display = "none";
    return play();
  });
}

function play() {
  scoreUI.style.display = "block";
  abductionsUI.style.display = "block";
  let playerScore = 0;
  let abductions = 0;
  abductionsUI.innerText = abductions;
  scoreUI.innerText = playerScore;
  let ship = new Ship(settings.sprites.player);
  let bullets = [];
  let aliens = [];
  let alienRowCount = 1;
  let maxAlienRowCount = 4;

  window.addEventListener("keydown", ({ key }) => {
    console.log(key);
    switch (key) {
      case "a":
        ship.controls.left.pressed = true;
        break;
      case "d":
        ship.controls.right.pressed = true;
        break;
      case "w":
        ship.controls.up.pressed = true;
        break;
      case "s":
        ship.controls.down.pressed = true;
        break;
      case " ":
        ship.controls.fire.pressed = true;
        break;
      case "Escape":
        STATE = "paused";
        break;
    }
  });
  window.addEventListener("keyup", ({ key }) => {
    switch (key) {
      case "a":
        ship.controls.left.pressed = false;
        break;
      case "d":
        ship.controls.right.pressed = false;
        break;
      case "w":
        ship.controls.up.pressed = false;
        break;
      case "s":
        ship.controls.down.pressed = false;
        break;
      case " ":
        ship.controls.fire.pressed = false;
        break;
    }
  });

  function createAlienFleet(rows, columns) {
    for (let r = 0; r < rows; r++) {
      for (let i = 0; i < columns; i++) {
        aliens.push(
          new Alien({
            x: getIntervals(window.innerWidth, 10)[i],
            y: r * (window.innerHeight / 5),
            width: window.innerWidth / 20,
            height: window.innerWidth / 20,
            spriteImage: "images/ufo.png",
          })
        );
      }
    }
  }

  function gameOver(playerScore) {
    for (let alien of aliens) alien.destroy();
    for (let bullet of bullets) bullet.destroy();
    ship.destroy();
    bullets = [];
    aliens = [];
    abductions = 0;
    return displayGameOverMenu(playerScore);
  }

  createAlienFleet(alienRowCount, settings.alienCount);

  function animate() {
    window.requestAnimationFrame(animate);
    ship.update();

    for (let alien of aliens) {
      alien.update();
      if (alien.y >= window.innerHeight) {
        alien.destroy();
        abductions++;
        aliens.splice(aliens.indexOf(alien), 1);
        abductionsUI.innerText = abductions;
      }
    }

    // fire
    if (ship.exists && ship.controls.fire.pressed) {
      ship.controls.fire.pressed = false;
      let bullet1 = new Bullet({
        x: ship.x,
        y: ship.y,
        color: "red",
        width: ship.width / 10,
        height: ship.width / 2,
      });
      let bullet2 = new Bullet({
        x: ship.x + ship.width,
        y: ship.y,
        color: "blue",
        width: ship.width / 10,
        height: ship.width / 2,
      });
      bullets.push(bullet1, bullet2);
    }

    // remove bullets outside the viewport
    for (let bullet of bullets) {
      bullet.update();
      if (bullet.y < 0) {
        bullets.splice(bullets.indexOf(bullet), 1);
      }
    }
    // detect collisions
    for (let alien of aliens) {
      for (let bullet of bullets) {
        if (collisionDetection(bullet, alien)) {
          bullet.destroy();
          alien.destroy();
          bullets.splice(bullets.indexOf(bullet), 1);
          aliens.splice(aliens.indexOf(alien), 1);
          playerScore += 100;
          scoreUI.innerText = playerScore;
        }
      }
      if (collisionDetection(ship, alien)) {
        return gameOver(playerScore);
      }
    }
    if (abductions >= 3) {
      return gameOver(playerScore);
    }

    // generate new fleet of aliens if ship still exists and no aliens in the game
    if (aliens.length == 0 && ship.exists) {
      if (alienRowCount < maxAlienRowCount) alienRowCount++;
      createAlienFleet(alienRowCount, settings.alienCount);
    }
  }
  animate();
}
