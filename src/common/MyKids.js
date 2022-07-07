import MomApi from "../helpers/momApi";
import { useEffect, useState } from "react";
function MyKids() {
  const [kids, setKids] = useState([]);

  useEffect(function getKidsOnMount() {
    async function getKids() {

      const kidList = await MomApi.getMyKids();
      setKids(kidList);
    }
    getKids();
  }, [kids]);


  return (<div>
    <ul>
      {kids.map(kid => <li key={kid.id}> {`${kid.first_name} ${kid.last_name}`}</li>)}
    </ul>
  </div>);

}

export default MyKids;