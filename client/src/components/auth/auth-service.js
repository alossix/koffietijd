import axios from "axios";

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:9000/api",
      withCredentials: true,
    });
    this.service = service;
  }

  signup = (email, firstName, lastName, password) => {
    return this.service
      .post("/signup", { email, firstName, lastName, password })
      .then((response) => response.data);
  };

  loggedin = () => {
    console.log(`auth service LOGGED-IN part 1 runs`);
    return this.service.get("/loggedin").then((response) => {
      console.log(`this is the auth service LOGGED-IN response: ${response}`);
      return response.data;
    });
  };

  login = (email, password) => {
    console.log(`auth-service login runs`);
    return this.service.post("/login", { email, password }).then((response) => {
      console.log(`this is the auth service LOGIN response: ${response}`);
      return response.data;
    });
  };

  logout = () => {
    return this.service.post("/logout", {}).then((response) => response.data);
  };
}

export default AuthService;
