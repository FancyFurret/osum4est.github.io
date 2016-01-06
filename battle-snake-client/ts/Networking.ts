module BattleSnake {
    export class Networking {

        private static _instance: Networking = new Networking();

        private url: string = "localhost";
        private port: string = "8000";

        socket: SocketIOClient.Socket;

        oppJoin: any;

        static getInstance(): Networking {
            return Networking._instance;
        }

        connect() {
            this.socket = io.connect("https://multiplayertest-8bitforest.rhcloud.com");

            var myself = this;
            this.socket.on('opponentJoin', function(data) {
                console.log("Opponent joined! " + data['size']);
                myself.oppJoin.opponentJoin(data);
            }).on('opponentMove', function(data) {
                console.log("Opponent joined! " + data['size']);
                myself.oppJoin.opponentMove(data);
            });
        }

        move(json: any) {
            this.socket.emit('move', json);
        }


        setOpponentJoin(context: any) {
            this.oppJoin = context;
        }

        join(data: any) {
            this.socket.emit('join', data);
        }
    }
}
