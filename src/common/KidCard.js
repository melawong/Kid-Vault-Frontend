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
      to={`/mykids/${kid.id}`}
      className="card text-dark bg-white  h-100 w-100"
    >
      <div className="card-body align-center">
        <p>
          <img className="img-thumbnail h-75 w-75" src={kid.image_url} alt={`${kid.first_name} ${kid.last_name}`} />
        </p>
        <h4 className="card-title">
          {kid.first_name} {kid.last_name}
        </h4>
      </div>

    </Link>
  );
}

export default KidCard;
