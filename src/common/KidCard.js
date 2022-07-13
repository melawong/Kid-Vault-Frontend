import { Link } from "react-router-dom";


/** Displays preview of kid as link to kid detail
 *
 * props - kid
 * state - none
 *
 * KidsList --> { KidCard } --> KidDetail
 */

function KidCard({ kid }) {
  return (
    <Link
      style={{ textDecoration: "none" }}
      to={`/mykids/${kid.id}`}
      className="card text-dark bg-white h-100 w-100"
    >
      <div className="card-img-overla">
        <h5 className="card-title">
          {kid.first_name}<br />{kid.last_name}
        </h5>
          <img className="img-thumbnail card-img-bottom" src={kid.image_url} alt={`${kid.first_name} ${kid.last_name}`} />
      </div>

    </Link>
  );
}

export default KidCard;
