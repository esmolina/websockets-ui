import { FIELD_HEIGHT, FIELD_WIDTH } from '../Constants';

export function removeItemFromMapByValue(map: Map<any, any>, targetValue: any) {
  map.forEach((value, key) => {
    if (value === targetValue) {
      map.delete(key);
    }
  });
}

export const buildMap = (): Array<Array<boolean>> => {
  const result: Array<Array<boolean>> = [];

  for (let x = 0; x < FIELD_WIDTH; x++) {
    const line: Array<boolean> = [];
    for (let y = 0; y < FIELD_HEIGHT; y++) {
      line.push(false);
    }
    result.push(line);
  }

  return result;
};
