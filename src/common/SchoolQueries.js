import { useState, useContext } from "react";
import UserContext from "../userContext";

function SchoolQueries() {
  const { handleSchoolQuery } = useContext(UserContext);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    chosenQuery: "Covid Positive Student Contact List",
    id: ""
  });
  const [results, setResults] = useState(null);

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  /** Call parent function and clear form. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    const queryResults = await handleSchoolQuery(formData);
    setResults(queryResults);
    setHasSubmitted(true);
  }

  return (
    <div className="row">
      <form className="SchoolQueriesForm mx-auto col-6" onSubmit={handleSubmit}>
        <label htmlFor="chosenQuery" className="form-label mt-4">Choose A Query</label>
        <input
          id="id"
          name="id"
          className="form-control mt-3"
          placeholder="Enter student id"
          onChange={handleChange}
          value={formData["id"]}
        />
        <select
          onChange={handleChange}
          className="form-select mt-2 mb-2"
          id="chosenQuery"
          value={formData.chosenQuery}
          name="chosenQuery"
        >
          <option>Covid Positive Student Contact List</option>
          <option>Covid Act Now </option>
          <option>3</option>
        </select>
        <button className="btn btn-info w-25 mx-auto mt-3">Run</button>
      </form>
      <section id="results" className="mt-5">

        <ol className="text-start">
          {Array.isArray(results) && results.map(
            student =>
              <li>
                <strong>Student: </strong>{student.first_name} {student.last_name} <br />
                <strong>Primary Contact: </strong> {student.primary_contact.name}
                <ul>
                  <li> {student.primary_contact.relation}</li>
                  <li> {student.primary_contact.email}</li>
                  <li> {student.primary_contact.phone}</li>
                </ul>
              </li>)}
        </ol>

      </section>
    </div>);
}

export default SchoolQueries;