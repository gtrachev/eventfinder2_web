import React from "react";
import Event from "../../components/cards/Event";
import ErrorCard from "../../styles/styledComponents/Cards/ErrorCard";
import Note from "../cards/Note";
import styles from "../../styles/account/_account.module.scss";

const AccountPostsList: React.FC<{ posts: any; errMsg: string }> = ({
  posts,
  errMsg,
}) => {
  return (
    <div className={styles.postsContainer}>
      {posts.length ? (
        posts.map((post: any) => {
          if (post) {
            return <Event event={post} size="big" key={post._id} />;
          } else {
            return <Note note={post} key={post._id} />;
          }
        })
      ) : (
        <ErrorCard className="w-100 mb-2">{errMsg}</ErrorCard>
      )}
    </div>
  );
};

export default AccountPostsList;
