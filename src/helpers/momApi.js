import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 *
 */

class MomApi {

  static key = process.env.REACT_APP_API_KEY;
  static token = "";

  // Base API Request format

  static async request(data = {}, method = "POST") {
    const url = `${BASE_URL}`;
    const headers = {
      'Content-Type': 'application/json', 'Authorization': "apikey " + this.key
    };

    try {
      let response = await axios({ data, url, method, headers })
        .then(result => result.data.data);
      return response;
    } catch (err) {
      console.error("API Error:", err.response);
      console.log("err", err);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Sign up a user, returns token */
  static async signUp(formData) {
    const { first_name, last_name, username, password, email, phone } = formData;
    let response = await this.request({
      query: `mutation {
      addUser(
        first_name: "${first_name}",
        last_name: "${last_name}",
        username: "${username}",
        password: "${password}",
        email: "${email}",
        phone: "${phone}"
        )}`
    });
    return response.signupUser.token;
  }

  /** Log in a user, return token */
  static async login(formData) {
    const { username, password } = formData;
    let response = await this.request({
      query: `mutation {
        loginUser(
          username: "${username}",
          password: "${password}"
          )}`
    });
    return response.loginUser.token;
  }

  /** Get array of all kids. */
  static async getAllKids() {
    let response = await this.request({
      query: '{getStudentList {first_name last_name id image_url}}'
    });
    return response.getStudentList;
  }

  /** Returns details on kid by id */
  static async getKid(id) {
    let response = await this.request({
      query: `{getStudent(id: ${id})
      {
        first_name
        last_name
        classroom
        birth_date
        image_url
        guardian {
          name
          phone
          other
          email
          relation
        }
        contacts_list {
          name
          email
          phone
          relation
          other
        }
        medical_records {
          student_height
          student_weight
          covid1
          covid2
          flu
          mmr
          polio
          tb
          tetanus
        }
      }}` });
    return response.getStudent;
  }

  /** Get user info, with student list */
  static async getUser(username) {
    let response = await this.request({
      query: `{ getUserByUsername(username: "${username}") {
          first_name
          email
          last_name
          phone
          username
          students_list {
            id
            first_name
            last_name
            classroom
            birth_date
            image_url
            contacts_list {
              name
              email
              phone
              relation
              other
            }
            medical_records {
              student_height
              student_weight
              covid1
              covid2
              flu
              mmr
              polio
              tb
              tetanus
            }
          }
        }
      }` });
    return response.getUserByUsername;
  }

  /** Update a user */
  static async updateUser(username, formData) {
    const { first_name, last_name, email, phone } = formData;
    let response = await this.request({
      query: `mutation {
          updateUser(
            username: "${username}"
            first_name: "${first_name}",
            last_name: "${last_name}",
            email: "${email}",
            phone: "${phone}"
            )}`
    });
    return response.updateUser;
  }

  /** Add a kid to database, returns confirmation { "added": {kid} } */
  static async addKid(kid) {
    const { first_name, last_name, birth_date, classroom } = kid;
    let response = await this.request({
      query: `mutation {
        insertStudent(
          first_name: "${first_name}",
          last_name: "${last_name}",
          birth_date: "${birth_date}",
          classroom: "${classroom}",
          image_url: ""
      )}`
    });
    return response.insertStudent;
  }

  static async getCovidList(id) {
    let response = await this.request({
      query: `{getCovidList(id: ${+id}) {
        first_name
        last_name
        id
        primary_contact {
          name
          phone
          email
          relation
        }
      }
    }`
    });
    return response.getCovidList;
  }
}

export default MomApi;
