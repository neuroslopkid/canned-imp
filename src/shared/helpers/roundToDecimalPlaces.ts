export const roundToDecimalPlaces = (value: number, places: number): number => {
  return Math.round(value * 10 ** places) / 10 ** places;
};

export const truncateToDecimalPlaces = (value: number, places: number): number => {
  const factor = 10 ** places;
  return Math.trunc(value * factor) / factor;
};
