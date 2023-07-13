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

export interface ResponseInterface {
  type: string;
  data: string;
  id: number;
}
