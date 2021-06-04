import decode from "jwt-decode";
/**
 * Service class for authenticating users against an API
 * and storing JSON Web Tokens in the browser's LocalStorage.
 */
class AuthService {
  constructor(auth_api_url) {
    this.auth_api_url = auth_api_url;
  }

  async login(username, password) {
    const res = await this.fetch(this.auth_api_url, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    });
    let json = await res.json();
    if ([401, 404, 403].includes(parseInt(res.status))) {
      throw Error(json.msg);
    }
    this.setToken(json.Token);
    return json;
  }

  loggedIn() {
    return this.getToken() !== null && !this.isTokenExpired(this.getToken());
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        throw Error("Token is expired!");
      } else return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  getUser() {
    if (this.loggedIn()) {
      const token = decode(this.getToken());
      return token.username;
    }
  }

  setToken(token) {
    localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  logout() {
    localStorage.removeItem("token");
  }

  fetch(url, options) {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    if (this.loggedIn()) {
      headers["Authorization"] = `Bearer ${this.getToken()}`;
    }

    return fetch(url, {
      headers,
      ...options,
    });
  }
}

export default AuthService;
