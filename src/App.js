import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import MomApi from "./helpers/MomApi";
import Navbar from "./navigation/Navbar";
import Loading from "./helpers/Loading";
import RoutesList from "./navigation/RoutesList";
import UserContext from "./userContext";
import jwtDecode from "jwt-decode";

/** App renders Navbar component and RoutesList */

const TOKEN_NAME = "parentToken";

function App() {
  const [user, setUser] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [token, setToken] = useState(localStorage.getItem(TOKEN_NAME));

  useEffect(
    function getUserOnMount() {
      async function getUser() {
        if (token) {
          MomApi.token = token;
          const username = jwtDecode(token).sub;
          const userInfo = await MomApi.getUser(username);
          setUser({ ...userInfo, });
        }
        setHasLoaded(true);
      }
      getUser();
    },
    [token]
  );

  /** Make API call to log in user */
  async function handleLogin(formData) {
    const userToken = await MomApi.login(formData);
    if (userToken !== "Incorrect Username Or Password") {
      setToken(userToken);
      localStorage.setItem(TOKEN_NAME, userToken);
      return true;
    }
    return false;
  }

  /** Make API call to sign up user */
  async function handleSignup(formData) {
    const newUserToken = await MomApi.signUp(formData);
    if (newUserToken !== "Username or Email already Exists!") {
      setToken(newUserToken);
      localStorage.setItem(TOKEN_NAME, newUserToken);
      return true;
    }
    return false;
  }

  /** Log user out, reset states and local storage */
  function logout() {
    localStorage.removeItem(TOKEN_NAME);
    setToken("");
    MomApi.token = "";
    setUser(null);
  }

  /* Update user information */
  async function handleUserUpdate(username, formData) {
    const updatedUserInfo = await MomApi.updateUser(username, formData);

    setUser((user) => ({
      ...user,
      ...updatedUserInfo,
    }));

    return updatedUserInfo;
  }

  /* Add a student to the database */
  async function handleAddKid(kid) {
    const newKid = await MomApi.addKid(kid);
    if (user.username !== "school") {
      await MomApi.insertGuardianChild(newKid.id, user.username);
    }
    setUser((user) => ({ ...user }));
    return newKid;
  }

  /* Run covid query for school use */
  async function handleSchoolQuery(formData) {
    const { id, chosenQuery } = formData;
    if (chosenQuery === "Covid-Positive Student Class Contact List") {
      return await MomApi.getCovidClassroomList(id);
    } else if (chosenQuery === "Current County Data - Covid Act Now") {
      return await MomApi.getCurrDataByCounty();
    } else {
      return await MomApi.getCombinedClassCountyData(id);
    }
  }

  /* Submit camp form */
  async function handleCampSubmit(formData) {
    return true;
  }

  return hasLoaded ? (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider
          value={{
            user,
            token,
            handleLogin,
            handleSignup,
            logout,
            handleUserUpdate,
            handleAddKid,
            handleSchoolQuery,
            handleCampSubmit
          }}
        >
          <Navbar />
          <RoutesList />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  ) : (
    <Loading />
  );
}

export default App;
