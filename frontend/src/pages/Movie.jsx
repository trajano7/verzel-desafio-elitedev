import { Box, Container, Typography } from "@mui/material";
import MovieDetails from "../components/MovieDetails";
import { json, useLoaderData, useNavigate, useSubmit } from "react-router-dom";
import { useFavorites } from "../store/AuthContext";

const MoviePage = () => {
  const submit = useSubmit();
  const { removeFavorite, addFavorite } = useFavorites();
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

  const response = await fetch('http://localhost:3000/movies/' + id);

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected movie.' },
      {
        status: response.status,
      }
    );
  } else {
    const resData = await response.json();
    return resData.movie;
  }
}

