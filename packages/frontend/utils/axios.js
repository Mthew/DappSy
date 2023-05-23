import axios from "axios";

class AxiosCreate {
  _instance;

  constructor(baseUrl) {
    this._instance = axios.create({
      baseURL: baseUrl,
    });
  }

  get instance() {
    return this._instance;
  }
}      

export default new AxiosCreate("/api", {}).instance;