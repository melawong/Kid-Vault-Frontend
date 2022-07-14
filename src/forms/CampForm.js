import UserContext from "../userContext";
import { useState, useContext } from "react";
import FlashMessage from "../common/FlashMessage";

function CampForm({ student }) {
  const { handleCampSubmit } = useContext(UserContext);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [formData, setFormData] = useState({first_name: "", last_name: ""});

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  /** Call parent function and clear form. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    const { first_name, last_name, email, phone } = formData;
    const updatedData = await handleCampSubmit( {
      first_name,
      last_name,
      email,
      phone
    });
    setFormData((formData) => ({
      ...formData,
      first_name: updatedData.first_name,
      last_name: updatedData.last_name,
      email: updatedData.email,
      phone: updatedData.phone
    }));
    setHasSubmitted(true);
  }

  /** Create form fields  */
  function renderFormFields() {
    const formFields = Object.keys(formData);
    return formFields.map((f) => (
      <div className="p-1" key={f}>
        <input
          id={f}
          name={f}
          className="form-control"
          placeholder={`Enter ${f}...`}
          onChange={handleChange}
          value={formData[f]}
          aria-label={f}
        />
      </div>
    ));
  }

  function renderFlashMessage() {
    return hasSubmitted ? (
      <FlashMessage message="Updated successfully!" alertStatus="success" />
    ) : (
      ""
    );
  }

  return (
    <form className="CampForm" onSubmit={handleSubmit}>
      <h2 className="mt-2"> Summer Camp Registration Form </h2>
      <div className="mb-3 col-6 mx-auto mt-3">
        {renderFormFields()}
        {renderFlashMessage()}
        <button className="btn btn-info mt-3">Save</button>
      </div>
    </form>
  );

}

export default CampForm;