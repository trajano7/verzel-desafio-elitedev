import { Box, Container, Typography } from "@mui/material";
import MovieDetails from "../components/MovieDetails";
import { json, useLoaderData, useNavigate, useSubmit } from "react-router-dom";
import { useAuthCtx } from "../store/AuthContext";
import { apiRequest } from "../services/apiService";

const MoviePage = () => {
  const submit = useSubmit();
  const { removeFavorite, addFavorite } = useAuthCtx();
  const movie = useLoaderData();

  const onDeleteHandler = (movieID) => {
    removeFavorite(movieID);
    submit({ movieID: movieID }, { method: "DELETE" });
  };

  const onAddHandler = (movieID) => {
    addFavorite(movieID);
    submit({ movieID: movieID }, { method: "POST" });
  };

  return (
    <Box sx={{ maxWidth: "690px", margin: "0 auto" }}>
      <MovieDetails movieData={movie} onDelete={onDeleteHandler} onAdd={onAddHandler} />
    </Box>
  );
};

export default MoviePage;

export async function loader({ request, params }) {
  const id = params.movieID;
  const endpoint = "movies/" + id;

  try {
    const response = await apiRequest(endpoint);
    return response.movie;
  } catch (error) {
    if (error.status && error.status === 404) {
      throw error;
    }
    throw json({ message: "Something went wrong." }, { status: 500 });
  }
}

