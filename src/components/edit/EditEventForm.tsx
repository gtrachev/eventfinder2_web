import { Formik, Form, Field } from "formik";
import React, { useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import Flash from "../flash/Flash";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { uiActionTypes } from "../../utils/types/actionTypes/uiActionTypes";
import { createValidationSchema } from "../../utils/formik/yupValidationSchemas";
import { eventFormikInitialValuesType } from "../../utils/types/formikInitStateTypes";
import { editEvent, getDetails } from "../../redux/actions/eventsActions";
import { EventType, ImageType } from "../../utils/types/modelTypes";
import Button from "../../styles/styledComponents/Buttons/Button";
import EventForm from "../../styles/styledComponents/Forms/EventForm";
import RadioInputField from "../../utils/formik/RadioInputField";
import TextAreaInputField from "../../utils/formik/TextAreaInputField";
import TextInputField from "../../utils/formik/TextInputField";
import InterestCategories from "../forms/InterestCategories";
import CheckboxImageInputField from "../../utils/formik/CheckboxImageInputField";
import styles from "../../styles/create/_eventForm.module.scss";

const EditEventForm: React.FC<{ eventDetails: EventType }> = ({
  eventDetails,
}) => {
  const dispatch = useDispatch();

  const [files, setFiles] = useState<any>([]);
  const [country, setCountry] = useState(eventDetails.country);
  const [countryErr, setCountryErr] = useState(false);
  const [deletedImagesErr, setDeletedImagesErr] = useState(false);
  const initialValues: eventFormikInitialValuesType = {
    name: eventDetails.name,
    price: eventDetails.price,
    description: eventDetails.description,
    country: eventDetails.country,
    city: eventDetails.city,
    address: eventDetails.address,
    date: new Date(eventDetails.date).toISOString().substr(0, 10),
    time: eventDetails.time,
    interestCategories: [...eventDetails.interestCategories],
    ageGroup: "all",
    deletedImages: [],
  };
  const navigate = useNavigate();

  const handleSubmit = async (values: eventFormikInitialValuesType) => {
    try {
      const images: ImageType[] = await Promise.all(
        files.map(async (file: File) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "oes8taaw");
          const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
          );
          const imageData = res.data;
          return {
            path: imageData.url,
            filename: imageData.original_filename,
          };
        })
      );
      const deletedImages = values.deletedImages;
      const eventData = values;
      delete eventData.deletedImages;
      editEvent(
        eventDetails._id,
        { ...eventData, images: [...eventDetails.images, ...images] },
        deletedImages
      )(dispatch);

      getDetails(eventDetails._id)(dispatch);
      navigate(`/events/details/${eventDetails._id}`);

      dispatch({
        type: uiActionTypes.SET_FLASH,
        payload: { type: "success", message: "Event successfully edited." },
      });
    } catch (err) {
      dispatch({
        type: uiActionTypes.SET_FLASH,
        payload: { type: "error", message: "Event could not be edited." },
      });
    }
  };

  return (
    <EventForm>
      <Flash />
      <h2 className="text-center md primary-text">
        Edit "{eventDetails.name}"
      </h2>
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
                if (!country.length) {
                  setCountryErr(true);
                }
                if (
                  props.values["deletedImages"] &&
                  props.values["deletedImages"]?.length >=
                    eventDetails.images.length
                ) {
                  setDeletedImagesErr(true);
                  return;
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
                    styles.imageCheckboxContainer
                  } ${
                    props.touched["interestCategories"] &&
                    props.errors["interestCategories"] &&
                    styles.dangerBg
                  }`}
                >
                  <InterestCategories
                    name="interestCategories"
                    values={props.values["interestCategories"]}
                  />
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
                    isChecked={props.values["ageGroup"] === "all"}
                  />
                  <Field
                    name="ageGroup"
                    value="over"
                    label="Over 16"
                    id="over"
                    component={RadioInputField}
                    isChecked={props.values["ageGroup"] === "over"}
                  />
                </div>
                {props.touched["ageGroup"] && props.errors["ageGroup"] && (
                  <span className="danger-text xs d-block">
                    Age group is a required field.
                  </span>
                )}
              </div>
              <div className="d-flex flex-column align-start mb-2">
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
                <div className="customImageInput">
                  <label htmlFor="images" className={`mb-1 customLabel`}>
                    Include more images
                  </label>
                  <div>
                    {files.map((file: File) => (
                      <span className="xs secondary-text" key={file.name}>
                        {file.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="d-flex align-start flex-column mb-2">
                <p className="mb-1">Choose images to delete</p>
                <div
                  className={`d-flex flex-wrap gap-1 w-100 ${
                    styles.imageCheckboxContainer
                  } ${
                    deletedImagesErr &&
                    props.values["deletedImages"] &&
                    props.values["deletedImages"]?.length >=
                      eventDetails.images.length &&
                    styles.dangerBg
                  }`}
                >
                  {eventDetails.images.map((image) => (
                    <div key={image.filename}>
                      <Field
                        name="deletedImages"
                        id={image.filename}
                        value={image.filename}
                        label={image.filename.slice(0, 10)}
                        component={CheckboxImageInputField}
                      >
                        <img src={image.path} alt={image.filename} />
                      </Field>
                    </div>
                  ))}
                </div>
                {deletedImagesErr &&
                  props.values["deletedImages"] &&
                  props.values["deletedImages"]?.length >=
                    eventDetails.images.length && (
                    <span className="danger-text xs">
                      Event requires at least one image
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
  );
};

export default EditEventForm;
