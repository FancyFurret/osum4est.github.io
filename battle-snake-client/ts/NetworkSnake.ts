/// <reference path="Snake.ts" />

module BattleSnake {
    export class NetworkSnake extends Snake {

        speed: number;
        size: number;
        head: SnakePart;
        body: Array<SnakePart>;

        constructor(game: Phaser.Game, json: any) {
            this.loadJSON(json);
            super(game, this.speed);
        }

        
    }
}
