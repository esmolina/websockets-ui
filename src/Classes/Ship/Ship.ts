import { ShipInterface, SurroundWaterInterface } from '../types';
import { FIELD_HEIGHT, FIELD_WIDTH } from '../../Constants';

export class Ship implements ShipInterface {
  size: number;
  isVertical: boolean;
  placement: { x: number; y: number };

  private _countDamaged: number = 0;

  constructor(
    size: number,
    verticalOrientation: boolean,
    positionX: number,
    positionY: number,
  ) {
    this.size = size;
    this.isVertical = verticalOrientation;
    this.placement = {
      x: positionX,
      y: positionY,
    };
  }

  public isPlaced = (): boolean => {
    return this.placement.x !== -1 && this.placement.y !== -1;
  };

  public isAffected = (x: number, y: number): boolean => {
    if (this.isVertical) {
      return (
        x === this.placement.x &&
        y >= this.placement.y &&
        y < this.placement.y + this.size
      );
    } else {
      return (
        y === this.placement.y &&
        x >= this.placement.x &&
        x < this.placement.x + this.size
      );
    }
  };

  public isDead = (): boolean => {
    return this.size === this._countDamaged;
  };

  public increaseDamage = (): void => {
    this._countDamaged++;
  };

  public getSurroundWater = (): Array<SurroundWaterInterface> => {
    const surroundWaters: Array<SurroundWaterInterface> = [];
    const size = this.size;
    const shipX = this.placement.x;
    const shipY = this.placement.y;
    let calculatedX = 0;
    let calculatedY = 0;
    for (let shortSide = -1; shortSide <= 1; shortSide++) {
      for (let longSide = -1; longSide < size + 1; longSide++) {
        if (shortSide === 0 && longSide >= 0 && longSide < size) {
          continue;
        }
        if (this.isVertical) {
          calculatedX = shipX + shortSide;
          calculatedY = shipY + longSide;
        } else {
          calculatedX = shipX + longSide;
          calculatedY = shipY + shortSide;
        }
        if (
          calculatedX < 0 ||
          calculatedX >= FIELD_WIDTH ||
          calculatedY < 0 ||
          calculatedY >= FIELD_HEIGHT
        ) {
          continue;
        }
        surroundWaters.push({ x: calculatedX, y: calculatedY });
      }
    }

    return surroundWaters;
  };
}
