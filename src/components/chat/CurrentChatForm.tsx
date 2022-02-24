import { Formik, Form, Field, FormikHelpers } from "formik";
import React from "react";
import * as yup from "yup";
import MessageInputField from "../../utils/formik/MessageInputField";
import IconButton from "../../styles/styledComponents/Buttons/IconButton";
import styles from "../../styles/chat/_userChats.module.scss";

const CurrentChatForm: React.FC<{
  handleSendMessage: (
    values: {
      text: string;
    },
    actions: FormikHelpers<{
      text: string;
    }>
  ) => void;
}> = ({ handleSendMessage }) => {
  const initialValues = {
    text: "",
  };

  const validationSchema = yup.object().shape({
    text: yup.string().required().min(1).max(250),
  });
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        handleSendMessage(values, actions);
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
            className={styles.currentChatForm}
          >
            <IconButton className={`${styles.fileBtn} mr-05`}>
              <i className="fas fa-paperclip md" />
            </IconButton>
            <IconButton className={`${styles.fileBtn} mr-05`}>
              <i className="fas fa-file-image md" />
            </IconButton>
            <Field
              name="text"
              placeholder="Enter message"
              component={MessageInputField}
            />
            <IconButton className={`${styles.fileBtn}`}>
              <i className="fas fa-smile md ml-05" />
            </IconButton>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CurrentChatForm;
