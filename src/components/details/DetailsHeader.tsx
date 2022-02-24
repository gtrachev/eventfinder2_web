import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { joinEventChat } from "../../redux/actions/chatsActions";
import { handleAttend } from "../../redux/actions/userActions";
import { RootState } from "../../redux/rootReducer";
import { ChatType, EventType, ImageType } from "../../utils/types/modelTypes";
import Button from "../../styles/styledComponents/Buttons/Button";
import styles from "../../styles/details/_details.module.scss";
import useWindowDimensions from "../../utils/helpers/screenDimesnsions";
import AccountsCard from "../cards/AccountsCard";
import IconButton from "../../styles/styledComponents/Buttons/IconButton";
import { uiActionTypes } from "../../utils/types/actionTypes/uiActionTypes";

const DetailsHeader: React.FC<{ eventDetails: EventType }> = ({
  eventDetails,
}) => {
  const [showAttendAccounts, setShowAttendAccounts] = useState(false);
  const userSlice = useSelector((state: RootState) => state.users);
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAttendEvent = () => {
    handleAttend(eventDetails._id)(dispatch);
  };
  const handleJoinChat = () => {
    joinEventChat(eventDetails._id)(dispatch);
    navigate(`/chats/${eventDetails.chat._id}`);
  };
  const showAttenders = () => {
    setShowAttendAccounts(true);
    dispatch({
      type: uiActionTypes.SHOW_OVERLAY,
      payload: { show: true, mobile: false },
    });
  };
  const handleShare = () => {
    dispatch({
      type: uiActionTypes.SET_SHARED_EVENT,
      payload: eventDetails,
    });
    navigate("/");
    window.scrollTo(0, 0);
  };
  return (
    <div className={styles.detailsHeader}>
      <div className={styles.detailsHeaderImageContainer}>
        {
          <Carousel showThumbs={false} className={styles.carousel}>
            {eventDetails.images.map((image: ImageType) => (
              <div key={image.path}>
                <img
                  src={image.path}
                  alt={image.filename}
                  style={{
                    height:
                      width < 400 ? "30vh" : width >= 600 ? "60vh" : "45vh",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </Carousel>
        }
      </div>
      <div className={styles.detailsHeaderOverlay}></div>
      <div className={styles.detailsHeaderBody}>
        <div>
          <h1 className="mb-1">{eventDetails.name}</h1>
          <p>
            On {new Date(eventDetails.date).toLocaleDateString()} at{" "}
            {eventDetails.time}
          </p>
          <p>
            {eventDetails.city}, {eventDetails.country}
          </p>
          <p>Attendence price: {eventDetails.price}</p>
          <IconButton className="light-text" onClick={showAttenders}>
            <p>{eventDetails.attenders.length} current attenders</p>
          </IconButton>
        </div>
        <div className={styles.detailsHeaderButtons}>
          <Button className="s" onClick={handleAttendEvent}>
            {userSlice?.currentUser.attending.find(
              (attendingEvent: EventType) =>
                attendingEvent._id === eventDetails._id
            )
              ? "Unattend"
              : "Attend"}
            <i className="far fa-calendar-check md" />
          </Button>
          {userSlice.currentUser.inChats.find((chat: ChatType) => {
            return chat._id === eventDetails.chat._id;
          }) ? (
            <Button
              className="s hideMobile"
              onClick={() => navigate(`/chats/${eventDetails.chat._id}`)}
            >
              Events chat room <i className="far fa-comment md" />
            </Button>
          ) : (
            <Button className="s hideMobile" onClick={handleJoinChat}>
              Join events chat room <i className="far fa-comment md" />
            </Button>
          )}
          <Button className="s" onClick={handleShare}>
            Share <i className="far fa-share-square md" />
          </Button>
        </div>
      </div>
      {showAttendAccounts && (
        <AccountsCard
          title="Attended by"
          accounts={eventDetails.attenders}
          hideCard={() => setShowAttendAccounts(false)}
        />
      )}
    </div>
  );
};

export default DetailsHeader;
