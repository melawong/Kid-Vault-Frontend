import { useState, useContext } from "react";
import UserContext from "../userContext";
import FlashMessage from "../common/FlashMessage";

/** Login form component
 *
 * context - handleLogin
 * state - formData
 *
 */

function LoginForm() {
  const initialState = {
    username: "",
    password: "",
  };
  const { handleLogin } = useContext(UserContext);
  const [formData, setFormData] = useState(initialState);
  const [loginFailed, setLoginFailed] = useState(false);

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setLoginFailed(false);
  }

  /** Call parent function and clear form. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    const userLoggedIn = await handleLogin(formData);
    setFormData(initialState);
    if (!userLoggedIn) {
      setLoginFailed(true);
    }
  }

  /** Renders a flash message to the user. */
  function renderFlashMessage() {
    return loginFailed ? (
      <FlashMessage message="Incorrect Username Or Password" alertStatus="success" />
    ) : (
      ""
    );
  }

  /** Create form fields  */
  function renderFormFields() {
    const formFields = Object.keys(initialState);
    return formFields.map((f) => (
      <div className="p-1 col-md-6 mx-auto" key={f}>
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
    <form className="LoginForm" onSubmit={handleSubmit}>
      <h2 className="mt-2">Log in</h2>
      <div className="mb-3 mt-3">
        {renderFlashMessage()}
        {renderFormFields()}
        <button className="btn btn-info mt-3">Submit</button>
      </div>
    </form>
  );
}

export default LoginForm;