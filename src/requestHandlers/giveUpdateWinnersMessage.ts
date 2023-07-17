import { UserManager } from '../Classes/UserManager/UserManager';
import { RoomManager } from '../Classes/RoomManager/RoomManager';
import { wsServer } from '../ws_server/ws_server';
import { WebSocket } from 'ws';

export const giveUpdateWinnersMessage = (): void => {
  const userManager = UserManager.getInstance();
  const roomManager = RoomManager.getInstance();
  const winnersMap = roomManager.giveWinners();
  const winnersTable: Array<{ name: string; wins: number }> = [];

  winnersMap.forEach((winsCount, playerId) => {
    const playerName = userManager.getUserNameById(playerId);
    winnersTable.push({ name: playerName, wins: winsCount });
  });

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
