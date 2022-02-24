import { FieldProps } from "formik";
import React from "react";
import CheckboxImageInput from "../../styles/styledComponents/Forms/CheckboxImageInput";
import styles from "../../styles/forms/_checkboxImageInput.module.scss";

const CheckboxImageInputField: React.FC<
  FieldProps & {
    id: string;
    label: string;
    value: string;
    isChecked: boolean;
  }
> = ({ field, form, id, value, label, isChecked, ...props }) => {
  const errMsg = form.touched[field.name] && form.errors[field.name];

  return (
    <div
      className={`pos-relative d-flex flex-column align-center ${styles.checkboxImageInputContainer}`}
    >
      <label htmlFor={id}>
        <span className="xs secondary-text">{label}</span>
      </label>
      <div className={`${styles.imgContainer} my-1`}>{props.children}</div>
      <CheckboxImageInput
        type="checkbox"
        id={id}
        value={value}
        name={field.name}
        onChange={field.onChange}
        onBlur={field.onBlur}
        checked={isChecked}
      />
    </div>
  );
};

export default CheckboxImageInputField;
