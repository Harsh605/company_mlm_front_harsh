import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminLists from "./pages/AdminLists";
import Layout from "./Layout/Layout";
import TreeView from "./pages/TreeView";
import { UserLists } from "./pages/UserLists";
import KycPending from "./section/admin/KycPending";
import KycApproved from "./section/admin/KycApproved";
import DashboardPage from "./section/admin/Dashboard/Dashboard";
import { Signup } from "./section/auth/Signup";
import { Login } from "./section/auth/Login";
import AuthLayout from "./Layout/AuthLayout";
import { useDispatch, useSelector } from "react-redux";

import Profile from "./section/UserPanel/Profile";
import SentDocuments from "./section/UserPanel/SendDocument";
import { loadUser } from "./slices/userSlice";
import { useEffect } from "react";
import MyReferral from "./section/UserPanel/MyReferral";
import EmailAuth from "./section/auth/EmailAuth";

function App() {
  const dispatch = useDispatch();
  const { error, isLoading, userData, isAuthenticated } = useSelector(
    (state) => state.userCustom
  );

  useEffect(() => {
    dispatch(loadUser());
  }, []);
  console.log(userData);
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/*" element={<AuthLayout />}>
            <Route
              path="api/v1/verify-user-using-otp/:token"
              element={<EmailAuth />}
            />
            <Route
              path=""
              element={
                isAuthenticated ? (
                  <Navigate to="/admin/dashboard" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="signup"
              element={
                isAuthenticated ? (
                  <Navigate to="/admin/dashboard" />
                ) : (
                  <Signup />
                )
              }
            />
            <Route
              path="login"
              element={
                isAuthenticated ? <Navigate to="/admin/dashboard" /> : <Login />
              }
            />
          </Route>
          <Route exact path="/admin/*" element={<Layout userData={userData} />}>
            <Route
              path="dashboard"
              element={
                isAuthenticated ? (
                  <DashboardPage userData={userData} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="clients"
              element={
                isAuthenticated ? <UserLists /> : <Navigate to="/login" />
              }
            />
            <Route
              path="profile"
              element={
                isAuthenticated ? (
                  <Profile userData={userData} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="send-documents"
              element={
                isAuthenticated ? <SentDocuments /> : <Navigate to="/login" />
              }
            />
            <Route
              path="my-referral"
              element={
                isAuthenticated ? <MyReferral /> : <Navigate to="/login" />
              }
            />
            <Route
              path="myTeam/:id"
              element={
                isAuthenticated ? <TreeView /> : <Navigate to="/login" />
              }
            />
            <Route
              path="allTeam"
              element={
                isAuthenticated ? <TreeView /> : <Navigate to="/login" />
              }
            />
            <Route
              path="kyc/pending"
              element={
                isAuthenticated ? <KycPending /> : <Navigate to="/login" />
              }
            />
            <Route
              path="kyc/verify"
              element={
                isAuthenticated ? <KycApproved /> : <Navigate to="/login" />
              }
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
