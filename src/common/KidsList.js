import MomApi from "../helpers/momApi";
import KidCard from "./KidCard";
import { useEffect, useState } from "react";

function KidsList() {
  const [kids, setKids] = useState([]);

  useEffect(function getKidsOnMount() {
    async function getKids() {

      const kidList = await MomApi.getMyKids();
      setKids(kidList);
    }
    getKids();
  }, []);

  if (kids.length) {
    return (
      <div className="row">
        {kids.map(kid => <div className="col-2 ms-2 my-2">
          <KidCard key={kid.id} kid={kid} />
        </div>)}
      </div>);
  }

  return <p> Loading... </p>;

}

export default KidsList;