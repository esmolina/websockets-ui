import { GameRoomInterface, GameState, UserID } from '../types';

//Singleton pattern
export class RoomManager {
  private static instance: RoomManager;

  private _rooms: Map<number, GameRoomInterface> = new Map(); // rooms Map ([key: room.id, value: roomData], ...)
  private _usersRooms: Map<UserID, number> = new Map(); // // roomsId Map ([key: user.id, value: room.id], ...)
  private _winners: Map<string, number> = new Map(); // winners Map ([key: user.name, value: number of wins], ...)
  private _lastRoomId = 1;
  private _lastGameId = 1;

  public static getInstance(): RoomManager {
    if (!RoomManager.instance) {
      RoomManager.instance = new RoomManager();
    }

    return RoomManager.instance;
  }

  public createRoom = (playerId: UserID): GameRoomInterface => {
    const newRoom = {
      playersId: { player1Id: playerId, player2Id: null },
      gameData: {
        gameId: this._lastGameId,
        state: GameState.SingleUser,
        player1Ships: [],
        player2Ships: [],
        turn: 0,
      },
    };

    this._rooms.set(this._lastRoomId, newRoom);
    this._lastRoomId++;
    this._lastGameId++;
    return newRoom;
  };

  public getSinglePlayerRooms = () => {
    const singlePlayerRooms = new Map(
      [...this._rooms].filter(
        ([roomId, roomData]) =>
          !!roomData.playersId.player1Id || !!roomData.playersId.player2Id,
      ),
    );
    return singlePlayerRooms;
  };

  private _getRoomIdByUserId = (userId: UserID): number | undefined => {
    return this._usersRooms.get(userId);
  };

  public removeRoom = (userId: UserID) => {
    const removedRoomId = this._getRoomIdByUserId(userId);
    if (removedRoomId) {
      this._usersRooms.delete(userId);
      this._rooms.delete(removedRoomId);
    }
  };

  public addToRoom = (userId: UserID, requestRoomId: number) => {
    this._usersRooms.set(userId, requestRoomId);

    const room = this._rooms.get(requestRoomId);

    if (room) {
      room.playersId.player2Id = userId;
      room.gameData.state = GameState.TwoUsers;
      this._rooms.set(requestRoomId, room);
    }
  };

  public getGameId = (roomId: number): number | undefined => {
    const room = this._rooms.get(roomId);
    const gameId = room?.gameData.gameId;
    return gameId;
  };

  public getGamePlayers = (gameId: number): Array<UserID> => {
    const playersId: Array<UserID> = [];

    for (const room of this._rooms.values()) {
      if (room.gameData.gameId === gameId) {
        if (room.playersId.player1Id) {
          playersId.push(room.playersId.player1Id);
        }
        if (room.playersId.player2Id) {
          playersId.push(room.playersId.player2Id);
        }
      }
    }
    return playersId;
  };
}
