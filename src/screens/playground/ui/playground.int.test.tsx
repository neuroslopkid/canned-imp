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

import { render } from "@testing-library/react-native";
import { PlayGroundScreen } from "./playground";

describe("PlayGroundScreen - integration", () => {
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
