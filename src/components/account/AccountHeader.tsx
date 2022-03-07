import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { uiActionTypes } from "../../utils/types/actionTypes/uiActionTypes";
import { RootState } from "../../redux/rootReducer";
import { createChat } from "../../redux/actions/chatsActions";
import { ChatType, UserType } from "../../utils/types/modelTypes";
import Button from "../../styles/styledComponents/Buttons/Button";
import DangerButton from "../../styles/styledComponents/Buttons/DangerButton";
import AccountInfo from "./AccountInfo";
import {
  getUser,
  getUserById,
  handleFollow,
  logoutUser,
} from "../../redux/actions/userActions";
import IconButton from "../../styles/styledComponents/Buttons/IconButton";
import AccountFollowersContainer from "./AccountFollowersContainer";
import styles from "../../styles/account/_account.module.scss";

const AccountHeader: React.FC<{}> = () => {
  const [showInfo, setShowInfo] = useState(false);
  const { user_id = "" } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userSlice = useSelector((state: RootState) => state.users);
  const showFollowers = useSelector(
    (state: RootState) => state.ui.showFollowers
  );
  useEffect(() => {
    getUserById(user_id)(dispatch);
    getUser()(dispatch);
  }, [dispatch, user_id]);

  const handleLogout = () => {
    logoutUser()(dispatch);
    dispatch({
      type: uiActionTypes.SET_FLASH,
      payload: {
        type: "success",
        message: "Successfully logged out of your account.",
      },
    });
    navigate("/accounts/login");
    window.location.reload();
  };

  const handleAccountFollow = () => {
    handleFollow(user_id)(dispatch);
  };

  const handleShowFollowers = (type: string) => {
    dispatch({
      type: uiActionTypes.SHOW_FOLLOWERS,
      payload: { type, show: true },
    });
    dispatch({
      type: uiActionTypes.SHOW_OVERLAY,
      payload: { show: true, mobile: false },
    });
  };

  const handleStartChat = () => {
    createChat(user_id)(dispatch);
  };

  return userSlice.currentUser && userSlice.userById ? (
    <div className={styles.accountHeader}>
      <div className="d-flex justify-between align-start w-100">
        <div className={styles.profileImgContainer}>
          <img
            src={userSlice.userById.profileImage.path}
            alt={userSlice.userById.profileImage.filename}
          />
        </div>
        <div className="w-70">
          <div
            className={`d-flex justify-between align-center mb-1 ${styles.usernameContainer}`}
          >
            <h1 className="primary-text mr-3">{userSlice.userById.username}</h1>
            <div className="d-flex">
              {userSlice?.currentUser._id === user_id ? (
                <>
                  <Button
                    className="xs mr-05"
                    onClick={() => setShowInfo((prevShowInfo) => !prevShowInfo)}
                  >
                    Information
                  </Button>
                  <DangerButton className="xs" onClick={handleLogout}>
                    Log out
                  </DangerButton>
                </>
              ) : (
                <>
                  {userSlice.currentUser.following.find(
                    (followedUser: UserType) => followedUser._id === user_id
                  ) ? (
                    <DangerButton
                      className="xs mr-1"
                      onClick={handleAccountFollow}
                    >
                      Unfollow
                    </DangerButton>
                  ) : (
                    <Button className="xs mr-1" onClick={handleAccountFollow}>
                      Follow
                    </Button>
                  )}
                  {userSlice.currentUser.inChats &&
                  userSlice.currentUser.inChats.length &&
                  userSlice.currentUser.inChats
                    .filter((chat: ChatType) => chat.type === "personal")
                    .find((chat: ChatType) => {
                      return chat.members.find(
                        (member) => member._id === user_id
                      );
                    }) ? (
                    <NavLink
                      to={`/chats/${
                        userSlice.currentUser.inChats
                          .filter((chat: ChatType) => chat.type === "personal")
                          .find((chat: ChatType) => {
                            return chat.members.find(
                              (member) => member._id === user_id
                            );
                          })._id
                      }`}
                    >
                      <Button className="xs">Message</Button>
                    </NavLink>
                  ) : (
                    <Button className="xs" onClick={handleStartChat}>
                      Start chat
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
          <CSSTransition
            in={showInfo}
            timeout={200}
            unmountOnExit
            classNames={{
              enter: styles.showInfoEnter,
              enterActive: styles.showInfoEnterActive,
              exit: styles.showInfoExit,
              exitActive: styles.showInfoExitActive,
            }}
          >
            <AccountInfo user={userSlice.userById} />
          </CSSTransition>
          <div
            className={`w-100 ${styles.followersContainer} secondary-text`}
          >
            <IconButton
              className="w-50"
              onClick={() => handleShowFollowers("followers")}
            >
              <div className="w-100 d-flex flex-column align-center secondary-text">
                <p className="xs">Followers</p>
                <p className="xs">{userSlice.userById.followers.length}</p>
              </div>
            </IconButton>
            <IconButton
              className="w-50"
              onClick={() => handleShowFollowers("following")}
            >
              <div className="w-100 d-flex flex-column align-center secondary-text">
                <p className="xs">Following</p>
                <p className="xs">{userSlice.userById.following.length}</p>
              </div>
            </IconButton>
          </div>
        </div>
      </div>
      <div
        className={`w-100 ${styles.followersContainerMobile} secondary-text`}
      >
        <IconButton
          className="w-50"
          onClick={() => handleShowFollowers("followers")}
        >
          <div className="w-100 d-flex flex-column align-center">
            <p className="xs">Followers</p>
            <p className="xs">{userSlice.userById.followers.length}</p>
          </div>
        </IconButton>
        <IconButton
          className="w-50"
          onClick={() => handleShowFollowers("following")}
        >
          <div className="w-100 d-flex flex-column align-center">
            <p className="xs">Following</p>
            <p className="xs">{userSlice.userById.following.length}</p>
          </div>
        </IconButton>
      </div>
      {showFollowers.show && <AccountFollowersContainer />}
    </div>
  ) : (
    <div>loading</div>
  );
};

export default AccountHeader;
