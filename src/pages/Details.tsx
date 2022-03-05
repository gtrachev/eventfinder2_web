import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getDetails } from "../redux/actions/eventsActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { uiActionTypes } from "../utils/types/actionTypes/uiActionTypes";
import DetailsHeader from "../components/details/DetailsHeader";
import DetailsBody from "../components/details/DetailsBody";
import DetailsComments from "../components/details/comments/DetailsComments";
import LoadingContainer from "../components/layout/LoadingContainer";
import styles from "../styles/details/_details.module.scss";

const Details: React.FC = () => {
  const { event_id } = useParams();
  const dispatch = useDispatch();
  const [showMap, setShowMap] = useState(false);
  const events = useSelector((state: RootState) => state.events);
  const eventDetails = events.eventDetails;

  const closeMap = () => {
    setShowMap(false);
    dispatch({
      type: uiActionTypes.SHOW_OVERLAY,
      payload: { show: false, mobile: false },
    });
  };

  useEffect(() => {
    getDetails(event_id!)(dispatch);
  }, [event_id, dispatch]);

  return !events.isLoading && eventDetails && eventDetails.name ? (
    <div className={styles.details}>
      <DetailsHeader eventDetails={eventDetails} />
      <DetailsBody eventDetails={eventDetails} setShowMap={setShowMap} />
      <DetailsComments eventDetails={eventDetails} />;
      {/* {showMap && (
        <DetailsMap
          coordinates={[
            eventDetails.geometry.coordinates[0],
            eventDetails.geometry.coordinates[1],
          ]}
          address={eventDetails.address}
          closeMap={closeMap}
        />
      )} */}
    </div>
  ) : (
    <LoadingContainer />
  );
};

export default Details;
