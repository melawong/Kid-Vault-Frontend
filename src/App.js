import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import MomApi from "./helpers/momApi";
import Navbar from "./navigation/Navbar";
import RoutesList from "./navigation/RoutesList";
import UserContext from "./userContext";
// import JoblyApi from "./helpers/joblyApi";
import jwtDecode from "jwt-decode";

/** App renders Navbar component and RoutesList */

const TOKEN_NAME = "joblyToken";

function App() {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [token, setToken] = useState(localStorage.getItem(TOKEN_NAME));

  useEffect(
    function getUserOnMount() {
      async function getUser() {
        // if (token) {
        //   JoblyApi.token = token;
        //   const username = jwtDecode(token).username;
        //   const userInfo = await JoblyApi.getUser(username);
        //   // want an array of job objects. we have array of job ids
        //   const jobPromises = userInfo.applications.map((id) =>
        //     JoblyApi.getJob(id)
        //   );
        //   const jobs = await Promise.all(jobPromises);
        //   setUser({
        //     ...userInfo,
        //     applications: new Set(userInfo.applications),
        //     jobs,
        //   });
        // }
        setUser(true);
        setLoaded(true);
      }
      getUser();
    },
    // [token]
    []
  );

  // /** Make API call to log in user */

  // async function handleLogin(formData) {
  //   const userToken = await JoblyApi.login(formData);
  //   setToken(userToken);
  //   localStorage.setItem(TOKEN_NAME, userToken);
  // }

  /** Make API call to sign up user */

  async function handleSignup(formData) {
    const newUserToken = await MomApi.signUp(formData);
    setToken(newUserToken);
    localStorage.setItem(TOKEN_NAME, newUserToken);
  }

  /** Log user out, reset states and local storage */
  function logout() {
    localStorage.removeItem(TOKEN_NAME);
    setToken("");
    MomApi.token = "";
    setUser(null);
  }

  async function handleUserUpdate(username, formData) {
    const updatedUserInfo = await MomApi.updateUser(username, formData);

    setUser((user) => ({
      ...user,
      ...updatedUserInfo,
    }));

    return updatedUserInfo;
  }

  async function handleAddKid(kid) {
    const newKid = await MomApi.addKid(kid);

    setUser((user) => ({
      ...user,
      kids: new Set([...user.kids, newKid]),
    }));
    return newKid;
  }

  return loaded ? (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider
          value={{
            user,
            // token,
            // handleLogin,
            handleSignup,
            logout,
            handleUserUpdate,
            handleAddKid,
          }}
        >
          <Navbar />
          <RoutesList />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default App;
