import axios from "axios";

const API_URL = "http://localhost:3001/api/users/";

const signup = async (email, username, password) => {
  const response = await axios.post(API_URL + "signup", {
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
