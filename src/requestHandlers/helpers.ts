export const giveShipType = (size: number): string => {
  if (size === 1) {
    return 'small';
  } else if (size === 2) {
    return 'medium';
  } else if (size === 3) {
    return 'large';
  } else {
    return 'huge';
  }
};
