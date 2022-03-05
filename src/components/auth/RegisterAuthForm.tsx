import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import { CountryDropdown } from "react-country-region-selector";
import { registerValidationSchema } from "../../utils/formik/yupValidationSchemas";
import { registerFormikInitialValuesType } from "../../utils/types/formikInitStateTypes";
import { registerUser } from "../../redux/actions/userActions";
import { uiActionTypes } from "../../utils/types/actionTypes/uiActionTypes";
import { UserTiersTypes } from "../../utils/types/userTiers";
import Button from "../../styles/styledComponents/Buttons/Button";
import TextInputField from "../../utils/formik/TextInputField";
import IconButton from "../../styles/styledComponents/Buttons/IconButton";
import InterestCategories from "../forms/InterestCategories";
import Flash from "../flash/Flash";
import StripeCheckoutForm from "./StripeCheckoutForm";
import styles from "../../styles/auth/_authForm.module.scss";

const registerInitialValues: registerFormikInitialValuesType = {
  username: "",
  password: "",
  email: "",
  age: "",
  country: "",
  city: "",
  interests: [],
};

const stripePromise = loadStripe(
  `${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`
);

const RegisterAuthForm: React.FC = () => {
  const dispatch = useDispatch();
  const search = useLocation().search;
  const [country, setCountry] = useState("");
  const [file, setFile] = useState<any>("");
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutValues, setCheckoutValues] = useState<any>({});

  const apiUrl =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://eventfinder2-server.herokuapp.com";
  const tier = new URLSearchParams(search).get("tier") || "";
  const handleRegister = async (values: registerFormikInitialValuesType) => {
    try {
      const res = await axios.get(
        `${apiUrl}/api/user/checkUsername/${values.username}`
      );
      if (res.data.availableUsername) {
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("folder", "EventFinder_users");
          formData.append("upload_preset", "oes8taaw");
          const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
          );
          registerUser({
            ...values,
            userTier: tier,
            profileImage: {
              path: res.data.url,
              filename: res.data.original_filename,
            },
          })(dispatch);
          navigate("/");
          return;
        }

        registerUser({
          ...values,
          userTier: tier,
        })(dispatch);
        navigate("/");
        dispatch({
          type: uiActionTypes.SET_FLASH,
          payload: {
            type: "success",
            message: `Welcome ${values.username}.`,
          },
        });
      } else {
        window.scrollTo(0, 0);
        dispatch({
          type: uiActionTypes.SET_FLASH,
          payload: { type: "error", message: "Username is not available." },
        });
      }
    } catch (err) {
      window.scrollTo(0, 0);
      dispatch({
        type: uiActionTypes.SET_FLASH,
        payload: { type: "error", message: "Registration failed." },
      });
    }
  };

  return (
    <div className="w-100 d-flex justify-center">
      <div className={`${styles.authFormContainer} w-55`}>
        <Flash />
        <h1 className="md text-center primary-text">Register</h1>
        <Formik
          initialValues={registerInitialValues}
          onSubmit={async (values, actions) => {
            if (tier === UserTiersTypes.free) {
              handleRegister(values);
            } else if (
              tier === UserTiersTypes.creator ||
              tier === UserTiersTypes.standard
            ) {
              const res = await axios.get(
                `${apiUrl}/api/user/checkUsername/${values.username}`
              );
              if (res.data.availableUsername) {
                setCheckoutValues(values);
                setShowCheckout(true);
              } else {
                window.scrollTo(0, 0);
                dispatch({
                  type: uiActionTypes.SET_FLASH,
                  payload: {
                    type: "error",
                    message: "Username is not available.",
                  },
                });
              }
            }
          }}
          validationSchema={registerValidationSchema}
        >
          {(props) => {
            return (
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  props.handleSubmit();
                }}
              >
                <Field
                  name="username"
                  component={TextInputField}
                  label="Username"
                />
                <Field name="email" component={TextInputField} label="Email" />
                <Field
                  name="password"
                  component={TextInputField}
                  label="Password"
                  type="password"
                />
                <Field
                  name="age"
                  type="number"
                  component={TextInputField}
                  label="Age"
                />
                <div className="d-flex flex-column align-start mb-2">
                  <p>Country</p>
                  <CountryDropdown
                    value={country}
                    onChange={(val) => {
                      props.setFieldValue("country", val);
                      setCountry(val);
                    }}
                    classes={`${styles.countryDropdown}
                      ${
                        props.touched["country"] &&
                        props.errors["country"] &&
                        styles.dangerBg
                      }
                    `}
                    priorityOptions={["BG", "US", "GB"]}
                  />
                  {props.touched["country"] && props.errors["country"] && (
                    <span className="danger-text xs d-block">
                      Country is a required field.
                    </span>
                  )}
                </div>
                <Field
                  name="city"
                  component={TextInputField}
                  label="City (optional)"
                />
                <div className="mb-1">
                  <p className="primary-text mb-05">Your interests</p>
                  <div
                    className={`d-flex flex-wrap gap-1 ${
                      styles.interestCategoriesContainer
                    } ${
                      props.touched["interests"] &&
                      props.errors["interests"] &&
                      styles.dangerBg
                    }`}
                  >
                    <InterestCategories name="interests" />
                  </div>
                  {props.touched["interests"] && props.errors["interests"] && (
                    <span className="danger-text xs d-block">
                      You must select between 1 and 10 interests.
                    </span>
                  )}
                </div>
                <div className="d-flex flex-column align-start my-2">
                  <p className="mb-1">Profile image (optional)</p>
                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    id="image"
                    onChange={(e) => {
                      if (e.currentTarget.files !== null) {
                        setFile(e.currentTarget.files[0]);
                      }
                    }}
                    className="imageInput"
                  />
                  <div className="customImageInput">
                    <label htmlFor="image" className={`mb-1 customLabel`}>
                      Choose image
                    </label>
                    <div>
                      <span className="xs secondary-text">{file.name}</span>
                    </div>
                  </div>
                </div>
                {tier === UserTiersTypes.standard ||
                tier === UserTiersTypes.creator ? (
                  <Button className="bg-primary w-100 xs" type="submit">
                    Proceed to checkout
                  </Button>
                ) : (
                  <Button className="bg-primary w-100 xs mt-05" type="submit">
                    Register
                  </Button>
                )}
              </Form>
            );
          }}
        </Formik>
        {showCheckout && (
          <Elements stripe={stripePromise}>
            <StripeCheckoutForm
              tier={tier}
              values={checkoutValues}
              file={file}
            />
          </Elements>
        )}
        <div className="d-flex flex-column align-center">
          <span className="xs">Already have an account?</span>
          <IconButton className="primary-text xs mt-05">Log in now!</IconButton>
        </div>
      </div>
    </div>
  );
};

export default RegisterAuthForm;
