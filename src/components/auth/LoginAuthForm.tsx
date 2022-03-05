import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router";
import axios from "axios";
import { getUser, loginUser } from "../../redux/actions/userActions";
import { uiActionTypes } from "../../utils/types/actionTypes/uiActionTypes";
import Button from "../../styles/styledComponents/Buttons/Button";
import TextInputField from "../../utils/formik/TextInputField";
import IconButton from "../../styles/styledComponents/Buttons/IconButton";
import Flash from "../flash/Flash";
import styles from "../../styles/auth/_authForm.module.scss";

const LoginAuthForm: React.FC = () => {
  const loginInitialValues = {
    username: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required().min(1).max(50),
    password: yup.string().required().min(5),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getUser()(dispatch);
  }, [dispatch]);

  const apiUrl =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://eventfinder2-server.herokuapp.com";

  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    const res = await axios.post<{ validData: boolean }>(
      `${apiUrl}/api/user/checkUser`,
      {
        username: values.username,
        password: values.password,
      }
    );
    if (res.data.validData) {
      loginUser(values)(dispatch);
      navigate("/");
      dispatch({
        type: uiActionTypes.SET_FLASH,
        payload: {
          type: "success",
          message: "Successfully logged into your account.",
        },
      });
    } else
      dispatch({
        type: uiActionTypes.SET_FLASH,
        payload: {
          type: "error",
          message: "Incorrect username or password.",
        },
      });
  };
  return (
    <div className="w-100 d-flex justify-center">
      <div className={`w-35 ${styles.authFormContainer}`}>
        <Flash />
        <h1 className="md text-center primary-text">Log in</h1>
        <Formik
          initialValues={loginInitialValues}
          onSubmit={(values, actions) => handleLogin(values)}
          validationSchema={validationSchema}
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
                <Field
                  name="password"
                  component={TextInputField}
                  label="Password"
                  type="password"
                />
                <Button className="bg-primary w-100 xs mt-05" type="submit">
                  <p>Log in</p>
                </Button>
              </Form>
            );
          }}
        </Formik>
        <div className="d-flex flex-column align-center">
          <span className="xs">Don't have an account?</span>
          <IconButton
            className="primary-text xs mt-05"
            onClick={() => {
              navigate("/accounts/tiers", { replace: true });
            }}
          >
            Sign up now!
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default LoginAuthForm;
