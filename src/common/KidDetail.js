import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AddKidForm from "../forms/AddKidForm";
import MomApi from "../helpers/momApi";
import UserContext from "../userContext";
import Home from "./Home";

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
  const { user, token } = useContext(UserContext);
  const [kid, setKid] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const params = useParams();

  /** API call to retrieve single kid on initial render */
  useEffect(function getKidOnMount() {
    async function getKid() {
      console.log("here1");
      if (token && user.students_list) {
        console.log("here2");
        let accessibleStudentIds = new Set(
          user.students_list.map(student => student.id));
        console.log("here3");
        if (accessibleStudentIds.has(+params.id)) {
          console.log("here4");
          const kid = await MomApi.getKid(+params.id);
          console.log("here5 + kid", kid);
          setKid(kid);
        }
      }
    }
    getKid();
    setHasLoaded(true);
  }, []);


  /** Displays kid details */
  function renderKidDetails() {
    if (!hasLoaded || !kid) {
      return <i>Loading...</i>;
    } else {
      return (
        <>
          <div className="row container-flex mb-5 me-5">
            <div className="col-6 mt-5">
              <img src={kid.image_url} alt={`${kid.first_name} ${kid.last_name}`}
                className="img-thumbnail height-auto" />
            </div>
            <div className="col-6 mt-5">
              <h1 className="display-5 text-start">{`${kid.first_name} ${kid.last_name}`}</h1>


              <div className="accordion" id="infoAccordion">

                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                      Medical Record
                    </button>
                  </h2>
                  <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div className="accordion-body text-start">
                      <h5><strong>Physical Stats</strong></h5>
                      {kid.medical_records ? (
                        <>
                          <p> Birth Date: {kid.birth_date}</p>
                          <p> Current Height: {kid.medical_records.student_height} in.</p>
                          <p> Current Weight: {kid.medical_records.student_weight} lbs.</p>
                          <br></br>
                          <h5><strong>Immunizations</strong></h5>
                          <p>Covid 1st dose: {kid.medical_records.covid1}</p>
                          <p>Covid 2nd dose: {kid.medical_records.covid2}</p>
                          <p>Flu: {kid.medical_records.flu}</p>
                        </>
                      )
                        :
                        "No Medical Record Yet"
                      }
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                      School Information
                    </button>
                  </h2>
                  <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <p className="mb-3 fw-light text-start">Home Room: {kid.classroom}</p>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                      Emergency Contacts
                    </button>
                  </h2>
                  <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <ol>
                        {kid.contacts_list ?
                          kid.contacts_list.map(
                            contact =>
                              <li align="left" key={contact.name}>
                                <strong> {contact.name}</strong>
                                <ul><li>{contact.relation}
                                </li>
                                  <li>email: {contact.email}</li>
                                  <li>phone: {contact.phone}</li>
                                </ul>
                                <p>
                                </p>
                              </li>
                          )
                          : "No Contacts Yet"
                        }
                      </ol>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFour">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                      Generate Forms
                    </button>
                  </h2>
                  <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                    <div className="accordion-body text-start">
                      <p><a href={`/forms/school/${kid.id}`}>School</a></p>
                      <p><a href={`/forms/camp/${kid.id}`}>Camp</a></p>
                      <p><a href={`/forms/medical/${kid.id}`}>Medical</a></p>
                    </div>
                  </div>
                </div>


              </div>

            </div>
          </div>
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