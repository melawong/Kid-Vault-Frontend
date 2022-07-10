import { Link } from "react-router-dom";

/** Displays preview of kid as link to kid detail
 *
 * props - kid
 * state - none
 *
 * KidsList --> { KidCard } --> KidDetail
 */

function KidCard({ kid }) {

  kid.imgUrl = "https://www.parsonsphotography.com/assets/img_pages/fall_sample1-86c43874e4eb031c820526b6ba0eafb304b869d1acf9d82981a09fcef7405edc.jpg";
  kid.fullName = `${kid.first_name} ${kid.last_name}`;

  return (
    <Link
      to={`/mykids/${kid.id}`}
      style={{ textDecoration: "none", maxWidth: "50rem" }}
      className="card text-white bg-secondary mb-3 mx-auto d-flex"
    >
      <div className="card-body">
        <h4 className="card-title">
          {kid.fullName}
        </h4>

        <p className="card-text">{kid.fullName}</p>
      </div>
    </Link>
  );
}

export default KidCard;
