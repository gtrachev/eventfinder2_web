import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getDetails } from "../redux/actions/eventsActions";
import { RootState } from "../redux/rootReducer";
import EditEventForm from "../components/edit/EditEventForm";
import LoadingContainer from "../components/layout/LoadingContainer";

const Edit: React.FC = () => {
  const { event_id = "" } = useParams();
  const dispatch = useDispatch();
  const eventsSlice = useSelector((state: RootState) => state.events);
  useEffect(() => {
    getDetails(event_id)(dispatch);
  }, [event_id, dispatch]);
  return (
    <div>
      {!eventsSlice.isLoading &&
      eventsSlice.eventDetails &&
      eventsSlice.eventDetails.name.length ? (
        <EditEventForm eventDetails={eventsSlice.eventDetails} />
      ) : (
        <LoadingContainer />
      )}
    </div>
  );
};

export default Edit;
