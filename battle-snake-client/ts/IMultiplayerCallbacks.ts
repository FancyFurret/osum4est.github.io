module BattleSnake {
    export interface IMultiplayerCallbacks {
        oppJoined(json: any, id: string);
        oppUpdate(json: any, id: string);
        oppLeft(id: string);
    }
}
