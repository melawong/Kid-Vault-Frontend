import { useState, useContext } from "react";
import UserContext from "../userContext";
import FlashMessage from "../common/FlashMessage";

/** UserProfile form component
 *
 * context - handleUserUpdate
 * state - formData
 *
 */

function UserProfileForm() {
  const { user, handleUserUpdate } = useContext(UserContext);
  const { username, firstName, lastName, email, phone } = user;
  const [hasUpdated, setHasUpdated] = useState(false);

  const [formData, setFormData] = useState({
    username,
    firstName,
    lastName,
    email,
    phone
  });

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  /** Call parent function and clear form. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    const { firstName, lastName, email } = formData;
    const updatedData = await handleUserUpdate(username, {
      firstName,
      lastName,
      email,
      phone
    });
    setFormData((formData) => ({
      ...formData,
      firstName: updatedData.firstName,
      lastName: updatedData.lastName,
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
        <button className="btn btn-info">Save Changes!</button>
      </div>
    </form>
  );
}

export default UserProfileForm;