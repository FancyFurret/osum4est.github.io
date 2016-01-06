module BattleSnake {
    export class Play extends Phaser.State {

        gameObjects: Array<GameObject>;

        snake: Snake;
        opponentSnakes: Array<NetworkSnake>;

        rendering; Rendering;
        networking: Networking;

        create() {
            this.stage.backgroundColor = 0xF2F2F2;
            this.stage.disableVisibilityChange = true;

            this.rendering = new Rendering();
            this.rendering.init(this.game);
            this.networking = Networking.getInstance();
            this.networking.setOpponentJoin(this);

            this.startGame();
        }

        startGame() {
            this.snake = new Snake(
                this.game,
                50,
                5,
                25,
                Number("0x" + (Math.random() * 0xFFFFFF << 0).toString(16)),
                0xFF0000
            );

            this.opponentSnakes = new Array<NetworkSnake>();

            this.gameObjects = new Array<GameObject>();
            this.gameObjects.push(this.snake);
            this.gameObjects.forEach(go => {
                go.create();
            });

            this.networking.join(this.snake.getJSON());
        }

        opponentJoin(json: any) {
            console.log(json);
            this.gameObjects.push(new NetworkSnake(this.game, json));
        }

        opponentMove(json: any) {
            console.log(json);
            (<NetworkSnake>this.gameObjects[1]).loadJSON(json);
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
        }
    }
}
