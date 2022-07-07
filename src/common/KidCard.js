import { Link } from "react-router-dom";

/** Displays company information as link to company detail
 *
 * props - company
 * state - none
 *
 * CompaniesList --> { CompanyCard } --> CompanyDetail
 */

function KidCard({ kid }) {

  kid.imgUrl = "https://www.parsonsphotography.com/assets/img_pages/fall_sample1-86c43874e4eb031c820526b6ba0eafb304b869d1acf9d82981a09fcef7405edc.jpg";
  kid.fullName = `${kid.first_name} ${kid.last_name}`;

  return (
    <Link
      to={`/`}
      style={{ textDecoration: "none", maxWidth: "50rem" }}
      className="card border-light mb-3 mx-auto d-flex"
    >
      <div className="card-body">
        <h4 className="card-title">
          {kid.imgUrl ? (
            <img
              src={kid.imgUrl}
              alt={kid.fullName}
              style={{ height: "20px" }}
            />
          ) : (
            ""
          )}
          {"           "}
          {kid.fullName}
        </h4>

        <p className="card-text">{kid.fullName}</p>
      </div>
    </Link>
  );
}

export default KidCard;
