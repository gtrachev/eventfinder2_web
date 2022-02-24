import { Formik, Form, Field } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import * as yup from "yup";
import {
  getRecommendedUsers,
  handleFollow,
} from "../../redux/actions/userActions";
import { RootState } from "../../redux/rootReducer";
import { UserType } from "../../utils/types/modelTypes";
import { uiActionTypes } from "../../utils/types/actionTypes/uiActionTypes";
import accountCardStyles from "../../styles/cards/_accountsCard.module.scss";
import Button from "../../styles/styledComponents/Buttons/Button";
import DangerButton from "../../styles/styledComponents/Buttons/DangerButton";
import ExitButton from "../../styles/styledComponents/Buttons/ExitButton";
import InputSearchField from "../../utils/formik/InputSearchField";

const DiscoverFindUsers: React.FC<{
  setShowFindUsers: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setShowFindUsers }) => {
  const userSlice = useSelector((state: RootState) => state.users);
  const [recommendedUsers, setRecommendedUsers] = useState<any>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    getRecommendedUsers()(dispatch);
  }, []);

  const handleAccountFollow = (userId: string) => {
    handleFollow(userId)(dispatch);
  };

  const initialValues = {
    search: "",
  };
  const validationSchema = yup.object().shape({
    search: yup.string().required().min(1).max(50),
  });

  const handleSearch = (values: { search: string }) => {
    if (!values.search.length) {
      setRecommendedUsers([]);
      return;
    } else {
      const searchRegex = new RegExp(values.search, "gi");
      setRecommendedUsers(
        userSlice.recommendedUsers.filter((recommendedUser: UserType) =>
          recommendedUser.username.match(searchRegex)
        )
      );
    }
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
    setShowFindUsers(false);
  };
  return (
    <div className={`${accountCardStyles.accountsContainer} bg-white`}>
      <h2 className="text-center secondary-text s">Find users</h2>
      <div>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => handleSearch(values)}
          validationSchema={validationSchema}
        >
          {(props) => {
            return (
              <Form
                className="w-100 mt-1"
                onSubmit={(e) => {
                  e.preventDefault();
                  props.handleSubmit();
                }}
              >
                <Field
                  name="search"
                  changeHandler={true}
                  component={InputSearchField}
                />
              </Form>
            );
          }}
        </Formik>
        <div className={accountCardStyles.accounts}>
          {recommendedUsers.length ? (
            recommendedUsers.map((user: UserType) => {
              return (
                <div className="d-flex justify-between my-1" key={user._id}>
                  <NavLink to={`/account/${user._id}`}>
                    <div className="d-flex">
                      <div className={accountCardStyles.profileImageContainer}>
                        <img
                          src={user.profileImage.path}
                          alt={user.profileImage.filename}
                        />
                      </div>
                      <p className="s secondary-text">{user.username}</p>
                    </div>
                  </NavLink>
                  {userSlice.currentUser._id !== user._id &&
                    (userSlice.currentUser.following.find(
                      (followedUser: UserType) => followedUser._id === user._id
                    ) ? (
                      <DangerButton
                        className="xs"
                        onClick={() => handleAccountFollow(user._id)}
                      >
                        Unfollow
                      </DangerButton>
                    ) : (
                      <Button
                        className="xs"
                        onClick={() => handleAccountFollow(user._id)}
                      >
                        Follow
                      </Button>
                    ))}
                </div>
              );
            })
          ) : (
            <p className="text-center gray-text mt-1 xs">No users found</p>
          )}
        </div>
        <ExitButton onClick={hideFollowers}>
          <i className="fas fa-times xs" />
        </ExitButton>
      </div>
    </div>
  );
};

export default DiscoverFindUsers;
