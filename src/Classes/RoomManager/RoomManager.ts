import {
  AttackResult,
  GameRoomInterface,
  GameState,
  ShipInterface,
  SurroundWaterInterface,
  UserID,
} from '../types';
import { RequestAddShipsDataInterface } from '../../requestHandlers/types';
import { Ship } from '../Ship/Ship';
import { removeItemFromMapByValue } from '../helpers';
import { FIELD_HEIGHT, FIELD_WIDTH } from '../../Constants';

const buildMap = (): Array<Array<boolean>> => {
  const result: Array<Array<boolean>> = [];

  for (let x = 0; x < FIELD_WIDTH; x++) {
    const line: Array<boolean> = [];
    for (let y = 0; y < FIELD_HEIGHT; y++) {
      line.push(false);
    }
    result.push(line);
  }

  return result;
};

//Singleton pattern
export class RoomManager {
  private static instance: RoomManager;

  private _rooms: Map<number, GameRoomInterface> = new Map(); // rooms Map ([key: room.id, value: roomData], ...)
  private _usersRooms: Map<UserID, number> = new Map(); // // roomsId Map ([key: user.id, value: room.id], ...)
  private _games: Map<number, number> = new Map(); // // roomsId Map ([key: gameId, value: room.id], ...)
  private _winners: Map<string, number> = new Map(); // winners Map ([key: user.name, value: number of wins], ...)
  private _lastRoomId = 1;
  private _lastGameId = 1;
  private _lastKilledShip: ShipInterface | null = null;

  public static getInstance(): RoomManager {
    if (!RoomManager.instance) {
      RoomManager.instance = new RoomManager();
    }

    return RoomManager.instance;
  }

  public createRoom = (playerId: UserID): void => {
    const newRoom = {
      gameId: this._lastGameId,
      state: GameState.SingleUser,
      turn: 0,
      players: {
        player1: {
          playerId: playerId,
          ships: [],
          shootsMap: buildMap(),
        },
        player2: null,
      },
    };

    this._rooms.set(this._lastRoomId, newRoom);
    this._games.set(this._lastGameId, this._lastRoomId);
    this._usersRooms.set(playerId, this._lastRoomId);
    this._lastRoomId++;
    this._lastGameId++;
  };

  private _getRoomByPlayerId = (
    userId: UserID,
  ): GameRoomInterface | undefined => {
    const roomId = this._getRoomIdByUserId(userId);
    if (roomId) {
      const room = this._rooms.get(roomId);
      return room;
    }
  };

  public getRoomByGameId = (gameId: number): number | undefined => {
    return this._games.get(gameId);
  };

  public getRoomDataByGameId = (
    gameId: number,
  ): GameRoomInterface | undefined => {
    const roomId = this.getRoomByGameId(gameId);
    if (!roomId) return;
    return this._rooms.get(roomId);
  };

  public getSinglePlayerRooms = () => {
    const singlePlayerRooms = new Map(
      [...this._rooms].filter(
        ([roomId, roomData]) =>
          !!roomData.players.player1 || !!roomData.players.player2,
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
      removeItemFromMapByValue(this._rooms, removedRoomId);
    }
  };

  public addToRoom = (userId: UserID, requestRoomId: number) => {
    this._usersRooms.set(userId, requestRoomId);

    const room = this._rooms.get(requestRoomId);

    if (room) {
      room.players.player2 = {
        playerId: userId,
        ships: [],
        shootsMap: buildMap(),
      };
      room.state = GameState.TwoUsers;
    }
  };

  public getGameId = (roomId: number): number | undefined => {
    const room = this._rooms.get(roomId);
    const gameId = room?.gameId;
    return gameId;
  };

  public getGamePlayers = (gameId: number): Array<UserID> => {
    const playersId: Array<UserID> = [];

    for (const room of this._rooms.values()) {
      if (room.gameId === gameId) {
        if (room.players.player1) {
          playersId.push(room.players.player1.playerId);
        }
        if (room.players.player2) {
          playersId.push(room.players.player2.playerId);
        }
      }
    }
    return playersId;
  };

  public updateGameData = (
    shipsData: RequestAddShipsDataInterface,
    userId: UserID,
  ) => {
    const room = this._getRoomByPlayerId(userId);

    if (room) {
      const whichPlayerShips: string =
        userId === room.players.player1?.playerId ? 'player1' : 'player2';
      shipsData.ships.forEach((shipData) => {
        const parsedData = JSON.parse(JSON.stringify(shipData));
        const newShip = new Ship(
          parsedData.length,
          parsedData.direction,
          parsedData.position.x,
          parsedData.position.y,
        );
        room.players[whichPlayerShips].ships.push(newShip);
      });
    }
  };

  public checkBothInPositions = (userId: UserID): boolean => {
    const room = this._getRoomByPlayerId(userId);
    if (!room) {
      throw Error;
    }
    const isBothPlaced =
      !!room.players.player1?.ships.length &&
      !!room.players.player2?.ships.length;

    if (isBothPlaced) {
      room.state = GameState.Game;
    }
    return isBothPlaced;
  };

  public setTurn = (userId: UserID): void => {
    const room = this._getRoomByPlayerId(userId);
    if (!room) {
      throw Error;
    }

    room.turn = userId;
  };

  public getTurn = (roomId: number): UserID | number => {
    const room = this._rooms.get(roomId);
    return room!.turn;
  };

  public checkAttackResult = (
    attackX: number,
    attackY: number,
    gameId: number,
    indexPlayer: UserID,
  ): string | undefined => {
    const room = this.getRoomDataByGameId(gameId);
    if (!room) return;
    const whoseShipsAreAttacked =
      room.players.player1?.playerId === indexPlayer ? 'player2' : 'player1';

    let result = AttackResult.Miss;
    room.players[whoseShipsAreAttacked]?.ships.forEach((ship) => {
      const isHurt = ship.isAffected(attackX, attackY);
      if (isHurt) {
        if (!room.players[whoseShipsAreAttacked]?.shootsMap[attackX][attackY]) {
          ship.increaseDamage();
        }
        if (ship.isDead()) {
          this._lastKilledShip = ship;
          ship.getSurroundWater().forEach((coords) => {
            room.players[whoseShipsAreAttacked]!.shootsMap[coords.x][coords.y] =
              true;
          });

          result = AttackResult.Killed;
        } else {
          result = AttackResult.Shot;
        }
      }
    });

    room.players[whoseShipsAreAttacked]!.shootsMap[attackX][attackY] = true;
    return result;
  };

  public checkIsAllEnemyKilled = (gameId: number, indexPlayer: UserID) => {
    const room = this.getRoomDataByGameId(gameId);
    if (!room) return;
    const whoseShipsAreAttacked =
      room.players.player1?.playerId === indexPlayer ? 'player2' : 'player1';
    return room.players[whoseShipsAreAttacked]?.ships.every((ship) =>
      ship.isDead(),
    );
  };

  public getSurroundWater = (): Array<SurroundWaterInterface> => {
    if (!this._lastKilledShip) return [];

    return this._lastKilledShip.getSurroundWater();
  };

  public getEnemyPlayerId = (
    gameId: number,
    ownId: UserID,
  ): UserID | null | undefined => {
    const room = this.getRoomDataByGameId(gameId);
    if (!room) return;
    const whoIsEnemy =
      room.players.player1?.playerId === ownId
        ? room.players.player2?.playerId
        : room.players.player1?.playerId;
    return whoIsEnemy;
  };

  public mayPlayerShoot = (
    gameId: number,
    playerId: UserID,
  ): boolean | void => {
    const room = this.getRoomDataByGameId(gameId);
    if (!room) return;
    return playerId === room.turn;
  };

  public isAvailableForShoot = (
    playerId: UserID,
    gameId: number,
    x: number,
    y: number,
  ): boolean => {
    const room = this.getRoomDataByGameId(gameId);
    if (!room) return false;
    const whoseShipsAreAttacked =
      room.players.player1?.playerId === playerId ? 'player2' : 'player1';
    return !room.players[whoseShipsAreAttacked]?.shootsMap[x][y];
  };
}
