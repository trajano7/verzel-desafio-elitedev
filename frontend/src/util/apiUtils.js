import { json } from "react-router-dom";
import { apiRequest } from "../services/apiService";

export async function fetchUserData(token) {
  try {
    const response = await apiRequest("favorites", "GET", null, {
      Authorization: "Bearer " + token,
    });

    return response;
  } catch (error) {
    if (error.status && error.status === 404) {
      return null;
    }
    throw json({ message: "Something went wrong." }, { status: 500 });
  }
}
