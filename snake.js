const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const box = 20; // size of the snake square
const canvasSize = 400;
let snake = [
  { x: 9 * box, y: 10 * box },
];
let direction = 'RIGHT';
let food = {
  x: Math.floor(Math.random() * (canvasSize / box)) * box,
  y: Math.floor(Math.random() * (canvasSize / box)) * box,
};
let score = 0;
let gameInterval;

function draw() {
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? '#1abc9c' : '#16a085';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = '#222';
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  // Draw food
  ctx.fillStyle = '#e67e22';
  ctx.fillRect(food.x, food.y, box, box);

  // Move snake
  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === 'LEFT') headX -= box;
  if (direction === 'UP') headY -= box;
  if (direction === 'RIGHT') headX += box;
  if (direction === 'DOWN') headY += box;

  // Check collision with food
  if (headX === food.x && headY === food.y) {
    score++;
    document.getElementById('score').innerText = 'Score: ' + score;
    food = {
      x: Math.floor(Math.random() * (canvasSize / box)) * box,
      y: Math.floor(Math.random() * (canvasSize / box)) * box,
    };
  } else {
    snake.pop();
  }

  // New head
  const newHead = { x: headX, y: headY };

  // Game over conditions
  if (
    headX < 0 || headX >= canvasSize ||
    headY < 0 || headY >= canvasSize ||
    collision(newHead, snake)
  ) {
    clearInterval(gameInterval);
    ctx.fillStyle = '#fff';
    ctx.font = '2rem Arial';
    ctx.fillText('Game Over', canvasSize / 2 - 70, canvasSize / 2);
    return;
  }

  snake.unshift(newHead);
}

function collision(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x === arr[i].x && head.y === arr[i].y) {
      return true;
    }
  }
  return false;
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
  else if (e.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
  else if (e.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
  else if (e.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
});

gameInterval = setInterval(draw, 100); 