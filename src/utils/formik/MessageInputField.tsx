import { FieldProps } from "formik";
import React from "react";
import IconButton from "../../styles/styledComponents/Buttons/IconButton";
import MessageInput from "../../styles/styledComponents/Forms/MessageInput";
import resizeTextarea from "../helpers/resizeTextarea";

const MessageInputField: React.FC<
  FieldProps & {
    placeholder?: string;
  }
> = ({ field, form, placeholder, ...props }) => {
  return (
    <MessageInput className="messageInput">
      <textarea
        value={field.value}
        name={field.name}
        onChange={(e) => {
          field.onChange(e);
          resizeTextarea(e);
        }}
        placeholder={placeholder}
        rows={1}
      />
      <IconButton type="submit">
        <i className="fas fa-paper-plane s primary-text"></i>
      </IconButton>
    </MessageInput>
  );
};

export default MessageInputField;
