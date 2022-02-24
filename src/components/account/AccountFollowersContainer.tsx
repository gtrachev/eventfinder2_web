import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserType } from "../../utils/types/modelTypes";
import { NavLink } from "react-router-dom";
import { uppercase } from "../../utils/helpers/uppercase";
import { handleFollow } from "../../redux/actions/userActions";
import { uiActionTypes } from "../../utils/types/actionTypes/uiActionTypes";
import { RootState } from "../../redux/rootReducer";
import DangerButton from "../../styles/styledComponents/Buttons/DangerButton";
import Button from "../../styles/styledComponents/Buttons/Button";
import ExitButton from "../../styles/styledComponents/Buttons/ExitButton";
import styles from "../../styles/account/_accountFollowers.module.scss";
import ErrorCard from "../../styles/styledComponents/Cards/ErrorCard";

const AccountFollowersContainer: React.FC = () => {
  const userSlice = useSelector((state: RootState) => state.users);
  const showFollowers = useSelector(
    (state: RootState) => state.ui.showFollowers
  );
  const dispatch = useDispatch();

  const handleAccountFollow = (userId: string) => {
    handleFollow(userId)(dispatch);
  };

  const hideFollowers = () => {
    dispatch({
      type: uiActionTypes.SHOW_OVERLAY,
      payload: { show: false, mobile: false },
    });
    dispatch({
      type: uiActionTypes.SHOW_FOLLOWERS,
      payload: { show: false, type: "" },
    });
  };
  return (
    <div className={`${styles.userFollowersContainer} bg-white`}>
      <h2 className="text-center secondary-text s">
        {uppercase(showFollowers.type)}
      </h2>
      <div>
        {userSlice.userById[showFollowers.type].length ? userSlice.userById[showFollowers.type].map((user: UserType) => {
          return (
            <div className="d-flex justify-between my-1" key={user._id}>
              <NavLink to={`/account/${user._id}`} onClick={hideFollowers}>
                <div className="d-flex">
                  <div className={styles.profileImageContainer}>
                    <img
                      src={user.profileImage.path}
                      alt={user.profileImage.filename}
                    />
                  </div>
                  <p className="s secondary-text">{user.username}</p>
                </div>
              </NavLink>
              {userSlice.currentUser._id !== user._id &&
                (userSlice.currentUser.following.find(
                  (followedUser: UserType) => followedUser._id === user._id
                ) ? (
                  <DangerButton
                    className="xs"
                    onClick={() => handleAccountFollow(user._id)}
                  >
                    Unfollow
                  </DangerButton>
                ) : (
                  <Button
                    className="xs"
                    onClick={() => handleAccountFollow(user._id)}
                  >
                    Follow
                  </Button>
                ))}
            </div>
          );
        }) : <ErrorCard className="mt-1">No users found.</ErrorCard>}
        <ExitButton onClick={hideFollowers}>
          <i className="fas fa-times xs" />
        </ExitButton>
      </div>
    </div>
  );
};

export default AccountFollowersContainer;
