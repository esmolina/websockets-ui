import { AttackRequestDataInterface } from './types';
import { WebSocket } from 'ws';
import { RoomManager } from '../Classes/RoomManager/RoomManager';
import { AttackResult, UserID } from '../Classes/types';
import { giveTurnResponse } from './giveTurnResponse';
import { getPlayersSockets } from './getPlayersSockets';
import { giveAttackResponse } from './giveAttackResponse';
import { giveFinishResponse } from './giveFinishResponse';
import { handleUpdateRoom } from './handleUpdateRoom';
import { giveUpdateWinnersMessage } from './giveUpdateWinnersMessage';
import { giveNewWinMessage } from './giveNewWinMessage';
import { handleDisconnect } from './handleDisconnect';

export const handleAttack = (
  x: number,
  y: number,
  gameId: number,
  indexPlayer: UserID,
) => {
  const roomManager = RoomManager.getInstance();

  setTimeout(handleDisconnect, 25000);

  const sockets = getPlayersSockets(gameId);
  const isPlayerCanShoot = roomManager.mayPlayerShoot(gameId, indexPlayer);
  if (!isPlayerCanShoot) return;

  const attackResult = roomManager.checkAttackResult(x, y, gameId, indexPlayer);
  switch (attackResult) {
    case AttackResult.Miss:
      const enemyId = roomManager.getEnemyPlayerId(gameId, indexPlayer);
      if (!enemyId) return;
      roomManager.setTurn(enemyId);
      const attackMissMessage = giveAttackResponse(
        x,
        y,
        indexPlayer,
        AttackResult.Miss,
      );
      sockets.forEach((ws) => {
        ws.send(JSON.stringify(attackMissMessage));
      });
      giveTurnResponse(gameId);
      break;
    case AttackResult.Shot:
      roomManager.setTurn(indexPlayer);
      const attackShotMessage = giveAttackResponse(
        x,
        y,
        indexPlayer,
        AttackResult.Shot,
      );
      sockets.forEach((ws) => {
        ws.send(JSON.stringify(attackShotMessage));
      });
      giveTurnResponse(gameId);
      break;
    case AttackResult.Killed:
      const attackKillMessage = giveAttackResponse(
        x,
        y,
        indexPlayer,
        AttackResult.Killed,
      );
      sockets.forEach((ws) => {
        ws.send(JSON.stringify(attackKillMessage));
      });
      const surroundWatersOfDeadShip = roomManager.getSurroundWater();
      surroundWatersOfDeadShip.forEach((waterCoords) => {
        const waterKillMessage = giveAttackResponse(
          waterCoords.x,
          waterCoords.y,
          indexPlayer,
          AttackResult.Miss,
        );
        sockets.forEach((ws) => {
          ws.send(JSON.stringify(waterKillMessage));
        });
      });
      giveTurnResponse(gameId);
      const isAllEnemyKilled = roomManager.checkIsAllEnemyKilled(
        gameId,
        indexPlayer,
      );
      if (isAllEnemyKilled) {
        const finishMassage = giveFinishResponse(indexPlayer);
        sockets.forEach((ws) => {
          ws.send(JSON.stringify(finishMassage));
        });
        roomManager.removeRoom(indexPlayer);
        handleUpdateRoom();
        roomManager.updateWins(indexPlayer);
        giveUpdateWinnersMessage();
      }
      break;
    default:
      break;
  }
};
