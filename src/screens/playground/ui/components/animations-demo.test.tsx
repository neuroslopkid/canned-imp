// jest.mock("react-native/Libraries/Animated/NativeAnimatedModule");

import { render, fireEvent, act } from "@testing-library/react-native";
import { AnimationsDemo } from "./animations-demo";

describe("Animations", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("has animation demo component", async () => {
    const screen = await render(<AnimationsDemo />);

    const animationWrapper = screen.getByTestId("animation-demo");

    expect(animationWrapper).toBeVisible();
  });

  it("displays animated view with Animated API when triggered animation", async () => {
    const screen = await render(<AnimationsDemo useNativeDriver={false} />);

    const btnFadein = screen.getByTestId("animated-fade-in-trigger");
    const viewFadein = screen.getByTestId("animated-view-fade-in");

    expect(viewFadein).toHaveStyle({ opacity: 0 });

    await fireEvent(btnFadein, "press");

    await act(() => {
      jest.advanceTimersByTime(800);
    });

    expect(viewFadein).toHaveStyle({ opacity: 1 });
  });
});
