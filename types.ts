export interface registrationResponseInterface {
  name: string;
  index: number;
  error: boolean;
  errorText: string;
}

export interface updateRoomResponseInterface {
  roomId: number;
  roomUsers: [
    {
      name: string;
      index: number;
    },
  ];
}
