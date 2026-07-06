import { roundToDecimalPlaces, truncateToDecimalPlaces } from "./roundToDecimalPlaces";

describe("roundToDecimalPlaces()", () => {
  it("0 decimal places", () => {
    expect(roundToDecimalPlaces(2.12345678, 0)).toBe(2);
  });
  it("1 decimal places", () => {
    expect(roundToDecimalPlaces(2.12345678, 1)).toBe(2.1);
  });
  it("2 decimal places", () => {
    expect(roundToDecimalPlaces(2.12345678, 2)).toBe(2.12);
  });
  it("8 decimal places", () => {
    expect(roundToDecimalPlaces(2.1234567891011, 8)).toBe(2.12345679);
  });
});

describe("truncateToDecimalPlaces()", () => {
  it("0 decimal places", () => {
    expect(truncateToDecimalPlaces(2.12345678, 0)).toBe(2);
  });
  it("1 decimal places", () => {
    expect(truncateToDecimalPlaces(2.12345678, 1)).toBe(2.1);
  });
  it("2 decimal places", () => {
    expect(truncateToDecimalPlaces(2.12345678, 2)).toBe(2.12);
  });
  it("8 decimal places", () => {
    expect(truncateToDecimalPlaces(2.1234567891011, 8)).toBe(2.12345678);
  });
});
