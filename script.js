"use stict";

import { Ball } from "./Ball.js";
import { Paddle } from "./Paddle.js";

const canvas = document.querySelector("#game-window");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

const ball = new Ball(ctx, canvas.height, canvas.width);
const player_paddle = new Paddle(ctx, canvas.height, canvas.width);
const computer_paddle = new Paddle(ctx, canvas.height, canvas.width, true);

let lastTime;
const update = (time) => {
    if (lastTime != null) {
        const delta = time - lastTime;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ball.update(delta, player_paddle, computer_paddle);
        computer_paddle.AI(delta, ball);

        if (ball.x + ball.r <= 0 || ball.x - ball.r >= canvas.width) {
            ball.reset();
        }

        ball.draw();
        player_paddle.draw();
        computer_paddle.draw();
    }
    lastTime = time;
    window.requestAnimationFrame(update);
};

document.addEventListener("mousemove", (e) => {
    player_paddle.update(e);
});
window.requestAnimationFrame(update);
