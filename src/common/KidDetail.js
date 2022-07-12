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

  /** API call to retrieve single kid on initial render */
  useEffect(function getKidOnMount() {
    async function getKid() {
      const kid = await MomApi.getKid(params.id);
      kid.fullName = `${kid.first_name} ${kid.last_name}`;
      setKid({ ...kid });
    }
    getKid();
  }, [params.id]);


  /** Displays kid details */
  function renderKidDetails() {
    if (!Object.keys(kid).length) {
      return <i>Loading...</i>;
    } else {
      return (
        <>
          <div className="row container-flex mb-5 me-5">
            <div className="col-6 mt-5">
              <img src={kid.image_url} alt={kid.fullName}
                className="img-thumbnail h-75" />
            </div>
            <div className="col-6 mt-5">
              <h1 className="mt-3 display-5 text-start">{kid.fullName}</h1>
              <h5 className="mb-3 fw-light text-start">Classroom: {kid.classroom}</h5>
              <p className="mb-3 fw-light text-start">Birthday: {kid.birth_date}</p>
              <p className="mb-3 fw-light text-start">Primary Guardian: {kid.contacts.length ? kid.contacts[0].name : "No Guardian Yet"}</p>
              <h3 classname="text-start">{kid.first_name}'s Info: </h3>
              <div className="accordion" id="infoAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      Contacts
                    </button>
                  </h2>
                  <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <ul>
                        {kid.contacts.length > 0 ?
                          kid.contacts.map(
                            contact => <li> <strong> {contact.name}</strong>: {contact.relation}, {contact.email}, {contact.phone} </li>
                          )
                          : "No Contacts Yet"
                        }
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      Medical Record
                    </button>
                  </h2>
                  <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <h5><strong>Basic Details</strong></h5>
                      {kid.medical_record ? (
                        <>
                          <p> Current Height: {kid.medical_record.student_height} in.</p>
                          <p> Current Weight: {kid.medical_record.student_weight} lbs.</p>
                          <h5><strong>Immunizations</strong></h5>
                          <p>Covid 1st dose: {kid.medical_record.covid1}</p>
                          <p>Covid 2nd dose: {kid.medical_record.covid2}</p>
                        </>
                      )
                        :
                        "No Medical Record Yet"
                      }
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