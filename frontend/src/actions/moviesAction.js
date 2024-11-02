import { redirect } from "react-router-dom";
import { apiRequest } from "../services/apiService";
import { getAuthToken } from "../util/authUtils";

export async function action({ request }) {
  const method = request.method;
  const data = await request.formData();

  const token = getAuthToken();
  if (!token || token === "EXPIRED") {
    redirect("/auth?mode=login");
  }

  const isDelete = method === "DELETE";
  const isPatch = method === "PATCH";
  const isPost = method === "POST";
  const body = isPost ? Object.fromEntries(data.entries()) : null;
  const endpoint = (isPatch ? "profile" : "favorites") + (isDelete ? `/${data.get("movieID")}` : "");

  try {
    await apiRequest(endpoint, method, body, {
      Authorization: "Bearer " + token,
    });

    return null;
  } catch (error) {
    throw json({ message: "Something went wrong." }, { status: 500 });
  }
}
