import { WebSocket } from 'ws';

export type UserID = number;

export interface UserInterface {
  id: UserID;
  name: string;
}

export interface ShipInterface {
  size: number;
  isVertical: boolean;
  placement: { x: number; y: number };
}

export interface GameRoomInterface {
  id: number;
  playersId: { player1Id: UserID | null; player2Id: UserID | null };
  gameData: {
    player1Ships: Array<ShipInterface>;
    player2Ships: Array<ShipInterface>;
  };
}
