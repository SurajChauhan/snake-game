const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const box = 20; // size of the snake square
const canvasSize = 400;
const snakeLength = 20;
let snake = [];
let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

// Initialize a long snake in the center
for (let i = 0; i < snakeLength; i++) {
  snake.push({
    x: canvas.width / 2 - i * box,
    y: canvas.height / 2
  });
}

canvas.addEventListener('mousemove', function(e) {
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function draw() {
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Move head toward mouse
  let head = snake[0];
  let dx = mouse.x - head.x;
  let dy = mouse.y - head.y;
  let dist = Math.sqrt(dx * dx + dy * dy);
  let speed = 4;
  if (dist > speed) {
    head.x += (dx / dist) * speed;
    head.y += (dy / dist) * speed;
  }

  // Move each segment to follow the previous one
  for (let i = snake.length - 1; i > 0; i--) {
    snake[i].x = lerp(snake[i].x, snake[i - 1].x, 0.4);
    snake[i].y = lerp(snake[i].y, snake[i - 1].y, 0.4);
  }

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? '#1abc9c' : '#16a085';
    ctx.beginPath();
    ctx.arc(snake[i].x, snake[i].y, box / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#222';
    ctx.stroke();
  }
}

setInterval(draw, 30);

// Add rotation effect to the canvas on mouse enter/leave
const gameCanvas = document.getElementById('game');
gameCanvas.addEventListener('mouseenter', () => {
  gameCanvas.classList.add('rotate');
});
gameCanvas.addEventListener('mouseleave', () => {
  gameCanvas.classList.remove('rotate');
});
