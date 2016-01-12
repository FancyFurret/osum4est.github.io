module BattleSnake {
    export interface IMultiplayerCallbacks {
        getGameInfo(json: any);
        oppJoined(json: any, id: string);
        selfUpdate(json: any);
        oppUpdate(json: any, id: string);
        oppLeft(id: string);
        addGameObject(json: any, id: string);
        removeGameObject(id: string);
    }
}
