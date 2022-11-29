"use stict";

const href = window.location.href;

const selected_difficulty = href?.split("?")[1]?.split("=")[1] ? href.split("?")[1]?.split("=")[1] : "easy";

const DIFFICULTIES = {
    easy: {
        difficulty: "easy",
        ball_speed: 5000,
        ball_speed_increase: 10000,
        ai_speed: 500000,
        player_speed: 100000,
        paddle_height: "",
    },
    medium: {
        difficulty: "medium",
        ball_speed: 4000,
        ball_speed_increase: 5000,
        ai_speed: 250000,
        player_speed: 100000,
        paddle_height: "",
    },
    hard: {
        difficulty: "hard",
        ball_speed: 3000,
        ball_speed_increase: 2500,
        ai_speed: 100000,
        player_speed: 100000,
        paddle_height: "",
    },
    impossible: {
        difficulty: "impossible",
        ball_speed: 1000,
        ball_speed_increase: 1000,
        ai_speed: 80000,
        player_speed: 100000,
        paddle_height: "",
    },
};

const DIFFICULTY = DIFFICULTIES[selected_difficulty];

import { Ball } from "../src/Ball.js";
import { Paddle } from "../src/Paddle.js";

const canvas = document.querySelector("#game-window");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

const ball = new Ball(ctx, canvas.height, canvas.width, DIFFICULTY);
const player_paddle = new Paddle(ctx, canvas.height, canvas.width, "left", DIFFICULTY, false);
const computer_paddle = new Paddle(ctx, canvas.height, canvas.width, "right", DIFFICULTY, true);
let PLAYER_UP = false;
let PLAYER_DOWN = false;

let last_time;
const update = (time) => {
    if (last_time != null) {
        const delta = time - last_time;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ball.update(delta, player_paddle, computer_paddle);
        computer_paddle.update(delta, ball.y);

        if (PLAYER_UP) player_paddle.update(null, -canvas.height / 100);
        if (PLAYER_DOWN) player_paddle.update(null, canvas.height / 100);

        const outOfBoundsLeft = ball.x + ball.r <= 0;
        const outOfBoundsRight = ball.x - ball.r >= canvas.width;

        if (outOfBoundsLeft || outOfBoundsRight) {
            if (outOfBoundsLeft) {
                computer_paddle.score += 1;
                document.querySelector("#right-score").innerText = computer_paddle.score;
            } else if (outOfBoundsRight) {
                player_paddle.score += 1;
                document.querySelector("#left-score").innerText = player_paddle.score;
            }
            player_paddle.reset();
            computer_paddle.reset();
            ball.reset();
        }

        ball.draw();
        player_paddle.draw();
        computer_paddle.draw();
    }
    last_time = time;
    window.requestAnimationFrame(update);
};

document.addEventListener("mousemove", (e) => {
    player_paddle.update(1000 / 60, e.clientY);
});

document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    if (key == "w") {
        PLAYER_UP = true;
    } else if (key == "s") {
        PLAYER_DOWN = true;
    } else if (key == "a") {
        PLAYER_UP = true;
    } else if (key == "d") {
        PLAYER_DOWN = true;
    }
});

document.addEventListener("keyup", (e) => {
    const key = e.key.toLowerCase();
    if (key == "w") {
        PLAYER_UP = false;
    } else if (key == "s") {
        PLAYER_DOWN = false;
    } else if (key == "a") {
        PLAYER_UP = true;
    } else if (key == "d") {
        PLAYER_DOWN = true;
    }
});

window.requestAnimationFrame(update);
