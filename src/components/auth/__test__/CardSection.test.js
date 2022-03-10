import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../redux";
import "@testing-library/jest-dom";
import CardSection from "../CardSection";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { UserTiersTypes } from "../../../utils/types/userTiers";
import { uppercase } from "../../../utils/helpers/uppercase";

const MockCardSection = ({ tier }) => {
  const stripePromise = loadStripe(
    `${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`
  );
  return (
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <CardSection tier={tier} />
      </Elements>
    </Provider>
  );
};

describe("CardSection", () => {
  test("should render standard tier text", async () => {
    render(<MockCardSection tier={UserTiersTypes.standard} />);
    const tierText = await screen.findByText(
      `${uppercase(UserTiersTypes.standard)} account tier`
    );
    expect(tierText).toBeInTheDocument();
  });
  test("should render creator tier text", async () => {
    render(<MockCardSection tier={UserTiersTypes.creator} />);
    const tierText = await screen.findByText(
      `${uppercase(UserTiersTypes.creator)} account tier`
    );
    expect(tierText).toBeInTheDocument();
  });
});
