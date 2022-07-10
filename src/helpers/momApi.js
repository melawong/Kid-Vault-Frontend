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

  /** Get list of all user's kids. */

  static async getMyKids() {
    let response = await this.request({
      query: '{getAllStudents {first_name last_name id}}'
    });
    return response.getAllStudents;
  }

  /** Returns details on kid by id */

  static async getKid(id) {
    let response = await this.request({
      query: `{getStudentById(student_id: ${id})
      {
        first_name
        last_name
        classroom
        birth_date
        image_url
        contacts {
          name
          email
          phone
          relation
        }
        medical_record {
          student_height
          student_weight
          covid1
          covid2
        }
      }}` });
    return response.getStudentById;
  }

  /** Sign up a user, returns token */
  static async signUp(formData) {
    const { first_name, last_name, username, password, email, phone } = formData;

    const body = {
      query: `mutation {
      addUser(
        first_name: "${first_name}",
        last_name: "${last_name}",
        username: "${username}",
        password: "${password}",
        email: "${email}",
        phone: "${phone}")
    }`
    };

    let response = await axios({
      url: BASE_URL,
      method: "POST",
      headers: {
        'Content-Type': 'application/json', 'Authorization': "apikey " + this.key
      },
      data: body
    }).then(res => console.log("RES", res));

    return response;
  }

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
    const { first_name, last_name, birth_date, classroom } = kid;
    let response = await this.request({
      query: `mutation {
        addStudent(first_name:${first_name}, last_name:${last_name}, birth_date:${birth_date}, classroom:${classroom})
      }`
    }
    );
    console.log("response", response);
    return response.addKid;
  }
}

export default MomApi;
