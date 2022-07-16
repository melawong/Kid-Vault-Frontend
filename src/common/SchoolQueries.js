import { useState, useContext } from "react";
import UserContext from "../userContext";

function SchoolQueries() {
  const { handleSchoolQuery } = useContext(UserContext);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    chosenQuery: "Covid-Positive Student Class Contact List",
    id: ""
  });
  const [results, setResults] = useState([]);

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setHasSubmitted(false);
  }

  /** Call parent function and clear form. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    const queryResults = await handleSchoolQuery(formData);
    setResults(queryResults);
    console.log("queryresults", queryResults);
    setHasSubmitted(true);
  }

  return (
    <div className="row">
      <form className="SchoolQueriesForm mx-auto col-6" onSubmit={handleSubmit}>
        <label htmlFor="chosenQuery" className="form-label mt-4">Choose A Query</label>
        <select
          onChange={handleChange}
          className="form-select mt-2 mb-2"
          id="chosenQuery"
          value={formData.chosenQuery}
          name="chosenQuery"
        >
          <option>Covid-Positive Student Class Contact List</option>
          <option>Current County Data - Covid Act Now</option>
          <option>Combined Class List And County Data</option>
        </select>

        {formData.chosenQuery !== "Current County Data - Covid Act Now" &&
          <input
            id="id"
            name="id"
            className="form-control mt-3"
            placeholder="Enter student id"
            onChange={handleChange}
            value={formData["id"]}
          />
        }
        <button className="btn btn-info w-25 mx-auto mt-3">Run</button>
      </form>
      {hasSubmitted && <section id="results" className="mt-5 row">
        <div className="mx-auto col-9 bg-white">

          {formData.chosenQuery === "Covid-Positive Student Class Contact List"
            && results.length
            && <>
            <h5 className="mt-3"> Covid Close Contact List </h5>
            <p>
            <ol className="mx-auto col-6">
              {results.map(
                student =>
                  <p>
                  <p></p>
                  <li className="text-start ms-2" key={student.id}>
                    <strong>Student: </strong>{student.first_name} {student.last_name} <br />
                    {student.primary_contact ?
                      (
                        <>
                          <strong>Primary Contact: </strong> {student.primary_contact.name}
                          <ul>
                            <li> {student.primary_contact.relation}</li>
                            <li> {student.primary_contact.email}</li>
                            <li> {student.primary_contact.phone}</li>
                          </ul>
                        </>
                      )
                      : "No Guardian Contact Found"}
                  </li>
                  </p>
              )}
            </ol></p></>}

          {formData.chosenQuery === "Current County Data - Covid Act Now" &&
            <ol className="mx-auto col-6">
              <h5 className="mt-3">Current COVID Stats {results.county}</h5>
              <li>CDC Transmission Level: {results.cdcTransmissionLevel}</li>
              <li>Test Positivity Ratio: {results.riskLevels.testPositivityRatio}</li>
              <li>Infection Rate: {results.riskLevels.infectionRate}</li>
              <li>Case Density: {results.riskLevels.caseDensity}</li>
            </ol>
          }

          {formData.chosenQuery === "Combined Class List And County Data" &&
            <div className="row">
              <div className="col-6">
                <h5 className="mt-3"> Close Contact List </h5>
                <ol className="mx-auto">
                  {results.class_data.map(
                    student =>
                      <li className="text-start ms-2" key={student.id}>
                        <strong>Student: </strong>{student.first_name} {student.last_name} <br />
                        {student.primary_contact ?
                          (
                            <>
                              <strong>Primary Contact: </strong> {student.primary_contact.name}
                              <ul>
                                <li> {student.primary_contact.relation}</li>
                                <li> {student.primary_contact.email}</li>
                                <li> {student.primary_contact.phone}</li>
                              </ul>
                            </>
                          )
                          : "No Guardian Contact Found"}
                      </li>
                  )}
                </ol>
              </div>
              <div className="col-6">
                <h5 className="mt-3">Current COVID Stats {results.county_data.county}</h5>
                <ol>
                  <li>CDC Transmission Level: {results.county_data.cdcTransmissionLevel}</li>
                  <li>CDC Community Level: {results.county_data.communityLevels.cdcCommunityLevel}</li>
                  <li>Test Positivity Ratio: {results.county_data.riskLevels.testPositivityRatio}</li>
                  <li>Infection Rate: {results.county_data.riskLevels.infectionRate}</li>
                  <li>Case Density: {results.county_data.riskLevels.caseDensity}</li>
                </ol>
              </div>
            </div>
          }
        </div>
      </section >}
    </div >);
}

export default SchoolQueries;