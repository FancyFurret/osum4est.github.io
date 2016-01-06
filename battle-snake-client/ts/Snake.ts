module BattleSnake {

    export enum Direction {
        NONE,
        LEFT,
        RIGHT,
        UP,
        DOWN
    }

    export class Snake extends GameObject {

        direction: Direction;
        speed: number;
        size: number;

        body: Array<SnakePart>;
        bodyColor: number;
        head: SnakePart;
        headColor: number;

        changedDirection: boolean = true;
        queuedDirection: Direction;

        constructor(game: Phaser.Game, speed: number, initLength: number, size: number, bodyColor: number, headColor: number) {
            super(game);

            this.direction = Direction.RIGHT;
            this.speed = speed;
            this.size = size;

            this.bodyColor = bodyColor;
            this.headColor = headColor;

            this.head = new SnakePart(5 * size, 5 * size, headColor);
            this.body = new Array<SnakePart>();
            for (var i = initLength; i >= 1; i--)
                this.body.push(new SnakePart(this.head.x - size * i, this.head.y, bodyColor));

            Input.registerInput(Phaser.Keyboard.UP, this);
            Input.registerInput(Phaser.Keyboard.DOWN, this);
            Input.registerInput(Phaser.Keyboard.LEFT, this);
            Input.registerInput(Phaser.Keyboard.RIGHT, this);

            this.game.time.events.loop(this.speed, this.move, this);
        }

        recieveInput(key: number) {
            switch (key) {
                case Phaser.Keyboard.UP:
                    this.changeDirection(Direction.UP);
                    break;
                case Phaser.Keyboard.DOWN:
                    this.changeDirection(Direction.DOWN);
                    break;
                case Phaser.Keyboard.LEFT:
                    this.changeDirection(Direction.LEFT);
                    break;
                case Phaser.Keyboard.RIGHT:
                    this.changeDirection(Direction.RIGHT);
                    break;
            }
        }

        changeDirection(direction: Direction) {

            if (!this.changedDirection && this.isDirectionValid(direction, this.direction) && (this.queuedDirection == null || this.queuedDirection == Direction.NONE)) {
                this.queuedDirection = direction;
                return;
            }
            else if (!this.changedDirection || !this.isDirectionValid(direction, this.direction))
                return;

            this.direction = direction;
            this.changedDirection = false;
        }

        isDirectionValid(direction1: Direction, direction2: Direction): boolean {
            if (direction1 == Direction.UP && direction2 == Direction.DOWN ||
                direction1 == Direction.DOWN && direction2 == Direction.UP ||
                direction1 == Direction.LEFT && direction2 == Direction.RIGHT ||
                direction1 == Direction.RIGHT && direction2 == Direction.LEFT)
                return false;
            return true;
        }

        render(rendering: Rendering) {
            rendering.drawSquare(this.head.x, this.head.y, this.size, this.headColor);
            for (var i = 0; i < this.body.length; i++)
                rendering.drawSquare(this.body[i].x, this.body[i].y, this.size, this.bodyColor);
        }

        move() {
            var moveX = 0;
            var moveY = 0;

            if (this.queuedDirection != null && this.queuedDirection != Direction.NONE && this.changedDirection) {
                this.direction = this.queuedDirection;
                this.queuedDirection = Direction.NONE;
            }

            switch (this.direction) {
                case Direction.LEFT:
                    moveX = -1;
                    break;
                case Direction.RIGHT:
                    moveX = 1;
                    break;
                case Direction.UP:
                    moveY = -1;
                    break;
                case Direction.DOWN:
                    moveY = 1;
                    break;
            }

            for (var i = 0; i < this.body.length - 1; i++) {
                this.body[i].x = this.body[i + 1].x;
                this.body[i].y = this.body[i + 1].y;
            }
            this.body[this.body.length - 1].x = this.head.x;
            this.body[this.body.length - 1].y = this.head.y;
            this.head.x += moveX * this.size;
            this.head.y += moveY * this.size;

            this.changedDirection = true;

            Networking.getInstance().move(this.getJSON());
        }

        getJSON() {
            var json: any = {
                speed: this.speed,
                size: this.size,
                head: {
                    x: this.head.x,
                    y: this.head.y,
                    color: this.head.color
                }
            };

            json['body'] = [];
            for ( var i = 0; i < this.body.length; i++) {
                json['body'][i] = {};
                json['body'][i]['x'] = this.body[i].x;
                json['body'][i]['y'] = this.body[i].y;
                json['body'][i]['color'] = this.body[i].color;
            };

            return json;
        }
    }

    class SnakePart {
        x: number;
        y: number;
        color; number;

        constructor(x: number, y: number, color: number) {
            this.x = x;
            this.y = y;
            this.color = color;
        }
    }
}
