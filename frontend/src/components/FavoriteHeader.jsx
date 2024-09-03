import {
  Box,
  Button,
  Card,
  Divider,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import { useFavorites } from "../store/AuthContext";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { useParams, useSubmit } from "react-router-dom";

const FavoriteHeader = () => {
  const submit = useSubmit();
  const { isPublic, setProfileVisibility } = useFavorites();
  const text = isPublic ? "Public List" : "Private List";
  const bttnIcon = isPublic ? <LockOpenRoundedIcon /> : <LockRoundedIcon />;
  const { username } = useParams();
  const user = localStorage.getItem("username");

  const onVisibilityChange = () => {
    const newValue = isPublic ? "private" : "public";
    setProfileVisibility(newValue);
    const fetchData = { visibility: newValue };
    submit({ visibility: newValue }, { method: "PATCH" });
  };

  const style =
    user === username
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
      {user === username && (
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
