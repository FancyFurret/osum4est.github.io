module BattleSnake {
    export class Play extends Phaser.State implements IMultiplayerCallbacks {

        static boardSize: number;
        static boardWidth: number;
        static boardHeight: number;

        gameObjects: Array<GameObject>;

        snake: ClientSnake;
        oppSnakes: { [index: string]: NetworkSnake; } = {};

        rendering; Rendering;
        networking: Networking;

        create() {
            this.stage.backgroundColor = 0xF2F2F2;
            this.stage.disableVisibilityChange = true;

            this.rendering = new Rendering();
            this.rendering.init(this.game);
            this.networking = Networking.getInstance();
            this.networking.setMultiplayerCallbacks(this);

            this.startGame();
        }

        startGame() {
            this.snake = new ClientSnake(
                this.game,
                50,
                5,
                25,
                Number("0x" + (Math.random() * 0xFFFFFF << 0).toString(16)),
                0xFF0000
            );

            this.gameObjects = new Array<GameObject>();
            this.registerGameObject(this.snake);
            this.gameObjects.forEach(go => {
                go.create();
            });

            Play.boardSize = 25;
            Play.boardWidth = 25;
            Play.boardHeight = 25;
            this.makeBoard(Play.boardSize, Play.boardWidth, Play.boardHeight, 0x0000FF);

            this.networking.join(this.snake.getJSON());
        }

        oppJoined(json: any, id: string) {
            this.oppSnakes[id] = new NetworkSnake(this.game, json);
            console.log("Snake with id: " + id + " has joined.");
            console.log("Size: " + this.oppSnakes[id].size);
        }

        oppUpdate(json: any, id: string) {
            this.oppSnakes[id].loadJSON(json);
            this.oppSnakes[id].move();
        }

        oppLeft(id: string) {
            delete this.oppSnakes[id];
        }

        update() {
            this.gameObjects.forEach(go => {
                go.update();
            });
        }

        render() {
            this.rendering.clear();
            this.gameObjects.forEach(go => {
                go.render(this.rendering);
            });
            for (var key in this.oppSnakes) {
                this.oppSnakes[key].render(this.rendering);
            }
        }

        makeBoard(tileSize: number, width: number, height: number, color: number) {
            for (var i = 0; i < width; i++) {
                this.registerGameObject(new ObjectWall(this.game, tileSize, color, i * tileSize, 0));
                this.registerGameObject(new ObjectWall(this.game, tileSize, color, i * tileSize, (height - 1) * tileSize));
            }
            for(var i = 0; i < height; i++) {
                this.registerGameObject(new ObjectWall(this.game, tileSize, color, 0, i * tileSize));
                this.registerGameObject(new ObjectWall(this.game, tileSize, color, (width - 1) * tileSize, i * tileSize));
            }
        }

        registerGameObject(gameObject: GameObject) {
            this.gameObjects.push(gameObject);
        }
    }
}
