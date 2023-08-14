document.addEventListener("DOMContentLoaded", function() {
    // Initialize game

    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        console.error("Failed to get canvas context.");
        return;
    }

    // Game window
    const windowWidth = 850;
    const windowHeight = 700;
    canvas.width = windowWidth;
    canvas.height = windowHeight;
    document.title = "Pong!"

    // Paddles
    const paddleWidth = 10;
    const paddleHeight = 160;
    const player1Paddle = { x: 50, y: windowHeight / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight };
    const player2Paddle = { x: windowWidth - 50 - paddleWidth, y: windowHeight / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight };

    // Ball
    const ball = { x: windowWidth / 2 - 15, y: windowHeight / 2 - 15, width: 30, height: 30, speedX: 0, speedY: 0, moving: false };

    // Score and winning score
    let player1score = 0;
    let player2score = 0;
    const winningScore = 10;

    let ballSpeedX = 0;
    let ballSpeedY = 0;
    let ballMoving = false;

    // Event listener for keydown events
    window.addEventListener("keydown", function(event) {
        if (event.key === " ") {
            if (!ballMoving) {
                ballSpeedX = 5;
                ballSpeedY = 5;
                ballMoving = true;
            }
        } else if (event.key === "w" && player1Paddle.y > 0) {
            player1Paddle.y -= 30;
            event.preventDefault();
        } else if (event.key === "s" && player1Paddle.y + player1Paddle.height < windowHeight) {
            player1Paddle.y += 30;
            event.preventDefault();
        } else if (event.key === "ArrowUp" && player2Paddle.y > 0) {
            player2Paddle.y -= 30;
            event.preventDefault();
        } else if (event.key === "ArrowDown" && player2Paddle.y + player2Paddle.height < windowHeight) {
            player2Paddle.y += 30;
            event.preventDefault();
        }
    });

    // Game loop
    function gameLoop() {
        // Clear Canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update game logic
        // Ball position
        if (ballMoving) {
            ball.x += ballSpeedX;
            ball.y += ballSpeedY;
        }

        // Bounce ball of walls
        if (ball.y  <=0 || ball.y >= windowHeight - ball.height) {
            ballSpeedY = -ballSpeedY;
        }

        // Bounce Ball off Paddles

        if (ball.x <= player1Paddle.x + paddleWidth && ball.y >= player1Paddle.y && ball.y <= player1Paddle.y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        }

        if (ball.x >= player2Paddle.x - ball.width && ball.y >= player2Paddle.y && ball.y <= player2Paddle.y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        }

        // Check for win condition
        if (ball.x <= 0) {
            player2score += 1;
            if (player2score >= winningScore) {
                console.log("Player 2 Wins!!");
                const replay = window.confirm("Player 2 Wins!! Do you want to play again?");

                if (replay) {
                    player1score = 0;
                    player2score = 0;
                    ballSpeedX = Math.abs(ballSpeedX);
                    ball.x = canvas.width / 2 - ball.width / 2;
                    ball.y = canvas.height / 2 - ball.height / 2;
                } else {
                    // Stop the game
                    cancelAnimationFrame(gameLoop);
                    canvas.style.display = "none";
                }
            } else {
                // Reset Ball
                ball.x = canvas.width / 2 - ball.width / 2;
                ball.y = canvas.height / 2 - ball.height / 2;
                ballSpeedX = Math.abs(ballSpeedX);
            }
        } else if (ball.x >= canvas.width) {
            player1score += 1;
            if (player1score >= winningScore) {
                console.log("Player 1 Wins!!");
                const replay = window.confirm("Player 1 Wins!! Do you want to play again?");

                if (replay) {
                    player1score = 0;
                    player2score = 0;
                    ballSpeedX = -Math.abs(ballSpeedX);
                    ball.x = canvas.width / 2 - ball.width / 2;
                    ball.y = canvas.height / 2 - ball.height / 2;
                } else {
                    cancelAnimationFrame(gameLoop);
                    canvas.style.display = "none";
                }
            } else {
                ball.x = canvas.width / 2 - ball.width / 2;
                ball.y = canvas.height / 2 - ball.height / 2;
                ballSpeedX = -Math.abs(ballSpeedX);
            }
        }

        // Draw paddles
        ctx.fillStyle = "white";
        ctx.fillRect(player1Paddle.x, player1Paddle.y, player1Paddle.width, player1Paddle.height);
        ctx.fillRect(player2Paddle.x, player2Paddle.y, player2Paddle.width, player2Paddle.height);

        // Draw Ball
        ctx.beginPath();
        ctx.arc(ball.x + ball.width / 2, ball.y + ball.height / 2, ball.width / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        // Draw the scoreboard
        ctx.fillStyle = "white";
        ctx.font = "36px Arial";
        ctx.fillText(`Player 1: ${player1score}    Player 2: ${player2score}`, windowWidth / 2 - 200, 50);

        requestAnimationFrame(gameLoop);
    }

    // Start Game loop
    requestAnimationFrame(gameLoop);
});
