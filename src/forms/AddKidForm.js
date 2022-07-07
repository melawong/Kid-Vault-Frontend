import { useState, useContext } from "react";
import UserContext from "../userContext";
import FlashMessage from "../common/FlashMessage";

/** AddKidForm component
 *
 * context - handleUserUpdate
 * state - formData
 *
 */

function AddKidForm() {

  const { user, handleAddKid } = useContext(UserContext);
  const initialState = { firstName: "", lastName: "", dob: "" };
  const [formData, setFormData] = useState(initialState);
  const [hasUpdated, setHasUpdated] = useState(false);

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  /** Call parent function and clear form. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    const { firstName, lastName, dob } = formData;
    const updatedData = await handleAddKid({
      firstName,
      lastName,
      dob,
    });
    setFormData((formData) => ({
      ...formData,
      firstName: updatedData.firstName,
      lastName: updatedData.lastName,
      dob: updatedData.dob,
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
          disabled={f === "username"}
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
    <form className="UpdateUserForm col-md-6" onSubmit={handleSubmit}>
      <h2 className="mt-2">Edit Profile</h2>
      <div className="mb-3 col-md-9 mx-auto mt-2">
        {renderFormFields()}
        {renderFlashMessage()}
        <button className="btn btn-info">Add New Kid!</button>
      </div>
    </form>
  );
}

export default AddKidForm;