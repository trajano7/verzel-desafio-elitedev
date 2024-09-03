import { Box } from "@mui/material";
import AuthForm from "../components/auth/AuthForm";
import { redirect } from "react-router-dom";

const AuthPage = () => {
  return (
    <Box sx={{ maxWidth: "400px", margin: "0 auto" }}>
      <AuthForm />
    </Box>
  );
};

export default AuthPage;

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

  const response = await fetch("http://localhost:3000/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const resData = await response.json();

  const token = resData.token;
  const profileVisibility = resData.profileVisibility;

  localStorage.setItem("token", token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());
  localStorage.setItem("username", authData.username);
  localStorage.setItem("profileVisibility", profileVisibility);
  
  if (mode === "register") {
    alert('Cadastro realizado com sucesso!');
  }
  else {
    alert('Login realizado com sucesso!');
  }

  return redirect("/");
}
