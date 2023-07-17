import { GameRoomInterface } from '../Classes/types';
import { RoomManager } from '../Classes/RoomManager/RoomManager';
import { UserManager } from '../Classes/UserManager/UserManager';
import { ResponseInterface } from './types';
import { giveShipsData } from './giveShipsData';

const giveStartMessage = (
  room: GameRoomInterface,
  player: string,
): ResponseInterface => {
  const shipSet = giveShipsData(room, player);

  const startGameData = {
    ships: shipSet,
    currentPlayerIndex: room.players[player].playerId,
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
  const firstPlayerMessage = giveStartMessage(room, 'player1');
  if (!room.players.player1?.playerId || !room.players.player2?.playerId)
    return;

  const firstPlayerSocket = userManager.getSocket(
    room.players.player1.playerId,
  );
  const secondPlayerSocket = userManager.getSocket(
    room.players.player2.playerId,
  );
  if (!firstPlayerSocket || !secondPlayerSocket) return;
  firstPlayerSocket.send(JSON.stringify(firstPlayerMessage));

  const secondPlayerMessage = giveStartMessage(room, 'player2');
  secondPlayerSocket.send(JSON.stringify(secondPlayerMessage));
};
