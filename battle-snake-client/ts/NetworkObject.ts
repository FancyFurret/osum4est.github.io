/// <reference path="./GameObject.ts"/>

module BattleSnake {
    export class NetworkObject extends BasicGameObject {

        id: string;

        constructor(json: any, id: string) {
            super(json['size'], json['color'], json['x'], json['y']);
            this.id = id;
        }

        loadJSON(json: any) {
            this.size = json['size'];
            this.color = json['color'];
            this.x = json['x'];
            this.y = json['y'];
        }

        getJSON(): any {
            return {
                size: this.size,
                color: this.size,
                x: this.x,
                y: this.y
            };
        }
    }
}
