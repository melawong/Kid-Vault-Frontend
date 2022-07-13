import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddKidForm from "../forms/AddKidForm";
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

  /** API call to retrieve single kid on initial render */
  useEffect(function getKidOnMount() {
    async function getKid() {
      const kid = await MomApi.getKid(params.id);
      setKid({ ...kid });
    }
    getKid();
  }, [params.id]);


  /** Displays kid details */
  function renderKidDetails() {
    if (!kid.first_name) {
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
                  <h2 className="accordion-header" id="headingThree">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                      School Information
                    </button>
                  </h2>
                  <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <p className="mb-3 fw-light text-start">Home Room: {kid.classroom}</p>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                      Emergency Contacts
                    </button>
                  </h2>
                  <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <ol>
                        {kid.contacts_list.length ?
                          kid.contacts_list.map(
                            contact => <li align="left"> <strong> {contact.name}</strong> <ul><li>{contact.relation}</li><li>email: {contact.email}</li><li>phone: {contact.phone}</li></ul><p></p></li>
                          )
                          : "No Contacts Yet"
                        }
                      </ol>
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