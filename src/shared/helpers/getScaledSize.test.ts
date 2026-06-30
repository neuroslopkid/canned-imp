import { getScaledSize } from "./getScaledSize";

describe("getScaledSize()", () => {
  it("Mobile Portrait", () => {
    expect(
      getScaledSize(100, {
        width: 240,
        height: 320,
        scale: 1,
        fontScale: 1,
      }),
    ).toBe(100);
  });
  it("Tablet Portrait", () => {
    expect(
      getScaledSize(100, {
        width: 540,
        height: 1080,
        scale: 1,
        fontScale: 1,
      }),
    ).toBe(100 * 1.5);
  });
  it("Mobile Album", () => {
    expect(
      getScaledSize(100, {
        width: 320,
        height: 240,
        scale: 1,
        fontScale: 1,
      }),
    ).toBe(100);
  });
  it("Tablet Album", () => {
    expect(
      getScaledSize(100, {
        width: 799,
        height: 540,
        scale: 1,
        fontScale: 1,
      }),
    ).toBe(100 * 2);
  });
});
