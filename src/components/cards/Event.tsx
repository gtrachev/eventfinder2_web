import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { deleteEvent } from "../../redux/actions/eventsActions";
import { handleSave } from "../../redux/actions/userActions";
import { RootState } from "../../redux/rootReducer";
import { uiActionTypes } from "../../utils/types/actionTypes/uiActionTypes";
import { EventType, UserType } from "../../utils/types/modelTypes";
import Button from "../../styles/styledComponents/Buttons/Button";
import DangerButton from "../../styles/styledComponents/Buttons/DangerButton";
import IconButton from "../../styles/styledComponents/Buttons/IconButton";
import EventCard from "../../styles/styledComponents/Cards/EventCard";
import OptionsCard from "../../styles/styledComponents/Cards/OptionsCard";
import LoadingContainer from "../layout/LoadingContainer";
import AccountsCard from "./AccountsCard";
import styles from "../../styles/details/_details.module.scss";

const Event: React.FC<{ event: EventType; size: string }> = ({
  size,
  event,
}) => {
  const userSlice = useSelector((state: RootState) => state.users);
  const [showAttendAccounts, setShowAttendAccounts] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const handleDeleteEvent = () => {
    deleteEvent(event._id)(dispatch);
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

  const followingWhoAttend = userSlice.currentUser.following
    .filter((user: UserType) =>
      user.attending.find(
        (attendedEvent: EventType) => attendedEvent._id === event._id
      )
    )
    .slice(0, 3)
    .sort((a: UserType, b: UserType) => a.followers.length - b.followers.length)
    .map((followingWhoAttend: UserType) => followingWhoAttend.username);

  const showUsers = () => {
    setShowAttendAccounts(true);
    dispatch({
      type: uiActionTypes.SHOW_OVERLAY,
      payload: { show: true, mobile: false },
    });
  };
  const handleEventSave = () => {
    handleSave(event._id)(dispatch);
  };
  const handleShare = () => {
    dispatch({
      type: uiActionTypes.SET_SHARED_EVENT,
      payload: event,
    });
    navigate("/");
    window.scrollTo(0, 0);
  };
  return event && event.author.profileImage ? (
    <>
      <EventCard size={size}>
        <div className="eventHeader p-05">
          <NavLink to={`/account/${event.author._id}`}>
            <div className="profileImgContainer">
              <img
                src={event.author.profileImage.path}
                alt={event.author.profileImage.filename}
              />
            </div>
          </NavLink>
          <div className="profileTextContainer">
            <NavLink to={`/account/${event.author._id}`}>
              <h2 className="xs secondary-text">{event.author.username}</h2>
            </NavLink>
            <p className="gray-text xxs">
              {`${new Date(
                event.created_at
              ).toLocaleDateString()} at ${new Date(
                event.created_at
              ).getHours()}.${new Date(event.created_at).getMinutes()}`}
            </p>
          </div>
          {event.author._id === userSlice.currentUser._id && (
            <IconButton
              className="primary-text xs ml-auto mr-05"
              onClick={() =>
                setShowOptions((prevShowOptions) => !prevShowOptions)
              }
            >
              <i className="fas fa-ellipsis-v" />
            </IconButton>
          )}
        </div>

        <div className="eventCardImageContainer" id="test">
          <img src={event.images[0].path} alt={event.images[0].filename} />
        </div>
        <div className="p-1">
          <div className="mb-1">
            <h1 className="s primary-text mb-1">{event.name}</h1>
            <div className="xs d-flex align-start">
              <p>
                {event.city}, {event.country}
              </p>
              <i className="fas fa-map-marker-alt xs ml-05" />
            </div>
          </div>
          <div className="textContainer mb-1">
            <h3 className="xs">Ticket price: {event.price}$</h3>
            <h3 className="xs">
              {new Date(event.date).toLocaleDateString()} at {event.time}
            </h3>
          </div>
          <p className="mb-1 xs">
            {event.description.slice(0, 200)}
            {event.description.length > 200 && "..."}
          </p>
          <div className="mb-1 w-100 d-flex justify-between">
            <NavLink to={`/events/details/${event._id}`}>
              <Button className="xs">Learn more</Button>
            </NavLink>
            <div>
              {userSlice.currentUser.savedEvents.find(
                (savedEvent: EventType) => savedEvent._id === event._id
              ) ? (
                <IconButton
                  className="primary-text mr-2"
                  onClick={handleEventSave}
                >
                  <i className="fas fa-bookmark md" />
                </IconButton>
              ) : (
                <IconButton
                  className="primary-text mr-2"
                  onClick={handleEventSave}
                >
                  <i className="far fa-bookmark md" />
                </IconButton>
              )}
              <IconButton className="primary-text" onClick={handleShare}>
                <i className="far fa-share-square md" />
              </IconButton>
            </div>
          </div>
          <IconButton onClick={showUsers}>
            <p className="gray-text xxs">
              {followingWhoAttend.length
                ? `Attended by ${followingWhoAttend.join(", ")} and ${
                    event.attenders.length - followingWhoAttend.length
                  } more.`
                : `Attended by ${event.attenders.length} user${
                    event.attenders.length === 1 ? "" : "s"
                  }.`}
            </p>
          </IconButton>
          {showOptions && (
            <OptionsCard className="d-flex flex-column gapY-1">
              <Button
                className="w-100 xs"
                onClick={() => navigate(`/edit/${event._id}`)}
              >
                Edit
              </Button>
              <DangerButton
                className="w-100 xs"
                onClick={() => {
                  setShowDeleteWarning(true);
                  dispatch({
                    type: uiActionTypes.SHOW_OVERLAY,
                    payload: { show: true, mobile: false },
                  });
                }}
              >
                Delete
              </DangerButton>
            </OptionsCard>
          )}
        </div>
      </EventCard>
      {showAttendAccounts && (
        <AccountsCard
          title="Attended by"
          accounts={event.attenders}
          hideCard={() => setShowAttendAccounts(false)}
        />
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
    </>
  ) : (
    <LoadingContainer />
  );
};

export default Event;
