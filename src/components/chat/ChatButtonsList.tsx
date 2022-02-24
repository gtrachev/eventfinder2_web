import React from "react";
import { ChatType } from "../../utils/types/modelTypes";
import ChatButton from "./ChatButton";

const ChatButtonsList: React.FC<{ inChats: ChatType[] }> = ({ inChats }) => {
  return (
    <div>
      {inChats.map((chat) => (
        <ChatButton chat={chat} key={chat._id} />
      ))}
    </div>
  );
};

export default ChatButtonsList;
