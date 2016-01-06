module BattleSnake {
    export class Boot extends Phaser.State {

        preload() {
            this.load.image('preloadBar', 'assets/load.png');
        }

        create() {
            this.stage.backgroundColor = 0xF2F2F2;

            this.game.state.start('Preloader', true, false);

            this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.refresh();
        }
    }
}
