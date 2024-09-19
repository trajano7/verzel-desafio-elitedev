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

