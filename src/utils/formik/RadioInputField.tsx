import { FieldProps } from "formik";
import React from "react";
import RadioInput from "../../styles/styledComponents/Forms/RadioInput";

const RadioInputField: React.FC<
  FieldProps & {
    label: string;
    id: string;
    value: string;
    isChecked: boolean;
  }
> = ({ field, form, label, id, value, isChecked, ...props }) => {
  return (
    <div>
      <label htmlFor={id}>
        <span className="xs secondary-text">{label}</span>
      </label>
      <RadioInput
        type="radio"
        id={id}
        value={value}
        name={field.name}
        checked={isChecked}
        onChange={field.onChange}
      />
    </div>
  );
};

export default RadioInputField;
