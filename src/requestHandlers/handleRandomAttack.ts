import { getRandom } from './helpers';
import { RoomManager } from '../Classes/RoomManager/RoomManager';
import { handleAttack } from './handleAttack';
import { UserID } from '../Classes/types';

export const handleRandomAttack = (gameId: number, indexPlayer: UserID) => {
  const roomManager = RoomManager.getInstance();

  let randomX: number;
  let randomY: number;

  do {
    randomX = getRandom(10);
    randomY = getRandom(10);
  } while (
    !roomManager.isAvailableForShoot(indexPlayer, gameId, randomX, randomY)
  );

  handleAttack(randomX, randomY, gameId, indexPlayer);
};
