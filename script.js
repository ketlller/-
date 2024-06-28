document.getElementById('play').addEventListener('click', function() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    startGame();
});

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let snake = [{ x: 200, y: 200 }];
let direction = 'right';
let food = { x: 100, y: 100 };
let score = 0;

function startGame() {
    document.getElementById('up').addEventListener('click', () => direction = 'up');
    document.getElementById('left').addEventListener('click', () => direction = 'left');
    document.getElementById('down').addEventListener('click', () => direction = 'down');
    document.getElementById('right').addEventListener('click', () => direction = 'right');
    setInterval(gameLoop, 100);
}

function gameLoop() {
    update();
    draw();
    checkGameOver();
}

function update() {
    const head = { ...snake[0] };
    if (direction === 'up') head.y -= 20;
    if (direction === 'down') head.y += 20;
    if (direction === 'left') head.x -= 20;
    if (direction === 'right') head.x += 20;
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        placeFood();
    } else {
        snake.pop();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    snake.forEach(part => ctx.fillRect(part.x, part.y, 20, 20));
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 20, 20);
    ctx.fillStyle = 'black';
    ctx.fillText(`Score: ${score}`, 10, 10);
}

function placeFood() {
    food.x = Math.floor(Math.random() * 20) * 20;
    food.y = Math.floor(Math.random() * 20) * 20;
}

function checkGameOver() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        alert('Game Over');
        resetGame();
    }
}

function resetGame() {
    snake = [{ x: 200, y: 200 }];
    direction = 'right';
    score = 0;
    placeFood();
    document.getElementById('menu').style.display = 'block';
    document.getElementById('game').style.display = 'none';
    saveScore();
}

function saveScore() {
    fetch('/saveScore', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ score }),
    }).then(response => response.json()).then(data => console.log(data));
}
