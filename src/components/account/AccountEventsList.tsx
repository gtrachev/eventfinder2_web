import React from "react";
import { EventType } from "../../utils/types/modelTypes";
import Event from "../cards/Event";
import ErrorCard from "../../styles/styledComponents/Cards/ErrorCard";
import styles from "../../styles/account/_account.module.scss";

const AccountEventsList: React.FC<{ events: EventType[]; errMsg: string }> = ({
  events,
  errMsg,
}) => {
  return (
    <div className={styles.postsContainer}>
      {events.length ? (
        events.map((event: EventType) => (
          <Event event={event} size="big" key={event._id} />
        ))
      ) : (
        <ErrorCard className="w-100 mb-2">{errMsg}</ErrorCard>
      )}
    </div>
  );
};

export default AccountEventsList;
