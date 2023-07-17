import { UserID } from '../Classes/types';

export interface registrationResponseInterface {
  name: string;
  index: number;
  error: boolean;
  errorText: string;
}

export interface UpdateRoomsDataInterface {
  roomId: number;
  roomUsers: [
    {
      name: string;
      index: number;
    },
  ];
}

export interface CreateGameDataInterface {
  roomId: number;
  roomUsers: [
    {
      name: string;
      index: number;
    },
  ];
}

export interface RequestAddShipsDataInterface {
  gameId: number;
  ships: [
    {
      position: {
        x: number;
        y: number;
      };
      direction: boolean;
      length: number;
      type: 'small' | 'medium' | 'large' | 'huge';
    },
  ];
  indexPlayer: UserID;
}

export interface ResponseAddShipsDataInterface {
  position: {
    x: number;
    y: number;
  };
  direction: boolean;
  length: number;
  type: string;
}

export interface AttackRequestDataInterface {
  gameId: number;
  x: number;
  y: number;
  indexPlayer: number;
}

export interface AttackResponseDataInterface {
  position: {
    x: number;
    y: number;
  };
  currentPlayer: UserID;
  status: 'miss' | 'killed' | 'shot';
}

export interface ResponseInterface {
  type: string;
  data: string;
  id: number;
}
