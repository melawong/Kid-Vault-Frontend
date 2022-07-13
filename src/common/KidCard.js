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
  kid.fullName = `${kid.first_name}`;
  kid.image_url = `${kid.image_url}`;

  return (
    <Link
      to={`/mykids/${kid.id}`}
      style={{ textDecoration: "none", maxWidth: "50rem" }}
      className="card text-dark bg-white mb-3 mx-5 d-flex"
    >
      <div class="container">
        <div class="row">
          <div class="col-sm" className="card-body align-center">
            <p>
              <img className="img-thumbnail" src={kid.image_url} alt={kid.fullName}/>
            </p>
            <h4 className="card-title">
              {kid.fullName}
            </h4>
          </div>
        </div>
      </div>
      
    </Link>
  );
}

export default KidCard;
