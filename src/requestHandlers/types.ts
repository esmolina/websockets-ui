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

export interface ResponseInterface {
  type: string;
  data: string;
  id: number;
}
