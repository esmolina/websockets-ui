import { ShipInterface } from '../types';

class Ship {
  private _data: ShipInterface;
  private _countDamaged: number = 0;

  constructor(size: number, verticalOrientation: boolean) {
    this._data.size = size;
    this._data.isVertical = verticalOrientation;
    this._data.placement.x = -1;
    this._data.placement.y = -1;
  }

  public isPlaced = (): boolean => {
    return this._data.placement.x !== -1 && this._data.placement.y !== -1;
  };
  public isAffected = (x: number, y: number): boolean => {
    if (this._data.isVertical) {
      return (
        x === this._data.placement.x &&
        y <= this._data.placement.y &&
        y >= this._data.placement.y - this._data.size
      );
    } else {
      return (
        y === this._data.placement.y &&
        x >= this._data.placement.x &&
        x <= this._data.placement.x + this._data.size
      );
    }
  };
  public isDead = (): boolean => {
    return this._data.size === this._countDamaged;
  };
}
