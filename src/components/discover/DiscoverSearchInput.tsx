import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { CSSTransition } from "react-transition-group";
import { useDispatch } from "react-redux";
import { uiActionTypes } from "../../utils/types/actionTypes/uiActionTypes";
import InputSearchField from "../../utils/formik/InputSearchField";
import IconButton from "../../styles/styledComponents/Buttons/IconButton";
import FiltersType from "../../utils/types/filtersType";
import DiscoverSort from "./DiscoverSort";
import Button from "../../styles/styledComponents/Buttons/Button";
import DiscoverFindUsers from "./DiscoverFindUsers";
import styles from "../../styles/discover/_discoverSort.module.scss";

const DiscoverSearchInput: React.FC<{
  handleShowFilters: () => void;
  setFetchUrl: React.Dispatch<React.SetStateAction<string>>;
  filters: FiltersType;
  sort: { sortBy: string; sort: string };
  setSort: React.Dispatch<
    React.SetStateAction<{
      sortBy: string;
      sort: string;
    }>
  >;
  showFilters: boolean;
}> = ({ handleShowFilters, showFilters, setFetchUrl, filters, setSort }) => {
  const [showSort, setShowSort] = useState(false);
  const [showFindUsers, setShowFindUsers] = useState(false);
  const initialValues = {
    search: "",
  };
  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    search: yup.string().required().min(1).max(50),
  });

  const apiUrl =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://eventfinder2-server.herokuapp.com";

  const handleSearch = (values: { search: string }) => {
    setFetchUrl(
      `${apiUrl}/api/events?search=${values.search}&interests=${filters.interests}&price=${filters.price}&ageGroup=${filters.ageGroup}&country=${filters.country}&city=${filters.city}`
    );
  };

  const handleShowFindUsers = () => {
    setShowFindUsers(true);
    dispatch({
      type: uiActionTypes.SHOW_OVERLAY,
      payload: { show: true, mobile: false },
    });
  };
  useEffect(() => {
    return () => {
      dispatch({
        type: uiActionTypes.SHOW_OVERLAY,
        payload: { show: false, mobile: false },
      });
    };
  }, [dispatch]);

  return (
    <div className={`my-2 w-100 ${styles.lessMargin}`}>
      <div
        className={`d-flex justify-center gapX-2 ${styles.discoverSearchContainer}`}
      >
        <div
          className={`d-flex w-60 align-center justify-between ${styles.formContainer}`}
        >
          <Button
            className={`xs ${styles.usersBtn} w-25`}
            onClick={handleShowFindUsers}
          >
            <span className={styles.hideMobile}>Find users</span>
            <span className={`d-none ${styles.showMobile}`}>Users</span>
          </Button>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => handleSearch(values)}
            validationSchema={validationSchema}
          >
            {(props) => {
              return (
                <Form
                  className="w-70"
                  onSubmit={(e) => {
                    e.preventDefault();
                    props.handleSubmit();
                  }}
                >
                  <Field name="search" component={InputSearchField} />
                </Form>
              );
            }}
          </Formik>
        </div>
        <div className={`d-flex ${styles.discoverActionsContainer}`}>
          <IconButton className="d-flex mr-2" onClick={handleShowFilters}>
            <p className="primary-text mr-05 xs">
              {showFilters ? "Hide" : "Show"} filters
            </p>
            <i className="fas fa-sliders-h s primary-text" />
          </IconButton>
          <IconButton
            className="d-flex"
            onClick={() => setShowSort((prevShowSort) => !prevShowSort)}
          >
            <p className="primary-text mr-05 xs">Sort by</p>
            <i className="fas fa-sort s primary-text" />
          </IconButton>
        </div>
      </div>

      <CSSTransition
        in={showSort}
        timeout={200}
        unmountOnExit
        classNames={{
          enter: styles.showSortEnter,
          enterActive: styles.showSortEnterActive,
          exit: styles.showSortExit,
          exitActive: styles.showSortExitActive,
        }}
      >
        <DiscoverSort setSort={setSort} />
      </CSSTransition>
      {showFindUsers && (
        <DiscoverFindUsers setShowFindUsers={setShowFindUsers} />
      )}
    </div>
  );
};

export default DiscoverSearchInput;
