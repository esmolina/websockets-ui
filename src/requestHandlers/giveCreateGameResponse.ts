import { RoomManager } from '../Classes/RoomManager/RoomManager';
import { UserManager } from '../Classes/UserManager/UserManager';
import { ResponseInterface } from './types';

const createGameData = (
  gameID: number,
  opponentId: number,
): ResponseInterface => {
  const opponentData = {
    idGame: gameID,
    idPlayer: opponentId,
  };
  const createGameResponse: ResponseInterface = {
    type: 'create_game',
    data: JSON.stringify(opponentData),
    id: 0,
  };
  return createGameResponse;
};

export const giveCreateGameResponse = (requestRoomId: number) => {
  const roomManager = RoomManager.getInstance();
  const userManager = UserManager.getInstance();

  const gameId = roomManager.getGameId(requestRoomId);
  if (!gameId) return;
  const players = roomManager.getGamePlayers(gameId);
  if (players.length !== 2) return;

  const player1ID = players[0];
  const player2ID = players[1];

  const player1WS = userManager.getSocket(player1ID);
  const player2WS = userManager.getSocket(player2ID);

  if (!player1WS || !player2WS) return;
  player1WS.send(JSON.stringify(createGameData(gameId, player2ID)));
  player2WS.send(JSON.stringify(createGameData(gameId, player1ID)));
};
