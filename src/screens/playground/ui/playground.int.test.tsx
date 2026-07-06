jest.mock("react-native-executorch", () => ({
  useLLM: () => ({
    isReady: false,
    isGenerating: false,
    downloadProgress: 0,
    sendMessage: jest.fn(),
    interrupt: jest.fn(),
    messageHistory: [],
  }),
  models: [],
  LLMType: {},
}));

jest.mock("../../../../assets/images/imp.svg", () => {
  const React = require("react");
  const SvgComponent = (props: any) => React.createElement("svg", props, null);
  SvgComponent.displayName = "ImpSvgMock";

  return SvgComponent;
});

import { fireEvent, render, RenderResult } from "@testing-library/react-native";
import { PlayGroundScreen } from "./playground";

describe("PlayGroundScreen - rendering", () => {
  it("renders Text demo", async () => {
    const screen = await render(<PlayGroundScreen />);

    const textDemo = screen.getByText(/must be placed explicitly inside the text tags/i);

    expect(textDemo).toBeTruthy();
  });

  it("renders View demo", async () => {
    const screen = await render(<PlayGroundScreen />);

    const viewDemo = screen.getByText(/from overflowing and it's children must be of a portion of parent/i);

    expect(viewDemo).toBeTruthy();
  });

  it("renders Button demo", async () => {
    const screen = await render(<PlayGroundScreen />);

    const buttonDemo = screen.getByRole("button", { name: /can be wrapped/i });

    expect(buttonDemo).toBeTruthy();
  });

  it("renders TextInput demo", async () => {
    const screen = await render(<PlayGroundScreen />);

    const textInputDemo = screen.getByPlaceholderText("Type here...");

    expect(textInputDemo).toBeTruthy();
  });

  it("renders ScrollView demo", async () => {
    const screen = await render(<PlayGroundScreen />);

    const scrollViewDemo = screen.getByText(/size are defined by it's parrent container/i);

    expect(scrollViewDemo).toBeTruthy();
  });

  it("renders FlatList demo", async () => {
    const screen = await render(<PlayGroundScreen />);

    const flatListDemo = screen.getByText(/exists for an efficient rendering of large collections/i);

    expect(flatListDemo).toBeTruthy();
  });

  it("renders Modal demo", async () => {
    const screen = await render(<PlayGroundScreen />);

    const modalDemo = screen.getByRole("button", { name: /show modal/i });

    expect(modalDemo).toBeTruthy();
  });

  it("renders Image demo", async () => {
    const screen = await render(<PlayGroundScreen />);

    const imageDemo = screen.getByText(/local Image file/i);

    expect(imageDemo).toBeTruthy();
  });
});

const typeTextAndAddNote = async (screen: RenderResult, text: string) => {
  const textInput = screen.getByTestId("note-text-input");
  const addButton = screen.getByTestId("add-text-to-list-button");

  await fireEvent(textInput, "changeText", text);
  await fireEvent(addButton, "press");
};

describe("PlayGroundScreen - notes workflow", () => {
  it("adds a note and shows it in both lists", async () => {
    const screen = await render(<PlayGroundScreen />);

    await typeTextAndAddNote(screen, "First note");

    expect(screen.getAllByTestId("flat-list-with-text-item")).toHaveLength(1);
    expect(screen.getAllByTestId("scroll-view-pressable-text-width-data")).toHaveLength(1);
  });

  it("appends multiple notes in order to both lists", async () => {
    const screen = await render(<PlayGroundScreen />);
    const firstText = "First note";
    const secondText = "Second note";

    await typeTextAndAddNote(screen, firstText);
    await typeTextAndAddNote(screen, secondText);

    const scrollViewItems = screen.getAllByTestId("scroll-view-pressable-text-width-data");
    const flatListItems = screen.getAllByTestId("flat-list-with-text-item");

    expect(scrollViewItems).toHaveLength(2);
    expect(scrollViewItems[0]).toHaveTextContent(/First note/);
    expect(scrollViewItems[1]).toHaveTextContent(/Second note/);

    expect(flatListItems).toHaveLength(2);
    expect(flatListItems[0]).toHaveTextContent(/First note/);
    expect(flatListItems[1]).toHaveTextContent(/Second note/);
  });

  it("clears all notes from both lists", async () => {
    const screen = await render(<PlayGroundScreen />);
    const firstText = "First note";
    const secondText = "Second note";
    const clearButton = screen.getByTestId("clear-list-button");

    await typeTextAndAddNote(screen, firstText);
    await typeTextAndAddNote(screen, secondText);

    await fireEvent(clearButton, "press");

    expect(screen.queryAllByTestId("scroll-view-pressable-text-width-data")).toHaveLength(0);
    expect(screen.queryAllByTestId("flat-list-with-text-item")).toHaveLength(0);
  });
});
