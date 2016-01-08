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
            if (json['direction'] != null)
                this.direction = json['direction'];
            if (json['speed'] != null)
                this.speed = json['speed'];
            if (json['size'] != null)
                this.size = json['size']

            if (json['head'] != null)
                this.head = new SnakePart(json['head']['x'], json['head']['y'], json['head']['color']);

            if (json['body'] != null) {
                this.body = new Array<SnakePart>();
                for (var i: number = 0; i < json['body'].length; i++) {
                    this.body.push(new SnakePart(json['body'][i]['x'], json['body'][i]['y'], json['body'][i]['color']))
                }
            }
        }
    }
}
