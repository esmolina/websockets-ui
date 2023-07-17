import { WebSocket } from 'ws';
import { RoomManager } from '../Classes/RoomManager/RoomManager';
import { handleUpdateRoom } from './handleUpdateRoom';
import { UserManager } from '../Classes/UserManager/UserManager';

export const handleCreateRoom = (ws: WebSocket) => {
  const roomManager = RoomManager.getInstance();
  const userManager = UserManager.getInstance();
  const user = userManager.getUserBySocket(ws);

  roomManager.createRoom(user!.id);
  handleUpdateRoom();
};
