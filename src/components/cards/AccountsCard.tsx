import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserType } from "../../utils/types/modelTypes";
import { RootState } from "../../redux/rootReducer";
import { handleFollow } from "../../redux/actions/userActions";
import { uiActionTypes } from "../../utils/types/actionTypes/uiActionTypes";
import Button from "../../styles/styledComponents/Buttons/Button";
import DangerButton from "../../styles/styledComponents/Buttons/DangerButton";
import ExitButton from "../../styles/styledComponents/Buttons/ExitButton";
import ErrorCard from "../../styles/styledComponents/Cards/ErrorCard";
import styles from "../../styles/cards/_accountsCard.module.scss";

const AccountsCard: React.FC<{
  accounts: UserType[];
  title: string;
  hideCard: () => void;
}> = ({ accounts, title, hideCard }) => {
  const userSlice = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();

  const handleAccountFollow = (userId: string) => {
    handleFollow(userId)(dispatch);
  };

  const hideFollowers = () => {
    dispatch({
      type: uiActionTypes.SHOW_OVERLAY,
      payload: { show: false, mobile: false },
    });
    dispatch({
      type: uiActionTypes.SHOW_FOLLOWERS,
      payload: { show: false, type: "" },
    });
    hideCard();
  };
  return (
    <div>
      <div className={`${styles.accountsContainer} bg-white`}>
        <h2 className="text-center secondary-text s">{title}</h2>
        <div className={styles.accounts}>
          {accounts.length ? (
            accounts.map((account: UserType) => {
              return (
                <div className="d-flex justify-between my-1" key={account._id}>
                  <NavLink to={`/account/${account._id}`}>
                    <div className="d-flex">
                      <div className={styles.profileImageContainer}>
                        <img
                          src={account.profileImage.path}
                          alt={account.profileImage.filename}
                        />
                      </div>
                      <p className="s secondary-text">{account.username}</p>
                    </div>
                  </NavLink>
                  {userSlice.currentUser._id !== account._id &&
                    (userSlice.currentUser.following.find(
                      (followedUser: UserType) =>
                        followedUser._id === account._id
                    ) ? (
                      <DangerButton
                        className="xs"
                        onClick={() => handleAccountFollow(account._id)}
                      >
                        Unfollow
                      </DangerButton>
                    ) : (
                      <Button
                        className="xs"
                        onClick={() => handleAccountFollow(account._id)}
                      >
                        Follow
                      </Button>
                    ))}
                </div>
              );
            })
          ) : (
            <ErrorCard className="mt-1">No users found.</ErrorCard>
          )}
          <ExitButton onClick={hideFollowers}>
            <i className="fas fa-times xs" />
          </ExitButton>
        </div>
      </div>
    </div>
  );
};

export default AccountsCard;
