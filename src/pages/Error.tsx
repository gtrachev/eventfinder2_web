import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { errorActionTypes } from "../utils/types/actionTypes/errorActionTypes";
import { RootState } from "../redux/rootReducer";
import ErrorCard from "../styles/styledComponents/Cards/ErrorCard";

const Error: React.FC = () => {
  const dispatch = useDispatch();
  const errorSlice = useSelector((state: RootState) => state.errors);
  const defaultErrMsg = "Page not found.";

  useEffect(() => {
    return () => {
      dispatch({
        type: errorActionTypes.SET_ERROR,
        payload: "",
      });
    };
  }, [dispatch]);

  const errMessage = errorSlice?.error || defaultErrMsg;

  return (
    <div className="mx-auto err-container w-95 mt-2">
      <ErrorCard>
        <h2>{errMessage}</h2>
      </ErrorCard>
    </div>
  );
};

export default Error;
