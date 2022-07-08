import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MomApi from "../helpers/momApi";

/** Renders detail on kid based on handle parameter. Makes API call.
 *
 * State
 * - kid
 *
 * Effect:
 * - set kid on mount
 *
 * RoutesList --> KidsList --> { KidDetail }
 */

function KidDetail() {

  const params = useParams();
  const [kid, setKid] = useState({});

  kid.imgUrl = "https://www.parsonsphotography.com/assets/img_pages/fall_sample1-86c43874e4eb031c820526b6ba0eafb304b869d1acf9d82981a09fcef7405edc.jpg";
  kid.fullName = `${kid.first_name} ${kid.last_name}`;

  /** API call to retrieve single kid on initial render */
  useEffect(function getKidOnMount() {
    async function getKid() {
      const c = await MomApi.getKid(params.id);
      setKid({ ...c });
    }
    getKid();
  }, [params.id]);

  /** Displays company details and JobsCardList of associated jobs */
  function renderKidDetails() {
    if (Object.keys(kid).length === 0) {
      return <i>Loading...</i>;
    } else {
      return (
        <>
          <img src={kid.imgUrl} alt={kid.fullName} />
          <h1 className="mt-3 display-5">{kid.fullName}</h1>
          <h5 className="mb-3 fw-light">{kid.classroom}</h5>
          <p className="mb-3 fw-light">{kid.birth_date}</p>
        </>
      );
    }
  }

  return (
    <>
      <div>{renderKidDetails()}</div>
    </>
  );
}


export default KidDetail;