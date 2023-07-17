import { getRandom } from './helpers';
import { RoomManager } from '../Classes/RoomManager/RoomManager';
import { handleAttack } from './handleAttack';
import { UserID } from '../Classes/types';
import { FIELD_HEIGHT, FIELD_WIDTH } from '../Constants';

export const handleRandomAttack = (gameId: number, indexPlayer: UserID) => {
  const roomManager = RoomManager.getInstance();

  let randomX: number;
  let randomY: number;

  do {
    randomX = getRandom(FIELD_WIDTH);
    randomY = getRandom(FIELD_HEIGHT);
  } while (
    !roomManager.isAvailableForShoot(indexPlayer, gameId, randomX, randomY)
  );

  handleAttack(randomX, randomY, gameId, indexPlayer);
};
