import axios from "axios";

const API_URL = "http://localhost:8081/user";

// Signup
export const signUp = (fullname, email, password, role) => {
  return axios.post(`${API_URL}/signup`, {
    fullname,
    emailid: email,
    password,
    role: parseInt(role), // ensure role is sent as integer (0=student, 1=teacher)
  });
};

// Signin
export const signIn = (email, password) => {
  return axios.post(`${API_URL}/signin`, {
    emailid: email,
    password,
  });
};

// Forgot Password
export const forgotPassword = (email) => {
  return axios.post(`${API_URL}/forgotpassword`, {
    emailid: email,
  });
};
