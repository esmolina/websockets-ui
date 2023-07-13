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
}

export enum GameState {
  Empty = 'emptyRoom',
  SingleUser = 'singleUser',
  TwoUsers = 'twoUsers',
  Game = 'gamePlay',
  Ended = 'gameEnded',
}

export interface GameRoomInterface {
  playersId: { player1Id: UserID | null; player2Id: UserID | null };
  gameData: {
    gameId: number;
    state: GameState;
    player1Ships: Array<ShipInterface>;
    player2Ships: Array<ShipInterface>;
    turn: number;
  };
}
