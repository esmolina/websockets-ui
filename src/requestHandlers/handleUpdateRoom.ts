import { WebSocket } from 'ws';
import { UserManager } from '../Classes/UserManager/UserManager';
import { RoomManager } from '../Classes/RoomManager/RoomManager';
import { giveUpdateMessage } from './giveUpdateMessage';

export const handleUpdateRoom = (updateRoomId: number) => {
  const userManager = UserManager.getInstance();
  const roomManager = RoomManager.getInstance();
  const singlePlayerRooms = roomManager.getSinglePlayerRooms();

  if (singlePlayerRooms) {
    singlePlayerRooms.forEach((room) => {
      const singlePlayerId =
        room.playersId.player1Id ?? room.playersId.player2Id;
      if (singlePlayerId) {
        const socket = userManager.getSocket(singlePlayerId);
        const updateMessage = giveUpdateMessage(updateRoomId, singlePlayerId);
        if (socket!.readyState === WebSocket.OPEN) {
          socket!.send(JSON.stringify(updateMessage));
        }
      }
    });
  }
};
