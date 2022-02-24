import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { ChatType, UserType } from "../../utils/types/modelTypes";
import RecentChatCard from "../../styles/styledComponents/Cards/RecentChatCard";

const RecentChat: React.FC<{ chat: ChatType }> = ({ chat }) => {
  const userSlice = useSelector((state: RootState) => state.users);
  return (
    <RecentChatCard>
      <div className="chatCardContainer">
        <div className="profileImgContainer">
          <img
            src={
              chat.type === "personal"
                ? chat.members.find(
                    (member: UserType) =>
                      member._id !== userSlice.currentUser._id
                  )?.profileImage.path
                : chat.event.images[0].path
            }
            alt={
              chat.type === "personal"
                ? chat.members.find(
                    (member: UserType) =>
                      member._id !== userSlice.currentUser._id
                  )?.profileImage.filename
                : chat.event.images[0].filename
            }
          />
        </div>
        <div className="profileTextContainer">
          <p className="secondary-text xs">
            {chat.type === "personal"
              ? chat.members.find(
                  (member: UserType) => member._id !== userSlice.currentUser._id
                )?.username
              : chat.event.name}
          </p>
          <p className="gray-text word-break">
            {chat.messages.length
              ? chat.messages[chat.messages.length - 1].text.slice(0, 30)
              : ""}
          </p>
        </div>
      </div>
    </RecentChatCard>
  );
};

export default RecentChat;
