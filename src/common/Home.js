import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../userContext";

function Home() {
  const { user } = useContext(UserContext);
  return (
    <div className="homepage">
      <div className="col-12">
        {/* <h1 className="homepage-title display-1 fw-bolder pb-5">
          <strong>Kid Vault</strong>
        </h1> */}
        <h3 className="homepage-text fw-bolder pt-4 mt-4">
          A GraphQL API for busy parents.
        </h3>
        {/* {user ? (
          <h4 className="homepage-text fw-bolder">
            Welcome Back, {user.username}!
          </h4>
        ) : (
          <>
            <button className="btn btn-secondary mx-1">
              <Link to={`/login`} style={{ textDecoration: "none" }}>
                Login
              </Link>
            </button>
            <button className="btn btn-secondary mx-1">
              <Link to={`/signup`} style={{ textDecoration: "none" }}>
                Signup
              </Link>
            </button>
          </> */}
        {/* )} */}
      </div>
    </div>
  );
}

export default Home;
