import React, { useEffect } from "react";
import Event from "../cards/Event";
import Note from "../cards/Note";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { getEvents } from "../../redux/actions/eventsActions";
import { EventType } from "../../utils/types/modelTypes";
import ErrorCard from "../../styles/styledComponents/Cards/ErrorCard";
import LoadingContainer from "../layout/LoadingContainer";
import styles from "../../styles/home/_postList.module.scss";

const PostList: React.FC<{ posts: [any] }> = ({ posts }) => {
  const dispatch = useDispatch();
  const fetchUrl = `http://eventfinder2-server.herokuapp.com/api/events/popular_events`;
  const eventsSlice = useSelector((state: RootState) => state.events);
  const userSlice = useSelector((state: RootState) => state.users);
  useEffect(() => {
    if (userSlice.currentUser) {
      getEvents(fetchUrl)(dispatch);
    }
  }, [fetchUrl, dispatch]);

  return (
    <div className={styles.postsList}>
      {posts.length ? (
        posts.map((post: any) => {
          if (post.price) {
            return <Event event={post} key={post._id} size="big" />;
          } else {
            return <Note note={post} key={post._id} />;
          }
        })
      ) : (
        <ErrorCard className="w-100 mb-2">
          Start following other users to see more posts.
        </ErrorCard>
      )}
      <h2 className="s secondary-test mb-1">Recommended events:</h2>
      {!eventsSlice.isLoading && eventsSlice.events ? (
        eventsSlice.events.map((event: EventType) => (
          <Event event={event} size={"big"} key={event._id} />
        ))
      ) : (
        <LoadingContainer />
      )}
    </div>
  );
};

export default PostList;
