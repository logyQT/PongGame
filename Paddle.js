const AI_SPEED = 0.01;

export class Paddle {
    constructor(ctx, height, width, AI = false) {
        this.ctx = ctx;
        this.game_height = height;
        this.game_width = width;
        this.width = this.game_height / 50;
        this.height = this.game_height / 10;
        this.x = AI ? this.game_width - this.width - 10 : 10;
        this.y = this.game_height / 2;

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
    update(mouse_event) {
        this.y = mouse_event.clientY;
        this.top = this.y;
        this.bottom = this.y + this.height;
        this.left = this.x;
        this.right = this.x + this.width;
    }
    AI(delta, ball) {
        this.calculateBoundingBox();
        this.y += AI_SPEED * delta * (ball.y - this.y - this.height / 2);
        console.log(this.y);
    }
}
