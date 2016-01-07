module BattleSnake {
    export interface IMultiplayerCallbacks {
        oppJoined(json: any, id: string);
        getOpps(json: any);
        oppUpdate(json: any, id: string);
        oppLeft(id: string);
    }
}
