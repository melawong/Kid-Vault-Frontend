import "../App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../userContext";
import Home from "../common/Home";
import AddKidForm from "../common/AddKidForm";
import MyKids from "../common/MyKids";
import UserProfile from "../common/UserProfile";
import LoginForm from "../common/LoginForm";
import SignupForm from "../common/SignupForm";

/** Routes list defines routes for components */

function RoutesList() {
  const { user } = useContext(UserContext);

  function renderRoutes() {
    return user ? (
      <>
        <Route path="/mykids" element={<MyKids />} />
        <Route path="/addkid" element={<AddKidForm />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/logout" element={<Navigate to="/" />} />
      </>
    ) : (
      <>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {renderRoutes()}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default RoutesList;
