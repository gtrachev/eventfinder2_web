import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { handleUserLikeNote } from "../../redux/actions/userActions";
import { RootState } from "../../redux/rootReducer";
import { uiActionTypes } from "../../utils/types/actionTypes/uiActionTypes";
import { NoteType, UserType } from "../../utils/types/modelTypes";
import IconButton from "../../styles/styledComponents/Buttons/IconButton";
import NoteCard from "../../styles/styledComponents/Cards/NoteCard";
import AccountsCard from "./AccountsCard";
import Event from "./Event";
import Button from "../../styles/styledComponents/Buttons/Button";
import DangerButton from "../../styles/styledComponents/Buttons/DangerButton";
import OptionsCard from "../../styles/styledComponents/Cards/OptionsCard";
import styles from "../../styles/details/_details.module.scss";
import { deleteNote } from "../../redux/actions/notesActions";

const Note: React.FC<{ note: NoteType }> = ({ note }) => {
  const userSlice = useSelector((state: RootState) => state.users);
  const [showLikedAccounts, setShowLikedAccounts] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLikeNote = () => {
    handleUserLikeNote(note._id)(dispatch);
  };
  const followingWhoLiked = userSlice.currentUser.following
    .filter((user: UserType) =>
      user.likedNotes.find((likedNote: NoteType) => likedNote._id === note._id)
    )
    .slice(0, 3)
    .sort((a: UserType, b: UserType) => a.followers.length - b.followers.length)
    .map((followingWhoLiked: UserType) => followingWhoLiked.username);
  const showUsers = () => {
    setShowLikedAccounts(true);
    dispatch({
      type: uiActionTypes.SHOW_OVERLAY,
      payload: { show: true, mobile: false },
    });
  };
  const handleDeleteNote = () => {
    deleteNote(note._id)(dispatch);
    dispatch({
      type: uiActionTypes.SHOW_OVERLAY,
      payload: { show: false, mobile: false },
    });
    dispatch({
      type: uiActionTypes.SET_FLASH,
      payload: { type: "success", message: "Note successfully deleted." },
    });
    navigate("/");
  };
  return (
    <>
      <NoteCard>
        <div className="noteHeader">
          <NavLink to={`/account/${note.author._id}`}>
            <div className="profileImgContainer">
              <img
                src={note.author.profileImage.path}
                alt={note.author.profileImage.filename}
              />
            </div>
          </NavLink>
          <div className="profileTextContainer">
            <NavLink to={`/account/${note.author._id}`}>
              <h2 className="s secondary-text">{note.author.username}</h2>
            </NavLink>
            <p className="gray-text">
              {`${new Date(note.created_at).toLocaleDateString()} at ${new Date(
                note.created_at
              ).getHours()}.${new Date(note.created_at).getMinutes()}`}
            </p>
          </div>
          {note.author._id === userSlice.currentUser._id && (
            <IconButton
              className="optionsBtn primary-text xs ml-auto mr-05"
              onClick={() =>
                setShowOptions((prevShowOptions) => !prevShowOptions)
              }
            >
              <i className="fas fa-ellipsis-v" />
            </IconButton>
          )}
        </div>
        <div className="noteBody mb-1">
          <p className="mb-05 mt-1 xs">{note.body}</p>
        </div>
        {note.shared_event && (
          <div>
            <p className="mb-05 primary-text s">Sharing:</p>
            <Event event={note.shared_event} size="big" />
          </div>
        )}
        <div className="w-100 d-flex justify-between align-center">
          <IconButton onClick={showUsers}>
            <p className="gray-text xxs">
              {followingWhoLiked.length
                ? `Liked by ${followingWhoLiked.join(", ")} and ${
                    note.likedBy.length - followingWhoLiked.length
                  } more.`
                : `Liked by ${note.likedBy.length} user${
                    note.likedBy.length === 1 ? "" : "s"
                  }.`}
            </p>
          </IconButton>
          <div>
            {userSlice.currentUser.likedNotes.find(
              (likedNote: NoteType) => likedNote._id === note._id
            ) ? (
              <IconButton className="primary-text" onClick={handleLikeNote}>
                <i className="fas fa-heart md" />
              </IconButton>
            ) : (
              <IconButton className="primary-text" onClick={handleLikeNote}>
                <i className="far fa-heart md" />
              </IconButton>
            )}
          </div>
        </div>
        {showOptions && (
          <OptionsCard className="d-flex flex-column gapY-1">
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
      </NoteCard>
      {showLikedAccounts && (
        <AccountsCard
          title="Liked by"
          accounts={note.likedBy}
          hideCard={() => setShowLikedAccounts(false)}
        />
      )}
      {showDeleteWarning && (
        <div className={`${styles.deleteWarning} bg-white`}>
          <h2 className="s text-center">
            Are you sure you want to delete this note?
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
            <DangerButton className="xs w-30" onClick={handleDeleteNote}>
              <p>Yes</p>
            </DangerButton>
          </div>
        </div>
      )}
    </>
  );
};

export default Note;
