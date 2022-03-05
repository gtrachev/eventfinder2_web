import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import { Route, Routes } from "react-router-dom";
import { getUser } from "./redux/actions/userActions";
import { RootState } from "./redux/rootReducer";
import RegisterOptions from "./components/auth/RegisterOptions";
import LoginAuthForm from "./components/auth/LoginAuthForm";
import RegisterAuthForm from "./components/auth/RegisterAuthForm";
import AuthLayout from "./components/layout/AuthLayout";
import Layout from "./components/layout/Layout";
import Create from "./pages/Create";
import Details from "./pages/Details";
import Discover from "./pages/Discover";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Edit from "./pages/Edit";
import Error from "./pages/Error";
import EditAccount from "./pages/EditAccount";
import UserChats from "./pages/UserChats";
import "./styles/utilities.scss";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const userSlice = useSelector((state: RootState) => state.users);
  const uiSlice = useSelector((state: RootState) => state.ui);
  const errorSlice = useSelector((state: RootState) => state.errors);
  const navigate = useNavigate();
  useEffect(() => {
    getUser()(dispatch);
    if (!userSlice.isLoading && errorSlice?.error && errorSlice.error.length) {
      navigate("/error");
    }
  }, [dispatch, errorSlice?.error, navigate]);
  if (!userSlice.currentUser) {
    return (
      <AuthLayout>
        <Routes>
          <Route path="/" element={<Navigate to={"/accounts/login"} />} />
          <Route path="/accounts/login" element={<LoginAuthForm />} />
          <Route path="/accounts/tiers" element={<RegisterOptions />} />
          <Route path="/accounts/register" element={<RegisterAuthForm />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </AuthLayout>
    );
  } else {
    return (
      <>
        <Layout>
          <Routes>
            <Route path="/accounts/login" element={<Navigate to={"/"} />} />
            <Route path="/" element={<Home />} />
            <Route path="/events/details/:event_id" element={<Details />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/create" element={<Create />} />
            <Route path="/edit/:event_id" element={<Edit />} />
            <Route path="/account/:user_id" element={<Account />} />
            <Route path="/account/edit" element={<EditAccount />} />
            <Route path="/chats/:chat_id" element={<UserChats />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Layout>
      </>
    );
  }
};

export default App;

// "start": "node --max_old_space_size=2560 node_modules/.bin/react-scripts start",
// "build": "node --max_old_space_size=2560 node_modules/.bin/react-scripts build",
