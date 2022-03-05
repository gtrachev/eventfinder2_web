import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { joinEventChat } from "../../redux/actions/chatsActions";
import { deleteEvent } from "../../redux/actions/eventsActions";
import { RootState } from "../../redux/rootReducer";
import styles from "../../styles/details/_details.module.scss";
import Button from "../../styles/styledComponents/Buttons/Button";
import DangerButton from "../../styles/styledComponents/Buttons/DangerButton";
import IconButton from "../../styles/styledComponents/Buttons/IconButton";
import { uiActionTypes } from "../../utils/types/actionTypes/uiActionTypes";
import { ChatType, EventType } from "../../utils/types/modelTypes";
import AccountsCard from "../cards/AccountsCard";
import Flash from "../flash/Flash";

const DetailsBody: React.FC<{
  eventDetails: EventType;
  setShowMap: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ eventDetails, setShowMap }) => {
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [showAttendAccounts, setShowAttendAccounts] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userSlice = useSelector((state: RootState) => state.users);
  const handleShowMap = () => {
    setShowMap(true);
    dispatch({
      type: uiActionTypes.SHOW_OVERLAY,
      payload: { show: true, mobile: false },
    });
  };
  const handleDeleteEvent = () => {
    deleteEvent(eventDetails._id)(dispatch);
    dispatch({
      type: uiActionTypes.SHOW_OVERLAY,
      payload: { show: false, mobile: false },
    });
    navigate("/");
    dispatch({
      type: uiActionTypes.SET_FLASH,
      payload: { type: "success", message: "Event successfully deleted." },
    });
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

  return (
    <div className={styles.detailsBody}>
      <Flash />
      <h2 className="text-center md mb-1">About the event</h2>
      <p className="s mb-1 fw-300">{eventDetails.description}</p>
      <h2 className="text-center md mb-1">Details</h2>
      <div className={styles.detailsBodyText}>
        <div className="xs">
          <div className={styles.detailsInfoContainer}>
            <p className="">
              <i className="far fa-calendar s mr-05 d-inline-block" />
              Date:{" "}
              <span>{new Date(eventDetails.date).toLocaleDateString()}</span>
            </p>
            <p className="">
              <i className="far fa-clock s mr-05" />
              Starting at: {eventDetails.time}
            </p>
          </div>
          <div className={styles.detailsInfoContainer}>
            <p className="">
              <i className="fas fa-search-dollar s mr-05" />
              Price: {eventDetails.price}$
            </p>
            <IconButton className="xs secondary-text" onClick={showAttenders}>
              <p className="">
                <i className="fas fa-users s mr-05" />
                Attenders: {eventDetails.attenders.length}
              </p>
            </IconButton>
          </div>
          <div className={styles.detailsInfoContainer}>
            <p className="">
              <i className="fas fa-globe s mr-05" />
              Location: {eventDetails.city}, {eventDetails.country}
            </p>
            <p className="">
              <i className="fas fa-user s mr-05" />
              Author: {eventDetails.author.username}
            </p>
          </div>
          <IconButton
            className={`${styles.detailsAddress} secondary-color`}
            onClick={handleShowMap}
          >
            <p className="secondary-text">
              <i className="fas fa-map-marker-alt s mr-05" />
              Address: {eventDetails.address}
            </p>
          </IconButton>
        </div>
      </div>
      {userSlice.currentUser.inChats.find(
        (chat: ChatType) => chat._id === eventDetails.chat._id
      ) ? (
        <Button
          className="xs d-block mt-2"
          onClick={() => navigate(`/chats/${eventDetails.chat._id}`)}
        >
          <p>Events chat room</p>
        </Button>
      ) : (
        <Button className="xs d-block mt-2" onClick={handleJoinChat}>
          <p>Join the events chat room</p>
        </Button>
      )}
      {userSlice.currentUser._id === eventDetails.author._id && (
        <div className="d-flex mt-2">
          <NavLink to={`/edit/${eventDetails._id}`}>
            <Button className="xs mr-1">
              <p>Edit</p>
            </Button>
          </NavLink>
          <DangerButton
            className="xs"
            onClick={() => {
              setShowDeleteWarning(true);
              dispatch({
                type: uiActionTypes.SHOW_OVERLAY,
                payload: { show: true, mobile: false },
              });
            }}
          >
            <p>Delete</p>
          </DangerButton>
        </div>
      )}
      {showDeleteWarning && (
        <div className={`${styles.deleteWarning} bg-white`}>
          <h2 className="s text-center">
            Are you sure you want to delete this event?
          </h2>
          <div className="d-flex mt-2 w-100 justify-between">
            <Button
              className="xs w-30"
              onClick={() => {
                setShowDeleteWarning(false);
                dispatch({
                  type: uiActionTypes.SHOW_OVERLAY,
                  payload: { show: false, mobile: false },
                });
              }}
            >
              <p>No</p>
            </Button>
            <DangerButton className="xs w-30" onClick={handleDeleteEvent}>
              <p>Yes</p>
            </DangerButton>
          </div>
        </div>
      )}
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

export default DetailsBody;
