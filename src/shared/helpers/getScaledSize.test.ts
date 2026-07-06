import { Breakpoints } from "@constants";
import { getScaledSize } from "./getScaledSize";
import * as Helpers from "./getDimensions";

describe("getScaledSize()", () => {
  it("returns number", () => {
    expect(
      getScaledSize(100, {
        width: 240,
        height: 320,
        scale: 1,
        fontScale: 1,
      }),
    ).toEqual(expect.any(Number));
  });

  it("Small Portrait", () => {
    expect(
      getScaledSize(100, {
        width: Breakpoints.Phone,
        height: 320,
        scale: 1,
        fontScale: 1,
      }),
    ).toBe(100);
  });

  it("Mobile Portrait", () => {
    expect(
      getScaledSize(100, {
        width: Breakpoints.Phone + 1,
        height: 500,
        scale: 1,
        fontScale: 1,
      }),
    ).toBe(150);
  });

  it("Tablet Portrait", () => {
    expect(
      getScaledSize(100, {
        width: Breakpoints.Tablet,
        height: 1080,
        scale: 1,
        fontScale: 1,
      }),
    ).toBe(100 * 1.5);
  });

  it("Mobile Album", () => {
    expect(
      getScaledSize(100, {
        width: Breakpoints.Phone,
        height: 240,
        scale: 1,
        fontScale: 1,
      }),
    ).toBe(100);
  });

  it("Tablet Album", () => {
    expect(
      getScaledSize(100, {
        width: Breakpoints.Tablet,
        height: 540,
        scale: 1,
        fontScale: 1,
      }),
    ).toBe(100 * 2);
  });

  it("returns fallback", () => {
    expect(
      getScaledSize(100, {
        width: 9999,
        height: 320,
        scale: 1,
        fontScale: 1,
      }),
    ).toBe(100);
  });

  it("Portrait Large — width exceeds Tablet, falls through to return size", () => {
    expect(
      getScaledSize(100, {
        width: Breakpoints.Tablet + 1,
        height: 1920,
        scale: 1,
        fontScale: 1,
      }),
    ).toBe(100);
  });

  it("unknown orientation — neither portrait nor album, falls through to return size", () => {
    let height, width;
    width = height = 500;

    jest.spyOn(Helpers, "getOrientation").mockReturnValueOnce("unknown" as never);
    expect(
      getScaledSize(100, {
        width,
        height: width,
        scale: 1,
        fontScale: 1,
      }),
    ).toBe(100);
  });

  it("uses current screen when screen argument is omitted", () => {
    jest.spyOn(Helpers, "getDimensions").mockReturnValue({
      width: Breakpoints.Phone + 1,
      height: 800,
      scale: 1,
      fontScale: 1,
    });

    expect(getScaledSize(100)).toBe(150);

    expect(Helpers.getDimensions).toHaveBeenCalledWith("screen");
  });
});
