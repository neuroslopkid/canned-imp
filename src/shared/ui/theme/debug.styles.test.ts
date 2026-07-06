import { setDebugStyles } from "./debug.styles";
import { Colors } from "./colors";

describe("setDebugStyles", () => {
  it("activates debugging styles when provided activate flag", () => {
    expect(setDebugStyles({ activate: true })).toEqual({
      borderWidth: 1,
      borderStyle: "dashed",
      borderColor: Colors.Debug,
    });
  });

  it("returns empty object when activate flag is false", () => {
    expect(setDebugStyles({ activate: false })).toEqual({});
  });

  it("returns empty object by default", () => {
    expect(setDebugStyles()).toEqual({});
  });
});
