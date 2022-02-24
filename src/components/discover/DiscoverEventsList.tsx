import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../redux/actions/eventsActions";
import { RootState } from "../../redux/rootReducer";
import { EventType } from "../../utils/types/modelTypes";
import Event from "../cards/Event";
import styles from "../../styles/discover/_discover.module.scss";

const DiscoverEventsList: React.FC<{
  fetchUrl: string;
  sort: { sortBy: string; sort: string };
}> = ({ fetchUrl, sort }) => {
  const dispatch = useDispatch();
  const eventsSlice = useSelector((state: RootState) => state.events);
  useEffect(() => {
    getEvents(fetchUrl)(dispatch);
  }, [dispatch, fetchUrl]);

  const sortEvents = (a: EventType, b: EventType) => {
    if (sort.sortBy === "date" && sort.sort === "-1") {
      return new Date(b.date).valueOf() - new Date(a.date).valueOf();
    } else if (sort.sortBy === "price") {
      return sort.sort === "1" ? a.price - b.price : b.price - a.price;
    } else if (sort.sortBy === "attenders") {
      return sort.sort === "1"
        ? a.attenders.length - b.attenders.length
        : b.attenders.length - a.attenders.length;
    }
    return new Date(a.date).valueOf() - new Date(b.date).valueOf();
  };

  return (
    <div
      className={`d-flex flex-wrap w-100 align-start justify-center mt-2 gapX-2 ${styles.discoverEventsList}`}
    >
      {eventsSlice.events &&
        eventsSlice.events.length &&
        eventsSlice.events
          .sort((a: EventType, b: EventType) => sortEvents(a, b))
          .map((event: EventType) => {
            return (
              <div className={styles.discoverEventContainer} key={event._id}>
                <Event event={event} size="small" />
              </div>
            );
          })}
    </div>
  );
};

export default DiscoverEventsList;
