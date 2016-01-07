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
            this.socket = io.connect("https://multiplayertest-8bitforest.rhcloud.com");
            //this.socket = io.connect(this.url + ":" + this.port);
            console.log("Connected to: " + this.socket.io.uri)

            var myself = this;
            this.socket.on('oppJoined', function(data, id) {
                console.log("Opponent joined! " + data['size']);
                myself.callbacks.oppJoined(data, id);
            }).on('getOpps', function(data) {
                myself.callbacks.getOpps(data);
            }).on('oppUpdate', function(data, id) {
                myself.callbacks.oppUpdate(data, id);
            }).on('oppLeft', function(id) {
                myself.callbacks.oppLeft(id);
            });
        }

        update(json: any) {
            this.socket.emit('update', json);
        }

        join(data: any) {
            this.socket.emit('joined', data);
        }

        setMultiplayerCallbacks(callbacks: IMultiplayerCallbacks) {
            this.callbacks = callbacks;
        }
    }
}
