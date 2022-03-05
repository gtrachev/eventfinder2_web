import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import AccountBody from "../components/account/AccountBody";
import AccountHeader from "../components/account/AccountHeader";
import Flash from "../components/flash/Flash";
import { getUserById } from "../redux/actions/userActions";
import { RootState } from "../redux/rootReducer";
import styles from "../styles/account/_account.module.scss";

const Account: React.FC = () => {
  const { user_id = "" } = useParams();
  const userSlice = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    getUserById(user_id)(dispatch);
  }, [dispatch, user_id]);

  return (
    <div className={styles.accountContainer}>
      {userSlice?.userById && (
        <>
          <Flash />
          <AccountHeader />
          <AccountBody />
        </>
      )}
    </div>
  );
};

export default Account;
