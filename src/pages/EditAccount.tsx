import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/actions/userActions";
import { RootState } from "../redux/rootReducer";
import EditAccountForm from "../components/edit/EditAccountForm";
import LoadingContainer from "../components/layout/LoadingContainer";

const EditAccount = () => {
  const userSlice = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    getUser()(dispatch);
  }, [dispatch]);

  return (
    <div>
      {!userSlice.isLoading &&
      userSlice.currentUser &&
      userSlice.currentUser.username.length ? (
        <EditAccountForm currentUser={userSlice.currentUser} />
      ) : (
        <LoadingContainer />
      )}
    </div>
  );
};

export default EditAccount;
