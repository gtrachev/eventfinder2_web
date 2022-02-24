import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../redux/rootReducer";
import { ChatType } from "../../utils/types/modelTypes";
import RecentChat from "../cards/RecentChat";
import styles from "../../styles/home/_recentChats.module.scss";

const RecentChats: React.FC = () => {
  const userSlice = useSelector((state: RootState) => state.users);
  const recentChats = userSlice.currentUser.inChats
    .filter((chat: ChatType) => chat.messages.length)
    .sort(
      (a: ChatType, b: ChatType) =>
        new Date(b.messages[b.messages.length - 1].createdAt).valueOf() -
        new Date(a.messages[a.messages.length - 1].createdAt).valueOf()
    );
  return (
    <div className={styles.recentChatsContainer}>
      <h2 className={`s ${styles.header}`}>Recent chats:</h2>

      <div className={styles.scroll}>
        {recentChats.map((chat: ChatType) => (
          <NavLink to={`/chats/${chat._id}`} key={chat._id}>
            <RecentChat chat={chat} />
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default RecentChats;
