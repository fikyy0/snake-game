const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;

let snake = [{ x: 200, y: 200 }];
let direction = "RIGHT";

let food = {
  x: Math.floor(Math.random() * 20) * box,
  y: Math.floor(Math.random() * 20) * box
};

document.addEventListener("keydown", changeDirection);

function changeDirection(e) {
  if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  else if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 400, 400);

  // snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = "lime";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // head position
  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "RIGHT") headX += box;
  if (direction === "LEFT") headX -= box;
  if (direction === "UP") headY -= box;
  if (direction === "DOWN") headY += box;

  // eat food
  if (headX === food.x && headY === food.y) {
    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box
    };
  } else {
    snake.pop();
  }

  let newHead = { x: headX, y: headY };

  // game over collision
  if (
    headX < 0 || headY < 0 ||
    headX >= 400 || headY >= 400 ||
    collision(newHead, snake)
  ) {
    alert("Game Over!");
    snake = [{ x: 200, y: 200 }];
    direction = "RIGHT";
  }

  snake.unshift(newHead);
}

function collision(head, array) {
  return array.some(part => part.x === head.x && part.y === head.y);
}

setInterval(draw, 150);
