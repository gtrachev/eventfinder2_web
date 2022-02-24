import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { NavLink } from "react-router-dom";
import { getChat, leaveEventChat } from "../../redux/actions/chatsActions";
import { handleFollow } from "../../redux/actions/userActions";
import { RootState } from "../../redux/rootReducer";
import { ChatType, UserType } from "../../utils/types/modelTypes";
import Button from "../../styles/styledComponents/Buttons/Button";
import DangerButton from "../../styles/styledComponents/Buttons/DangerButton";
import ExitButton from "../../styles/styledComponents/Buttons/ExitButton";
import LoadingContainer from "../layout/LoadingContainer";
import styles from "../../styles/chat/_userChats.module.scss";

const ChatInformation: React.FC<{
  setShowInfo: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setShowInfo }) => {
  const { chat_id = "" } = useParams();
  const chatsSlice = useSelector((state: RootState) => state.chats);
  const userSlice = useSelector((state: RootState) => state.users);
  const navigate = useNavigate();
  const chat: ChatType = chatsSlice.openedChat;
  const member =
    chat &&
    chat.members.find(
      (member: UserType) => member._id !== userSlice.currentUser._id
    );
  const dispatch = useDispatch();

  useEffect(() => {
    getChat(chat_id)(dispatch);
  }, [dispatch, chat_id]);

  const handleAccountFollow = (userId: string) => {
    handleFollow(userId)(dispatch);
  };

  const handleLeaveChat = () => {
    leaveEventChat(chat.event._id)(dispatch);
    navigate(`/`);
  };

  return (
    <div className={`${styles.currentChatInformation} bg-white`}>
      {!chatsSlice.isLoading && chatsSlice.openedChat ? (
        <div className="d-flex flex-column align-center w-100">
          <div className={styles.profileImgContainer}>
            {chat.type === "personal" && member ? (
              <img
                src={
                  chat.type === "personal"
                    ? member.profileImage.path
                    : chat.event.images[0].path
                }
                alt={
                  chat.type === "personal"
                    ? member?.profileImage.filename
                    : chat.event.images[0].filename
                }
              />
            ) : (
              <img
                src={chatsSlice.openedChat.event.images[0].path}
                alt={chatsSlice.openedChat.event.images[0].filename}
              />
            )}
          </div>
          <h3 className="md secondary-text my-05">
            {chat.type === "personal" && member
              ? member.username
              : chat.event.name}
          </h3>
          {chat.type === "personal" && member ? (
            userSlice.currentUser.following.find(
              (followedUser: UserType) => followedUser._id === member._id
            ) ? (
              <DangerButton
                className="xs w-60 mb-1"
                onClick={() => handleAccountFollow(member._id)}
              >
                Unfollow
              </DangerButton>
            ) : (
              <Button
                className="xs w-60 mb-1"
                onClick={() => handleAccountFollow(member._id)}
              >
                Follow
              </Button>
            )
          ) : (
            <DangerButton className="xs w-60 mb-1" onClick={handleLeaveChat}>
              Leave chat room
            </DangerButton>
          )}
          <div className={styles.chatMembersContainer}>
            <p className="s mb-1">Chat room members</p>
            <div className={styles.chatMembersList}>
              {chat &&
                chat.members &&
                chat.members.map((member) => (
                  <NavLink to={`/account/${member._id}`} key={member._id}>
                    <div
                      className={`d-flex gapX-1 w-100 mb-05 ${styles.chatMember}`}
                    >
                      <div className={styles.profileImgContainer}>
                        <img
                          src={member.profileImage.path}
                          alt={member.profileImage.filename}
                        />
                      </div>
                      <p className="s secondary-text">{member.username}</p>
                    </div>
                  </NavLink>
                ))}
            </div>
          </div>
          <p className="xs secondary-text">
            Chat started: {new Date(chat.createdAt).toLocaleDateString()}
          </p>
        </div>
      ) : (
        <LoadingContainer />
      )}
      <ExitButton className={styles.exitBtn} onClick={() => setShowInfo(false)}>
        <i className="fas fa-times s" />
      </ExitButton>
    </div>
  );
};

export default ChatInformation;
