import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { getUser } from "../../../redux/actions/userActions";
import { ChatType } from "../../../utils/types/modelTypes";
import { uiActionTypes } from "../../../utils/types/actionTypes/uiActionTypes";
import { RootState } from "../../../redux/rootReducer";
import StyledNav from "../../../styles/styledComponents/Layout/StyledNav";
import IconButton from "../../../styles/styledComponents/Buttons/IconButton";

const Nav: React.FC = () => {
  const userSlice = useSelector((state: RootState) => state.users);
  const uiSlice = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChatsLink = () => {
    if (userSlice.currentUser.inChats.length) {
      const recentChats = userSlice.currentUser.inChats
        .filter((chat: ChatType) => chat.messages.length)
        .sort(
          (a: ChatType, b: ChatType) =>
            new Date(b.messages[b.messages.length - 1].createdAt).valueOf() -
            new Date(a.messages[a.messages.length - 1].createdAt).valueOf()
        );
      if (recentChats[0]) {
        navigate(`/chats/${recentChats[0]._id}`);
        return;
      }
      navigate(`/chats/${userSlice.currentUser.inChats[0]._id}`);
      return;
    }
    dispatch({
      type: uiActionTypes.SET_FLASH,
      payload: {
        type: "error",
        message: "No chats found.",
      },
    });
  };
  useEffect(() => {
    getUser()(dispatch);
  }, [dispatch]);

  return (
    <StyledNav showMobile={uiSlice.showMobileMenu}>
      <div className="top-nav px-1 py-05 d-flex white-text container">
        <div className="w-20">
          <IconButton className="d-flex">
            <i className="fas fa-cog white-text s" />
          </IconButton>
        </div>
        <h1 className="mx-auto md">EventFinder</h1>
        <div className="d-flex w-20 justify-end">
          <NavLink to={`/account/${userSlice?.currentUser._id}`}>
            <IconButton className="mr-2">
              <i className="far fa-user white-text s" />
            </IconButton>
          </NavLink>
          {userSlice.currentUser && (
            <IconButton onClick={handleChatsLink}>
              <i className="far fa-comment white-text s" />
            </IconButton>
          )}
        </div>
      </div>
      <div className="bottom-nav px-1 py-05 d-flex justify-center align-center container">
        <NavLink
          end
          to="/create"
          className={({ isActive }) =>
            "nav-link" + (isActive ? " activatedNavHeader" : "")
          }
        >
          <h2 className="top-link s">Create</h2>
          <h2 className="bottom-link s">Create</h2>
        </NavLink>
        <NavLink
          end
          to="/"
          className={({ isActive }) =>
            "nav-link mx-2" + (isActive ? " activatedNavHeader" : "")
          }
        >
          <h2 className="top-link s">Home</h2>
          <h2 className="bottom-link s">Home</h2>
        </NavLink>
        <NavLink
          end
          to="/discover"
          className={({ isActive }) =>
            "nav-link" + (isActive ? " activatedNavHeader" : "")
          }
        >
          <h2 className="top-link s">Discover</h2>
          <h2 className="bottom-link s">Discover</h2>
        </NavLink>
      </div>
    </StyledNav>
  );
};

export default Nav;
