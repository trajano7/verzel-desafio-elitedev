import {
  Box,
  Button,
  Card,
  Divider,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import { useAuthCtx } from "../store/AuthContext";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { useParams, useSubmit } from "react-router-dom";

const FavoriteHeader = () => {
  const submit = useSubmit();
  const sessionCtx = useAuthCtx();
  const { isPublic, setProfileVisibility, username: usernameCtx } = sessionCtx;
  const text = isPublic ? "Public List" : "Private List";
  const bttnIcon = isPublic ? <LockOpenRoundedIcon /> : <LockRoundedIcon />;
  const { username } = useParams();

  const onVisibilityChange = () => {
    const newValue = isPublic ? "private" : "public";
    setProfileVisibility(newValue);
    const fetchData = { visibility: newValue };
    submit({ visibility: newValue }, { method: "PATCH" });
  };

  const isLoggedUserProfile = usernameCtx === username;

  const style = isLoggedUserProfile
    ? {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1rem",
      }
    : { textAlign: "center", marginBottom: "1rem" };

  return (
    <Box sx={style}>
      <Typography variant="h5">{`Filmes Favoritos de ${username}`}</Typography>
      {isLoggedUserProfile && (
        <Button
          sx={{ padding: ".3rem 1rem" }}
          variant="contained"
          endIcon={bttnIcon}
          onClick={onVisibilityChange}
        >
          {text}
        </Button>
      )}
    </Box>
  );
};

export default FavoriteHeader;
