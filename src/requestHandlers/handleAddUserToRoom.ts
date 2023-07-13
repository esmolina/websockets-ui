import { WebSocket } from 'ws';
import { UserManager } from '../Classes/UserManager/UserManager';
import { RoomManager } from '../Classes/RoomManager/RoomManager';
import { handleUpdateRoom } from './handleUpdateRoom';

export const handleAddUserToRoom = (
  requestRoomId: number,
  ws: WebSocket,
): void => {
  const userManager = UserManager.getInstance();
  const roomManager = RoomManager.getInstance();

  const user = userManager.getUserBySocket(ws);
  if (!user) return;

  const userId = user.id;
  roomManager.removeRoom(userId);
  //ToDo remove number from handleUpdate - need sent all rooms
  handleUpdateRoom(0);
  roomManager.addToRoom(userId, requestRoomId);
};
