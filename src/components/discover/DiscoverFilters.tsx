import { Field, Formik, Form } from "formik";
import React, { useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { filterInitialValuesType } from "../../utils/types/formikInitStateTypes";
import Button from "../../styles/styledComponents/Buttons/Button";
import IconButton from "../../styles/styledComponents/Buttons/IconButton";
import DiscoverFilterCategory from "../../styles/styledComponents/Forms/DiscoverFilterCategory";
import CheckboxInputField from "../../utils/formik/CheckboxInputField";
import RadioInputField from "../../utils/formik/RadioInputField";
import styles from "../../styles/discover/_discoverFilters.module.scss";

const DiscoverFilters: React.FC<{
  setFetchUrl: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setFetchUrl }) => {
  const [country, setCountry] = useState("");
  const initialValues: filterInitialValuesType = {
    interests: [],
    price: "",
    ageGroup: "",
    country: "",
    city: "",
  };
  const apiUrl =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://eventfinder2-server.herokuapp.com";
  const handleFilter = (values: filterInitialValuesType) => {
    setFetchUrl(
      `${apiUrl}/api/events?interests=${values.interests.toString()}&price=${
        values.price
      }&ageGroup=${values.ageGroup}&country=${values.country}&city=${
        values.city
      }`
    );
  };
  return (
    <div className={styles.filtersContainer}>
      <h2 className="s secondary-color ml-05 my-05 text-center">Filters</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          handleFilter(values);
        }}
      >
        {(props) => {
          return (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                props.handleSubmit();
              }}
            >
              <DiscoverFilterCategory>
                <p>Interests</p>
                <Field
                  name="interests"
                  id="art"
                  value="art"
                  label="Art"
                  component={CheckboxInputField}
                />
                <Field
                  name="interests"
                  id="cooking"
                  value="cooking"
                  label="Cooking"
                  component={CheckboxInputField}
                />
                <Field
                  name="interests"
                  id="diy"
                  value="diy"
                  label="DIY"
                  component={CheckboxInputField}
                />
                <Field
                  name="interests"
                  id="education"
                  value="education"
                  label="Education"
                  component={CheckboxInputField}
                />
                <Field
                  name="interests"
                  id="fitness"
                  value="fitness"
                  label="Fitness"
                  component={CheckboxInputField}
                />
                <Field
                  name="interests"
                  id="hiking"
                  value="hiking"
                  label="Hiking"
                  component={CheckboxInputField}
                />
                <Field
                  name="interests"
                  id="history"
                  value="history"
                  label="History"
                  component={CheckboxInputField}
                />
                <Field
                  name="interests"
                  id="it"
                  value="it"
                  label="IT"
                  component={CheckboxInputField}
                />
                <Field
                  name="interests"
                  id="literature"
                  value="literature"
                  label="Literature"
                  component={CheckboxInputField}
                />
                <Field
                  name="interests"
                  id="music"
                  value="music"
                  label="Music"
                  component={CheckboxInputField}
                />
                <Field
                  name="interests"
                  id="politics"
                  value="politics"
                  label="Politics"
                  component={CheckboxInputField}
                />
                <Field
                  name="interests"
                  id="science"
                  value="science"
                  label="Science"
                  component={CheckboxInputField}
                />
                <Field
                  name="interests"
                  id="sightseeing"
                  value="sightseeing"
                  label="Sightseeing"
                  component={CheckboxInputField}
                />
                <Field
                  name="interests"
                  id="sports"
                  value="sports"
                  label="Sports"
                  component={CheckboxInputField}
                />
                <Field
                  name="interests"
                  id="technologies"
                  value="technologies"
                  label="Technologies"
                  component={CheckboxInputField}
                />
                <Field
                  name="interests"
                  id="travelling"
                  value="travelling"
                  label="Travelling"
                  component={CheckboxInputField}
                />
                <Field
                  name="interests"
                  id="yoga"
                  value="yoga"
                  label="Yoga"
                  component={CheckboxInputField}
                />
              </DiscoverFilterCategory>
              <DiscoverFilterCategory>
                <div className="d-flex flex-column align-start">
                  <p>Country</p>
                  <CountryDropdown
                    value={country}
                    onChange={(val) => {
                      props.setFieldValue("country", val);
                      setCountry(val);
                    }}
                    classes={styles.countryDropdown}
                    priorityOptions={["BG", "US", "GB"]}
                  />
                </div>
              </DiscoverFilterCategory>
              <DiscoverFilterCategory>
                <p>City</p>
                <input
                  type="text"
                  name="city"
                  value={props.values["city"]}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  className={styles.filterInput}
                  placeholder="Enter"
                />
              </DiscoverFilterCategory>
              <DiscoverFilterCategory>
                <p>Age group</p>
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
              </DiscoverFilterCategory>
              <DiscoverFilterCategory>
                <p>Price</p>
                <input
                  type="number"
                  name="price"
                  value={props.values["price"]}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  className={styles.filterInput}
                  placeholder="Up to"
                  min={0}
                />
              </DiscoverFilterCategory>
              <Button className="w-90 xs d-block mx-auto mb-05" type="submit">
                Filter
              </Button>
              <IconButton
                className="primary-text xs"
                onClick={() => props.resetForm()}
                type="button"
              >
                Clear filters
              </IconButton>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default DiscoverFilters;
