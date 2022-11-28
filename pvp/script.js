"use stict";

const href = window.location.href;

const selected_difficulty = href?.split("?")[1]?.split("=")[1] ? href.split("?")[1]?.split("=")[1] : "easy";

const DIFFICULTIES = {
    easy: {
        difficulty: "easy",
        ball_speed: 3000,
        ball_speed_increase: 1000,
        ai_speed: null,
        player_speed: null,
        paddle_height: null,
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
const player2_paddle = new Paddle(ctx, canvas.height, canvas.width, "right", DIFFICULTY, false);
let PLAYER_UP = false;
let PLAYER_DOWN = false;
let PLAYER2_UP = false;
let PLAYER2_DOWN = false;

let last_time;
const update = (time) => {
    if (last_time != null) {
        const delta = time - last_time;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ball.update(delta, player_paddle, player2_paddle);

        if (PLAYER_UP) player_paddle.update(null, -canvas.height / 100);
        if (PLAYER_DOWN) player_paddle.update(null, canvas.height / 100);

        if (PLAYER2_UP) player2_paddle.update(null, -canvas.height / 100);
        if (PLAYER2_DOWN) player2_paddle.update(null, canvas.height / 100);

        if (ball.x + ball.r <= 0 || ball.x - ball.r >= canvas.width) {
            ball.reset();
        }

        ball.draw();
        player_paddle.draw();
        player2_paddle.draw();
    }
    last_time = time;
    window.requestAnimationFrame(update);
};

document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    if (key == "w" || key == "a") {
        PLAYER_UP = true;
    } else if (key == "s" || key == "d") {
        PLAYER_DOWN = true;
    } else if (key == "arrowup" || key == "arrowleft") {
        PLAYER2_UP = true;
    } else if (key == "arrowdown" || key == "arrowright") {
        PLAYER2_DOWN = true;
    }
});

document.addEventListener("keyup", (e) => {
    const key = e.key.toLowerCase();
    if (key == "w" || key == "a") {
        PLAYER_UP = false;
    } else if (key == "s" || key == "d") {
        PLAYER_DOWN = false;
    } else if (key == "arrowup" || key == "arrowleft") {
        PLAYER2_UP = false;
    } else if (key == "arrowdown" || key == "arrowright") {
        PLAYER2_DOWN = false;
    }
});

window.requestAnimationFrame(update);
