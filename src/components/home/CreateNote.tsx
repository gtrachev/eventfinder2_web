import React from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as yup from "yup";
import { UserType } from "../../utils/types/modelTypes";
import { useDispatch, useSelector } from "react-redux";
import { createNote } from "../../redux/actions/notesActions";
import { uiActionTypes } from "../../utils/types/actionTypes/uiActionTypes";
import { RootState } from "../../redux/rootReducer";
import MessageInputField from "../../utils/formik/MessageInputField";
import Event from "../cards/Event";
import ExitButton from "../../styles/styledComponents/Buttons/ExitButton";
import styles from "../../styles/home/_home.module.scss";

const CreateNote: React.FC<{ user: UserType }> = ({ user }) => {
  const initialValues = {
    body: "",
  };
  const validationSchema = yup.object().shape({
    body: yup.string().required().min(1).max(250),
  });
  const dispatch = useDispatch();

  const uiSlice = useSelector((state: RootState) => state.ui);
  const handleCreate = (
    values: { body: string },
    actions: FormikHelpers<{
      body: string;
    }>
  ) => {
    createNote({
      body: values.body,
      shared_event: uiSlice.sharedEvent ? uiSlice.sharedEvent._id : "",
    })(dispatch);
    actions.resetForm();
    dispatch({
      type: uiActionTypes.SET_SHARED_EVENT,
      payload: undefined,
    });
    dispatch({
      type: uiActionTypes.SET_FLASH,
      payload: { type: "success", message: "Note successfully created." },
    });
  };

  const removeSharing = () => {
    dispatch({
      type: uiActionTypes.SET_SHARED_EVENT,
      payload: undefined,
    });
  };

  return (
    <div className={styles.createNoteContainer}>
      <h2 className="text-center mb-05 primary-text">What's on your mind?</h2>
      {uiSlice.sharedEvent && (
        <div className="w-100 mb-1 pos-relative">
          <h3 className="s secondary-text mb-1">Sharing:</h3>
          <Event event={uiSlice.sharedEvent} size="big" />
          <ExitButton onClick={removeSharing}>
            <i className="fas fa-times xs" />
          </ExitButton>
        </div>
      )}
      <div className="d-flex w-100 gapX-1 mb-05">
        <div className={styles.profileImgContainer}>
          <img src={user.profileImage.path} alt={user.profileImage.filename} />
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            handleCreate(values, actions);
          }}
          validationSchema={validationSchema}
        >
          {(props) => {
            return (
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  props.handleSubmit();
                }}
                className="w-100"
              >
                <Field
                  name="body"
                  placeholder="Enter note body"
                  component={MessageInputField}
                />
              </Form>
            );
          }}
        </Formik>
      </div>
      <p className="gray-text">
        Post a Note to share your thoughts with your followers!
      </p>
    </div>
  );
};

export default CreateNote;
