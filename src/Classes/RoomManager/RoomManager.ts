import { GameRoomInterface, UserID } from '../types';
import { WebSocket } from 'ws';

//Singleton pattern
export class RoomManager {
  private static instance: RoomManager;

  private _rooms: Array<GameRoomInterface> = [];
  private _lastRoomId = 1;

  public static getInstance(): RoomManager {
    if (!RoomManager.instance) {
      RoomManager.instance = new RoomManager();
    }

    return RoomManager.instance;
  }

  public createRoom = (playerId: UserID): GameRoomInterface => {
    const newRoom = {
      id: this._lastRoomId,
      playersId: { player1Id: playerId, player2Id: null },
      gameData: { player1Ships: [], player2Ships: [] },
    };

    this._rooms.push(newRoom);
    this._lastRoomId++;
    return newRoom;
  };

  public getRooms = () => {
    return this._rooms;
  };

  public getSinglePlayerRooms = () => {
    return this._rooms.filter(
      (room: GameRoomInterface) =>
        !!room.playersId.player1Id || !!room.playersId.player2Id,
    );
  };

  public getRoom = (roomId: number) => {};
  public addPlayersToRoom = (roomId: number) => {};
}
