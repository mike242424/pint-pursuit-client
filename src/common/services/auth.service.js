import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_URL;

const signup = async (email, username, password) => {
  const response = await axios.post(API_URL + "/api/users/signup", {
    email,
    username,
    password,
  });

  if (response.data.token) {
    localStorage.setItem("token", JSON.stringify(response.data.token));
  }
  return response.data.token;
};

const login = async (username, password) => {
  const response = await axios.post(API_URL + "login", {
    username,
    password,
  });

  if (response.data.token) {
    localStorage.setItem("token", JSON.stringify(response.data.token));
  }
  return response.data.token;
};

const logout = () => {
  localStorage.removeItem("token");
};

const authService = {
  signup,
  login,
  logout,
};

export default authService;
