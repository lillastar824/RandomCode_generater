import axios from "axios";

axios.defaults.withCredentials = true;

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default {
  getUser: function (code) {
    return axios.get(`${BACKEND_URL}/api/users/${code ? `?code=${code}` : ""}`);
  },
  createTodo: function (data) {
    return axios.post(`${BACKEND_URL}/api/todo/`, data);
  },
  deleteTodo: function (_id) {
    return axios.delete(`${BACKEND_URL}/api/todo/?_id=${_id}`);
  },
  updateTodo: function (data) {
    return axios.put(`${BACKEND_URL}/api/todo/`, data);
  },
};
