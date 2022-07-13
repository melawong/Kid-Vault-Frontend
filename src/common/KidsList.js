import KidCard from "./KidCard";
import { useEffect, useState, useContext } from "react";
import UserContext from "../userContext";
import MomApi from "../helpers/momApi";

function KidsList() {
  const { user } = useContext(UserContext);
  const [kids, setKids] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(function getKidsOnMount() {
    async function getKids() {
      if (user.username === "school") {
        const allKids = await MomApi.getAllKids();
        setKids(allKids);
      } else {
        const userKids = user.students_list;
        setKids(userKids);
      }
      setHasLoaded(true);
    }
    getKids();
  }, []);

  return hasLoaded ? (
    <div className="row display-flex flex-wrap">
      {kids.map(kid =>
        <div className="col-2 ms-2 my-2">
          <KidCard key={kid.id} kid={kid} />
        </div>)}
    </div>
  )
    :
    <p> Loading... </p>;

}

export default KidsList;