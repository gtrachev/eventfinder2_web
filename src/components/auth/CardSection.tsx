import React from "react";
import { CardElement } from "@stripe/react-stripe-js";
import { uppercase } from "../../utils/helpers/uppercase";
import { UserTiersTypes } from "../../utils/types/userTiers";

const CardSection: React.FC<{ tier: string }> = ({ tier }) => {
  return (
    <div className="w-100 d-flex flex-column align-start">
      <a href="https://stripe.com/">
        <h2 className="md secondary-text mb-1">Pay with Stripe</h2>
      </a>
      <p className="s primary-text mb-1">
        Purchase:{" "}
        <span className="secondary-text">{uppercase(tier)} account tier</span>
      </p>
      <p className="mb-1 s primary-text">
        Total:
        <span className="secondary-text">
          {tier === UserTiersTypes.standard ? " 20.00$" : " 50.00$"}
        </span>
      </p>
      <label className="w-100">
        <span>Card details</span>
        <CardElement className="mb-1 mt-2" />
      </label>
    </div>
  );
};
export default CardSection;
