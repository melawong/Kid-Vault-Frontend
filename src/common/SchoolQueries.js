import { useState, useContext } from "react";
import UserContext from "../userContext";

function SchoolQueries() {
  const { handleSchoolQuery } = useContext(UserContext);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [formData, setFormData] = useState({ chosenQuery: "Covid Positive Student Contact List" });

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  /** Call parent function and clear form. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    await handleSchoolQuery(formData);
    setFormData(null);
    setHasSubmitted(true);
  }

  return (
    <>
      <form class="SchoolQueriesForm form-group row" onSubmit={handleSubmit}>
        <label htmlFor="chosenQuery" className="form-label mt-4">Choose A Query</label>
        <select
          onChange={handleChange}
          className="form-select w-50 mx-auto"
          id="chosenQuery"
          value={formData.chosenQuery}
          name="chosenQuery"
        >
          <option>Covid Positive Student Contact List</option>
          <option>2</option>
          <option>3</option>
        </select>
        <button className="btn btn-info w-25 mx-auto">Run</button>
      </form>
      <div>

      </div>
    </>);
}

export default SchoolQueries;