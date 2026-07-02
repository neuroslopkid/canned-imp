import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { IconButton } from "./icon-button";

const setPressed = jest.fn();

describe("IconButton", () => {
  beforeEach(() => {
    // restoreAllMocks unwraps spies (e.g. useState) so they don't leak
    // into subsequent tests (clearAllMocks is implicit in restoreAllMocks)
    jest.restoreAllMocks();
  });

  it("sets true when pressed in", async () => {
    jest.spyOn(React, "useState").mockImplementation(() => [false, setPressed]);

    const iconButton = await render(<IconButton icon={<></>} />);
    const pressable = iconButton.getByTestId("icon-button-pressable");

    await fireEvent(pressable, "pressIn");

    expect(setPressed).toHaveBeenCalledWith(true);
  });

  it("sets false when pressed out", async () => {
    jest.spyOn(React, "useState").mockImplementation(() => [false, setPressed]);

    const iconButton = await render(<IconButton icon={<></>} />);
    const pressable = iconButton.getByTestId("icon-button-pressable");

    await fireEvent(pressable, "pressOut");

    expect(setPressed).toHaveBeenCalledWith(false);
  });

  it("changes styles when pressed", async () => {
    // fireEvent is async — it wraps the handler in act(). Without await
    // the state update (setPressed(true)) never flushes before assertion.
    const iconButton = await render(<IconButton icon={<></>} />);
    const pressable = iconButton.getByTestId("icon-button-pressable");

    await fireEvent(pressable, "pressIn");
    expect(pressable).toHaveStyle({ opacity: 0.75 });

    await fireEvent(pressable, "pressOut");
    expect(pressable).not.toHaveStyle({ opacity: 0.75 });
  });
});
