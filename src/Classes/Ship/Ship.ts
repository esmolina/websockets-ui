import { ShipInterface } from '../types';

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
        y <= this.placement.y &&
        y >= this.placement.y - this.size
      );
    } else {
      return (
        y === this.placement.y &&
        x >= this.placement.x &&
        x <= this.placement.x + this.size
      );
    }
  };

  public isDead = (): boolean => {
    return this.size === this._countDamaged;
  };
}
