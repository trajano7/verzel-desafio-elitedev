import {
  alpha,
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputBase,
  InputLabel,
  OutlinedInput,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Form, Link } from "react-router-dom";
import {
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const AuthForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const data = useActionData();
  const navigation = useNavigation();

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";
  let buttonText = isLogin ? "Entrar" : "Registrar";
  if (isSubmitting) {
    buttonText = "Submitting...";
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Form
      style={{
        margin: "0 auto",
        width: "100%",
      }}
      method="post"
    >
      <Typography
        variant="h6"
        sx={{ marginBottom: ".5rem", textAlign: "center" }}
      >
        {isLogin ? "Entre na sua conta" : "Crie uma conta"}
      </Typography>
      {data && data.errors && (
        <ul
          style={{
            listStyle: "none",
            margin: "0",
            padding: "0",
            marginBottom: "1rem",
          }}
        >
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <TextField
        size="small"
        id="username"
        name="username"
        type="text"
        label="Username"
        required
        sx={{ width: "100%", marginBottom: "1rem" }}
      />
      <TextField
        id="password"
        name="password"
        size="small"
        type={showPassword ? "text" : "password"}
        sx={{ width: "100%", marginBottom: "1rem" }}
        required
        label="Password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Box sx={{ textAlign: "right" }}>
        <Link
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "inline",
          }}
          to={`?mode=${isLogin ? "register" : "login"}`}
        >
          {isLogin ? "Create new user" : "Login"}
        </Link>
        <Button
          variant="contained"
          aria-label="search"
          type="submit"
          disabled={isSubmitting}
          sx={{ marginLeft: "1rem" }}
        >
          {buttonText}
        </Button>
      </Box>
    </Form>
  );
};

export default AuthForm;
