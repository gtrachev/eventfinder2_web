import React from "react";
import { UserType } from "../../utils/types/modelTypes";
import RecommendedAccount from "../cards/RecommendedAccount";
import styles from "../../styles/home/_accountsList.module.scss";

const RecommendedUsers: React.FC<{ recommendedUsers: UserType[] }> = ({
  recommendedUsers,
}) => {
  return (
    <div className={`d-flex justify-between gap-1 mb-2 ${styles.accountList}`}>
      {recommendedUsers &&
        recommendedUsers.length &&
        recommendedUsers.map((user: UserType) => (
          <RecommendedAccount user={user} key={user._id} />
        ))}
    </div>
  );
};

export default RecommendedUsers;
