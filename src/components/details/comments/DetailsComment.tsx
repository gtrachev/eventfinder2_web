import React, { useState } from "react";
import { ReviewType } from "../../../utils/types/modelTypes";
import ExitButton from "../../../styles/styledComponents/Buttons/ExitButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import { deleteReview } from "../../../redux/actions/eventsActions";
import { uiActionTypes } from "../../../utils/types/actionTypes/uiActionTypes";
import Button from "../../../styles/styledComponents/Buttons/Button";
import DangerButton from "../../../styles/styledComponents/Buttons/DangerButton";
import styles from "../../../styles/details/_details.module.scss";

const DetailsComment: React.FC<{ comment: ReviewType; eventId: string }> = ({
  comment,
  eventId,
}) => {
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const dispatch = useDispatch();
  const handleDeleteComment = () => {
    deleteReview(comment._id, eventId)(dispatch);
    dispatch({
      type: uiActionTypes.SHOW_OVERLAY,
      payload: { show: false, mobile: false },
    });
  };
  const userSlice = useSelector((state: RootState) => state.users);
  return (
    <div className="d-flex gapX-1 justify-start align-start mb-2 pos-relative">
      <div className={styles.profileImgContainer}>
        <img
          src={comment.author.profileImage.path}
          alt={comment.author.profileImage.filename}
        />
      </div>
      <div className={styles.detailsCommentsBody}>
        <p className="xs primary-text">{comment.author.username}</p>
        <p className="xs mb-05 word-break">{comment.text}</p>
        <p className="gray-text xxs">
          {new Date(comment.postedDate!).toLocaleDateString()}
        </p>
      </div>
      {comment.author._id === userSlice.currentUser._id && (
        <ExitButton
          className={styles.exitBtn}
          onClick={() => {
            setShowDeleteWarning(true);
            dispatch({
              type: uiActionTypes.SHOW_OVERLAY,
              payload: { show: true, mobile: false },
            });
          }}
        >
          <i className="fas fa-times xs" />
        </ExitButton>
      )}
      {showDeleteWarning && (
        <div className={`${styles.deleteWarning} bg-white`}>
          <h2 className="s text-center">
            Are you sure you want to delete your comment?
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
            <DangerButton className="xs w-30" onClick={handleDeleteComment}>
              <p>Yes</p>
            </DangerButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsComment;
