import { useContext } from "react";
import UserContext from "../userContext";

function Home() {
  const { user } = useContext(UserContext);
  return (
    <div className="homepage row">
      <div className="col-6"></div>
      <div className="col-6">
        <h3 className="homepage-title fw-bolder pt-4 mt-4">
          A GraphQL API for busy parents
        </h3>
        {user ? (
          <h4 className="homepage-text fw-bolder text-right">
            Welcome Back, {user.first_name}!
          </h4>
        ) : ""}
      </div>
    </div>
  );
}

export default Home;
