export const roundToDecimalPlaces = (value: number, places: number): number => {
  return Math.round(value * 10 ** places) / 10 ** places;
};
