import { Formik, Form, Field } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { CountryDropdown } from "react-country-region-selector";
import { useNavigate } from "react-router";
import { RootState } from "../../redux/rootReducer";
import { UserTiersTypes } from "../../utils/types/userTiers";
import { differenceOfDates } from "../../utils/helpers/compareDates";
import { createValidationSchema } from "../../utils/formik/yupValidationSchemas";
import { eventFormikInitialValuesType } from "../../utils/types/formikInitStateTypes";
import { uiActionTypes } from "../../utils/types/actionTypes/uiActionTypes";
import { createEvent } from "../../redux/actions/eventsActions";
import EventForm from "../../styles/styledComponents/Forms/EventForm";
import RadioInputField from "../../utils/formik/RadioInputField";
import TextAreaInputField from "../../utils/formik/TextAreaInputField";
import TextInputField from "../../utils/formik/TextInputField";
import Button from "../../styles/styledComponents/Buttons/Button";
import InterestCategories from "../../components/forms/InterestCategories";
import Flash from "../flash/Flash";
import IconButton from "../../styles/styledComponents/Buttons/IconButton";
import styles from "../../styles/create/_eventForm.module.scss";

const AnyReactComponent = ({ text }: { text: string }) => <div>{text}</div>;

const CreateForm: React.FC = () => {
  const [files, setFiles] = useState<any>([]);
  const [filesErr, setFilesErr] = useState(false);
  const [country, setCountry] = useState("");
  const [countryErr, setCountryErr] = useState(false);
  const userSlice = useSelector((state: RootState) => state.users);
  const initialValues: eventFormikInitialValuesType = {
    name: "",
    price: 0,
    description: "",
    country: "",
    city: "",
    address: "",
    date: "",
    time: "",
    interestCategories: [],
    ageGroup: "",
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values: eventFormikInitialValuesType) => {
    try {
      const images: any = await Promise.all(
        files.map(async (file: File) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("folder", "EventFinder_events");
          formData.append("upload_preset", "oes8taaw");
          const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
          );
          const imageData = res.data;
          return { path: imageData.url, filename: imageData.original_filename };
        })
      );
      createEvent({ ...values, images })(dispatch);
      navigate(`/`);
      dispatch({
        type: uiActionTypes.SET_FLASH,
        payload: { type: "success", message: "Successfully created event." },
      });
    } catch (err) {
      dispatch({
        type: uiActionTypes.SET_FLASH,
        payload: {
          type: "error",
          message: "There was a problem creating the event.",
        },
      });
    }
  };

  const canCreate = () => {
    if (!userSlice.currentUser.lastPosted) {
      return true;
    }
    if (userSlice.currentUser.userTier === UserTiersTypes.standard) {
      return (
        differenceOfDates(new Date(userSlice.currentUser.lastPosted)) >= 30
      );
    }
    return differenceOfDates(new Date(userSlice.currentUser.lastPosted)) >= 7;
  };

  return userSlice.currentUser &&
    userSlice.currentUser.userTier === UserTiersTypes.free ? (
    <div className={styles.errContainer}>
      <i className="fas fa-lock lg mb-1" />
      <h2 className="md mb-1">
        You must unlock a higher account tier, in order to create events.
      </h2>
      <IconButton className="w-100 s" onClick={() => navigate("/account/edit")}>
        <p className="white-text">Upgrade account</p>
      </IconButton>
    </div>
  ) : canCreate() ? (
    <EventForm>
      <Flash />
      <h2 className="text-center md primary-text">Create an event</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => handleSubmit(values)}
        validationSchema={createValidationSchema}
      >
        {(props) => {
          return (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                if (!files.length) {
                  setFilesErr(true);
                }
                if (!country.length) {
                  setCountryErr(true);
                }
                props.handleSubmit();
              }}
            >
              <Field name="name" label="Name" component={TextInputField} />
              <Field
                name="price"
                type="number"
                label="Price"
                min={0}
                component={TextInputField}
              />
              <Field
                name="description"
                label="Description"
                component={TextAreaInputField}
              />
              <div className="d-flex flex-column align-start mb-2">
                <p>Country</p>
                <CountryDropdown
                  value={country}
                  onChange={(val) => {
                    props.setFieldValue("country", val);
                    setCountry(val);
                  }}
                  classes={`${styles.countryDropdown} ${
                    countryErr && styles.dangerBg
                  }`}
                  priorityOptions={["BG", "US", "GB"]}
                />
                {countryErr && !country.length && (
                  <span className="danger-text xs">
                    Country is a required field
                  </span>
                )}
              </div>
              <Field name="city" label="City" component={TextInputField} />
              <Field
                name="address"
                label="Address"
                component={TextInputField}
              />
              <Field
                name="date"
                type="date"
                label="Date"
                component={TextInputField}
              />
              <Field
                name="time"
                label="Time"
                type="time"
                component={TextInputField}
              />
              <div className="mb-2">
                <p className="primary-text mb-05">Interest categories</p>
                <div
                  className={`d-flex flex-wrap gap-1 ${
                    styles.interestCategoriesContainer
                  } ${
                    props.touched["interestCategories"] &&
                    props.errors["interestCategories"] &&
                    styles.dangerBg
                  }`}
                >
                  <InterestCategories name="interestCategories" />
                </div>
                {props.touched["interestCategories"] &&
                  props.errors["interestCategories"] && (
                    <span className="danger-text xs d-block">
                      You must select between 1 and 5 interest categories.
                    </span>
                  )}
              </div>
              <div className="mb-2">
                <p className="primary-text mb-05">Age requirements</p>
                <div
                  className={`d-flex gapX-2 ${styles.ageGroupContainer} ${
                    props.touched["ageGroup"] &&
                    props.errors["ageGroup"] &&
                    styles.dangerBg
                  }`}
                >
                  <Field
                    name="ageGroup"
                    value="all"
                    label="All ages"
                    id="all"
                    component={RadioInputField}
                  />
                  <Field
                    name="ageGroup"
                    value="over"
                    label="Over 16"
                    id="over"
                    component={RadioInputField}
                  />
                </div>
                {props.touched["ageGroup"] && props.errors["ageGroup"] && (
                  <span className="danger-text xs d-block">
                    Age group is a required field.
                  </span>
                )}
              </div>
              <div className="d-flex flex-column align-start ">
                <p className="mb-1">Images of the event</p>
                <input
                  type="file"
                  accept="image/*"
                  name="images"
                  id="images"
                  onChange={(e) => {
                    setFiles(Array.from(e.currentTarget.files!));
                  }}
                  multiple
                  className="imageInput"
                />
                <div
                  className={`customImageInput ${
                    filesErr && !files.length && styles.dangerBg
                  }`}
                >
                  <label htmlFor="images" className={`mb-1 customLabel`}>
                    Choose images
                  </label>
                  <div>
                    {files.map((file: File) => (
                      <span className="xs secondary-text" key={file.name}>
                        {file.name}
                      </span>
                    ))}
                  </div>
                </div>
                {filesErr && !files.length && (
                  <span className="danger-text xs">
                    Atleast one image required
                  </span>
                )}
              </div>
              <Button className="w-100 s mt-1" type="submit">
                Submit
              </Button>
            </Form>
          );
        }}
      </Formik>
    </EventForm>
  ) : (
    <div className={styles.errContainer}>
      <i className="fas fa-lock lg mb-1" />
      <h2 className="md mb-1">
        You have posted an event in last{" "}
        {userSlice.currentUser.userTier === UserTiersTypes.standard
          ? "30"
          : "7"}{" "}
        days.
      </h2>
      <p className="s">
        You will be able to post another event on{" "}
        {userSlice.currentUser.userTier === UserTiersTypes.standard
          ? new Date(
              new Date().setDate(
                new Date().getDate() +
                  30 -
                  differenceOfDates(new Date(userSlice.currentUser.lastPosted))
              )
            ).toLocaleDateString()
          : new Date(
              new Date().setDate(
                new Date().getDate() +
                  7 -
                  differenceOfDates(new Date(userSlice.currentUser.lastPosted))
              )
            ).toLocaleDateString()}{" "}
      </p>
    </div>
  );
};

export default CreateForm;
