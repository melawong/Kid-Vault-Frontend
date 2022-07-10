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

  if (kids.length >2) {
    console.log("KIDS", kids)
    return (
      <div>
        {kids.map(kid => <KidCard key={kid.id} kid={kid} />)}
      </div>);
  }

  return <p> Loading... </p>

}

export default KidsList;