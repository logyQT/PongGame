const INITIAL_VELOCITY = 0.25;
const VELOCITY_INCREASE = 0.0001;
const TWO_PI = Math.PI * 2;
const COMPUTER_MOVE = "computer";
const PLAYER_MOVE = "player";

export class Ball {
    constructor(ctx, height, width) {
        this.ctx = ctx;
        this.game_height = height;
        this.game_width = width;
        this.reset();
    }
    reset() {
        this.move = undefined;
        this.x = this.game_width / 2;
        this.y = this.game_height / 2;
        this.r = this.game_height / 100;
        this.direction = { x: 0, y: 0 };
        while (Math.abs(this.direction.x) <= 0.2 || Math.abs(this.direction.x) >= 0.9) {
            const heading = randomNumberBetween(0, TWO_PI);
            this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
        }
        this.velocity = INITIAL_VELOCITY;
    }
    draw() {
        this.ctx.fillStyle = "white";
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, TWO_PI);
        this.ctx.fill();
    }
    update(delta, player_paddle, computer_paddle) {
        const colides_with_player = checkCollision(this, player_paddle);
        const colides_with_computer = checkCollision(this, computer_paddle);
        this.x += this.velocity * this.direction.x * delta;
        this.y += this.velocity * this.direction.y * delta;
        this.velocity += VELOCITY_INCREASE;
        if (this.y <= 0 + this.r || this.y >= this.game_height - this.r) {
            this.direction.y *= -1;
        }
        if (colides_with_player && this.move != COMPUTER_MOVE) {
            this.direction.x *= -1;
            this.move = COMPUTER_MOVE;
        }
        if (colides_with_computer && this.move != PLAYER_MOVE) {
            this.direction.x *= -1;
            this.move = PLAYER_MOVE;
        }
    }
}

const randomNumberBetween = (min, max) => {
    return Math.random() * (max - min) + min;
};

const checkCollision = (circle, rect) => {
    const closestX = clamp(circle.x, rect.left, rect.right);
    const closestY = clamp(circle.y, rect.top, rect.bottom);
    const distanceX = circle.x - closestX;
    const distanceY = circle.y - closestY;
    const distanceSquared = distanceX * distanceX + distanceY * distanceY;
    return distanceSquared < circle.r * circle.r;
};

const clamp = (value, min, max) => {
    return value < min ? min : value > max ? max : value;
};
