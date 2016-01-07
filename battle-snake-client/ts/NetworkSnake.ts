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

        loadJSON(json: any) {
            this.direction = json['direction'];
            this.speed = json['speed'];
            this.size = json['size']

            this.head = new SnakePart(json['head']['x'], json['head']['y'], json['head']['color']);
            this.body = new Array<SnakePart>();
            for (var i: number = 0; i < json['body'].length; i++) {
                this.body.push(new SnakePart(json['body'][i]['x'], json['body'][i]['y'], json['body'][i]['color']))
            }
        }
    }
}
