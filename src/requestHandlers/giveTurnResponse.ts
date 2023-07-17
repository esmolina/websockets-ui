import { WebSocket } from 'ws';
import { RoomManager } from '../Classes/RoomManager/RoomManager';
import { UserManager } from '../Classes/UserManager/UserManager';

export const giveTurnResponse = (gameId: number) => {
  const roomManager = RoomManager.getInstance();
  const userManager = UserManager.getInstance();
  const playersIdList = roomManager.getGamePlayers(gameId);
  const roomId = roomManager.getRoomByGameId(gameId);
  if (!roomId) return;
  const turn = roomManager.getTurn(roomId);
  const turnData = {
    currentPlayer: turn,
  };
  const turnMessage = {
    type: 'turn',
    data: JSON.stringify(turnData),
    id: 0,
  };
  playersIdList.forEach((id) => {
    const socket: WebSocket | undefined = userManager.getSocket(id);
    if (!socket) return;
    socket.send(JSON.stringify(turnMessage));
  });
};
