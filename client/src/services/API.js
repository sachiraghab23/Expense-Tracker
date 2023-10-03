import axios from "axios";
export default API = axios.create({ baseURL: process.env.REACT_APP_BASEURL });