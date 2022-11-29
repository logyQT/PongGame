export class Paddle {
    constructor(ctx, height, width, pos, DIFFICULTY, AI = false) {
        this.ctx = ctx;
        this.game_height = height;
        this.game_width = width;
        this.DIFFICULTY = DIFFICULTY;
        this.AI = AI;
        this.width = this.game_height / 50;
        this.height = this.game_height / 10;
        if (pos == "left") {
            this.x = 10;
        } else if (pos == "right") {
            this.x = this.game_width - this.width - 10;
        }
        this.score = 0;
        this.reset();
    }
    reset() {
        this.AI_SPEED = this.game_width / this.DIFFICULTY.ai_speed;
        this.PLAYER_SPEED = this.game_width / this.DIFFICULTY.player_speed;

        this.y = this.game_height / 2 - this.height / 2;
        this.calculateBoundingBox();
    }
    calculateBoundingBox() {
        this.top = this.y;
        this.bottom = this.y + this.height;
        this.left = this.x;
        this.right = this.x + this.width;
    }
    draw() {
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    update(delta = null, height) {
        if (delta != null) {
            if (this.AI) this.y += this.AI_SPEED * delta * (height - this.y - this.height / 2);
            else this.y += this.PLAYER_SPEED * delta * (height - this.y - this.height / 2);
        } else {
            this.y += height;
        }
        this.calculateBoundingBox();
        this.outOfBounds();
        this.calculateBoundingBox();
    }
    outOfBounds() {
        if (this.top < 0) {
            this.y = 0;
        } else if (this.bottom > this.game_height) {
            this.y = this.game_height - this.height;
        }
    }
}
