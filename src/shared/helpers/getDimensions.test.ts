jest.mock("react-native", () => ({
  Dimensions: {
    get: jest.fn(),
  },
}));

import { Dimensions } from "react-native";
import { getDimensions } from "./getDimensions";

describe("getDimensions", () => {
  it("returns screen dimensions by default", () => {
    (Dimensions.get as jest.Mock).mockReturnValue({ width: 100, height: 200 });

    const result = getDimensions();

    expect(Dimensions.get).toHaveBeenCalledWith("screen");
    expect(result).toEqual({ width: 100, height: 200 });
  });
});
