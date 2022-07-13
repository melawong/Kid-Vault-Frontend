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
  const { username, first_name, last_name, email, phone } = user;
  const [hasUpdated, setHasUpdated] = useState(false);

  const [formData, setFormData] = useState({
    username,
    first_name,
    last_name,
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
    const { first_name, last_name, email, phone } = formData;
    const updatedData = await handleUserUpdate(username, {
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
    <form className="UpdateUserForm col-md-6" onSubmit={handleSubmit}>
      <h2 className="mt-2">Edit Profile</h2>
      <div className="mb-3 col-md-9 mx-auto mt-2">
        {renderFormFields()}
        {renderFlashMessage()}
        <button disabled={user.username === "school" ? true : false} className="btn btn-info">Save</button>
      </div>
    </form>
  );
}

export default UserProfileForm;