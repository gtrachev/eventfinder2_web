import { FieldProps } from "formik";
import React from "react";
import IconButton from "../../styles/styledComponents/Buttons/IconButton";
import SearchInput from "../../styles/styledComponents/Forms/SearchInput";

const InputSearchField: React.FC<FieldProps & { changeHandler?: boolean }> = ({
  field,
  form,
  changeHandler,
}) => {
  const errMsg = form.touched[field.name] && form.errors[field.name];
  return (
    <SearchInput err={errMsg && errMsg.length ? true : false}>
      <input
        type="text"
        name={field.name}
        onBlur={field.onBlur}
        onChange={(e: React.ChangeEvent<any>) => {
          field.onChange(e);
          if (changeHandler) {
            form.handleSubmit(e);
          }
        }}
        value={field.value}
        placeholder="Search..."
      />
      <IconButton type="submit">
        <i className="fas fa-search s primary-text"></i>
      </IconButton>
    </SearchInput>
  );
};

export default InputSearchField;
