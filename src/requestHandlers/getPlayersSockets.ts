import { UserManager } from '../Classes/UserManager/UserManager';
import { RoomManager } from '../Classes/RoomManager/RoomManager';
import { WebSocket } from 'ws';

export const getPlayersSockets = (gameId: number) => {
  const userManager = UserManager.getInstance();
  const roomManager = RoomManager.getInstance();
  const players = roomManager.getGamePlayers(gameId);

  const sockets: Array<WebSocket> = [];
  players.forEach((playerId) => {
    const ws = userManager.getSocket(playerId);
    if (!ws) return;
    sockets.push(ws);
  });
  return sockets;
};
