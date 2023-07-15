export function removeItemFromMapByValue(map: Map<any, any>, targetValue: any) {
  map.forEach((value, key) => {
    if (value === targetValue) {
      map.delete(key);
    }
  });
}
