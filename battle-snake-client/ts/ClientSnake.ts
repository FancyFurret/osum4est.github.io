/// <reference path="Snake.ts" />

module BattleSnake {
    export class ClientSnake extends Snake {

                changedDirection: boolean = true;
                queuedDirection: Direction;

                constructor(game: Phaser.Game, speed: number, initLength: number, size: number,
                    bodyColor: number, headColor: number) {

                    super(game, speed);

                    this.direction = Direction.RIGHT;
                    this.speed = speed;
                    this.size = size;

                    this.head = new SnakePart(5 * size, 5 * size, headColor);
                    this.body = new Array<SnakePart>();
                    for (var i = initLength; i >= 1; i--)
                        this.body.push(new SnakePart(this.head.x - size * i, this.head.y, bodyColor));

                    Input.registerInput(Phaser.Keyboard.UP, this);
                    Input.registerInput(Phaser.Keyboard.DOWN, this);
                    Input.registerInput(Phaser.Keyboard.LEFT, this);
                    Input.registerInput(Phaser.Keyboard.RIGHT, this);
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
            }
        }
