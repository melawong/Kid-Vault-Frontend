import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 *
 */

class MomApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN
  static key = process.env.REACT_APP_API_KEY;

  static async request(data = {}, method = "POST") {

    const url = `${BASE_URL}`;
    const headers = { 'Content-Type': 'application/json', 'Authorization': "apikey " + this.key };

    try {
      let response = await axios({ data, url, method, headers }).then(result => result.data.data);
      return response;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getMyKids() {
    let response = await this.request({ query: '{myQuery {first_name last_name id}}' });
    return response.myQuery;
  }
  //   /** Get list of all companies matching search request */
  //   static async getCompanies(searchRequest = {}) {
  //     let res = await this.request("companies", searchRequest);
  //     return res.companies;
  //   }

  //   /** Get list of all jobs matching search request */
  //   static async getJob(jobId) {
  //     let res = await this.request(`jobs/${jobId}`);
  //     return res.job;
  //   }

  //   /** Sign up a user, returns token */
  //   static async signUp(formData) {
  //     let res = await this.request("auth/register", formData, "post");
  //     console.log("token", res.token);
  //     return res.token;
  //   }

  //   /** Log in a user, return token */
  //   static async login(formData) {
  //     let res = await this.request("auth/token", formData, "post");
  //     return res.token;
  //   }

  //   /** Get user */
  //   static async getUser(username) {
  //     let res = await this.request(`users/${username}`);
  //     return res.user;
  //   }

  //   /** Log in a user, return token */
  //   static async updateUser(username, formData) {
  //     let res = await this.request(`users/${username}`, formData, "patch");
  //     return res.user;
  //   }

  /** Add a kid to database, returns confirmation { "added": {kid} } */
  static async addKid(kid) {
    let res = await this.request({ mutation: '{addKidMutation {first_name last_name birth_date}}' });
    return res.addKid;
  }
}

export default MomApi;
