import { UserManager } from '../Classes/UserManager/UserManager';
import { RoomManager } from '../Classes/RoomManager/RoomManager';
import { wsServer } from '../ws_server/ws_server';
import { WebSocket } from 'ws';
import { UserID } from '../Classes/types';

export const giveNewWinMessage = (playerId: UserID): void => {
  const userManager = UserManager.getInstance();
  const roomManager = RoomManager.getInstance();
  const winnersTable: Array<{ name: string; wins: number }> = [];

  const playerName = userManager.getUserNameById(playerId);
  const winsCount = roomManager.getPlayerWins(playerId);
  if (!winsCount) return;
  winnersTable.push({ name: playerName, wins: winsCount });

  const winnersMessage = {
    type: 'update_winners',
    data: winnersTable,
    id: 0,
  };

  wsServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(winnersMessage));
    }
  });
};
