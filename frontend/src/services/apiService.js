import { json } from "react-router-dom";
import { CustomError } from "../errors/CustomError";

export const apiRequest = async (endpoint, method = "GET", body = null, headers = {}) => {
  const url = `http://localhost:3000/${endpoint}`; // TODO: por url no env

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers
    },
    body: body ? JSON.stringify(body) : null
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const responseBody = await response.json();
      throw new CustomError(
        responseBody.message,
        response.status,
        responseBody.errors ? responseBody.errors : null
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao fazer requisição:", error);
    throw error; 
  }
};
