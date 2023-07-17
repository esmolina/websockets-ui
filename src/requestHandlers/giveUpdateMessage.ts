import { ResponseInterface, UpdateRoomsDataInterface } from './types';
import { UserManager } from '../Classes/UserManager/UserManager';
import { UpdateRoomInterface, UserID } from '../Classes/types';
import { RoomManager } from '../Classes/RoomManager/RoomManager';

export const giveUpdateMessage = (): ResponseInterface => {
  const userManager = UserManager.getInstance();
  const roomManager = RoomManager.getInstance();
  const singlePlayerRooms = roomManager.getSinglePlayerRooms();

  const singleRoomsList: Array<UpdateRoomInterface> = [];

  singlePlayerRooms.forEach((room, roomId) => {
    const singlePlayerIndex =
      room.players.player1?.playerId ?? room.players.player2?.playerId;
    if (singlePlayerIndex) {
      const updatedRoomData: UpdateRoomInterface = {
        roomId: roomId,
        roomUsers: [
          {
            name: userManager.getUserNameById(singlePlayerIndex),
            index: singlePlayerIndex,
          },
        ],
      };
      singleRoomsList.push(updatedRoomData);
    }
  });

  const updateMessage: ResponseInterface = {
    type: 'update_room',
    data: JSON.stringify(singleRoomsList),
    id: 0,
  };
  return updateMessage;
};
