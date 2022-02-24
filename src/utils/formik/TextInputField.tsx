import { FieldProps } from "formik";
import React from "react";
import TextInput from "../../styles/styledComponents/Forms/TextInput";
import { uppercase } from "../helpers/uppercase";

const TextInputField: React.FC<
  FieldProps & {
    label: string;
    type?: string;
    id: string;
  }
> = ({ field, form, label, type, id, ...props }) => {
  const errMsg = form.touched[field.name] && form.errors[field.name];

  return (
    <div className="mb-2">
      <label htmlFor={id}>
        {label}
      </label>
      <TextInput
        type={type ? type : "text"}
        id={id}
        value={field.value}
        name={field.name}
        onChange={field.onChange}
        err={!errMsg ? false : true}
        placeholder={`Enter ${field.name}`}
      />
      {errMsg && (
        <span className="danger-text xs">
          {typeof errMsg === "string" && uppercase(errMsg)}
        </span>
      )}
    </div>
  );
};

export default TextInputField;
