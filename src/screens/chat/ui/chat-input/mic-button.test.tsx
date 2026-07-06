jest.mock("@context/dimensions.provider", () => ({
  useDimensions: () => ({
    width: 400,
    height: 800,
  }),
}));

import { render } from "@testing-library/react-native";
import { MicButton } from "./mic-button";

const onPress = jest.fn();

describe("MicButton", () => {
  it("is visible when not disabled", async () => {
    const btn = await render(<MicButton disabled={false} onPress={onPress} />);

    const icon = btn.getByTestId("mic-icon");

    expect(icon).toBeOnTheScreen();
  });
});
