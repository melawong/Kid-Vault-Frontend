import UserContext from "../userContext";
import { useState, useContext, useEffect } from "react";
import FlashMessage from "../common/FlashMessage";
import { useLocation } from "react-router-dom";

function CampForm() {
  const { handleCampSubmit } = useContext(UserContext);
  const location = useLocation();
  const { kid } = location.state;
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [formData, setFormData] = useState(
    {
      fullname: "",
      birthdate: "",
      grade: "",
      gender: "",
      address: "",
      guardianName: "",
      guardianEmail: "",
      guardianPhone: "",
      guardianAltPhone: "",
      immunizations: ""
    });

  useEffect(() => {
    console.log("location", location);
  }, []);

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  /** Call parent function and clear form. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    await handleCampSubmit(formData);
    setHasSubmitted(true);
  }


  function renderFlashMessage() {
    return hasSubmitted ? (
      <FlashMessage message="Camp Form Submitted!" alertStatus="success" />
    ) : (
      ""
    );
  }

  return (
    <form className="CampForm bg-white col-10 mx-auto" onSubmit={handleSubmit}>
      <fieldset disabled={hasSubmitted ? "disabled" : ""}>
        <h2 className="mt-2 mb-3 mx-auto col-10"> Summer Camp Registration </h2>
        <h5 className="mt-1"><strong>Athlete Information</strong></h5>

        <div className="mb-3 mt-3">

          <div className="form-group mb-5">
            Athlete's Name
            <input
              id="fullname"
              name="fullname"
              className="form-control mb-3"
              placeholder="first name"
              onChange={handleChange}
              value={kid.first_name ? `${kid.first_name} ${kid.last_name}` : ""}
              aria-label="fullname"
            />

            Birth Date
            <input
              id="birthdate"
              name="birthdate"
              className="form-control mb-3"
              placeholder="first name"
              onChange={handleChange}
              value={kid.birth_date ? kid.birth_date : ""}
              aria-label="birthdate"
            />

            Grade
            <input
              id="grade"
              name="grade"
              className="form-control mb-3"
              placeholder="grade"
              onChange={handleChange}
              value=""
              aria-label="grade"
            />

            Gender:
            <fieldset className="form-group mb-3 mt-1">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckFemale" />
                <label className="form-check-label" htmlFor="flexCheckFemale">
                  Female
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckMale" />
                <label className="form-check-label" htmlFor="flexCheckMale">
                  Male
                </label>
              </div>
            </fieldset>

            Address:
            <input
              id="address"
              name="address"
              className="form-control"
              placeholder="address"
              onChange={handleChange}
              value=""
              aria-label="address"
            />
          </div>

          <h5><strong>Parent/Guardian Information</strong></h5>

          <div className="form-group mb-5">
            <label htmlFor="immunizationsArea" className="form-label mt-3">Full Name: </label>
            <input
              id="guardianName"
              name="guardianName"
              className="form-control"
              placeholder="full name"
              onChange={handleChange}
              value={kid.guardian ? kid.guardian.name : ""}
              aria-label="guardianName"
            />
            <label htmlFor="immunizationsArea" className="form-label mt-3">Email: </label>
            <input
              id="guardianEmail"
              name="guardianEmail"
              className="form-control"
              placeholder="email"
              onChange={handleChange}
              value={kid.guardian ? kid.guardian.email : ""}
              aria-label="guardianEmail"
            />
            <label htmlFor="immunizationsArea" className="form-label mt-3"> Primary Phone: </label>
            <input
              id="guardianPhone"
              name="guardianPhone"
              className="form-control"
              placeholder="phone number"
              onChange={handleChange}
              value={kid.guardian ? kid.guardian.phone : ""}
              aria-label="guardianPhone"
            />

            <label htmlFor="immunizationsArea" className="form-label mt-3">Alternate Phone: </label>
            <input
              id="guardianAltPhone"
              name="guardianAltPhone"
              className="form-control"
              placeholder="alternate phone number"
              onChange={handleChange}
              value={kid.guardian ? kid.guardian.other : ""}
              aria-label="guardianAltPhone"
            />
          </div>

          <h5><strong>Medical Information</strong></h5>
          <div className="form-group">
            <label htmlFor="immunizationsArea" className="form-label mt-3">Immunizations</label>
            <textarea
              className="form-control"
              name="immunizations"
              id="immunizationsArea"
              rows="7"
              defaultValue={`
          FLU: ${kid.medical_records ? kid.medical_records.flu : ""}
          MMR:${kid.medical_records ? kid.medical_records.mmr : ""}
          POLIO: ${kid.medical_records ? kid.medical_records.polio : ""}
          TB: ${kid.medical_records ? kid.medical_records.tb : ""}
          TETANUS: ${kid.medical_records ? kid.medical_records.tetanus : ""}
          COVID-1st-dose: ${kid.medical_records ? kid.medical_records.covid1 : ""}
          COVID-2nd-dose: ${kid.medical_records ? kid.medical_records.covid2 : ""}`}
            >
            </textarea>
          </div>
          {renderFlashMessage()}
          <button className="btn btn-info mt-3">Save</button>
        </div>
      </fieldset>
    </form >
  );

}

export default CampForm;