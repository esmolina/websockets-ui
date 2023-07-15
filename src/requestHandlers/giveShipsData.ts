import { GameRoomInterface, ShipInterface } from '../Classes/types';
import { giveShipType } from './helpers';

export const giveShipsData = (
  room: GameRoomInterface,
  player: string,
  shipsSetName: string,
): Array<string> => {
  const shipSet: Array<string> = [];
  const shipsData: Array<ShipInterface> = room.gameData[shipsSetName];
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
    shipSet.push(JSON.stringify(ship));
  });
  return shipSet;
};
