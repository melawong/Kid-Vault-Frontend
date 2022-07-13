import { useState, useContext } from "react";
import UserContext from "../userContext";

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

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  /** Call parent function and clear form. */
  function handleSubmit(evt) {
    evt.preventDefault();
    handleLogin(formData);
    setFormData(initialState);
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
        {renderFormFields()}
        <button className="btn btn-info mt-3">Submit</button>
      </div>
    </form>
  );
}

export default LoginForm;