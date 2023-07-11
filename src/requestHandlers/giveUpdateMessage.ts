import { ResponseInterface, UpdateRoomsDataInterface } from './types';
import { UserManager } from '../Classes/UserManager/UserManager';
import { UserID } from '../Classes/types';

export const giveUpdateMessage = (
  roomId: number,
  singlePlayerId: UserID,
): ResponseInterface => {
  const userManager = UserManager.getInstance();

  const updatedRoomData = {
    roomId: roomId,
    roomUsers: [
      {
        name: userManager.getUserNameById(singlePlayerId),
        index: singlePlayerId,
      },
    ],
  };

  const updateMessage: ResponseInterface = {
    type: 'update_room',
    data: JSON.stringify([updatedRoomData]),
    id: 0,
  };
  return updateMessage;
};
