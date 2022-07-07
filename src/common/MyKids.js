import MomApi from "../helpers/momApi";
import { useEffect, useState } from "react";
import axios from "axios";

function MyKids() {
  const [kids, setKids] = useState([]);

  useEffect(function getKidsOnMount() {
    async function getKids() {

      const response = await axios({
        url: process.env.REACT_APP_BASE_URL,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.REACT_APP_API_KEY,
        },
        data: { query: '{myQuery {first_name last_name}}' },
      }).then(result => result.data.data);

      setKids(response.myQuery);
    }
    getKids();
  }, []);


  return (<div>
    <ul>
      {kids.map(kid => <li> {`${kid.first_name} ${kid.last_name}`}</li>)}
    </ul>
  </div>);

}

export default MyKids;