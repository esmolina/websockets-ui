import { GameRoomInterface, ShipInterface } from '../Classes/types';
import { giveShipType } from './helpers';
import { ResponseAddShipsDataInterface } from './types';

export const giveShipsData = (
  room: GameRoomInterface,
  player: string,
): Array<ResponseAddShipsDataInterface> => {
  const shipSet: Array<ResponseAddShipsDataInterface> = [];
  const shipsData: Array<ShipInterface> = room.players[player].ships;
  shipsData.forEach((data) => {
    const ship = {
      position: {
        x: data.placement.x,
        y: data.placement.y,
      },
      direction: data.isVertical,
      length: data.size,
      type: giveShipType(data.size),
    };
    shipSet.push(ship);
  });
  return shipSet;
};
