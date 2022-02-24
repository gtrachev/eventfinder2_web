import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getUserById, getUser } from "../../redux/actions/userActions";
import { RootState } from "../../redux/rootReducer";
import { uiActionTypes } from "../../utils/types/actionTypes/uiActionTypes";
import LoadingContainer from "../layout/LoadingContainer";
import AccountEventsList from "./AccountEventsList";
import AccountLikedNotesList from "./AccountLikedNotes";
import AccountPostsList from "./AccountPostsList";
import styles from "../../styles/account/_account.module.scss";

const AccountBody: React.FC = () => {
  const { user_id = "" } = useParams();
  const dispatch = useDispatch();
  const userSlice = useSelector((state: RootState) => state.users);
  const uiSlice = useSelector((state: RootState) => state.ui);
  const isCurrentUser = userSlice?.currentUser._id === user_id;
  useEffect(() => {
    getUser()(dispatch);
    getUserById(user_id)(dispatch);
  }, [dispatch, user_id]);

  const bodyDataElements = [
    <AccountPostsList
      posts={userSlice.userByIdPosts}
      errMsg={
        isCurrentUser
          ? "You have not got any posts."
          : "User has not got any posts."
      }
    />,
    <AccountEventsList
      events={userSlice.userById.attending}
      errMsg={
        isCurrentUser
          ? "You aren't attending any events."
          : "User not attending any events."
      }
    />,
    <AccountEventsList
      events={userSlice.userById.savedEvents}
      errMsg="You haven't saved any events."
    />,
    <AccountLikedNotesList
      notes={userSlice.userById.likedNotes}
      errMsg={
        isCurrentUser
          ? "No liked notes found."
          : "User has not liked any notes."
      }
    />,
  ];

  const handleSetListIndex = (index: number) => {
    dispatch({
      type: uiActionTypes.SET_ACCOUNT_LIST_INDEX,
      payload: index,
    });
  };

  return (
    <div className={styles.accountBody}>
      <div className={`mb-2 ${styles.accountBodyNav}`}>
        <div
          className={`${styles.btnContainer} ${
            uiSlice.accountListIndex === 0 && styles.activeBtn
          }`}
        >
          <button
            className="secondary-text"
            onClick={() => handleSetListIndex(0)}
          >
            <span>{isCurrentUser ? "Your posts" : "User posts"}</span>
            <span className={`d-none ${styles.showMobile}`}>Posts</span>
          </button>
        </div>
        <div
          className={`${styles.btnContainer} ${
            uiSlice.accountListIndex === 1 && styles.activeBtn
          }`}
        >
          <button
            className="secondary-text"
            onClick={() => handleSetListIndex(1)}
          >
            Attending
          </button>
        </div>
        {isCurrentUser && (
          <div
            className={`${styles.btnContainer} ${
              uiSlice.accountListIndex === 2 && styles.activeBtn
            }`}
          >
            <button
              className="secondary-text"
              onClick={() => handleSetListIndex(2)}
            >
              Saved
            </button>
          </div>
        )}
        <div
          className={`${styles.btnContainer} ${
            uiSlice.accountListIndex === 3 && styles.activeBtn
          }`}
        >
          <button
            className="secondary-text"
            onClick={() => handleSetListIndex(3)}
          >
            <span>Liked notes</span>
            <span className={`d-none ${styles.showMobile}`}>Liked</span>
          </button>
        </div>
      </div>
      {!userSlice.isLoading ? (
        <div className="mb-2">{bodyDataElements[uiSlice.accountListIndex]}</div>
      ) : (
        <LoadingContainer />
      )}
    </div>
  );
};

export default AccountBody;
