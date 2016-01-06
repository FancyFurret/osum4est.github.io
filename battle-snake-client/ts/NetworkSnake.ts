module BattleSnake {
    export class NetworkSnake extends GameObject {

        speed: number;
        size: number;
        head: SnakePart;
        body: Array<SnakePart>;

        constructor(game: Phaser.Game, json: any) {
            super(game);

            console.log(json);

            this.loadJSON(json);
        }

        loadJSON(json: any) {
            this.speed = json['speed'];
            this.size = json['size']

            this.head = new SnakePart(json['head']['x'], json['head']['y'], json['head']['color']);
            this.body = new Array<SnakePart>();
            for (var i: number = 0; i < json['body'].length; i++) {
                this.body.push(new SnakePart(json['body'][i]['x'], json['body'][i]['y'], json['body'][i]['color']))
            }
        }

        render(rendering: Rendering) {
            rendering.drawSquare(this.head.x, this.head.y, this.size, this.head.color);
            for (var i = 0; i < this.body.length; i++)
                rendering.drawSquare(this.body[i].x, this.body[i].y, this.size, this.body[i].color);
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
