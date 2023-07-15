import { GameRoomInterface } from '../Classes/types';
import { RoomManager } from '../Classes/RoomManager/RoomManager';
import { UserManager } from '../Classes/UserManager/UserManager';
import { ResponseInterface } from './types';
import { giveShipsData } from './giveShipsData';

const giveStartMessage = (
  room: GameRoomInterface,
  player: string,
  shipsSetName: string,
): ResponseInterface => {
  const shipSet = giveShipsData(room, player, shipsSetName);

  const startGameData = {
    ships: shipSet,
    currentPlayerIndex: room.playersId[player],
  };
  const startGameMessage = {
    type: 'start_game',
    data: JSON.stringify(startGameData),
    id: 0,
  };
  return startGameMessage;
};

export const giveStartGameResponse = (gameId: number) => {
  const roomManager = RoomManager.getInstance();
  const userManager = UserManager.getInstance();
  const room = roomManager.getRoomDataByGameId(gameId);

  if (!room) return;
  const firstPlayerMessage = giveStartMessage(
    room,
    'player1Id',
    'player1Ships',
  );
  if (!room.playersId.player1Id || !room.playersId.player2Id) return;

  const firstPlayerSocket = userManager.getSocket(room.playersId.player1Id);
  const secondPlayerSocket = userManager.getSocket(room.playersId.player2Id);
  if (!firstPlayerSocket || !secondPlayerSocket) return;
  firstPlayerSocket.send(JSON.stringify(firstPlayerMessage));

  const secondPlayerMessage = giveStartMessage(
    room,
    'player2Id',
    'player2Ships',
  );
  secondPlayerSocket.send(JSON.stringify(secondPlayerMessage));
};
