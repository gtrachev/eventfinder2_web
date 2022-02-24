import React from "react";
import { EventType } from "../../utils/types/modelTypes";
import Event from "../cards/Event";

const EventsList: React.FC<{ events: EventType[]; eventSize: string }> = ({
  events,
  eventSize,
}) => {
  return (
    <>
      {events.map((event) => (
        <Event event={event} size={eventSize} key={event._id} />
      ))}
    </>
  );
};

export default EventsList;
