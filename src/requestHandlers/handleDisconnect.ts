import { getPlayersSockets } from './getPlayersSockets';
import { checkSocketConnection } from './checkSocketConnection';
import { UserManager } from '../Classes/UserManager/UserManager';
import { RoomManager } from '../Classes/RoomManager/RoomManager';
import { giveFinishResponse } from './giveFinishResponse';
import { handleUpdateRoom } from './handleUpdateRoom';
import { giveNewWinMessage } from './giveNewWinMessage';

export const handleDisconnect = (gameId: number): void => {
  const userManager = UserManager.getInstance();
  const roomManager = RoomManager.getInstance();
  const sockets = getPlayersSockets(gameId);
  const checkResult = checkSocketConnection(sockets);
  if (
    checkResult &&
    checkResult !== 'all socked' &&
    typeof checkResult !== 'string'
  ) {
    const loser = userManager.getUserBySocket(checkResult);
    if (!loser) return;
    const enemy = roomManager.getEnemyPlayerId(gameId, loser.id);
    if (!enemy) return;
    const finishMassage = giveFinishResponse(enemy);
    sockets.forEach((ws) => {
      ws.send(JSON.stringify(finishMassage));
    });
    roomManager.removeRoom(enemy);
    handleUpdateRoom();
    roomManager.updateWins(enemy);
    giveNewWinMessage(enemy);
  }
};
