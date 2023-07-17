import { RequestAddShipsDataInterface } from './types';
import { WebSocket } from 'ws';
import { checkSocketConnection } from './checkSocketConnection';
import { RoomManager } from '../Classes/RoomManager/RoomManager';
import { UserManager } from '../Classes/UserManager/UserManager';
import { giveTurnResponse } from './giveTurnResponse';
import { giveStartGameResponse } from './giveStartGameResponse';

export const handleAddShips = (
  shipsData: RequestAddShipsDataInterface,
  ws: WebSocket,
) => {
  // const isUserOnline = checkSocketConnection(ws);
  // ToDo если не онлайн, завершить игру и признать техническое поражение

  const roomManager = RoomManager.getInstance();
  const userManager = UserManager.getInstance();
  const user = userManager.getUserBySocket(ws);

  if (!user) return;

  roomManager.updateGameData(shipsData, user.id);
  const isBothPlaced = roomManager.checkBothInPositions(user.id);
  if (isBothPlaced) {
    roomManager.setTurn(user.id);
    giveStartGameResponse(shipsData.gameId);
    giveTurnResponse(shipsData.gameId);
  }
};
