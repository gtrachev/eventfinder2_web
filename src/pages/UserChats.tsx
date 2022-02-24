import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/actions/userActions";
import { RootState } from "../redux/rootReducer";
import { UserType } from "../utils/types/modelTypes";
import CurrentChat from "../components/chat/CurrentChat";
import ChatInformation from "../components/chat/ChatInformation";
import LoadingContainer from "../components/layout/LoadingContainer";
import ChatButtonsList from "../components/chat/ChatButtonsList";
import styles from "../styles/chat/_userChats.module.scss";

const UserChats: React.FC = () => {
  const userSlice = useSelector((state: RootState) => state.users);
  const currentUser: UserType = userSlice.currentUser;
  const [showInfo, setShowInfo] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    getUser()(dispatch);
  }, [dispatch]);
  return (
    <div className={styles.mainContainer}>
      <div className={styles.yourChats}>
        <h2 className={`md secondary-text py-05 mx-05 ${styles.hideTablet}`}>
          Your chats
        </h2>
        <h2
          className={`d-none md secondary-text py-05 mx-05 ${styles.showTablet}`}
        >
          Chats
        </h2>
        <div className={styles.chatsButtonsContainer}>
          {!userSlice.isLoading &&
          currentUser &&
          currentUser.inChats &&
          currentUser.inChats.length ? (
            <ChatButtonsList inChats={currentUser.inChats} />
          ) : (
            <LoadingContainer />
          )}
        </div>
      </div>
      {!userSlice.isLoading &&
      currentUser &&
      currentUser.inChats &&
      currentUser.inChats.length ? (
        <CurrentChat setShowInfo={setShowInfo} />
      ) : (
        <LoadingContainer />
      )}
      {showInfo && <ChatInformation setShowInfo={setShowInfo} />}
    </div>
  );
};

export default UserChats;
