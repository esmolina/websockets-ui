import { GameRoomInterface } from '../types';

export class RoomManager {
  private _rooms: Array<GameRoomInterface> = [];
  private static lastRoomId = 0;

  public createRoom = (playerId: number) => {
    const newRoom = {
      id: RoomManager.lastRoomId,
      players: { player1Id: playerId, player2Id: -1 },
      gameData: { player1Ships: [], player2Ships: [] },
    };

    this._rooms.push(newRoom);
    RoomManager.lastRoomId = RoomManager.lastRoomId + 1;
  };
  public getRoom = (roomId: number) => {};
  public addPlayersToRoom = (roomId: number) => {};
}
