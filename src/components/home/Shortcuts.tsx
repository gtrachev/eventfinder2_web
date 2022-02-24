import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { uiActionTypes } from "../../utils/types/actionTypes/uiActionTypes";
import ShortcutCard from "../../styles/styledComponents/Cards/ShortcutCard";
import styles from "../../styles/home/_shortcuts.module.scss";

const Shortcuts: React.FC = () => {
  const userSlice = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleShortcutFollowers = (type: string) => {
    navigate(`/account/${userSlice?.currentUser._id}`);
    dispatch({
      type: uiActionTypes.SHOW_FOLLOWERS,
      payload: {
        type,
        show: true,
      },
    });
    dispatch({
      type: uiActionTypes.SHOW_OVERLAY,
      payload: { show: true, mobile: false },
    });
  };

  const handleShortcutListIndex = (listIndex: number) => {
    navigate(`/account/${userSlice?.currentUser._id}`);
    dispatch({
      type: uiActionTypes.SET_ACCOUNT_LIST_INDEX,
      payload: listIndex,
    });
  };

  return (
    <div className={styles.shortcutsContainer}>
      <h2 className={styles.header}>Shortcuts:</h2>
      <div className={styles.scroll}>
        <NavLink to={`/account/${userSlice?.currentUser._id}`}>
          <ShortcutCard className="secondary-text">
            <p className="xs ml-1">Profile</p>
            <i className="fas fa-user s" />
          </ShortcutCard>
        </NavLink>
        <ShortcutCard onClick={() => handleShortcutFollowers("followers")}>
          <p className="xs ml-1">Followers</p>
          <i className="fas fa-users s" />
        </ShortcutCard>
        <ShortcutCard onClick={() => handleShortcutFollowers("following")}>
          <p className="xs ml-1">Following</p>
          <i className="fas fa-user-plus s" />
        </ShortcutCard>
        <ShortcutCard onClick={() => handleShortcutListIndex(0)}>
          <p className="xs ml-1">Your posts</p>
          <i className="fas fa-calendar-plus s" />
        </ShortcutCard>
        <ShortcutCard onClick={() => handleShortcutListIndex(1)}>
          <p className="xs ml-1">Attending</p>
          <i className="fas fa-clipboard-check s" />
        </ShortcutCard>
        <ShortcutCard onClick={() => handleShortcutListIndex(2)}>
          <p className="xs ml-1">Saved posts</p>
          <i className="fas fa-bookmark s" />
        </ShortcutCard>
        <ShortcutCard onClick={() => handleShortcutListIndex(3)}>
          <p className="xs ml-1">Liked notes</p>
          <i className="fas fa-heart s" />
        </ShortcutCard>
      </div>
    </div>
  );
};

export default Shortcuts;
