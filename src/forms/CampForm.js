import UserContext from "../userContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";

function CampForm({ student }) {
  const { handleCampSubmit } = useContext(UserContext);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    username,
    first_name,
    last_name,
    email,
    phone
  });

  /** Update form input. */
  function handleChange(evt) {
    const params = useParams()
    const { name, value } = evt.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  /** Call parent function and clear form. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    const { first_name, last_name, email, phone } = formData;
    const updatedData = await handleCampSubmit(username, {
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
    setHasUpdated(true);
  }

  /** Create form fields  */
  function renderFormFields() {
    const formFields = Object.keys(formData);
    return formFields.map((f) => (
      <div className="p-1" key={f}>
        <input
          id={f}
          name={f}
          disabled={f === "username" || user.username === "school"}
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
    return hasUpdated ? (
      <FlashMessage message="Updated successfully!" alertStatus="success" />
    ) : (
      ""
    );
  }

  return (
    <form className="UpdateUserForm" onSubmit={handleSubmit}>
      <h2 className="mt-2">Edit Profile</h2>
      <div className="mb-3 col-6 mx-auto mt-3">
        {renderFormFields()}
        {renderFlashMessage()}
        <button disabled={user.username === "school" ? true : false} className="btn btn-info mt-3">Save</button>
      </div>
    </form>
  );

}

export default CampForm;