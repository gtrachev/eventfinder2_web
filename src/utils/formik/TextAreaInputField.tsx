import { FieldProps } from "formik";
import React from "react";
import TextArea from "../../styles/styledComponents/Forms/TextArea";
import { uppercase } from "../helpers/uppercase";

const TextAreaInputField: React.FC<
  FieldProps & {
    label: string;
    type?: string;
    id: string;
  }
> = ({ field, form, label, type, id, ...props }) => {
  const errMsg = form.touched[field.name] && form.errors[field.name];

  return (
    <div className="mb-1">
      <label htmlFor={id} className="mb-05">
        {label}
      </label>
      <TextArea
        id={id}
        value={field.value}
        name={field.name}
        onChange={field.onChange}
        err={errMsg ? true : false}
        placeholder={`${label}: `}
        rows={5}
        cols={4}
      />
      {errMsg && (
        <span className="danger-text xs">
          {typeof errMsg === "string" && uppercase(errMsg)}
        </span>
      )}
    </div>
  );
};

export default TextAreaInputField;
