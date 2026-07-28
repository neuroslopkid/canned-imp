import { fireEvent, render, screen } from "@testing-library/react-native";
import {
  AllMatchersDemo,
  arrayForToContain,
  arrayForToContainEqual,
  dateForToBeInstanceOf,
  floatForToBeCloseTo,
  fnForToThrow,
  fnForToThrowError,
  nanForToBeNaN,
  nullForToBeNull,
  numberForToBeGreaterThan,
  numberForToBeGreaterThanOrEqual,
  numberForToBeLessThan,
  numberForToBeLessThanOrEqual,
  objectForToEqual,
  objectForToHaveProperty,
  objectForToMatchObject,
  objectForToStrictEqual,
  stringForToHaveLength,
  stringForToMatch,
  undefinedForToBeUndefined,
  valueForToBe,
  valueForToBeDefined,
  valueForToBeFalsy,
  valueForToBeTruthy,
  valueForToMatchSnapshot,
} from "./all-matchers-demo";

// testID="([^"]*)"
// testID="$1" accessibilityLabel="$1"

describe("AllMatchersDemo", () => {
  // -------------------- PRIMITIVES --------------------

  it("toBe", () => {
    expect(valueForToBe).toBe("exact match");
  });

  it("toBeCloseTo", () => {
    expect(floatForToBeCloseTo).toBeCloseTo(0.3);
  });

  it("toBeDefined", () => {
    expect(valueForToBeDefined).toBeDefined();
  });

  it("toBeFalsy", () => {
    expect(valueForToBeFalsy).toBeFalsy();
  });

  it("toBeGreaterThan", () => {
    expect(numberForToBeGreaterThan).toBeGreaterThan(4);
  });

  it("toBeGreaterThanOrEqual", () => {
    expect(numberForToBeGreaterThanOrEqual).toBeGreaterThanOrEqual(5);
  });

  it("toBeInstanceOf", () => {
    expect(dateForToBeInstanceOf).toBeInstanceOf(Date);
  });

  it("toBeLessThan", () => {
    expect(numberForToBeLessThan).toBeLessThan(4);
  });

  it("toBeLessThanOrEqual", () => {
    expect(numberForToBeLessThanOrEqual).toBeLessThanOrEqual(3);
  });

  it("toBeNaN", () => {
    expect(nanForToBeNaN).toBeNaN();
  });

  it("toBeNull", () => {
    expect(nullForToBeNull).toBeNull();
  });

  it("toBeTruthy", () => {
    expect(valueForToBeTruthy).toBeTruthy();
  });

  it("toBeUndefined", () => {
    expect(undefinedForToBeUndefined).toBeUndefined();
  });

  it("toContain", () => {
    expect(arrayForToContain).toContain(2);
  });

  it("toContainEqual", () => {
    expect(arrayForToContainEqual).toContainEqual({ id: 1 });
  });

  it("toEqual", () => {
    expect(objectForToEqual).toEqual({ a: 1, b: 2 });
  });

  it("toHaveLength", () => {
    expect(stringForToHaveLength).toHaveLength(5);
  });

  it("toHaveProperty", () => {
    expect(objectForToHaveProperty).toHaveProperty("name");
  });

  it("toMatch", () => {
    expect(stringForToMatch).toMatch(/hello/i);
  });

  it("toMatchObject", () => {
    expect(objectForToMatchObject).toMatchObject({ a: 1, b: 2, c: 3 });
  });

  it("toStrictEqual", () => {
    expect(objectForToStrictEqual).toStrictEqual({ a: 1 });
  });

  it("toThrow", () => {
    expect(fnForToThrow).toThrow();
  });

  // -------------------- COMPONENTS --------------------

  it("toBeBusy", async () => {
    const matchersDemo = await render(<AllMatchersDemo />);
    const busyEl = matchersDemo.getByRole("progressbar");

    expect(busyEl).toBeBusy();
  });

  it("toBeChecked", async () => {
    const matchersDemo = await render(<AllMatchersDemo />);
    const checkedEl = matchersDemo.getByTestId("checked-el");

    expect(checkedEl).toBeChecked();
  });

  it("toBeCollapsed", async () => {
    const matchersDemo = await render(<AllMatchersDemo />);
    const collapsedEl = matchersDemo.getByTestId("collapsed-el");

    expect(collapsedEl).toBeCollapsed();
  });

  it("toBeEmptyElement", async () => {
    const matchersDemo = await render(<AllMatchersDemo />);
    const emptyEl = matchersDemo.getByTestId("empty-view");

    expect(emptyEl).toBeEmptyElement();
  });

  it("toBeEnabled", async () => {
    const matchersDemo = await render(<AllMatchersDemo />);
    const enabledEl = matchersDemo.getByTestId("enabled-el");

    expect(enabledEl).toBeEnabled();
  });

  it("toBeExpanded", async () => {
    const matchersDemo = await render(<AllMatchersDemo />);
    const expandedEl = matchersDemo.getByTestId("expanded-el");

    expect(expandedEl).toBeExpanded();
  });

  it("toBeDisabled", async () => {
    const matchersDemo = await render(<AllMatchersDemo />);
    const disabledEl = matchersDemo.getByTestId("disabled-el");

    expect(disabledEl).toBeDisabled();
  });

  it("toBeOnTheScreen", async () => {
    const matchersDemo = await render(<AllMatchersDemo />);
    const visibleEl = matchersDemo.getByText("Visible");

    expect(visibleEl).toBeOnTheScreen();
  });

  it("toBePartiallyChecked", async () => {
    const matchersDemo = await render(<AllMatchersDemo />);
    const partialyCheckedEl = matchersDemo.getByRole("checkbox");

    expect(partialyCheckedEl).toBePartiallyChecked();
  });

  it("toBeSelected", async () => {
    const matchersDemo = await render(<AllMatchersDemo />);
    const selectedEl = matchersDemo.getByRole("tab");

    expect(selectedEl).toBeSelected();
  });

  it("toBeVisible", async () => {
    const matchersDemo = await render(<AllMatchersDemo />);
    const styledEl = matchersDemo.getByTestId("styled-view");

    expect(styledEl).toBeVisible();
  });

  it("toContainElement", async () => {
    const matchersDemo = await render(<AllMatchersDemo />);
    const parentEl = matchersDemo.getByTestId("parent-view");
    const childEl = matchersDemo.getByTestId("child-view");

    expect(parentEl).toContainElement(childEl);
  });

  it("toHaveAccessibilityValue", async () => {
    const matchersDemo = await render(<AllMatchersDemo />);
    const accessibilityValueEl = matchersDemo.getByTestId("acc-value-el");

    expect(accessibilityValueEl).toHaveAccessibilityValue({ min: 0, max: 100, now: 50 });
  });

  it("toHaveAccessibleName", async () => {
    const matchersDemo = await render(<AllMatchersDemo />);
    const accessibilityNameEl = matchersDemo.getByTestId("named-el");

    expect(accessibilityNameEl).toHaveAccessibleName("named-el");
  });

  it("toHaveDisplayValue", async () => {
    const matchersDemo = await render(<AllMatchersDemo />);
    const textInputEl = matchersDemo.getByTestId("text-input");

    expect(textInputEl).toHaveDisplayValue("hello");
  });

  it("toHaveProp", async () => {
    const matchersDemo = await render(<AllMatchersDemo />);
    const textInputEl = matchersDemo.getByTestId("text-input");

    expect(textInputEl).toHaveProp("defaultValue");
  });

  it("toHaveStyle", async () => {
    const matchersDemo = await render(<AllMatchersDemo />);
    const styledEl = matchersDemo.getByTestId("styled-view");

    expect(styledEl).toHaveStyle({ opacity: 0.5 });
  });

  it("toHaveTextContent", async () => {
    const matchersDemo = await render(<AllMatchersDemo />);
    const staticTextEl = matchersDemo.getByTestId("static-text");

    expect(staticTextEl).toHaveTextContent("fixed text");
  });

  // -------------------- SNAPSHOTS --------------------

  it("toMatchSnapshot", () => {
    expect(valueForToMatchSnapshot).toMatchSnapshot({ a: 1, b: 2 });
  });

  // it("toMatchInlineSnapshot", () => {
  //   expect({ x: 1, y: 2 }).toMatchInlineSnapshot();
  //   // After first run, Jest replaces the () with the snapshot string:
  //   // expect({ x: 1, y: 2 }).toMatchInlineSnapshot(`{"x": 1, "y": 2}`);
  // });

  // ── Error inline snapshot ──
  // it("toThrowErrorMatchingInlineSnapshot", () => {
  //   expect(fnForToThrowError).toThrowErrorMatchingInlineSnapshot();
  //   // After first run: toThrowErrorMatchingInlineSnapshot(`"snapshot error"`);
  // });

  // ── Error file snapshot ──
  it("toThrowErrorMatchingSnapshot", () => {
    expect(fnForToThrowError).toThrowErrorMatchingSnapshot();
    // Snapshot saved to __snapshots__/all-matchers-demo.test.tsx.snap
  });

  // -------------------- FUNCTIONS, CALLS --------------------

  it("toHaveBeenCalled", async () => {
    const mockFn = jest.fn();
    const matchersDemo = await render(<AllMatchersDemo onPress={mockFn} />);
    const btn = matchersDemo.getByTestId("mock-action-button");

    await fireEvent(btn, "press");
    expect(mockFn).toHaveBeenCalled();
  });

  it("toHaveBeenCalledTimes", async () => {
    const mockFn = jest.fn();
    const matchersDemo = await render(<AllMatchersDemo onPress={mockFn} />);
    const btn = matchersDemo.getByTestId("mock-action-button");

    await fireEvent(btn, "press");
    await fireEvent(btn, "press");
    await fireEvent(btn, "press");

    expect(mockFn).toHaveBeenCalledTimes(3);
  });

  it("toHaveBeenCalledWith", async () => {
    const mockFn = jest.fn();
    const matchersDemo = await render(<AllMatchersDemo onPress={mockFn} />);
    const btn = matchersDemo.getByTestId("mock-action-button");
    const inpt = matchersDemo.getByTestId("mock-action-input");

    await fireEvent(inpt, "changeText", "asdfgh");
    await fireEvent(btn, "press");

    expect(mockFn).toHaveBeenCalledWith("asdfgh");
  });

  it("toHaveBeenLastCalledWith", () => {
    const mockFn = jest.fn();

    mockFn("first");
    mockFn("second");

    expect(mockFn).toHaveBeenLastCalledWith("second");
  });

  it("toHaveBeenNthCalledWith", () => {
    const mockFn = jest.fn();

    mockFn("first");
    mockFn("second");
    mockFn("third");

    expect(mockFn).toHaveBeenNthCalledWith(2, "second");
  });

  it("toHaveReturned", () => {
    const mockFn = jest.fn(() => "ok");

    mockFn();

    expect(mockFn).toHaveReturned();
  });

  it("toHaveReturnedTimes", () => {
    const mockFn = jest.fn(() => "ok");

    mockFn();
    mockFn();

    expect(mockFn).toHaveReturnedTimes(2);
  });

  it("toHaveReturnedWith", () => {
    const mockFn = jest.fn(() => "ok");

    mockFn();

    expect(mockFn).toHaveReturnedWith("ok");
  });

  it("toHaveLastReturnedWith", () => {
    const mockFn = jest.fn().mockReturnValueOnce("first").mockReturnValueOnce("second");

    mockFn();
    mockFn();

    expect(mockFn).toHaveLastReturnedWith("second");
  });

  it("toHaveNthReturnedWith", () => {
    const mockFn = jest.fn().mockReturnValueOnce("first").mockReturnValueOnce("second").mockReturnValueOnce("third");

    mockFn();
    mockFn();
    mockFn();

    expect(mockFn).toHaveNthReturnedWith(2, "second");
  });
});
