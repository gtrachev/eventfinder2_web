import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowedPosts } from "../redux/actions/postsActions";
import { getRecommendedUsers, getUser } from "../redux/actions/userActions";
import { RootState } from "../redux/rootReducer";
import PostList from "../components/home/PostList";
import RecentChats from "../components/home/RecentChats";
import Shortcuts from "../components/home/Shortcuts";
import RecommendedUsers from "../components/home/RecommendedUsers";
import CreateNote from "../components/home/CreateNote";
import Flash from "../components/flash/Flash";
import LoadingContainer from "../components/layout/LoadingContainer";
import styles from "../styles/home/_home.module.scss";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const postsSlice = useSelector((state: RootState) => state.postsReducer);
  const userSlice = useSelector((state: RootState) => state.users);

  useEffect(() => {
    getFollowedPosts(30)(dispatch);
    getUser()(dispatch);
    getRecommendedUsers()(dispatch);
  }, [dispatch]);

  return !userSlice.isLoading ? (
    userSlice.currentUser && userSlice.currentUser._id ? (
      <div className="secondary-text mt-2 d-flex align-start justify-between">
        <Shortcuts />
        <div className={styles.homeBody}>
          <Flash />
          <CreateNote user={userSlice.currentUser} />
          <h2 className="s secondary-test mb-05">People you may know:</h2>
          <RecommendedUsers recommendedUsers={userSlice.recommendedUsers} />
          {!postsSlice.isLoading ? (
            <PostList posts={postsSlice.followedPosts} />
          ) : (
            <LoadingContainer />
          )}
        </div>
        <RecentChats />
      </div>
    ) : (
      <LoadingContainer />
    )
  ) : (
    <LoadingContainer />
  );
};

export default Home;
