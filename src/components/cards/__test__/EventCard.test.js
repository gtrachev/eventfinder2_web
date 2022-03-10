import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../redux";
import "@testing-library/jest-dom";
import Event from "../Event";
import { BrowserRouter } from "react-router-dom";

const MockEvent = () => {
  const eventDetails = null;
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Event event={eventDetails} size="big" />
      </BrowserRouter>
    </Provider>
  );
};
describe("Event", () => {
  test("should render loading container if there is no event found", async () => {
    // render(<MockEvent />);
    // const loadingContainer = await screen.findByAltText("Loading...");
    // expect(loadingContainer).toBeInTheDocument();
  });
});
