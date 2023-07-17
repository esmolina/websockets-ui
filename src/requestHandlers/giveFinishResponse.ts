import { UserID } from '../Classes/types';
import { ResponseInterface } from './types';

export const giveFinishResponse = (winnerId: UserID): ResponseInterface => {
  const winnerInfo = { winPlayer: winnerId };
  return {
    type: 'finish',
    data: JSON.stringify(winnerInfo),
    id: 0,
  };
};
