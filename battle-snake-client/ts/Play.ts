module BattleSnake {
    export class Play extends Phaser.State implements IMultiplayerCallbacks {

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
            this.gameObjects.push(this.snake);
            this.gameObjects.forEach(go => {
                go.create();
            });

            this.networking.join(this.snake.getJSON());
        }

        oppJoined(json: any, id: string) {
            this.oppSnakes[id] = new NetworkSnake(this.game, json);
            console.log("Snake with id: " + id + " has joined.");
            console.log("Size: " + this.oppSnakes[id].size);
        }

        getOpps(json: any) {

        }

        oppUpdate(json: any, id: string) {
            this.oppSnakes[id].loadJSON(json);
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
            // this.oppSnakes.forEach(os => {
            //     console.log("rendering snake");
            //     os.render(this.rendering);
            // })
            // console.log("Opp snake length: " + this.oppSnakes.length);
        }
    }
}
