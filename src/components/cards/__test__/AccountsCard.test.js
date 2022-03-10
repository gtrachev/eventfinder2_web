import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../redux";
import "@testing-library/jest-dom";
import AccountsCard from "../AccountsCard";

const MockAccountsCard = () => {
  const accounts = [];
  const title = "Followers";
  const mockFunction = jest.fn();
  return (
    <Provider store={store}>
      <AccountsCard accounts={accounts} title={title} hideCard={mockFunction} />
    </Provider>
  );
};


describe("MockAccountsCard", () => {
  test("should render no accounts error if there are no accounts", async () => {
    render(<MockAccountsCard />);
    const noAccountsError = await screen.findByText("No users found.");
    expect(noAccountsError).toBeInTheDocument();
  });
  test("should render correct title", async () => {
    render(<MockAccountsCard />);
    const accountsCardTitle = await screen.findByText("Followers");
    expect(accountsCardTitle).toBeInTheDocument();
  });
});
