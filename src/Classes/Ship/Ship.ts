import { ShipInterface, SurroundWaterInterface } from '../types';

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

    for (let shortSide = -1; shortSide <= 1; shortSide++) {
      for (let longSide = -1; longSide < size + 1; longSide++) {
        if (shortSide === 0 && longSide >= 0 && longSide < size) {
          continue;
        }
        if (this.isVertical) {
          surroundWaters.push({ x: shipX + shortSide, y: shipY + longSide });
        } else {
          surroundWaters.push({ x: shipX + longSide, y: shipY + shortSide });
        }
      }
    }

    return surroundWaters;
  };
}
