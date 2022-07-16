import { useState, useContext } from "react";
import UserContext from "../userContext";
import FlashMessage from "../common/FlashMessage";

/** Signup form component
 *
 * context - handleSignup
 * state - formData
 *
 */

function SignupForm() {
  const initialState = {
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  };
  const { handleSignup } = useContext(UserContext);
  const [formData, setFormData] = useState(initialState);
  const [signupFailed, setSignupFailed] = useState(false);

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setSignupFailed(false);
  }

  /** Call parent function and clear form. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    const userSignedUp = await handleSignup(formData);
    setFormData(initialState);
    if (!userSignedUp) {
      setSignupFailed(true);
    }
  }

  function renderFlashMessage() {
    return signupFailed ? (
      <FlashMessage message="Username Or Email Already Exists!" alertStatus="success" />
    ) : (
      ""
    );
  }

  /** Create form fields  */
  function renderFormFields() {
    const formFields = Object.keys(initialState);
    return formFields.map((f) => (
      <div className="mx-auto col-md-6 p-1" key={f}>
        <input
          type={f === "password" ? "password" : "text"}
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

  return (
    <form className="SignupForm" onSubmit={handleSubmit}>
      <h2 className="mt-2">Sign Up</h2>
      {renderFlashMessage()}
      <div className="mt-3">
        {renderFormFields()}
        <button className="btn btn-info mt-3">Submit!</button>
      </div>
    </form>
  );
}

export default SignupForm;
