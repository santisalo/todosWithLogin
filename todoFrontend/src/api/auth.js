import { apiBaseUrl } from "@/utils/consts";
import axios from "axios";

export const postLogin = async (email, password) => {
  let response = null;
  try {
    response = await axios.post(apiBaseUrl + "/auth/login", {
      email,
      password,
    });
  } catch (error) {
    response = error;
  }
  return response;
};
export const postRegister = async (name, email, password, c_password) => {
  let response = null;
  try {
    response = await axios.post(apiBaseUrl + "/auth/register", {
      name,
      email,
      password,
      c_password,
    });
  } catch (error) {
    response = error;
  }
  return response;
};
export const checkToken = async (token) => {
  let response = null;
  try {
    response = await axios.post(
      apiBaseUrl + "/auth/checkToken",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    response = error;
  }
  return response;
};
