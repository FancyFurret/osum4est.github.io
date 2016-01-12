module BattleSnake {
    export class Preloader extends Phaser.State {

        preloadBar: Phaser.Sprite;

        preload() {
            this.stage.backgroundColor = 0xF2F2F2;

            //this.preloadBar = this.add.sprite(200, 400, 'preloadBar')
            //this.load.setPreloadSprite(this.preloadBar);

            // this.load.image('titlepage', 'assets/titlepage.jpg');
            // this.load.image('logo', 'assets/logo.png');
            // this.load.audio('music', 'assets/title.mp3', true);
            // this.load.spritesheet('simon', 'assets/simon.png', 58, 96, 5);
            // this.load.image('level1', 'assets/level1.png');

            Input.init(this.game);


        }

        create() {
            var myself = this;
            myself.game.state.start('MainMenu', true, false)
        }
    }
}
