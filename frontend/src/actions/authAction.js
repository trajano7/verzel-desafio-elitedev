import { json, redirect } from "react-router-dom";
import { apiRequest } from "../services/apiService";
import { storeAuthData } from "../util/authUtils";

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "register") {
    throw json({ message: "Unsupported mode." }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    username: data.get("username"),
    password: data.get("password"),
  };

  try {
    const resData = await apiRequest(mode, "POST", authData);
    storeAuthData(resData, authData.username);
    return redirect("/");
  } catch (error) {
    if (error.status && (error.status === 422 || error.status === 401)) {
      return { errors: error.errors };
    }
    throw json({ message: "Something went wrong." }, { status: 500 });
  }
}
