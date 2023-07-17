export type UserID = number;

export interface UserInterface {
  id: UserID;
  name: string;
}

export interface ShipInterface {
  size: number;
  isVertical: boolean;
  placement: { x: number; y: number };

  isPlaced(): boolean;
  isAffected(x: number, y: number): boolean;
  isDead(): boolean;
  increaseDamage(): void;
  getSurroundWater(): Array<SurroundWaterInterface>;
}

export enum GameState {
  Empty = 'emptyRoom',
  SingleUser = 'singleUser',
  TwoUsers = 'twoUsers',
  Game = 'gamePlay',
  Ended = 'gameEnded',
}

export enum AttackResult {
  Killed = 'killed',
  Shot = 'shot',
  Miss = 'miss',
}

export interface PlayerRoomData {
  playerId: UserID;
  ships: Array<ShipInterface>;
  shootsMap: Array<Array<boolean>>;
}

export interface GameRoomInterface {
  gameId: number;
  state: GameState;
  turn: number;

  players: {
    player1: PlayerRoomData | null;
    player2: PlayerRoomData | null;
    [key: string]: any;
  };
}

// export interface GameRoomInterface {
//   playersId: {
//     player1Id: UserID | null;
//     player2Id: UserID | null;
//     [key: string]: any;
//   };
//   gameData: {
//     gameId: number;
//     state: GameState;
//     player1Ships: Array<ShipInterface>;
//     player2Ships: Array<ShipInterface>;
//     turn: number;
//     [key: string]: any;
//   };
//   player1ShootsMap: Array<Array<boolean>>;
//   player2ShootsMap: Array<Array<boolean>>;
// }

export interface UpdateRoomInterface {
  roomId: number;
  roomUsers: [
    {
      name: string;
      index: UserID;
    },
  ];
}

export interface SurroundWaterInterface {
  x: number;
  y: number;
}
