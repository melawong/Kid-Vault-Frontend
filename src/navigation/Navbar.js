import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../userContext";

/** Navigation bar displays links to routes */

function Navbar() {
  const { user, logout } = useContext(UserContext);

  function renderLinks() {
    return user ? (
      <>
        <li className="nav-item">
          <Link to={`/mykids`} className="nav-link" href="#">
            My Kids
          </Link>
        </li>
        <li className="nav-item">
          <Link to={`/addkid`} className="nav-link" href="#">
            Add A Kid
          </Link>
        </li>
        <li className="nav-item">
          <Link to={`/profile`} className="nav-link" href="#">
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link to={`/logout`} onClick={logout} className="nav-link" href="#">
            Logout {user.username}
          </Link>
        </li>
      </>
    ) : (
      <>
        <li className="nav-item">
          <Link to={`/login`} className="nav-link" href="#">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to={`/signup`} className="nav-link" href="#">
            Signup
          </Link>
        </li>
      </>
    );
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to={`/`} className="navbar-brand" href="#">
            Kid Vault
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor03"
            aria-controls="navbarColor03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor03">
            <ul className="navbar-nav ms-auto">{renderLinks()}</ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
