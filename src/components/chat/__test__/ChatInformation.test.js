import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../redux";
import "@testing-library/jest-dom";
import ChatInformation from "../ChatInformation";
import { BrowserRouter } from "react-router-dom";

const ChatInformationMock = () => {
  const mockFunction = jest.fn();
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ChatInformation setShowInfo={mockFunction} />
      </BrowserRouter>
    </Provider>
  );
};

describe("ChatInformation", () => {
  test("should render loading container", async () => {
    render(<ChatInformationMock />);
    const loadingContainer = await screen.findByAltText("Loading...");
    expect(loadingContainer).toBeInTheDocument();
  });
});
