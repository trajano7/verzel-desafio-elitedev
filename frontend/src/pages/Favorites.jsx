import { Box, Divider, Typography } from "@mui/material";
import FavoriteHeader from "../components/FavoriteHeader";
import { getAuthToken } from "../util/authUtils";
import {
  json,
  redirect,
  useLoaderData,
  useParams,
  useSubmit,
} from "react-router-dom";
import MovieGrid from "../components/MovieGrid";
import { useAuthCtx } from "../store/AuthContext";
import { apiRequest } from "../services/apiService";
import { CustomError } from "../errors/CustomError";

const FavoritesPage = () => {
  const { removeFavorite } = useAuthCtx();
  const data = useLoaderData();
  const { username } = useParams();
  const submit = useSubmit();

  if (!Array.isArray(data) && data.error === 403) {
    return (
      <Typography
        variant="h6"
        sx={{ textAlign: "center" }}
      >{`O perfil de ${username} é privado.`}</Typography>
    );
  }

  const onDeleteHandler = (movieID) => {
    removeFavorite(movieID);
    data.filter((item) => item.id !== movieID);
    submit({ movieID: movieID }, { method: "DELETE" });
  };

  const onAddHandler = (movieID) => {
    // pass
  };

  return (
    <Box
      sx={{
        maxWidth: "690px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <FavoriteHeader />
      {<Divider sx={{ marginBottom: "4rem" }} />}
      {data.length !== 0 && (
        <MovieGrid
          movies={data}
          onDelete={onDeleteHandler}
          onAdd={onAddHandler}
        />
      )}
      {data.length === 0 && (
        <Typography
          variant="h6"
          sx={{ textAlign: "center" }}
        >{`${username} ainda não possui nenhum filme adicionado a sua lista`}</Typography>
      )}
    </Box>
  );
};

export default FavoritesPage;

export async function loader({ request, params }) {
  const profileUsername = params.username;

  const token = getAuthToken();
  const headers = token ? { Authorization: "Bearer " + token } : {};
  const endpoint = "favorites/" + profileUsername;

  try {
    const response = await apiRequest(endpoint, "GET", null, headers);
    return response.data.movies;
  } catch (error) {
    if (error instanceof CustomError) {
      if (error.status === 403) {
        return { error: error.status };
      } 
      else if (error.status === 401) {
        return redirect("/auth?mode=login");
      }
    }
    throw json({ message: "Something went wrong." }, { status: 500 });
  }
}




