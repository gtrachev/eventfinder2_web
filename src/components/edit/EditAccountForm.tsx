import React, { useEffect, useState } from "react";
import Flash from "../flash/Flash";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Formik, Form, Field } from "formik";
import { CountryDropdown } from "react-country-region-selector";
import { EditUserInputType, UserType } from "../../utils/types/modelTypes";
import { InterestEnum } from "../../utils/types/interestTypes";
import { editUser } from "../../redux/actions/userActions";
import { uiActionTypes } from "../../utils/types/actionTypes/uiActionTypes";
import { editAccountValidationSchema } from "../../utils/formik/yupValidationSchemas";
import Button from "../../styles/styledComponents/Buttons/Button";
import TextInputField from "../../utils/formik/TextInputField";
import InterestCategories from "../forms/InterestCategories";
import styles from "../../styles/auth/_authForm.module.scss";

const EditAccountForm: React.FC<{ currentUser: UserType }> = ({
  currentUser,
}) => {
  const dispatch = useDispatch();
  const [country, setCountry] = useState(currentUser.country);
  const [file, setFile] = useState<any>("");
  const navigate = useNavigate();
  const editAccountInitialValues: {
    age: number;
    country: string;
    city: string;
    interests: InterestEnum[];
  } = {
    age: currentUser.age,
    country: currentUser.country,
    city: currentUser.city,
    interests: currentUser.interests,
  };

  const handleEdit = async (values: {
    age: number;
    country: string;
    city: string;
    interests: InterestEnum[];
  }) => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "oes8taaw");
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        );
        editUser({
          ...values,
          profileImage: {
            path: res.data.url,
            filename: res.data.original_filename,
          },
          userTier: currentUser.userTier,
        })(dispatch);
        navigate(`/account/${currentUser._id}`);
        return;
      }

      const editUserData: EditUserInputType = {
        ...values,
        profileImage: {
          path: currentUser.profileImage.path,
          filename: currentUser.profileImage.filename,
        },
        userTier: currentUser.userTier,
      };

      editUser(editUserData)(dispatch);
      navigate(`/account/${currentUser._id}`);
      dispatch({
        type: uiActionTypes.SET_FLASH,
        payload: {
          type: "success",
          message: "Your account has been successfully edited.",
        },
      });
    } catch {
      dispatch({
        type: uiActionTypes.SET_FLASH,
        payload: {
          type: "error",
          message: "Your account could not be edited.",
        },
      });
    }
  };

  return (
    <div className="w-100 d-flex justify-center">
      <div className={`${styles.authFormContainer} w-55`}>
        <Flash />
        <h1 className="md text-center primary-text">Edit your account</h1>
        <Formik
          initialValues={editAccountInitialValues}
          onSubmit={(values, actions) => {
            handleEdit(values);
          }}
          validationSchema={editAccountValidationSchema}
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
                  name="age"
                  type="number"
                  min={currentUser.age}
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
                    <InterestCategories
                      name="interests"
                      values={props.values["interests"]}
                    />
                  </div>
                  {props.touched["interests"] && props.errors["interests"] && (
                    <span className="danger-text xs d-block">
                      You must select between 1 and 10 interests.
                    </span>
                  )}
                </div>
                <div className="d-flex flex-column align-start my-2">
                  <p className="mb-1">Update profile image</p>
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
                <Button className="bg-primary w-100 xs mt-05" type="submit">
                  <p>Register</p>
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default EditAccountForm;
