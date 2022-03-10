import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../redux";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import ChatMessage from "../ChatMessage";

const ChatMessageMock = (isAuthor) => {
  const mockMessage = {
    _id: "1",
    text: "text",
    author: {
      _id: "authorid",
      profileImage: {
        path: "",
        filename: "",
      },
      createdAt: new Date(),
    },
  };
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ChatMessage chatMessage={mockMessage} isAuthor={isAuthor} />
      </BrowserRouter>
    </Provider>
  );
};

describe("ChatMessage", () => {
  test("should render author message", async () => {
    render(<ChatMessageMock isAuthor={true} />);
    const message = await screen.findByTestId(`messageAuthor1`);
    expect(message).toBeInTheDocument();
  });
  test("should render not author message", async () => {
    render(<ChatMessageMock isAuthor={false} />);
    const message = await screen.findByTestId(`messageAuthor1`);
    expect(message).toBeInTheDocument();
  });
});
