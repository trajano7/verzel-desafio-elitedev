import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { Link, useNavigate, useSubmit } from "react-router-dom";
import { useFavorites } from "../store/AuthContext";
import { clearLocalStorage } from "../util/authUtil";

const loggedinOptions = ["Meus Favortios", "Sair"];
const loggedoutOptions = ["Entrar/Registrar"];

const AppTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  color: "inherit",
  textDecoration: "none",
}));

const Header = ({ mode, toggleMode }) => {
  const navigate = useNavigate();
  const dummyFlag = false;
  const { username, clearCtx } = useFavorites();

  const menuOptions = dummyFlag ? loggedinOptions : loggedoutOptions;

  let userMenu = (
    <Button variant="text" onClick={() => navigate("/auth?mode=login")}>
      Entrar/Registrar
      <AccountCircleIcon sx={{ fontSize: "1.5rem", ml: 1 }} />
    </Button>
  );

  const onLogoutHandler = () => {
    clearLocalStorage();
    clearCtx();
    navigate('/');
  }

  if (username) {
    userMenu = (
      <>
        <Button
          variant="text"
          onClick={() => navigate(`/${username}/favoritos`)}
        >
          Meus Favoritos
        </Button>
        <Button variant="text" onClick={onLogoutHandler}>
          Sair
          <LogoutIcon sx={{ ml: 0.5, fontSize: "1rem" }} />
        </Button>
      </>
    );
  }
  
  return (
    <AppBar elevation={0} position="static" sx={{ marginBottom: "5rem" }}>
      <Container>
        <Toolbar
          disableGutters
          sx={{
            maxWidth: "700px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
            paddingBottom: { xs: "1rem", md: "inherit" },
            gap: { xs: 1 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              px: 0,
              borderBottom: { xs: "1px solid", md: 0 },
              padding: { xs: "1rem 3rem", md: 0 },
            }}
          >
            <LocalMoviesIcon sx={{ mr: 0.5 }} />
            <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
              <Typography variant="h4" sx={{ fontWeight: "700" }}>
                FilmTrack
              </Typography>
            </Link>
          </Box>
          <Box
            sx={{
              gap: 1,
              alignItems: "center",
            }}
          >
            {userMenu}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
