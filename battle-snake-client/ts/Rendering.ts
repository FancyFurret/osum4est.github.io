module BattleSnake {
    export class Rendering {

        game: any;
        graphics: Phaser.Graphics;


        init(game: any) {
            this.game = game;
            this.graphics = this.game.add.graphics(0, 0);
            this.game.window = this.graphics;
        }

        clear() {
            this.graphics.clear();
        }

        drawSquare(x: number, y: number, size: number, color: any) {
            this.graphics.beginFill(color);
            this.graphics.drawRect(x, y, size, size);
            this.graphics.endFill();
        }
    }
}
