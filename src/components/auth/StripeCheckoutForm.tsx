import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import CardSection from "./CardSection";
import { registerFormikInitialValuesType } from "../../utils/types/formikInitStateTypes";
import axios from "axios";
import { UserType } from "../../utils/types/modelTypes";
import { getUser } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import { uiActionTypes } from "../../utils/types/actionTypes/uiActionTypes";
import { useNavigate } from "react-router";
import Button from "../../styles/styledComponents/Buttons/Button";

const StripeCheckoutForm: React.FC<{
  tier: string;
  values: registerFormikInitialValuesType;
  file: any;
}> = ({ tier, values, file }) => {
  const stripe = useStripe();
  const [paymentResult, setPaymentResult] = useState<any>();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiUrl =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://eventfinder2-server.herokuapp.com";
  const handleResponse = async (paymentResponse: any) => {
    if (paymentResponse.success && paymentResponse.user) {
      await getUser()(dispatch);
      navigate("/");
      dispatch({
        type: uiActionTypes.SET_FLASH,
        payload: {
          type: "success",
          message: `Welcome ${values.username}.`,
        },
      });
    } else if (paymentResponse.requires_action) {
      // Use Stripe.js to handle the required card action
      const { error: errorAction, paymentIntent } =
        await stripe!.handleCardAction(
          paymentResponse.payment_intent_client_secret
        );

      if (errorAction) {
        dispatch({
          type: uiActionTypes.SET_FLASH,
          payload: { type: "error", message: "Payment failed." },
        });
      } else {
        // The card action has been handled
        stripePaymentMethodHandler(paymentResult);
      }
    } else {
      dispatch({
        type: uiActionTypes.SET_FLASH,
        payload: { type: "error", message: "Payment failed." },
      });
    }
  };
  const stripePaymentMethodHandler = async (result: any) => {
    if (result.error) {
    } else {
      let paymentResponse: any = undefined;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "EventFinder_users");
        formData.append("upload_preset", "oes8taaw");
        const fileRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        );
        const res = await axios.post<{
          user?: UserType;
          success?: string;
          error?: string;
        }>(`${apiUrl}/api/user/register`, {
          ...values,
          userTier: tier,
          profileImage: {
            path: fileRes.data.url,
            filename: fileRes.data.original_filename,
          },
          payment_method_id: result.paymentMethod.id,
        });
        paymentResponse = await res.data;
      } else {
        const res = await axios.post<{
          user?: UserType;
          requires_action?: boolean;
          payment_intent_client_secret?: string;
          success?: string;
          error?: string;
        }>(`${apiUrl}/api/user/register`, {
          ...values,
          userTier: tier,
          payment_method_id: result.paymentMethod.id,
        });
        paymentResponse = await res.data;
      }

      // Handle server response
      if (paymentResponse) {
        handleResponse(paymentResponse);
      }
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)!,
      billing_details: {
        email: values.email,
      },
    });
    setPaymentResult(result);

    stripePaymentMethodHandler(result);
  };

  return (
    <form
      className="w-100 d-flex flex-column align-center gapY-1"
      onSubmit={handleSubmit}
    >
      <CardSection tier={tier} />
      <Button className="w-50 xs" type="submit" disabled={!stripe}>
        Submit Payment
      </Button>
    </form>
  );
};

export default StripeCheckoutForm;
