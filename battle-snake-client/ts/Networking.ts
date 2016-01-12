module BattleSnake {
    export class Networking {

        private static _instance: Networking = new Networking();

        private url: string = "localhost";
        private port: string = "8000";
        private callbacks: IMultiplayerCallbacks;

        socket: SocketIOClient.Socket;

        static getInstance(): Networking {
            return Networking._instance;
        }

        connect() {
            this.socket = io.connect("https://battle-snake-osum4est.c9users.io")
            //this.socket = io.connect("https://multiplayertest-8bitforest.rhcloud.com");
            //this.socket = io.connect(this.url + ":" + this.port);
            console.log("Connected to: " + this.socket.io.uri)

            var myself = this;
            this.socket.on('getGameInfo', function(data) {
                myself.callbacks.getGameInfo(data);
            }).on('oppJoined', function(data, id) {
                console.log("Opponent joined! " + data['size']);
                myself.callbacks.oppJoined(data, id);
            }).on('selfUpdate', function(data) {
                myself.callbacks.selfUpdate(data);
            }).on('oppUpdate', function(data, id) {
                myself.callbacks.oppUpdate(data, id);
            }).on('oppLeft', function(id) {
                myself.callbacks.oppLeft(id);
            }).on('addGameObject', function(data, id) {
                myself.callbacks.addGameObject(data, id);
            }).on('removeGameObject', function(id) {
                myself.callbacks.removeGameObject(id);
            });
        }

        update(json: any) {
            this.socket.emit('update', json);
        }

        join(data: any) {
            this.socket.emit('joined', data);
        }

        input(json: any) {
            this.socket.emit('input', json);
        }

        setMultiplayerCallbacks(callbacks: IMultiplayerCallbacks) {
            this.callbacks = callbacks;
        }
    }
}
