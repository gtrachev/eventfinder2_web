import { FormikHelpers } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { io } from "socket.io-client";
import { getChat } from "../../redux/actions/chatsActions";
import { RootState } from "../../redux/rootReducer";
import { ChatType, MessageType, UserType } from "../../utils/types/modelTypes";
import ChatMessage from "./ChatMessage";
import CurrentChatHeader from "./CurrentChatHeader";
import CurrentChatForm from "./CurrentChatForm";
import ErrorCard from "../../styles/styledComponents/Cards/ErrorCard";
import LoadingContainer from "../layout/LoadingContainer";
import styles from "../../styles/chat/_userChats.module.scss";

const CurrentChat: React.FC<{
  setShowInfo: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setShowInfo }) => {
  const { chat_id = "" } = useParams();
  const chatsSlice = useSelector((state: RootState) => state.chats);
  const userSlice = useSelector((state: RootState) => state.users);
  const [newMessages, setNewMessages] = useState<MessageType[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<
    { user_id: string; socketId: string }[]
  >([]);
  const socket = useRef<any>();
  const dispatch = useDispatch();
  const messageScroll = useRef<HTMLDivElement>(null);
  const apiUrl =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://eventfinder2-server.herokuapp.com";

  //get current chat
  useEffect(() => {
    getChat(chat_id)(dispatch);
  }, [dispatch, chat_id]);

  useEffect(() => {
    if (messageScroll.current) {
      messageScroll.current.scrollTop = messageScroll.current.scrollHeight;
    }
  }, [newMessages, chatsSlice.openedChat?.messages]);

  //connect user to socket
  //respond on getMessage
  useEffect(() => {
    socket.current = io(apiUrl);
    socket.current.on("getMessage", (newMessage: MessageType) => {
      setNewMessages((prevMessages) => {
        return [...prevMessages, newMessage];
      });
    });
    return () => {
      setNewMessages([]);
    };
  }, [apiUrl]);

  //emit joinRoom so that user joins the chat room
  //respond on getOnlineUsers to get online users
  useEffect(() => {
    socket.current.emit("joinRoom", {
      userId: userSlice.currentUser._id,
      chatId: chat_id,
    });
    setNewMessages([]);
    return () => {
      setOnlineUsers([]);
    };
  }, [userSlice.currentUser._id, chatsSlice.openedChat]);

  useEffect(() => {
    socket.current.on(
      "getOnlineUsers",
      (onlineUsers: { user_id: string; socketId: string }[]) => {
        setOnlineUsers(onlineUsers);
      }
    );
  }, [chat_id]);

  const handleSendMessage = (
    values: { text: string },
    actions: FormikHelpers<{
      text: string;
    }>
  ) => {
    socket.current.emit("sendMessage", {
      message: values.text,
      chatId: chat_id,
      senderId: userSlice.currentUser._id,
    });
    actions.resetForm();
  };

  return (
    <div className={styles.currentChat}>
      {!chatsSlice.isLoading ? (
        chatsSlice.openedChat &&
        (userSlice.currentUser.inChats.find(
          (chat: ChatType) => chat._id === chatsSlice.openedChat._id
        ) ? (
          <>
            <CurrentChatHeader
              chat={chatsSlice.openedChat}
              setShowInfo={setShowInfo}
            />
            <div className={styles.currentChatMessages} ref={messageScroll}>
              <p className="gray-text my-1 md text-center">
                {chatsSlice.openedChat.type === "personal"
                  ? `Welcome to you and ${
                      chatsSlice.openedChat.members.find(
                        (member: UserType) =>
                          member._id !== userSlice.currentUser._id
                      )?.username
                    }'s chatroom.`
                  : `Welcome to ${chatsSlice.openedChat.event.name}'s chatroom.`}
              </p>
              {[...chatsSlice.openedChat.messages, ...newMessages]
                .sort(
                  (a: MessageType, b: MessageType) =>
                    a.createdAt.valueOf() - b.createdAt.valueOf()
                )
                .map((message: MessageType) => (
                  <ChatMessage
                    isAuthor={message.author._id === userSlice.currentUser._id}
                    chatMessage={message}
                    key={message._id}
                  />
                ))}
            </div>
            <CurrentChatForm handleSendMessage={handleSendMessage} />
          </>
        ) : (
          <ErrorCard className="mt-2 mx-2">
            Not member of this chat room.
          </ErrorCard>
        ))
      ) : (
        <LoadingContainer />
      )}
    </div>
  );
};

export default CurrentChat;
