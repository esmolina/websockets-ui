import { AttackResponseDataInterface, ResponseInterface } from './types';
import { UserID } from '../Classes/types';

export const giveAttackResponse = (
  xCoord: number,
  yCoord: number,
  player: UserID,
  attackResult: 'miss' | 'killed' | 'shot',
): ResponseInterface => {
  const coords = {
    x: xCoord,
    y: yCoord,
  };
  const responseData: AttackResponseDataInterface = {
    position: coords,
    currentPlayer: player,
    status: attackResult,
  };
  const attackResponse: ResponseInterface = {
    type: 'attack',
    data: JSON.stringify(responseData),
    id: 0,
  };
  return attackResponse;
};
