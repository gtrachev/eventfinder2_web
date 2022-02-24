import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { ChatType, UserType } from "../../utils/types/modelTypes";
import IconButton from "../../styles/styledComponents/Buttons/IconButton";
import styles from "../../styles/chat/_userChats.module.scss";

const CurrentChatHeader: React.FC<{
  chat: ChatType;
  setShowInfo: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ chat, setShowInfo }) => {
  const userSlice = useSelector((state: RootState) => state.users);
  return (
    <div className={styles.currentChatHeader}>
      <div className={`${styles.profileImageContainer} mr-1`}>
        <img
          src={
            chat.type === "personal"
              ? chat.members.find(
                  (member: UserType) => member._id !== userSlice.currentUser._id
                )?.profileImage.path
              : chat.event.images[0].path
          }
          alt={
            chat.type === "personal"
              ? chat.members.find(
                  (member: UserType) => member._id !== userSlice.currentUser._id
                )?.profileImage.filename
              : chat.event.images[0].filename
          }
        />
      </div>
      <h2 className="md secondary-text ">
        {chat.type === "personal"
          ? chat.members.find(
              (member: UserType) => member._id !== userSlice.currentUser._id
            )?.username
          : chat.event.name}
      </h2>
      <IconButton
        className={styles.chatInfoBtn}
        onClick={() => setShowInfo((prevShowInfo) => !prevShowInfo)}
      >
        <i className="fas fa-info-circle primary-text" />
      </IconButton>
    </div>
  );
};

export default CurrentChatHeader;
