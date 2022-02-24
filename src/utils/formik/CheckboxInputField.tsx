import { FieldProps } from "formik";
import React from "react";

const CheckboxInputField: React.FC<
  FieldProps & {
    id: string;
    label: string;
    value: string;
    isChecked: boolean;
  }
> = ({ field, form, id, value, label, isChecked, ...props }) => {
  const errMsg = form.touched[field.name] && form.errors[field.name];

  return (
    <div>
      <label htmlFor={id}>
        <span className="xs secondary-text">{label}</span>
      </label>
      <input
        type="checkbox"
        id={id}
        value={value}
        name={field.name}
        onChange={field.onChange}
        onBlur={field.onBlur}
        className="ml-05"
      />
    </div>
  );
};

export default CheckboxInputField;
