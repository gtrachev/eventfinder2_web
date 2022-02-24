import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { createReview } from "../../../redux/actions/eventsActions";
import { RootState } from "../../../redux/rootReducer";
import { EventType } from "../../../utils/types/modelTypes";
import IconButton from "../../../styles/styledComponents/Buttons/IconButton";
import ErrorCard from "../../../styles/styledComponents/Cards/ErrorCard";
import resizeTextarea from "../../../utils/helpers/resizeTextarea";
import DetailsComment from "./DetailsComment";
import styles from "../../../styles/details/_details.module.scss";

const DetailsComments: React.FC<{ eventDetails: EventType }> = ({
  eventDetails,
}) => {
  const currentUser = useSelector(
    (state: RootState) => state.users?.currentUser
  );
  const dispatch = useDispatch();
  const initialValues = {
    commentBody: "",
  };
  const validationSchema = yup.object().shape({
    commentBody: yup.string().required().min(1).max(250),
  });
  const handleCreate = async (commentBody: string) => {
    createReview({ text: commentBody }, eventDetails._id)(dispatch);
  };

  return (
    <div className={styles.detailsComments}>
      <div className={styles.detailsCommentsCreate}>
        <div className={`${styles.profileImgContainer} mr-1`}>
          <img
            src={currentUser.profileImage.path}
            alt={currentUser.profileImage.filename}
          />
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => handleCreate(values.commentBody)}
        >
          {(props) => {
            return (
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  props.handleSubmit();
                }}
                className="w-100 d-flex align-start"
              >
                <textarea
                  name="commentBody"
                  value={props.values["commentBody"]}
                  onChange={(e) => {
                    props.handleChange(e);
                    resizeTextarea(e);
                  }}
                  onBlur={props.handleBlur}
                  className={styles.commentInput}
                  placeholder="Leave a comment"
                  rows={1}
                />
                <IconButton
                  type="submit"
                  className="w-10 d-flex justify-center"
                >
                  <i className="fas fa-paper-plane s primary-text"></i>
                </IconButton>
              </Form>
            );
          }}
        </Formik>
      </div>
      {eventDetails.reviews && eventDetails.reviews.length ? (
        eventDetails.reviews.map((review) => (
          <DetailsComment
            comment={review}
            eventId={eventDetails._id}
            key={review._id}
          />
        ))
      ) : (
        <ErrorCard>
          <p className="xs">No comments found</p>
        </ErrorCard>
      )}
    </div>
  );
};

export default DetailsComments;
