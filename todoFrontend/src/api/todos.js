import { apiBaseUrl } from "@/utils/consts";
import axios from "axios";

export const getAllTodos = async () => {
  let token = localStorage.getItem("token");
  if (!token) return { status: 0, message: "no token" };
  let response = null;
  try {
    response = await axios.get(apiBaseUrl + "/todos/getAll", {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    response = error;
  }
  return response;
};

export const postCreateTodo = async (content) => {
  let token = localStorage.getItem("token");
  if (!token) return { status: 0, message: "no token" };
  let response = null;
  try {
    response = await axios.post(
      apiBaseUrl + "/todos/create",
      { content },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    response = error;
  }
  return response;
};

export const putEditTodo = async (id, content) => {
  let token = localStorage.getItem("token");
  if (!token) return { status: 0, message: "no token" };
  let response = null;
  try {
    response = await axios.put(
      apiBaseUrl + "/todos/update",
      { id, content },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    response = error;
  }
  return response;
};
export const deleteRemoveTodo = async (id) => {
  let token = localStorage.getItem("token");
  if (!token) return { status: 0, message: "no token" };
  let response = null;
  try {
    response = await axios.delete(apiBaseUrl + "/todos/delete" + `?id=${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    response = error;
  }
  return response;
};
