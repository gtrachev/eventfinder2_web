import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { handleFollow } from "../../redux/actions/userActions";
import { RootState } from "../../redux/rootReducer";
import { UserType } from "../../utils/types/modelTypes";
import Button from "../../styles/styledComponents/Buttons/Button";
import DangerButton from "../../styles/styledComponents/Buttons/DangerButton";
import styles from "../../styles/home/_recommendedAccount.module.scss";

const RecommendedAccount: React.FC<{ user: UserType }> = ({ user }) => {
  const dispatch = useDispatch();
  const userSlice = useSelector((state: RootState) => state.users);
  const handleAccountFollow = () => {
    handleFollow(user._id)(dispatch);
  };
  
  return (
    <div className={styles.recommendedAccount}>
      <div className={styles.imgContainer}>
        <img src={user.profileImage.path} alt={user.profileImage.filename} />
      </div>
      <NavLink to={`/account/${user._id}`}>
        <p className="s my-05 secondary-text">{user.username}</p>
      </NavLink>
      {userSlice.currentUser.following.find(
        (followedUser: UserType) => followedUser._id === user._id
      ) ? (
        <DangerButton className="xs" onClick={handleAccountFollow}>
          Unfollow
        </DangerButton>
      ) : (
        <Button className="xs" onClick={handleAccountFollow}>
          Follow
        </Button>
      )}
    </div>
  );
};

export default RecommendedAccount;
